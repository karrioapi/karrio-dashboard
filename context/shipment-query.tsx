import React, { useContext, useState } from 'react';
import { Address, Parcel, Shipment } from '@/api/index';
import { handleFailure } from '@/lib/helper';
import { RequestError } from '@/lib/types';
import { RestContext } from '@/client/context';

const DEFAULT_SHIPMENT_DATA = {
  shipper: {} as Address,
  recipient: {} as Address,
  parcels: [] as Parcel[],
  options: {}
} as Shipment;

type LabelDataContext = {
  shipment: Shipment;
  loading: boolean;
  error?: RequestError;
  loadShipment: (id?: string) => Promise<Shipment>;
  updateShipment: (data: Partial<Shipment>) => void;
};

export const LabelData = React.createContext<LabelDataContext>({} as LabelDataContext);

const LabelDataQuery: React.FC = ({ children }) => {
  const purplship = useContext(RestContext);
  const [error, setError] = useState<RequestError>();
  const [shipment, setValue] = useState<Shipment>(DEFAULT_SHIPMENT_DATA);
  const [loading, setLoading] = useState<boolean>(false);

  const loadShipment = async (id?: string) => {
    setError(undefined);
    setLoading(true);

    return new Promise<Shipment>(async (resolve) => {
      if (id === 'new') {
        setValue(DEFAULT_SHIPMENT_DATA);
        setLoading(false);
        return resolve(DEFAULT_SHIPMENT_DATA);
      }

      await handleFailure(
        (purplship as any).shipments.retrieve(id as string)
      )
        .then(r => { setValue(r as any); resolve(r as any); })
        .catch(e => { setError(e); setValue({} as Shipment); })
        .then(() => setLoading(false));
    });
  };
  const updateShipment = (data: Partial<Shipment>) => {
    const new_state = { ...shipment, ...data };
    Object.entries(data).forEach(([key, val]) => {
      if (val === undefined) delete new_state[key as keyof Shipment];
    });
    setValue(new_state);
  };

  return (
    <LabelData.Provider value={{
      shipment,
      error,
      loading,
      loadShipment,
      updateShipment
    }}>
      {children}
    </LabelData.Provider>
  );
};

export default LabelDataQuery;
