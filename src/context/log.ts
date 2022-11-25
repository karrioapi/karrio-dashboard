import { gqlstr, insertUrlParam, isNoneOrEmpty, onError, request, useSessionHeader } from "@/lib/helper";
import { LogFilter, get_logs, GET_LOGS, get_log, GET_LOG } from "@karrio/graphql";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };
type FilterType = LogFilter & { setVariablesToURL?: boolean };

export function useLogs({ setVariablesToURL = false, ...initialData }: FilterType = {}) {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const [filter, _setFilter] = React.useState<LogFilter>({ ...PAGINATION, ...initialData });
  const fetch = (variables: { filter: LogFilter }) => request<get_logs>(
    gqlstr(GET_LOGS), { variables, ...headers() }
  );

  // Queries
  const query = useQuery(
    ['logs', filter],
    () => fetch({ filter }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  function setFilter(options: LogFilter) {
    const params = Object.keys(options).reduce((acc, key) => {
      if (["modal"].includes(key)) return acc;
      return isNoneOrEmpty(options[key as keyof LogFilter]) ? acc : {
        ...acc,
        [key]: (["method", "status_code"].includes(key)
          ? ([].concat(options[key as keyof LogFilter] as any).reduce(
            (acc, item: string) => [].concat(acc, item.split(',') as any), []
          ))
          : (["offset", "first"].includes(key)
            ? parseInt(options[key as keyof LogFilter] as any)
            : options[key as keyof LogFilter]
          )
        )
      };
    }, PAGINATION);

    if (setVariablesToURL) insertUrlParam(params);
    _setFilter(params);

    return params;
  }

  React.useEffect(() => {
    if (query.data?.logs.page_info.has_next_page) {
      const _filter = { ...filter, offset: filter.offset as number + 20 };
      queryClient.prefetchQuery(
        ['logs', _filter],
        () => fetch({ filter: _filter }),
      )
    }
  }, [query.data, filter.offset, queryClient])

  return {
    query,
    filter,
    setFilter,
  };
}

export function useLog(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery({
    queryKey: ['logs', id],
    queryFn: () => request<get_log>(gqlstr(GET_LOG), { variables: { id }, ...headers() }),
    enabled: !!id,
    onError,
  });

  return {
    query,
  };
}
