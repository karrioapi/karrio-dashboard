import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_logs, GET_LOGS, get_logs_logs_edges, get_logsVariables } from 'karrio/graphql';
import { LogType } from '@/lib/types';
import { isNoneOrEmpty, useLocation } from '@/lib/helper';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export interface LogsFilterType extends get_logsVariables { };
type Edges = (get_logs_logs_edges | null)[];
type LogsType = LazyQueryResult<get_logs, LogsFilterType> & {
  logs: LogType[];
  next?: number | null;
  previous?: number | null;
  variables: LogsFilterType;
  load: (options?: LogsFilterType) => Promise<any>;
  loadMore: (options?: LogsFilterType) => Promise<any>;
};

export const LogsContext = React.createContext<LogsType>({} as LogsType);

const LogsProvider: React.FC<{ setVariablesToURL?: boolean }> = ({ children, setVariablesToURL = true }) => {
  const { insertUrlParam } = useLocation();
  const [initialLoad, query] = useLazyQuery<get_logs, any>(GET_LOGS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [variables, setVariables] = useState<LogsFilterType & { offset: number }>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as LogType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore(options);

  const loadMore = (options: LogsFilterType = {}) => {
    const params = Object.keys(options).reduce((acc, key) => {
      return isNoneOrEmpty(options[key as keyof LogsFilterType]) ? acc : {
        ...acc,
        [key]: (
          ["method", "status_code"].includes(key)
            ? [].concat((options as any)[key]).reduce(
              (acc, item: string) => [].concat(acc, item.split(',') as any), []
            )
            : options[key as keyof LogsFilterType]
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
  const load = (options?: LogsFilterType) => loadMore(options);

  return (
    <LogsContext.Provider value={{
      ...query,
      load,
      loadMore,
      logs: extract(query?.data?.logs?.edges),
      next: query.data?.logs?.page_info?.has_next_page ? (parseInt(variables.offset + '') + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (parseInt(variables.offset + '') - PAGE_SIZE) : null,
      variables,
    }}>
      {children}
    </LogsContext.Provider>
  );
};

export default LogsProvider;
