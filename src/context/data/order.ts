import { OrderFilter, get_orders, GET_ORDERS, get_order } from "@karrio/graphql";
import { useQuery } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export function useOrders() {
  const headers = useSessionHeader();
  const [filter, setFilter] = React.useState<OrderFilter>(PAGINATION);

  // Queries
  const query = useQuery(
    ['orders'],
    () => request<get_orders>(gqlstr(GET_ORDERS), { filter, ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
    filter,
    setFilter,
  };
}

export function useOrder(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['orders', id],
    () => request<get_order>(gqlstr(GET_ORDERS), { data: { id }, ...headers() }),
    { onError }
  );

  return {
    query,
  };
}
