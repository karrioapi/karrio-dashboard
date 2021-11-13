import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_events, GET_EVENTS, get_events_events_edges, get_eventsVariables } from '@/graphql';
import { EventType } from '@/lib/types';
import { isNone } from '@/lib/helper';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

type Edges = (get_events_events_edges | null)[];
type EventsType = LazyQueryResult<get_events, any> & {
  events: EventType[];
  next?: number | null;
  previous?: number | null;
  load: (options?: get_eventsVariables) => void;
  loadMore: (options?: get_eventsVariables) => void;
};

export const Events = React.createContext<EventsType>({} as EventsType);

const EventsProvider: React.FC = ({ children }) => {
  const [initialLoad, query] = useLazyQuery<get_events>(GET_EVENTS, { notifyOnNetworkStatusChange: true });
  const [variables, setVariables] = useState<any>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as EventType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore(options);

  const loadMore = (options: get_eventsVariables = {}) => {
    const { offset, type } = options;
    const params = { offset: offset || 0, ...(isNone(type) ? {} : { type }) };
    const requestVariables = { ...variables, ...params };

    if (query.called) {
      return fetchMore({ variables: requestVariables })?.then(response => {
        setVariables(requestVariables);
        return response;
      });
    }

    setVariables(requestVariables);
    return initialLoad({ variables: requestVariables })
  };
  const load = (options?: get_eventsVariables) => loadMore(options);

  return (
    <Events.Provider value={{
      load, loadMore,
      events: extract(query?.data?.events?.edges),
      next: query.data?.events?.pageInfo?.hasNextPage ? (variables?.offset + PAGE_SIZE) : null,
      previous: query.data?.events?.pageInfo?.hasPreviousPage ? (variables?.offset - PAGE_SIZE) : null,
      ...query
    }}>
      {children}
    </Events.Provider>
  );
};

export default EventsProvider;
