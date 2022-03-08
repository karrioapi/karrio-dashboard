import React, { useContext, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_trackers, GET_TRACKERS, get_trackers_trackers_edges, get_trackersVariables } from '@purplship/graphql';
import { TrackerType } from '@/lib/types';
import { isNoneOrEmpty, useLocation } from '@/lib/helper';
import { AppMode } from '@/context/app-mode-provider';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export interface TrackersFilterType extends get_trackersVariables { };
type Edges = (get_trackers_trackers_edges | null)[];
type TrackersType = LazyQueryResult<get_trackers, TrackersFilterType> & {
  trackers: TrackerType[];
  next?: number | null;
  previous?: number | null;
  variables: TrackersFilterType;
  load: (options?: TrackersFilterType) => Promise<any>;
  loadMore: (options?: TrackersFilterType) => Promise<any>;
};

export const TrackersContext = React.createContext<TrackersType>({} as TrackersType);

const TrackersProvider: React.FC = ({ children }) => {
  const { testMode } = useContext(AppMode);
  const { insertUrlParam } = useLocation();
  const [initialLoad, query] = useLazyQuery<get_trackers, TrackersFilterType>(GET_TRACKERS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [variables, setVariables] = useState<TrackersFilterType & { offset: number }>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as TrackerType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore(options);

  const loadMore = (options: TrackersFilterType = {}) => {
    const params = Object.keys(options).reduce((acc, key) => {
      return isNoneOrEmpty(options[key as keyof TrackersFilterType]) ? acc : {
        ...acc,
        [key]: (
          ["carrier_name", "status"].includes(key)
            ? [].concat(options[key as keyof TrackersFilterType]).reduce(
              (acc, item: string) => [].concat(acc, item.split(',') as any), []
            )
            : options[key as keyof TrackersFilterType]
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
  const load = (options?: TrackersFilterType) => loadMore(options);

  return (
    <TrackersContext.Provider value={{
      ...query,
      load,
      loadMore,
      variables,
      trackers: extract(query?.data?.trackers?.edges),
      next: query.data?.trackers?.pageInfo?.hasNextPage ? (parseInt(variables.offset + '') + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (parseInt(variables.offset + '') - PAGE_SIZE) : null,
    }}>
      {children}
    </TrackersContext.Provider>
  );
};

export default TrackersProvider;
