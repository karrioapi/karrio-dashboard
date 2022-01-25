import React, { useEffect, useState } from 'react';
import { AddressType, ParcelType, ShipmentType } from '@/lib/types';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_shipment, GET_SHIPMENT, get_shipmentVariables } from '@purplship/graphql';

const DEFAULT_SHIPMENT_DATA = {
  shipper: {} as AddressType,
  recipient: {} as AddressType,
  parcels: [] as ParcelType[],
  options: {}
} as ShipmentType;

type LabelDataContext = LazyQueryResult<get_shipment, get_shipmentVariables> & {
  shipment: ShipmentType;
  loadShipment: (id: string) => void;
  updateShipment: (data: Partial<ShipmentType>) => ShipmentType;
};

export const LabelData = React.createContext<LabelDataContext>({} as LabelDataContext);

const ShipmentProvider: React.FC = ({ children }) => {
  const [load, { fetchMore, ...result }] = useLazyQuery<get_shipment, get_shipmentVariables>(GET_SHIPMENT, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const [shipment, setShipment] = useState<ShipmentType>(DEFAULT_SHIPMENT_DATA);
  const [state, setState] = useState<any>({});

  const loadShipment = (id: string) => {
    if (id === 'new') {
      setShipment(DEFAULT_SHIPMENT_DATA);
      setState({ ...result, loading: false, called: true });
    } else {
      (fetchMore || load)({ variables: { id } });
    }
  };
  const updateShipment = (data: Partial<ShipmentType>) => {
    const newState = { ...shipment, ...data } as ShipmentType;
    Object.entries(data).forEach(([key, val]) => {
      if (val === undefined) delete newState[key as keyof ShipmentType];
    });
    setShipment(newState);
    return newState;
  };

  useEffect(() => {
    result.data?.shipment && setShipment(result.data?.shipment as ShipmentType);
  }, [result]);

  return (
    <LabelData.Provider value={{
      ...result,
      shipment,
      loadShipment,
      updateShipment,
      ...state,
    }}>
      {children}
    </LabelData.Provider>
  );
};

export default ShipmentProvider;
