import { LogFilter, get_logs, GET_LOGS, get_log } from "@karrio/graphql";
import { useQuery } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export function useLogs() {
  const headers = useSessionHeader();
  const [filter, setFilter] = React.useState<LogFilter>(PAGINATION);

  // Queries
  const query = useQuery(
    ['logs'],
    () => request<get_logs>(gqlstr(GET_LOGS), { filter, ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
    filter,
    setFilter,
  };
}

export function useLog(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['logs', id],
    () => request<get_log>(gqlstr(GET_LOGS), { data: { id }, ...headers() }),
    { onError }
  );

  return {
    query,
  };
}
