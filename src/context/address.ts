import { AddressFilter, CreateAddressTemplateInput, create_address_template, CREATE_ADDRESS_TEMPLATE, delete_template, DELETE_TEMPLATE, get_address_templates, GET_ADDRESS_TEMPLATES, UpdateAddressTemplateInput, update_address_template, UPDATE_ADDRESS_TEMPLATE } from "@karrio/graphql";
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
    ['addresses', filter],
    () => request<get_address_templates>(gqlstr(GET_ADDRESS_TEMPLATES), { variables: filter, ...headers() }),
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
    (data: CreateAddressTemplateInput) => request<create_address_template>(
      gqlstr(CREATE_ADDRESS_TEMPLATE), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const updateAddressTemplate = useMutation(
    (data: UpdateAddressTemplateInput) => request<update_address_template>(
      gqlstr(UPDATE_ADDRESS_TEMPLATE), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const deleteAddressTemplate = useMutation(
    (data: { id: string }) => request<delete_template>(gqlstr(DELETE_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );

  return {
    createAddressTemplate,
    updateAddressTemplate,
    deleteAddressTemplate,
  };
}
