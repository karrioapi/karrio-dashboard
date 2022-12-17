import { errorToMessages, getShipmentCommodities, gqlstr, isNone, isNoneOrEmpty, onError, request, useLocation, useSessionHeader } from "@/lib/helper";
import { GET_SHIPMENT, get_shipment, get_shipment_shipment, LabelTypeEnum, PaidByEnum, PartialShipmentMutationInput } from "@karrio/graphql";
import { AddressType, Collection, CommodityType, CustomsType, NotificationType, ParcelType, ShipmentType } from "@/lib/types";
import { DEFAULT_CUSTOMS_CONTENT } from "@/components/form-parts/customs-info-form";
import { useShipmentMutation } from "@/context/shipment";
import { useNotifier } from "@/components/notifier";
import { useQuery } from "@tanstack/react-query";
import { useLoader } from "@/components/loader";
import { useAppMode } from "@/context/app-mode";
import moment from "moment";
import React from "react";

const DEFAULT_SHIPMENT_DATA = {
  shipper: {} as AddressType,
  recipient: {} as AddressType,
  parcels: [] as ParcelType[],
  options: { shipment_date: moment().format('YYYY-MM-DD') },
  payment: { paid_by: PaidByEnum.sender },
  label_type: LabelTypeEnum.PDF
} as ShipmentType;


export function useLabelData(id: string) {
  const headers = useSessionHeader();
  const [shipment, setShipment] = React.useState<get_shipment_shipment>(DEFAULT_SHIPMENT_DATA);

  // Queries
  const query = useQuery(['shipments', id], {
    queryFn: () => {
      if (id === 'new') return { shipment };
      return request<get_shipment>(gqlstr(GET_SHIPMENT), { variables: { id }, ...headers() })
        .then(_ => { updateLabelData(_?.shipment as any); return _; })
    },
    onError
  });
  const updateLabelData = (data: Partial<ShipmentType> = {}) => {
    return new Promise<ShipmentType>(resolve => {
      setTimeout(() => {
        let newState = { ...shipment, ...data } as ShipmentType;
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
  const state = useLabelData(id);

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
      (!isNone(changes.shipper) && state.shipment.shipper.address_line1 !== changes.shipper.address_line1) ||
      (!isNone(changes.shipper) && state.shipment.shipper.country_code !== changes.shipper.country_code) ||
      (!isNone(changes.shipper) && state.shipment.shipper.city !== changes.shipper.city) ||

      (!isNone(changes.recipient) && state.shipment.recipient.address_line1 !== changes.recipient.address_line1) ||
      (!isNone(changes.recipient) && state.shipment.recipient.country_code !== changes.recipient.country_code) ||
      (!isNone(changes.recipient) && state.shipment.recipient.city !== changes.recipient.city)
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
    let options = changes.options || state.shipment.options || {};
    const parcels = changes.parcels || state.shipment.parcels;

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

    if (declared_value > 0 && declared_value !== state.shipment.options.declared_value) {
      options = { ...options, declared_value };
    }

    if (!isNone(currency) && currency !== state.shipment.options.currency) {
      options = { ...options, currency };
    }

    return { ...changes, options };
  };
  const syncCustomsChanges = (changes: Partial<ShipmentType>): Partial<ShipmentType> => {
    const shipper = changes.shipper || state.shipment.shipper;
    const recipient = changes.recipient || state.shipment.recipient;
    const isIntl = (
      (!isNone(shipper?.country_code) && !isNone(recipient?.country_code)) &&
      (shipper.country_code !== recipient.country_code)
    );

    const parcels = changes.parcels || state.shipment.parcels;
    const isDocument = parcels.every(p => p.is_document);
    const requireCustoms = isIntl && !isDocument;
    const hasCustomsChanges = !isNone(changes.customs);
    const hasParcelsChanges = !isNone(changes.parcels);
    const customsExists = !isNone(state.shipment.customs);

    let skip = !requireCustoms;
    if (!requireCustoms && customsExists) skip = false;
    if (requireCustoms && hasCustomsChanges) skip = true;
    if (requireCustoms && !hasCustomsChanges && hasParcelsChanges) skip = false;

    if (skip) return changes;
    if (isDocument) return { ...changes, customs: null };
    if (!isIntl) return { ...changes, customs: undefined };

    const options = changes.options || state.shipment.options;
    const currency = (state.shipment.customs?.duty?.currency || options?.currency);
    const paid_by = (state.shipment.customs?.duty?.paid_by || state.shipment.payment?.paid_by);
    const incoterm = (state.shipment.customs?.incoterm || (paid_by == 'sender' ? 'DDP' : 'DDU'));
    const declared_value = (options?.declared_value || state.shipment.customs?.duty?.declared_value);
    const account_number = (state.shipment.customs?.duty?.account_number || state.shipment.payment?.account_number);
    const commodities = isNone(changes.parcels) ? state.shipment.customs?.commodities : getShipmentCommodities({ parcels } as any);

    const customs: any = {
      ...(state.shipment.customs || DEFAULT_CUSTOMS_CONTENT),
      ...(incoterm ? { incoterm } : {}),
      commodities,
      duty: {
        ...(state.shipment.customs?.duty || DEFAULT_CUSTOMS_CONTENT.duty),
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
      return await state.updateLabelData(changes);
    } else {
      return await mutation.updateShipment.mutateAsync(
        { id: state.shipment.id, ...changes } as PartialShipmentMutationInput
      );
    }
  };
  const addParcel = async (data: ParcelType) => {
    if (isDraft(state.shipment.id)) {
      const update = { ...state.shipment, parcels: [...state.shipment.parcels, data] };
      await updateShipment(update);
    } else {
      const update = { id: state.shipment.id, parcels: [...state.shipment.parcels, data] };
      await mutation.updateShipment.mutateAsync(update as any);
    }
  };
  const updateParcel = (parcel_index: number, parcel_id?: string) => async ({ id, ...data }: ParcelType) => {
    if (parcelHasRateUpdateChanges(state.shipment.parcels[parcel_index], data)) {
      setUpdateRate(true);
    }

    if (isDraft(state.shipment.id)) {
      const update = {
        ...state.shipment, parcels: state.shipment.parcels.map(
          (parcel, index) => index === parcel_index ? data : parcel
        )
      } as ShipmentType;
      updateShipment(update);
    } else {
      const update = { id: state.shipment.id, parcels: [{ id: parcel_id || id, ...data }] };
      await mutation.updateShipment.mutateAsync(update as any);
    }
  };
  const addItems = (parcel_index: number, parcel_id?: string) => async (items: CommodityType[]) => {
    if (isDraft(state.shipment.id)) {
      const ts = Date.now();
      const indexes = new Set((state.shipment.parcels[parcel_index].items || []).map(
        (item, index) => item.parent_id || item.id || item.sku || item.hs_code || `${index}`)
      );
      const item_collection: Collection<CommodityType & { quantity: number }> = items.reduce(
        (acc, item, index) => ({ ...acc, [item.parent_id || item.id || item.sku || item.hs_code || `${ts}${index}`]: item }), {}
      )

      updateParcel(parcel_index)({
        ...state.shipment.parcels[parcel_index],
        items: [
          ...(state.shipment.parcels[parcel_index].items || []).map((item, index) => {
            const _ref = item.parent_id || item.sku || item.hs_code || `${index}`;
            return ((_ref && Object.keys(item_collection).includes(_ref))
              ? { ...item, quantity: (item.quantity || 0) + item_collection[_ref].quantity }
              : item
            )
          }),
          ...items.filter((item, index) => !indexes.has(item.parent_id || item.sku || item.hs_code || `${ts}${index}`))
        ]
      });
    } else {
      await updateParcel(parcel_index, parcel_id)({ items } as ParcelType);
    }
  };
  const updateItem = (parcel_index: number, item_index: number, parcel_id?: string, item_id?: string) =>
    async ({ id, ...data }: CommodityType) => {
      if (isDraft(state.shipment.id)) {
        updateParcel(parcel_index)({
          ...state.shipment.parcels[parcel_index],
          items: state.shipment.parcels[parcel_index].items.map(
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
    if (isDraft(state.shipment.id)) {
      const update = {
        ...state.shipment, parcels: state.shipment.parcels.filter(
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
    if (isDraft(state.shipment.id)) {
      updateParcel(parcel_index)({
        ...state.shipment.parcels[parcel_index],
        items: state.shipment.parcels[parcel_index].items.filter(
          (_, index) => index !== item_index
        )
      } as ParcelType);
    } else {
      await mutation.discardCommodity.mutateAsync({ id: item_id as string });
    }
  };
  const updateCustoms = (customs_id?: string) => async (data: CustomsType | null) => {
    if (isDraft(state.shipment.id)) {
      const update = { ...state.shipment, customs: data } as ShipmentType;
      updateShipment(update);
    } else if (data === null) {
      await mutation.discardCustoms.mutateAsync({ id: customs_id as string });
    } else {
      const update = { id: state.shipment.id, customs: { ...data, id: customs_id || data.id } };
      await mutation.updateShipment.mutateAsync(update as any);
    }
  };

  // requests
  const fetchRates = async () => {
    try {
      loader.setLoading(true);
      const { rates, messages } = await mutation.fetchRates.mutateAsync(state.shipment);
      updateShipment({ rates, messages } as Partial<ShipmentType>);
    } catch (error: any) {
      updateShipment({ rates: [], messages: errorToMessages(error) } as Partial<ShipmentType>);
    }
    loader.setLoading(false);
  };
  const buyLabel = async (rate: ShipmentType['rates'][0]) => {
    const { messages, ...data } = state.shipment;
    const selection = (
      isDraft(state.shipment.id)
        ? { service: rate.service, carrier_ids: [rate.carrier_id] }
        : { selected_rate_id: rate.id }
    );
    try {
      loader.setLoading(true);
      const { id } = await mutation.buyLabel.mutateAsync({ ...data, ...selection } as ShipmentType);
      notifier.notify({ type: NotificationType.success, message: 'Label successfully purchased!' });
      router.push(`${basePath}/shipments/${id}`);
    } catch (error: any) {
      updateShipment({ messages: errorToMessages(error) } as Partial<ShipmentType>);
    } finally {
      loader.setLoading(false);
    }
  };

  React.useEffect(() => {
    if (updateRate && hasRateRequirements(state.shipment)) {
      setUpdateRate(false);
      fetchRates();
    }
  }, [state.shipment]);

  return {
    state,
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
