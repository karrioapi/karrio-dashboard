import { ShipmentFilter, get_shipments, GET_DOCUMENT_TEMPLATES, DISCARD_COMMODITY, PartialShipmentMutationInput, PARTIAL_UPDATE_SHIPMENT, DELETE_TEMPLATE, get_shipment } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, handleFailure, onError, request, useSessionHeader } from "@/lib/helper";
import { RestContext } from "@/client/context";
import { ShipmentType } from "@/lib/types";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export function useShipments() {
  const headers = useSessionHeader();
  const [filter, setFilter] = React.useState<ShipmentFilter>(PAGINATION);

  // Queries
  const query = useQuery(
    ['shipments'],
    () => request<get_shipments>(gqlstr(GET_DOCUMENT_TEMPLATES), { filter, ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
    filter,
    setFilter,
  };
}

export function useShipment(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['shipments', id],
    () => request<get_shipment>(gqlstr(GET_DOCUMENT_TEMPLATES), { data: { id }, ...headers() }),
    { onError }
  );

  return {
    query,
  };
}

export function useShipmentMutation(id?: string) {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const karrio = React.useContext(RestContext);
  const invalidateCache = () => {
    queryClient.invalidateQueries(['shipments']);
    queryClient.invalidateQueries(['shipment', id]);
  };

  // Mutations
  // REST requests
  const fetchRates = useMutation(
    (data: ShipmentType) => handleFailure(karrio!.proxy.fetchRates({ rateRequest: (data as any) })),
    { onSuccess: invalidateCache, onError }
  );
  const buyLabel = useMutation(
    ({ id, selected_rate_id, ...shipment }: ShipmentType) => {
      return handleFailure(id !== undefined
        ? karrio!.shipments.purchase({ id, shipmentPurchaseData: { selected_rate_id } as any })
        : karrio!.shipments.create({ shipmentData: (shipment as any) })
      )
    },
    { onSuccess: invalidateCache, onError }
  );
  const voidLabel = useMutation(
    ({ id }: ShipmentType) => handleFailure(karrio!.shipments.cancel({ id })),
    { onSuccess: invalidateCache, onError }
  );

  // GraphQL requests
  const updateShipment = useMutation(
    (data: PartialShipmentMutationInput) => request(gqlstr(PARTIAL_UPDATE_SHIPMENT), { data, ...headers() }),
    { onSuccess: invalidateCache }
  );
  const discardCustoms = useMutation(
    (data: { id: string }) => request(gqlstr(DELETE_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const discardCommodity = useMutation(
    (data: { id: string }) => request(gqlstr(DISCARD_COMMODITY), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const discardParcel = useMutation(
    (data: { id: string }) => request(gqlstr(DELETE_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );

  return {
    buyLabel,
    voidLabel,
    fetchRates,
    updateShipment,
    discardCommodity,
    discardCustoms,
    discardParcel,
  };
}
