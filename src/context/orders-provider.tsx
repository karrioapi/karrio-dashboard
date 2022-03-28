import React, { useContext, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_orders, GET_ORDERS, get_orders_orders_edges, get_ordersVariables } from 'karrio/graphql';
import { OrderType } from '@/lib/types';
import { isNoneOrEmpty, useLocation } from '@/lib/helper';
import { AppMode } from '@/context/app-mode-provider';
import { APIReference } from './references-provider';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export interface OrdersFilterType extends get_ordersVariables { };
type Edges = (get_orders_orders_edges | null)[];
type OrdersType = LazyQueryResult<get_orders, OrdersFilterType> & {
  orders: OrderType[];
  next?: number | null;
  previous?: number | null;
  variables: OrdersFilterType;
  load: (options?: OrdersFilterType) => Promise<any>;
  loadMore: (options?: OrdersFilterType) => Promise<any>;
};

export const OrdersContext = React.createContext<OrdersType>({} as OrdersType);

const OrdersProvider: React.FC<{ setVariablesToURL?: boolean }> = ({ children, setVariablesToURL = false }) => {
  const { insertUrlParam } = useLocation();
  const { testMode } = useContext(AppMode);
  const { ORDERS_MANAGEMENT } = useContext(APIReference);
  const [initialLoad, query] = useLazyQuery<get_orders, OrdersFilterType>(GET_ORDERS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [variables, setVariables] = useState<OrdersFilterType & { offset: number }>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as OrderType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore(options);

  const loadMore = (options: OrdersFilterType = {}) => {
    const params = Object.keys(options).reduce((acc, key) => {
      return isNoneOrEmpty(options[key as keyof OrdersFilterType]) ? acc : {
        ...acc,
        [key]: (
          ["status", "option_key"].includes(key)
            ? [].concat(options[key as keyof OrdersFilterType]).reduce(
              (acc, item: string) => [].concat(acc, item.split(',') as any), []
            )
            : options[key as keyof OrdersFilterType]
        )
      };
    }, { ...PAGINATION, test_mode: testMode });

    const requestVariables = { ...params };

    setVariablesToURL && insertUrlParam(requestVariables);
    setVariables(requestVariables);

    if (query.called) {
      return Promise.resolve(fetchMore({ variables: requestVariables })?.then(response => {
        setVariables(requestVariables);
        return response;
      }));
    }

    return Promise.resolve(initialLoad({ variables: requestVariables }));
  };
  const load = (options?: OrdersFilterType) => loadMore(options);

  if (!ORDERS_MANAGEMENT) return <>{children}</>;

  return (
    <OrdersContext.Provider value={{
      ...query,
      load,
      loadMore,
      variables,
      orders: extract(query?.data?.orders?.edges),
      next: query.data?.orders?.pageInfo?.hasNextPage ? (parseInt(variables.offset + '') + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (parseInt(variables.offset + '') - PAGE_SIZE) : null,
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
