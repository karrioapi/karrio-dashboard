import React, { useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_order, GET_ORDER, get_orderVariables, get_order_order } from '@purplship/graphql';


type Order = get_order_order;
export type OrderResultType = LazyQueryResult<get_order, get_orderVariables> & {
  order?: Order;
  loadOrder: (id: string) => void;
  setOrder: React.Dispatch<React.SetStateAction<get_order_order | undefined>>;
};

export const Order = React.createContext<OrderResultType>({} as OrderResultType);

const OrderProvider: React.FC = ({ children }) => {
  const [load, result] = useLazyQuery<get_order, get_orderVariables>(GET_ORDER, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const [order, setOrder] = useState<Order>();

  const loadOrder = (id: string) => load({ variables: { id } });

  useEffect(() => { setOrder(result.data?.order as Order); }, [result]);

  return (
    <Order.Provider value={{
      order,
      setOrder,
      loadOrder,
      ...result
    }}>
      {children}
    </Order.Provider>
  );
};

export default OrderProvider;
