import React, { useContext, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_shipments, GET_SHIPMENTS, get_shipments_shipments_edges, get_shipmentsVariables } from 'karrio/graphql';
import { ShipmentType } from '@/lib/types';
import { isNoneOrEmpty, useLocation } from '@/lib/helper';
import { AppMode } from '@/context/app-mode-provider';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export interface ShipmentsFilterType extends get_shipmentsVariables { };
type Edges = (get_shipments_shipments_edges | null)[];
type ShipmentsType = LazyQueryResult<get_shipments, ShipmentsFilterType> & {
  shipments: ShipmentType[];
  next?: number | null;
  previous?: number | null;
  variables: ShipmentsFilterType;
  load: (options?: ShipmentsFilterType) => Promise<any>;
  loadMore: (options?: ShipmentsFilterType) => Promise<any>;
};

export const ShipmentsContext = React.createContext<ShipmentsType>({} as ShipmentsType);

const ShipmentsProvider: React.FC = ({ children }) => {
  const { testMode } = useContext(AppMode);
  const { insertUrlParam } = useLocation();
  const [initialLoad, query] = useLazyQuery<get_shipments, any>(GET_SHIPMENTS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true
  });
  const [variables, setVariables] = useState<ShipmentsFilterType & { offset: number }>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as ShipmentType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore(options);

  const loadMore = (options: ShipmentsFilterType = {}) => {
    const params = Object.keys(options).reduce((acc, key) => {
      return isNoneOrEmpty(options[key as keyof ShipmentsFilterType]) ? acc : {
        ...acc,
        [key]: (
          ["carrier_name", "status", "service"].includes(key)
            ? [].concat((options as any)[key]).reduce(
              (acc, item: string) => [].concat(acc, item.split(',') as any), []
            )
            : options[key as keyof ShipmentsFilterType]
        )
      };
    }, { ...PAGINATION, test_mode: testMode });

    const requestVariables = { ...params };

    insertUrlParam(requestVariables);
    setVariables(requestVariables);

    if (query.called) {
      return Promise.resolve(fetchMore({ variables: requestVariables })?.then(response => {
        setVariables(requestVariables);
        return response;
      }));
    }

    return Promise.resolve(initialLoad({ variables: requestVariables }));
  };
  const load = (options?: ShipmentsFilterType) => loadMore(options);

  return (
    <ShipmentsContext.Provider value={{
      ...query,
      load,
      loadMore,
      variables,
      shipments: extract(query?.data?.shipments?.edges),
      next: query.data?.shipments?.page_info?.has_next_page ? (parseInt(variables.offset + '') + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (parseInt(variables.offset + '') - PAGE_SIZE) : null,
    } as ShipmentsType}>
      {children}
    </ShipmentsContext.Provider>
  );
};

export default ShipmentsProvider;
