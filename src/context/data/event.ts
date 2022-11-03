import { EventFilter, get_event, get_events, GET_EVENTS } from "@karrio/graphql";
import { useQuery } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export function useEvents() {
  const headers = useSessionHeader();
  const [filter, setFilter] = React.useState<EventFilter>(PAGINATION);

  // Queries
  const query = useQuery(
    ['events'],
    () => request<get_events>(gqlstr(GET_EVENTS), { filter, ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
    filter,
    setFilter,
  };
}

export function useEvent(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['events', id],
    () => request<get_event>(gqlstr(GET_EVENTS), { data: { id }, ...headers() }),
    { onError }
  );

  return {
    query,
  };
}
