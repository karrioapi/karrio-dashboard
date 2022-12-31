import { AddressType, Collection, CommodityType, CustomsType, NotificationType, ParcelType, ShipmentType } from "@/lib/types";
import { errorToMessages, getShipmentCommodities, gqlstr, isEqual, isNone, isNoneOrEmpty, onError, request, useLocation, useSessionHeader } from "@/lib/helper";
import { get_shipment_data, GET_SHIPMENT_DATA, LabelTypeEnum, PaidByEnum } from "@karrio/graphql";
import { DEFAULT_CUSTOMS_CONTENT } from "@/components/form-parts/customs-info-form";
import { useShipmentMutation } from "@/context/shipment";
import { useNotifier } from "@/components/notifier";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppMode } from "@/context/app-mode";
import { useLoader } from "@/components/loader";
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

type ChangeType = {
  deleted?: boolean,
  created?: boolean,
  manuallyUpdated?: boolean,
};


function reducer(state: any, { name, value }: { name: string, value: Partial<ShipmentType> | ShipmentType }): ShipmentType {
  switch (name) {
    case "full":
      return { ...(value as ShipmentType) };
    default:
      let newState = { ...state, ...(value as Partial<ShipmentType>) } as ShipmentType;
      Object.entries(value).forEach(([key, val]) => {
        if (val === undefined) delete newState[key as keyof ShipmentType];
      });
      return { ...state, ...(newState as ShipmentType) };
  }
}


export function useLabelData(id: string) {
  const headers = useSessionHeader();
  const mutation = useShipmentMutation();
  const [shipment, dispatch] = React.useReducer(reducer, DEFAULT_SHIPMENT_DATA);

  // Queries
  const query = useQuery({
    queryKey: ['label', id],
    queryFn: () => (
      id === 'new'
        ? { shipment }
        : request<get_shipment_data>(gqlstr(GET_SHIPMENT_DATA), { variables: { id }, ...headers() })
    ),
    enabled: !!id,
  });
  const updateLabelData = (data: Partial<ShipmentType> = {}) => {
    dispatch({ name: "partial", value: data });
  };

  React.useEffect(() => {
    if (id !== 'new' && isEqual(shipment, DEFAULT_SHIPMENT_DATA) && !isNone(query.data?.shipment)) {
      dispatch({ name: "full", value: query!.data!.shipment as ShipmentType })
    }
  }, [query.data?.shipment])

  return {
    query,
    mutation,
    updateLabelData,
    shipment: shipment as ShipmentType,
  };
}


export function useLabelDataMutation(id: string) {
  const loader = useLoader();
  const router = useLocation();
  const notifier = useNotifier();
  const { basePath } = useAppMode();
  const { mutation, ...state } = useLabelData(id);
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
  const updateShipment = async (changes: Partial<ShipmentType>, change: ChangeType = { manuallyUpdated: false }) => {
    if (shouldFetchRates(changes as any)) { setUpdateRate(true); }
    changes = { ...syncOptionsChanges(changes) };
    changes = { ...syncCustomsChanges(changes) };

    if (
      // always update local state if it is a new draft
      isDraft(state.shipment.id) ||
      // only update local state first if it is not a draft and no new object is created or deleted.
      (!isDraft(state.shipment.id) && !change.created && !change.deleted && !change.manuallyUpdated)
    ) {
      console.log("local update", change)
      state.updateLabelData({ ...state.shipment, ...changes });
    }

    // if it is not a draft and hasn't been manually updated already
    if (!isDraft(state.shipment.id) && !change.manuallyUpdated) {
      try {
        const { status, rates, messages, service, carrier_ids, ...data } = changes;
        if (Object.keys(data).length === 0) return; // abort if no data changes

        console.log("server state update", change)
        await mutation.updateShipment.mutateAsync({ id: state.shipment.id, ...data } as any)
          .then(({ partial_shipment_update: { shipment } }) => {
            if ((change.created || change.deleted) && shipment) {
              const { messages, rates, ...value } = shipment;
              state.updateLabelData(value as any);
            }
          });
      } catch (error: any) {
        updateShipment({ messages: errorToMessages(error) });
      }
    }
  };
  const addParcel = async (data: ParcelType) => {
    const update = { parcels: [...state.shipment.parcels, data] };
    updateShipment(update, { created: true });
  };
  const updateParcel = (parcel_index: number, parcel_id?: string) => async (data: ParcelType, change?: ChangeType) => {
    if (parcelHasRateUpdateChanges(state.shipment.parcels[parcel_index], data)) {
      setUpdateRate(true);
    }

    const update = {
      parcels: state.shipment.parcels.map((parcel, index) => (
        (parcel.id === parcel_id || index === parcel_index) ? data : parcel
      ))
    };
    updateShipment(update as any, change);
  };
  const addItems = (parcel_index: number, parcel_id?: string) => async (items: CommodityType[]) => {
    const ts = Date.now();
    const parcel = (
      state.shipment.parcels.find(({ id }) => id === parcel_id) || state.shipment.parcels[parcel_index]
    );
    const indexes = new Set((state.shipment.parcels[parcel_index].items || []).map(
      (item, index) => item.parent_id || item.id || item.sku || item.hs_code || `${index}`)
    );
    const item_collection: Collection<CommodityType & { quantity: number }> = items.reduce(
      (acc, item, index) => ({ ...acc, [item.parent_id || item.id || item.sku || item.hs_code || `${ts}${index}`]: item }), {}
    )
    const update = {
      ...parcel, items: [
        ...(parcel.items || []).map((item, index) => {
          const _ref = item.parent_id || item.sku || item.hs_code || `${index}`;
          return ((_ref && Object.keys(item_collection).includes(_ref))
            ? { ...item, quantity: (item.quantity || 0) + item_collection[_ref].quantity }
            : item
          )
        }),
        ...items.filter((item, index) => !indexes.has(item.parent_id || item.sku || item.hs_code || `${ts}${index}`))
      ]
    };

    updateParcel(parcel_index, parcel_id)(update, { created: true });
  };
  const updateItem = (parcel_index: number, item_index: number, parcel_id?: string, item_id?: string) =>
    async ({ id, ...data }: CommodityType) => {
      const parcel = (
        state.shipment.parcels.find(({ id }) => id === parcel_id) || state.shipment.parcels[parcel_index]
      );
      const update = {
        ...parcel,
        items: parcel.items.map(
          (item, index) => (index !== item_index ? item : { ...item, ...data })
        )
      };

      updateParcel(parcel_index, parcel_id)(update);
    };
  const removeParcel = (parcel_index: number, parcel_id?: string) => async () => {
    const update = {
      parcels: state.shipment.parcels.filter((_, index) => index !== parcel_index)
    };

    if (!isDraft(state.shipment.id) && !!parcel_id) {
      await mutation.discardParcel.mutateAsync({ id: parcel_id as string });
    }

    updateShipment(update, { deleted: true });
    setUpdateRate(true);
  };
  const removeItem = (parcel_index: number, item_index: number, item_id?: string) => async () => {
    const parcel = state.shipment.parcels[parcel_index];
    const update = {
      ...parcel,
      items: parcel.items.filter((_, index) => index !== item_index)
    };

    if (!isDraft(state.shipment.id) && !!item_id) {
      await mutation.discardCommodity.mutateAsync({ id: item_id as string });
    }

    updateParcel(parcel_index)(update as ParcelType, { deleted: true });
  };
  const updateCustoms = (customs_id?: string) => async (data: CustomsType | null) => {
    if (!isDraft(state.shipment.id) && !!customs_id && data === null) {
      await mutation.discardCustoms.mutateAsync({ id: customs_id as string });
    }

    updateShipment({ customs: data });
  };

  // requests
  const fetchRates = async () => {
    const { messages, rates, ...data } = state.shipment;

    try {
      loader.setLoading(true);
      const { rates, messages } = await mutation.fetchRates.mutateAsync(data as ShipmentType);
      updateShipment({ rates, messages } as Partial<ShipmentType>);
    } catch (error: any) {
      updateShipment({ rates: [], messages: errorToMessages(error) } as Partial<ShipmentType>);
    }
    loader.setLoading(false);
  };
  const buyLabel = async (rate: ShipmentType['rates'][0]) => {
    const { messages, rates, ...data } = state.shipment;
    const selection = (
      isDraft(state.shipment.id)
        ? { service: rate.service, carrier_ids: [rate.carrier_id] }
        : { selected_rate_id: rate.id }
    );

    try {
      loader.setLoading(true);
      const { id } = await mutation.buyLabel.mutateAsync({ ...data, ...selection } as any);
      notifier.notify({ type: NotificationType.success, message: 'Label successfully purchased!' });
      router.push(`${basePath}/shipments/${id}`);
    } catch (error: any) {
      updateShipment({ messages: errorToMessages(error) }, { manuallyUpdated: true });
    } finally {
      loader.setLoading(false);
    }
  };
  const saveDraft = async () => {
    const { ...data } = state.shipment;

    try {
      loader.setLoading(true);
      const { id } = (
        isDraft(state.shipment.id)
          ? await mutation.createShipment.mutateAsync(data as ShipmentType)
          : state.shipment
      );
      notifier.notify({ type: NotificationType.success, message: 'Draft successfully saved!' });
      router.push(`${basePath}/create_label?shipment_id=${id}`);
    } catch (error: any) {
      updateShipment({ messages: errorToMessages(error) } as Partial<ShipmentType>);
    }
    loader.setLoading(false);
  };

  React.useEffect(() => {
    if (updateRate && hasRateRequirements(state.shipment)) {
      setUpdateRate(false);
      fetchRates();
    }
  }, [state.shipment]);

  return {
    state,
    addItems,
    addParcel,
    buyLabel,
    fetchRates,
    updateItem,
    updateParcel,
    updateShipment,
    updateCustoms,
    removeParcel,
    removeItem,
    saveDraft,
  };
}
