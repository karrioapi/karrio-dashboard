import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_logs, GET_LOGS, get_logs_logs_edges, get_logsVariables } from '@/purplship/graphql';
import { LogType } from '@/lib/types';
import { isNone } from '@/lib/helper';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

type Edges = (get_logs_logs_edges | null)[];
type LogsType = LazyQueryResult<get_logs, any> & {
  logs: LogType[];
  next?: number | null;
  previous?: number | null;
  load: (options?: get_logsVariables) => void;
  loadMore: (options?: get_logsVariables) => void;
};

export const Logs = React.createContext<LogsType>({} as LogsType);

const LogsProvider: React.FC = ({ children }) => {
  const [initialLoad, query] = useLazyQuery<get_logs>(GET_LOGS, { notifyOnNetworkStatusChange: true });
  const [variables, setVariables] = useState<any>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as LogType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore(options);

  const loadMore = (options: get_logsVariables = {}) => {
    const { offset, status } = options;
    const params = { offset: offset || 0, ...(isNone(status) ? {} : { status }) };
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
  const load = (options?: get_logsVariables) => loadMore(options);

  return (
    <Logs.Provider value={{
      load, loadMore,
      logs: extract(query?.data?.logs?.edges),
      next: query.data?.logs?.pageInfo?.hasNextPage ? (variables?.offset + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (variables?.offset - PAGE_SIZE) : null,
      ...query
    }}>
      {children}
    </Logs.Provider>
  );
};

export default LogsProvider;
