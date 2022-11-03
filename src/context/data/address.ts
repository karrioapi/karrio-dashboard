import { AddressFilter, CreateAddressTemplateInput, CREATE_ADDRESS_TEMPLATE, DELETE_TEMPLATE, get_address_templates, GET_ADDRESS_TEMPLATES, UpdateAddressTemplateInput, UPDATE_ADDRESS_TEMPLATE } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export function useAddressTemplates() {
  const headers = useSessionHeader();
  const [filter, setFilter] = React.useState<AddressFilter>(PAGINATION);

  // Queries
  const query = useQuery(
    ['addresses'],
    () => request<get_address_templates>(gqlstr(GET_ADDRESS_TEMPLATES), { filter, ...headers() }),
    { onError },
  );

  return {
    query,
    filter,
    setFilter,
  };
}

export function useAddressTemplateMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => {
    queryClient.invalidateQueries(['addresses']);
    queryClient.invalidateQueries(['default_templates']);
  };

  // Mutations
  const createAddressTemplate = useMutation(
    (data: CreateAddressTemplateInput) => request(gqlstr(CREATE_ADDRESS_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const updateAddressTemplate = useMutation(
    (data: UpdateAddressTemplateInput) => request(gqlstr(UPDATE_ADDRESS_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const deleteAddressTemplate = useMutation(
    (data: { id: string }) => request(gqlstr(DELETE_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );

  return {
    createAddressTemplate,
    updateAddressTemplate,
    deleteAddressTemplate,
  };
}
