import React, { useEffect, useState } from 'react';
import { AddressType, ParcelType, ShipmentType } from '@/lib/types';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_shipment, GET_SHIPMENT, get_shipmentVariables, LabelTypeEnum } from 'karrio/graphql';
import { debounce, isNoneOrEmpty } from '@/lib/helper';

const DEFAULT_SHIPMENT_DATA = {
  shipper: {} as AddressType,
  recipient: {} as AddressType,
  parcels: [] as ParcelType[],
  options: {},
  label_type: LabelTypeEnum.PDF
} as ShipmentType;

type LabelDataContext = LazyQueryResult<get_shipment, get_shipmentVariables> & {
  shipment: ShipmentType;
  loadShipment: (id: string) => void;
  updateShipment: (data: Partial<ShipmentType>) => ShipmentType;
};

export const LabelContext = React.createContext<LabelDataContext>({} as LabelDataContext);

const LabelDataProvider: React.FC = ({ children }) => {
  const [load, { fetchMore, ...result }] = useLazyQuery<get_shipment, get_shipmentVariables>(GET_SHIPMENT, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [shipment, setShipment] = useState<ShipmentType>(DEFAULT_SHIPMENT_DATA);
  const [state, setState] = useState<any>({});

  const fetch = debounce((id: string) => {
    (result.called ? fetchMore : load)({ variables: { id } })
  });
  const loadShipment = (id: string) => {
    if (isNoneOrEmpty(id)) return;
    if (id === 'new') {
      setShipment(DEFAULT_SHIPMENT_DATA);
      setState({ ...result, loading: false, called: true });
    } else {
      fetch(id);
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
  }, [result.data?.shipment]);

  return (
    <LabelContext.Provider value={{
      ...result,
      shipment,
      loadShipment,
      updateShipment,
      ...state,
    }}>
      {children}
    </LabelContext.Provider>
  );
};

export function useLabelData() {
  return React.useContext(LabelContext);
}

export default LabelDataProvider;
