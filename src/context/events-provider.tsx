import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_events, GET_EVENTS, get_events_events_edges, get_eventsVariables } from '@purplship/graphql';
import { EventType } from '@/lib/types';
import { isNoneOrEmpty, useLocation } from '@/lib/helper';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export interface EventsFilterType extends get_eventsVariables { };
type Edges = (get_events_events_edges | null)[];

type EventsType = LazyQueryResult<get_events, any> & {
  events: EventType[];
  next?: number | null;
  previous?: number | null;
  load: (options?: EventsFilterType) => Promise<any>;
  loadMore: (options?: EventsFilterType) => Promise<any>;
};

export const EventsContext = React.createContext<EventsType>({} as EventsType);

const EventsProvider: React.FC<{ setVariablesToURL?: boolean }> = ({ children, setVariablesToURL = true }) => {
  const { insertUrlParam } = useLocation();
  const [initialLoad, query] = useLazyQuery<get_events, EventsFilterType>(GET_EVENTS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [variables, setVariables] = useState<EventsFilterType & { offset: number }>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as EventType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore(options);

  const loadMore = (options: EventsFilterType = {}) => {
    const params = Object.keys(options).reduce((acc, key) => {
      return isNoneOrEmpty(options[key as keyof EventsFilterType]) ? acc : {
        ...acc,
        [key]: (
          ["type"].includes(key)
            ? [].concat(options[key as keyof EventsFilterType]).reduce(
              (acc, item: string) => [].concat(acc, item.split(',') as any), []
            )
            : options[key as keyof EventsFilterType]
        )
      };
    }, PAGINATION);

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
  const load = (options?: get_eventsVariables) => loadMore(options);

  return (
    <EventsContext.Provider value={{
      ...query,
      load,
      loadMore,
      variables,
      events: extract(query?.data?.events?.edges),
      next: query.data?.events?.pageInfo?.hasNextPage ? (parseInt(variables.offset + '') + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (parseInt(variables.offset + '') - PAGE_SIZE) : null,
    } as EventsType}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
