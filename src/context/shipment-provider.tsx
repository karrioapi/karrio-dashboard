import React, { useContext, useState } from 'react';
import { handleFailure } from '@/lib/helper';
import { AddressType, ParcelType, RequestError, ShipmentType } from '@/lib/types';
import { RestContext } from '@/client/context';
import { PurplshipClient } from '@purplship/rest';

const DEFAULT_SHIPMENT_DATA = {
  shipper: {} as AddressType,
  recipient: {} as AddressType,
  parcels: [] as ParcelType[],
  options: {}
} as ShipmentType;

type LabelDataContext = {
  shipment: ShipmentType;
  loading: boolean;
  called: boolean;
  error?: RequestError;
  loadShipment: (id?: string) => Promise<ShipmentType>;
  updateShipment: (data: Partial<ShipmentType>) => Promise<ShipmentType>;
};

export const LabelData = React.createContext<LabelDataContext>({} as LabelDataContext);

const ShipmentProvider: React.FC = ({ children }) => {
  const purplship = useContext(RestContext);
  const [error, setError] = useState<RequestError>();
  const [shipment, setValue] = useState<ShipmentType>(DEFAULT_SHIPMENT_DATA);
  const [loading, setLoading] = useState<boolean>(false);
  const [called, setCalled] = useState<boolean>(false);

  const loadShipment = async (id?: string) => {
    setError(undefined);
    setLoading(true);
    setCalled(true);

    return new Promise<ShipmentType>(async (resolve) => {
      if (id === 'new') {
        setValue(DEFAULT_SHIPMENT_DATA);
        setLoading(false);
        return resolve(DEFAULT_SHIPMENT_DATA);
      }

      await handleFailure(
        (purplship as PurplshipClient).shipments.retrieve({ id: id as string }),
      )
        .then(r => { setValue(r as any); resolve(r as any); })
        .catch(e => { setError(e); setValue({} as ShipmentType); })
        .then(() => setLoading(false));
    });
  };
  const updateShipment = async (data: Partial<ShipmentType>) => {
    const newState = { ...shipment, ...data } as ShipmentType;
    Object.entries(data).forEach(([key, val]) => {
      if (val === undefined) delete newState[key as keyof ShipmentType];
    });
    setValue(newState);

    return newState;
  };

  return (
    <LabelData.Provider value={{
      shipment,
      error,
      called,
      loading,
      loadShipment,
      updateShipment
    }}>
      {purplship && children}
    </LabelData.Provider>
  );
};

export default ShipmentProvider;
