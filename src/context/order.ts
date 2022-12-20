import { gqlstr, handleFailure, insertUrlParam, isNoneOrEmpty, onError, request, useSessionHeader } from "@/lib/helper";
import { OrderFilter, get_orders, GET_ORDERS, get_order, GET_ORDER } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RestContext } from "@/client/context";
import { OrderType } from "@/lib/types";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };
type FilterType = OrderFilter & { setVariablesToURL?: boolean };

export function useOrders({ setVariablesToURL = false, ...initialData }: FilterType = {}) {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const [filter, _setFilter] = React.useState<OrderFilter>({ ...PAGINATION, ...initialData });
  const fetch = (variables: { filter: OrderFilter }) => request<get_orders>(
    gqlstr(GET_ORDERS), { variables, ...headers() }
  );

  // Queries
  const query = useQuery(
    ['orders', filter],
    () => fetch({ filter }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  function setFilter(options: OrderFilter) {
    const params = Object.keys(options).reduce((acc, key) => {
      if (["modal"].includes(key)) return acc;
      return isNoneOrEmpty(options[key as keyof OrderFilter]) ? acc : {
        ...acc,
        [key]: (["status", "option_key"].includes(key)
          ? ([].concat(options[key as keyof OrderFilter] as any).reduce(
            (acc, item: string) => [].concat(acc, item.split(',') as any), []
          ))
          : (["offset", "first"].includes(key)
            ? parseInt(options[key as keyof OrderFilter] as any)
            : options[key as keyof OrderFilter]
          )
        )
      };
    }, PAGINATION);

    if (setVariablesToURL) insertUrlParam(params);
    _setFilter(params);

    return params;
  }

  React.useEffect(() => {
    if (query.data?.orders.page_info.has_next_page) {
      const _filter = { ...filter, offset: filter.offset as number + 20 };
      queryClient.prefetchQuery(
        ['orders', _filter],
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

export function useOrder(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery({
    queryKey: ['orders', id],
    queryFn: () => request<get_order>(gqlstr(GET_ORDER), { variables: { id }, ...headers() }),
    enabled: !!id,
    onError,
  });

  return {
    query,
  };
}


export function useOrderMutation(id?: string) {
  const queryClient = useQueryClient();
  const karrio = React.useContext(RestContext);
  const invalidateCache = () => {
    queryClient.invalidateQueries(['orders']);
    queryClient.invalidateQueries(['orders', id]);
  };

  // Mutations
  // REST requests
  const cancelOrder = useMutation(
    ({ id }: OrderType) => handleFailure(
      karrio!.orders.cancel({ id }).then(({ data }) => data)
    ),
    { onSuccess: invalidateCache, onError }
  );

  return {
    cancelOrder,
  };
}
