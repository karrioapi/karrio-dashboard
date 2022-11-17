import React from 'react';
import { Collection, CommodityType, CustomsType, NotificationType, ParcelType, ShipmentType } from '@/lib/types';
import { useShipmentMutation } from '@/context/shipment-mutation';
import { PartialShipmentUpdateInput } from 'karrio/graphql';
import { useLabelData } from '@/context/label-data-provider';
import { useAppMode } from '@/context/app-mode-provider';
import { useNotifier } from '@/components/notifier';
import { useLoader } from '@/components/loader';
import { errorToMessages, getShipmentCommodities, isNone, isNoneOrEmpty, useLocation } from '@/lib/helper';
import { DEFAULT_CUSTOMS_CONTENT } from '@/components/form-parts/customs-info-form';

type LabelMutationContext = {
  addParcel: (data: ParcelType) => Promise<void>;
  updateParcel: (parcel_index: number, parcel_id?: string | undefined) => (data: ParcelType) => Promise<void>;
  addItems: (parcel_index: number, parcel_id?: string | undefined) => (items: CommodityType[]) => Promise<void>;
  updateItem: (parcel_index: number, item_index: number, parcel_id?: string | undefined, item_id?: string | undefined) => (data: CommodityType) => Promise<void>;
  removeParcel: (parcel_index: number, parcel_id?: string | undefined) => () => Promise<void>;
  removeItem: (parcel_index: number, item_index: number, item_id?: string | undefined) => () => Promise<void>;
  updateCustoms: (customs_id?: string | undefined) => (data: CustomsType | null) => Promise<void>;
  fetchRates: () => Promise<void>;
  buyLabel: (rate: ShipmentType['rates'][0]) => Promise<void>;
  updateShipment: ({ id, ...changes }: Partial<ShipmentType>) => Promise<void | ShipmentType>;
};

export const LabelMutationContext = React.createContext<LabelMutationContext>({} as LabelMutationContext);

const LabelMutationProvider: React.FC = ({ children }) => {
  const loader = useLoader();
  const notifier = useNotifier();
  const { basePath } = useAppMode();
  const mutation = useShipmentMutation();
  const { shipment, ...label } = useLabelData();
  const { addUrlParam, ...router } = useLocation();
  const [updateRate, setUpdateRate] = React.useState<boolean>(false);

  // state checks
  const isDraft = (id?: string) => isNoneOrEmpty(id) || id === 'new';
  const hasRateRequirements = (shipment: ShipmentType) => {
    return (
      !isNoneOrEmpty(shipment.recipient.address_line1) &&
      !isNoneOrEmpty(shipment.shipper.address_line1) &&
      shipment.parcels.length > 0
    );
  };
  const shouldFetchRates = (changes: ShipmentType) => {
    return (
      (!isNone(changes.shipper) && shipment.shipper.address_line1 !== changes.shipper.address_line1) ||
      (!isNone(changes.shipper) && shipment.shipper.country_code !== changes.shipper.country_code) ||
      (!isNone(changes.shipper) && shipment.shipper.city !== changes.shipper.city) ||

      (!isNone(changes.recipient) && shipment.recipient.address_line1 !== changes.recipient.address_line1) ||
      (!isNone(changes.recipient) && shipment.recipient.country_code !== changes.recipient.country_code) ||
      (!isNone(changes.recipient) && shipment.recipient.city !== changes.recipient.city)
    );
  };
  const parcelHasRateUpdateChanges = (parcel: ParcelType, changes: Partial<ParcelType>) => {
    return (
      (!isNone(changes.packaging_type) && changes.packaging_type !== parcel.packaging_type) ||
      (!isNone(changes.is_document) && changes.is_document !== parcel.is_document) ||
      (!isNone(changes.weight) && changes.weight !== parcel.weight)
    );
  };
  const syncOptionsChanges = (changes: Partial<ShipmentType>): Partial<ShipmentType> => {
    let options = changes.options || shipment.options || {};
    const parcels = changes.parcels || shipment.parcels;

    const declared_value = parcels.reduce((__, p) => {
      const total = (p.items || []).reduce(
        (_, { value_amount, quantity }) => _ + ((quantity || 1) * (value_amount || 0)),
        0
      );
      return __ + total;
    }, 0);
    const currency = parcels.reduce((__, p) => {
      const curr = (p.items || [])
        .reduce((_, { value_currency }) => (_ ? _ : value_currency as any), null);
      return (__ ? __ : curr) as any;
    }, null);

    if (declared_value > 0 && declared_value !== shipment.options.declared_value) {
      options = { ...options, declared_value };
    }

    if (!isNone(currency) && currency !== shipment.options.currency) {
      options = { ...options, currency };
    }

    return { ...changes, options };
  };
  const syncCustomsChanges = (changes: Partial<ShipmentType>): Partial<ShipmentType> => {
    const shipper = changes.shipper || shipment.shipper;
    const recipient = changes.recipient || shipment.recipient;
    const isIntl = (
      (!isNone(shipper?.country_code) && !isNone(recipient?.country_code)) &&
      (shipper.country_code !== recipient.country_code)
    );

    const parcels = changes.parcels || shipment.parcels;
    const isDocument = parcels.every(p => p.is_document);
    const requireCustoms = isIntl && !isDocument;

    const skip = ( // if
      (
        (
          requireCustoms && // require customs def
          !isNone(changes.customs) // customs def provided
        ) ||
        (
          requireCustoms && // require customs def
          isNone(changes.customs) && // customs def not provided
          isNone(changes.parcels) // parcels has not changed
        )
      ) ||
      (
        !requireCustoms && // don't require customs def
        !isNone(shipment.customs) // customs is already defined
      )
    );

    if (skip) return changes;
    if (isDocument) return { ...changes, customs: null };
    if (!isIntl) return { ...changes, customs: undefined };

    const options = changes.options || shipment.options;
    const currency = (shipment.customs?.duty?.currency || options?.currency);
    const paid_by = (shipment.customs?.duty?.paid_by || shipment.payment?.paid_by);
    const incoterm = (shipment.customs?.incoterm || (paid_by == 'sender' ? 'DDP' : 'DDU'));
    const declared_value = (options?.declared_value || shipment.customs?.duty?.declared_value);
    const account_number = (shipment.customs?.duty?.account_number || shipment.payment?.account_number);
    const commodities = isNone(changes.parcels) ? shipment.customs?.commodities : getShipmentCommodities({ parcels } as any);

    const customs: any = {
      ...(shipment.customs || DEFAULT_CUSTOMS_CONTENT),
      ...(incoterm ? { incoterm } : {}),
      commodities,
      duty: {
        ...(shipment.customs?.duty || DEFAULT_CUSTOMS_CONTENT.duty),
        ...(paid_by ? { paid_by } : {}),
        ...(currency ? { currency } : {}),
        ...(declared_value ? { declared_value } : {}),
        ...(account_number ? { account_number } : {}),
      },
    };

    return { ...changes, customs };
  };

  // updates
  const updateShipment = async ({ id, ...changes }: Partial<ShipmentType>) => {
    if (shouldFetchRates(changes as any)) { setUpdateRate(true); }

    changes = { ...syncOptionsChanges(changes) };
    changes = { ...syncCustomsChanges(changes) };

    if (isDraft(id)) {
      return await label.updateShipment(changes);
    } else {
      return await mutation.updateShipment(
        { id: shipment.id, ...changes } as PartialShipmentUpdateInput
      );
    }
  };
  const addParcel = async (data: ParcelType) => {
    if (isDraft(shipment.id)) {
      const update = { parcels: [...shipment.parcels, data] };
      await updateShipment(update);
    } else {
      const update = { id: shipment.id, parcels: [...shipment.parcels, data] };
      await mutation.updateShipment(update as any);
    }
  };
  const updateParcel = (parcel_index: number, parcel_id?: string) => async ({ id, ...data }: ParcelType) => {
    if (parcelHasRateUpdateChanges(shipment.parcels[parcel_index], data)) {
      setUpdateRate(true);
    }

    if (isDraft(shipment.id)) {
      const update = {
        parcels: shipment.parcels.map(
          (parcel, index) => index === parcel_index ? data : parcel
        )
      } as ShipmentType;
      updateShipment(update);
    } else {
      const update = { id: shipment.id, parcels: [{ id: parcel_id || id, ...data }] };
      await mutation.updateShipment(update as any);
    }
  };
  const addItems = (parcel_index: number, parcel_id?: string) => async (items: CommodityType[]) => {
    if (isDraft(shipment.id)) {
      const indexes = new Set((shipment.parcels[parcel_index].items || []).map(item => item.parent_id));
      const item_collection: Collection<CommodityType & { quantity: number }> = items.reduce(
        (acc, item) => ({ ...acc, [item.parent_id || item.id]: item }), {}
      )

      updateParcel(parcel_index)({
        ...shipment.parcels[parcel_index],
        items: [
          ...(shipment.parcels[parcel_index].items || []).map(item => (
            (item.parent_id && Object.keys(item_collection).includes(item.parent_id))
              ? { ...item, quantity: (item.quantity || 0) + item_collection[item.parent_id].quantity }
              : item
          )),
          ...items.filter(item => !indexes.has(item.parent_id))
        ]
      });
    } else {
      await updateParcel(parcel_index, parcel_id)({ items } as ParcelType);
    }
  };
  const updateItem = (parcel_index: number, item_index: number, parcel_id?: string, item_id?: string) =>
    async ({ id, ...data }: CommodityType) => {
      if (isDraft(shipment.id)) {
        updateParcel(parcel_index)({
          ...shipment.parcels[parcel_index],
          items: shipment.parcels[parcel_index].items.map(
            (item, index) => (index !== item_index ? item : { ...item, ...data })
          )
        });
      } else {
        await updateParcel(parcel_index, parcel_id)({
          items: [{ id: item_id || id, ...data }]
        } as ParcelType);
      }
    };
  const removeParcel = (parcel_index: number, parcel_id?: string) => async () => {
    if (isDraft(shipment.id)) {
      const update = {
        parcels: shipment.parcels.filter(
          (_, index) => index !== parcel_index
        )
      } as ShipmentType;
      updateShipment(update);
    } else {
      await mutation.discardParcel(parcel_id as string);
    }
    setUpdateRate(true);
  };
  const removeItem = (parcel_index: number, item_index: number, item_id?: string) => async () => {
    if (isDraft(shipment.id)) {
      updateParcel(parcel_index)({
        ...shipment.parcels[parcel_index],
        items: shipment.parcels[parcel_index].items.filter(
          (_, index) => index !== item_index
        )
      } as ParcelType);
    } else {
      await mutation.discardCommodity(item_id as string);
    }
  };
  const updateCustoms = (customs_id?: string) => async (data: CustomsType | null) => {
    if (isDraft(shipment.id)) {
      const update = { customs: data } as ShipmentType;
      updateShipment(update);
    } else if (data === null) {
      await mutation.discardCustoms(customs_id as string);
    } else {
      const update = { id: shipment.id, customs: { ...data, id: customs_id || data.id } };
      await mutation.updateShipment(update as any);
    }
  };


  // requests
  const fetchRates = async () => {
    try {
      loader.setLoading(true);
      const { rates, messages } = await mutation.fetchRates(shipment);
      updateShipment({ rates, messages } as Partial<ShipmentType>);
    } catch (error: any) {
      updateShipment({ rates: [], messages: errorToMessages(error) } as Partial<ShipmentType>);
    }
    loader.setLoading(false);
  };
  const buyLabel = async (rate: ShipmentType['rates'][0]) => {
    const { messages, ...data } = shipment;
    const selection = isDraft(shipment.id) ? {
      service: rate.service,
      carrier_ids: [rate.carrier_id],
    } : { selected_rate_id: rate.id };
    try {
      loader.setLoading(true);
      const { id } = await mutation.buyLabel({
        ...data,
        ...selection
      } as ShipmentType);
      notifier.notify({
        type: NotificationType.success,
        message: 'Label successfully purchased!'
      });
      router.push(`${basePath}/shipments/${id}`);
    } catch (error: any) {
      updateShipment({ messages: errorToMessages(error) } as Partial<ShipmentType>);
    } finally {
      loader.setLoading(false);
    }
  };

  React.useEffect(() => {
    if (updateRate && hasRateRequirements(shipment)) {
      setUpdateRate(false);
      fetchRates();
    }
  }, [shipment]);

  return (
    <LabelMutationContext.Provider value={{
      updateShipment,
      addParcel,
      addItems,
      updateParcel,
      updateItem,
      removeParcel,
      removeItem,
      updateCustoms,
      fetchRates,
      buyLabel,
    }}>
      {children}
    </LabelMutationContext.Provider>
  );
};

export function useLabelMutation() {
  return React.useContext(LabelMutationContext);
}

export default LabelMutationProvider;
