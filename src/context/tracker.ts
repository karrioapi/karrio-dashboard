import { gqlstr, handleFailure, insertUrlParam, isNoneOrEmpty, onError, request, useSessionHeader } from "@/lib/helper";
import { TrackerFilter, get_trackers, GET_TRACKERS, get_tracker, GET_TRACKER } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RestContext } from "@/client/context";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };
type FilterType = TrackerFilter & { setVariablesToURL?: boolean };

export function useTrackers({ setVariablesToURL = false, ...initialData }: FilterType = {}) {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const [filter, _setFilter] = React.useState<TrackerFilter>({ ...PAGINATION, ...initialData });
  const fetch = (variables: { filter: TrackerFilter }) => request<get_trackers>(
    gqlstr(GET_TRACKERS), { variables, ...headers() }
  );

  // Queries
  const query = useQuery(
    ['trackers', filter],
    () => fetch({ filter }),
    { keepPreviousData: true, staleTime: 5000, refetchInterval: 120000, onError },
  );

  function setFilter(options: TrackerFilter) {
    const params = Object.keys(options).reduce((acc, key) => {
      if (["modal"].includes(key)) return acc;
      return isNoneOrEmpty(options[key as keyof TrackerFilter]) ? acc : {
        ...acc,
        [key]: (["carrier_name", "status"].includes(key)
          ? ([].concat(options[key as keyof TrackerFilter]).reduce(
            (acc, item: string) => [].concat(acc, item.split(',') as any), []
          ))
          : (["offset", "first"].includes(key)
            ? parseInt(options[key as keyof TrackerFilter])
            : options[key as keyof TrackerFilter]
          )
        )
      };
    }, PAGINATION);

    if (setVariablesToURL) insertUrlParam(params);
    _setFilter(params);

    return params;
  }

  React.useEffect(() => {
    if (query.data?.trackers.page_info.has_next_page) {
      const _filter = { ...filter, offset: filter.offset as number + 20 };
      queryClient.prefetchQuery(
        ['trackers', _filter],
        () => fetch({ filter: _filter }),
      )
    }
  }, [query.data, filter.offset, queryClient])

  return {
    query,
    get filter() { return filter; },
    setFilter,
  };
}

export function useTracker(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(['trackers', id], {
    queryFn: () => request<get_tracker>(gqlstr(GET_TRACKER), { data: { id }, ...headers() }),
    enabled: !!id,
    onError,
  });

  return {
    query,
  };
}


export function useTrackerMutation() {
  const queryClient = useQueryClient();
  const karrio = React.useContext(RestContext);
  const invalidateCache = () => { queryClient.invalidateQueries(['trackers']) };

  // Mutations
  const createTracker = useMutation(
    (data: { tracking_number: string, carrier_name: string }) => handleFailure(karrio!.trackers.add({
      trackingData: data
    })),
    { onSuccess: invalidateCache, onError }
  );
  const deleteTracker = useMutation(
    (data: { idOrTrackingNumber: string }) => handleFailure(karrio!.trackers.remove(data)),
    { onSuccess: invalidateCache, onError }
  );

  return {
    createTracker,
    deleteTracker,
  };
}
