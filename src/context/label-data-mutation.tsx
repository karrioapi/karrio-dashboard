import React, { useEffect } from 'react';
import { CommodityType, CustomsType, NotificationType, ParcelType, ShipmentType } from '@/lib/types';
import { useShipmentMutation } from '@/context/shipment-mutation';
import { PartialShipmentUpdateInput } from 'karrio/graphql';
import { useLabelData } from '@/context/label-data-provider';
import { useAppMode } from '@/context/app-mode-provider';
import { useNotifier } from '@/components/notifier';
import { useLoader } from '@/components/loader';
import { isNone, isNoneOrEmpty, useLocation } from '@/lib/helper';

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
  updateShipment: (changes: Partial<ShipmentType>) => Promise<void>;
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

  const isDraft = (id?: string) => isNoneOrEmpty(id) || id === 'new';
  const hasChanged = (changes: ShipmentType) => {
    const currentWeight = shipment.parcels.reduce((acc, parcel) => acc + (parcel.weight || 0), 0);
    const newWeight = (changes.parcels || []).reduce((acc, parcel) => acc + (parcel.weight || 0), 0);

    return (
      (!isNone(changes.parcels) && currentWeight !== newWeight) ||

      (!isNone(changes.shipper) && shipment.shipper.address_line1 !== changes.shipper.address_line1) ||
      (!isNone(changes.shipper) && shipment.shipper.country_code !== changes.shipper.country_code) ||
      (!isNone(changes.shipper) && shipment.shipper.city !== changes.shipper.city) ||

      (!isNone(changes.recipient) && shipment.recipient.address_line1 !== changes.recipient.address_line1) ||
      (!isNone(changes.recipient) && shipment.recipient.country_code !== changes.recipient.country_code) ||
      (!isNone(changes.recipient) && shipment.recipient.city !== changes.recipient.city)
    );
  };

  const updateShipment = async ({ id, ...changes }: Partial<ShipmentType>) => {
    if (hasChanged(changes as any)) { setUpdateRate(true); }
    if (isDraft(id)) {
      await label.updateShipment(changes);
    } else {
      await mutation.updateShipment(
        { id: shipment.id, ...changes } as PartialShipmentUpdateInput
      );
    }
  };
  const addParcel = async (data: ParcelType) => {
    if (isDraft(shipment.id)) {
      const update = { ...shipment, parcels: [...shipment.parcels, data] };
      await updateShipment(update);
    } else {
      const update = { id: shipment.id, parcels: [...shipment.parcels, data] };
      await mutation.updateShipment(update);
    }
  };
  const updateParcel = (parcel_index: number, parcel_id?: string) => async ({ id, ...data }: ParcelType) => {
    if (isDraft(shipment.id)) {
      const update = {
        ...shipment, parcels: shipment.parcels.map(
          (parcel, index) => index === parcel_index ? data : parcel
        )
      } as ShipmentType;
      updateShipment(update);
    } else {
      const update = { id: shipment.id, parcels: [{ id: parcel_id || id, ...data }] };
      await mutation.updateShipment(update);
    }
  };
  const addItems = (parcel_index: number, parcel_id?: string) => async (items: CommodityType[]) => {
    if (isDraft(shipment.id)) {
      updateParcel(parcel_index)({
        ...shipment.parcels[parcel_index],
        items: [...(shipment.parcels[parcel_index].items || []), ...items]
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
      const update = { ...shipment, customs: data } as ShipmentType;
      updateShipment(update);
    } else if (data === null) {
      await mutation.discardCustoms(customs_id as string);
    } else {
      const update = { id: shipment.id, customs: { ...data, id: customs_id || data.id } };
      await mutation.updateShipment(update);
    }
  };
  const fetchRates = async () => {
    try {
      loader.setLoading(true);
      const { rates, messages } = await mutation.fetchRates(shipment);
      updateShipment({ rates, messages } as Partial<ShipmentType>);
    } catch (message: any) {
      updateShipment({ rates: [], messages: message } as Partial<ShipmentType>);
      notifier.notify({ type: NotificationType.error, message });
    }
    loader.setLoading(false);
  };
  const buyLabel = async (rate: ShipmentType['rates'][0]) => {
    const selection = isDraft(shipment.id) ? { service: rate.service } : { selecte_rate_id: rate.id };
    try {
      loader.setLoading(true);
      await mutation.buyLabel({
        ...shipment,
        ...selection
      } as ShipmentType);
      notifier.notify({
        type: NotificationType.success,
        message: 'Label successfully purchased!'
      });
      router.push(basePath);
    } catch (message: any) {
      notifier.notify({ type: NotificationType.error, message });
    } finally {
      loader.setLoading(false);
    }
  };

  React.useEffect(() => {
    if (updateRate) {
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
