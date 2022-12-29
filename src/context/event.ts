import { gqlstr, insertUrlParam, isNoneOrEmpty, onError, request, useSessionHeader } from "@/lib/helper";
import { EventFilter, GET_EVENT, get_event, get_events, GET_EVENTS } from "@karrio/graphql";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };
type FilterType = EventFilter & { setVariablesToURL?: boolean };

export function useEvents({ setVariablesToURL = false, ...initialData }: FilterType = {}) {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const [filter, _setFilter] = React.useState<EventFilter>({ ...PAGINATION, ...initialData });
  const fetch = (variables: { filter: EventFilter }) => request<get_events>(
    gqlstr(GET_EVENTS), { variables, ...headers() }
  );

  // Queries
  const query = useQuery(
    ['events', filter],
    () => fetch({ filter }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  function setFilter(options: EventFilter) {
    const params = Object.keys(options).reduce((acc, key) => {
      if (["modal"].includes(key)) return acc;
      return isNoneOrEmpty(options[key as keyof EventFilter]) ? acc : {
        ...acc,
        [key]: (["type"].includes(key)
          ? ([].concat(options[key as keyof EventFilter] as any).reduce(
            (acc, item: string) => [].concat(acc, item.split(',') as any), []
          ))
          : (["offset", "first"].includes(key)
            ? parseInt(options[key as keyof EventFilter] as any)
            : options[key as keyof EventFilter]
          )
        )
      };
    }, PAGINATION);

    if (setVariablesToURL) insertUrlParam(params);
    _setFilter(params);

    return params;
  }

  React.useEffect(() => {
    if (query.data?.events.page_info.has_next_page) {
      const _filter = { ...filter, offset: filter.offset as number + 20 };
      queryClient.prefetchQuery(
        ['events', _filter],
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

export function useEvent(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(['events', id], {
    queryFn: () => (
      request<get_event>(gqlstr(GET_EVENT), { variables: { id }, ...headers() })
    ),
    enabled: !!id,
    onError,
  });

  return {
    query,
  };
}
