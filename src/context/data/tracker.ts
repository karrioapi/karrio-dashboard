import { TrackerFilter, get_trackers, GET_TRACKERS, get_tracker } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, handleFailure, onError, request, useSessionHeader } from "@/lib/helper";
import { RestContext } from "@/client/context";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export function useTrackers() {
  const headers = useSessionHeader();
  const [filter, setFilter] = React.useState<TrackerFilter>(PAGINATION);

  // Queries
  const query = useQuery(
    ['trackers'],
    () => request<get_trackers>(gqlstr(GET_TRACKERS), { filter, ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
    filter,
    setFilter,
  };
}

export function useTracker(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['trackers', id],
    () => request<get_tracker>(gqlstr(GET_TRACKERS), { data: { id }, ...headers() }),
    { onError }
  );

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
    (data: { trackingNumber: string, carrierName: string }) => handleFailure(karrio!.trackers.create(data as any)),
    { onSuccess: invalidateCache, onError }
  );
  const deleteTracker = useMutation(
    (data: { idOrTrackingNumber: string }) => handleFailure(karrio!.trackers.remove(data as any)),
    { onSuccess: invalidateCache, onError }
  );

  return {
    createTracker,
    deleteTracker,
  };
}
