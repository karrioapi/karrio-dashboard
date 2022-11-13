import { get_shipment, get_shipment_shipment, GET_USER_CONNECTIONS, LabelTypeEnum, PaidByEnum, PartialShipmentMutationInput } from "@karrio/graphql";
import { AddressType, Collection, CommodityType, CustomsType, NotificationType, ParcelType, ShipmentType } from "@/lib/types";
import { getShipmentCommodities, gqlstr, isNone, isNoneOrEmpty, onError, request, useLocation, useSessionHeader } from "@/lib/helper";
import React from "react";
import moment from "moment";
import { useLoader } from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import { useNotifier } from "@/components/notifier";
import { useAppMode } from "@/context/data/mode-context";
import { useShipmentMutation } from "@/context/data/shipment";
import { DEFAULT_CUSTOMS_CONTENT } from "@/components/form-parts/customs-info-form";

const DEFAULT_SHIPMENT_DATA = {
  shipper: {} as AddressType,
  recipient: {} as AddressType,
  parcels: [] as ParcelType[],
  options: { shipment_date: moment().format('YYYY-MM-DD') },
  payment: { paid_by: PaidByEnum.sender },
  label_type: LabelTypeEnum.PDF
} as ShipmentType;


function useLabelData(id: string) {
  const headers = useSessionHeader();
  const [shipment, setShipment] = React.useState<get_shipment_shipment>(DEFAULT_SHIPMENT_DATA);

  // Queries
  const query = useQuery(
    ['shipments', id], () => {
      if (id === 'new') return { shipment };
      return request<get_shipment>(gqlstr(GET_USER_CONNECTIONS), { data: { id }, ...headers() })
    },
    { onError }
  );
  const updateLabelData = (data: Partial<ShipmentType>) => {
    return new Promise<ShipmentType>(resolve => {
      setTimeout(() => {
        const newState = { ...shipment, ...data } as ShipmentType;
        Object.entries(data).forEach(([key, val]) => {
          if (val === undefined) delete newState[key as keyof ShipmentType];
        });
        setShipment(newState);

        resolve(newState);
      })
    });
  };

  return {
    query,
    updateLabelData,
    shipment: shipment as ShipmentType,
  };
}


export function useLabelDataMutation(id: string) {
  const loader = useLoader();
  const notifier = useNotifier();
  const { basePath } = useAppMode();
  const mutation = useShipmentMutation();
  const { addUrlParam, ...router } = useLocation();
  const [updateRate, setUpdateRate] = React.useState<boolean>(false);
  const { shipment, updateLabelData } = useLabelData(id);

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

    const shouldChange = (
      (!isNone(changes.customs)) ||
      (!requireCustoms && !isNone(shipment.customs)) ||
      (requireCustoms && isNone(shipment.customs)) ||
      (requireCustoms && !isNone(changes.parcels))
    );

    if (!shouldChange) return changes;
    if (isDocument) return { ...changes, customs: null };
    if (!isIntl) return { ...changes, customs: undefined };

    const options = changes.options || shipment.options;
    const currency = (shipment.customs?.duty?.currency || options?.currency);
    const paid_by = (shipment.customs?.duty?.paid_by || shipment.payment?.paid_by);
    const incoterm = (shipment.customs?.incoterm || shipment.payment?.paid_by == 'sender' ? 'DDP' : 'DDU');
    const declared_value = (options?.declared_value || shipment.customs?.duty?.declared_value);
    const account_number = (shipment.customs?.duty?.account_number || shipment.payment?.account_number);
    const commodities = isNone(changes.parcels) ? shipment.customs?.commodities : getShipmentCommodities({ parcels } as any);

    const customs: any = {
      ...DEFAULT_CUSTOMS_CONTENT,
      ...(shipment.customs || {}),
      ...(incoterm ? { incoterm } : {}),
      commodities,
      duty: {
        ...DEFAULT_CUSTOMS_CONTENT.duty,
        ...(shipment.customs?.duty || {}),
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
      return await updateLabelData(changes);
    } else {
      return await mutation.updateShipment.mutateAsync(
        { id: shipment.id, ...changes } as PartialShipmentMutationInput
      );
    }
  };
  const addParcel = async (data: ParcelType) => {
    if (isDraft(shipment.id)) {
      const update = { ...shipment, parcels: [...shipment.parcels, data] };
      await updateShipment(update);
    } else {
      const update = { id: shipment.id, parcels: [...shipment.parcels, data] };
      await mutation.updateShipment.mutateAsync(update as any);
    }
  };
  const updateParcel = (parcel_index: number, parcel_id?: string) => async ({ id, ...data }: ParcelType) => {
    if (parcelHasRateUpdateChanges(shipment.parcels[parcel_index], data)) {
      setUpdateRate(true);
    }

    if (isDraft(shipment.id)) {
      const update = {
        ...shipment, parcels: shipment.parcels.map(
          (parcel, index) => index === parcel_index ? data : parcel
        )
      } as ShipmentType;
      updateShipment(update);
    } else {
      const update = { id: shipment.id, parcels: [{ id: parcel_id || id, ...data }] };
      await mutation.updateShipment.mutateAsync(update as any);
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
        ...shipment, parcels: shipment.parcels.filter(
          (_, index) => index !== parcel_index
        )
      } as ShipmentType;
      updateShipment(update);
    } else {
      await mutation.discardParcel.mutateAsync({ id: parcel_id as string });
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
      await mutation.discardCommodity.mutateAsync({ id: item_id as string });
    }
  };
  const updateCustoms = (customs_id?: string) => async (data: CustomsType | null) => {
    if (isDraft(shipment.id)) {
      const update = { ...shipment, customs: data } as ShipmentType;
      updateShipment(update);
    } else if (data === null) {
      await mutation.discardCustoms.mutateAsync({ id: customs_id as string });
    } else {
      const update = { id: shipment.id, customs: { ...data, id: customs_id || data.id } };
      await mutation.updateShipment.mutateAsync(update as any);
    }
  };

  // requests
  const fetchRates = async () => {
    try {
      loader.setLoading(true);
      const { data: { rates, messages } } = await mutation.fetchRates.mutateAsync(shipment);
      updateShipment({ rates, messages } as Partial<ShipmentType>);
    } catch (message: any) {
      updateShipment({ rates: [], messages: [message] } as Partial<ShipmentType>);
    }
    loader.setLoading(false);
  };
  const buyLabel = async (rate: ShipmentType['rates'][0]) => {
    const selection = (
      isDraft(shipment.id)
        ? { service: rate.service, carrier_ids: [rate.carrier_id] }
        : { selected_rate_id: rate.id }
    );
    try {
      loader.setLoading(true);
      const { data: { id } } = await mutation.buyLabel.mutateAsync({ ...shipment, ...selection } as ShipmentType);
      notifier.notify({ type: NotificationType.success, message: 'Label successfully purchased!' });
      router.push(`${basePath}/shipments/${id}`);
    } catch (message: any) {
      console.error(message);
      updateShipment({ messages: [message] } as Partial<ShipmentType>);
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
  React.useEffect(() => { }, [])

  return {
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
  };
}
