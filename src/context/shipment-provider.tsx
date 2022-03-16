import React, { useEffect, useState } from 'react';
import { ShipmentType } from '@/lib/types';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_shipment, GET_SHIPMENT, get_shipmentVariables } from 'karrio/graphql';

type ShipmentContextContext = LazyQueryResult<get_shipment, get_shipmentVariables> & {
  shipment?: ShipmentType;
  loadShipment: (id: string) => Promise<any>;
};

export const ShipmentContext = React.createContext<ShipmentContextContext>({} as ShipmentContextContext);

const ShipmentProvider: React.FC = ({ children }) => {
  const [load, { fetchMore, ...result }] = useLazyQuery<get_shipment, get_shipmentVariables>(GET_SHIPMENT, {
    notifyOnNetworkStatusChange: true,
  });
  const [shipment, setShipment] = useState<ShipmentType>();

  const loadShipment = (id: string) => load({ variables: { id } });

  useEffect(() => {
    result.data?.shipment && setShipment(result.data?.shipment as ShipmentType);
  }, [result.data?.shipment]);

  return (
    <ShipmentContext.Provider value={{
      ...result,
      shipment,
      fetchMore,
      loadShipment,
    }}>
      {children}
    </ShipmentContext.Provider>
  );
};

export default ShipmentProvider;
