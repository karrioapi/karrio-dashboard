import { AddressFilter, CreateAddressTemplateInput, CREATE_ADDRESS_TEMPLATE, DELETE_TEMPLATE, get_address_templates, GET_ADDRESS_TEMPLATES, get_address_templatesVariables, UpdateAddressTemplateInput, UPDATED_ADDRESS_TEMPLATE } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, request, useSessionHeader } from "@/lib/helper";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };
const DEFAULT_FITLER = { filter: PAGINATION };

export function useAddressTemplates() {
  const headers = useSessionHeader();
  const [data, setData] = React.useState<get_address_templatesVariables>(DEFAULT_FITLER);

  // Queries
  const query = useQuery(
    ['addresses'],
    () => request<get_address_templates>(gqlstr(GET_ADDRESS_TEMPLATES), { data, ...headers() }),
    { keepPreviousData: true, staleTime: 5000 },
  );

  return {
    query,
    filter: data.filter,
    setFilter: (filter: AddressFilter) => setData({ filter }),
  };
}


export function useAddressTemplateMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();

  // Mutations
  const createAddressTemplate = useMutation(
    (data: CreateAddressTemplateInput) => request(gqlstr(CREATE_ADDRESS_TEMPLATE), { data, ...headers() }),
    { onSuccess: () => { queryClient.invalidateQueries(['addresses']) } }
  );
  const updateAddressTemplate = useMutation(
    (data: UpdateAddressTemplateInput) => request(gqlstr(UPDATED_ADDRESS_TEMPLATE), { data, ...headers() }),
    { onSuccess: () => { queryClient.invalidateQueries(['addresses']) } }
  );
  const deleteAddressTemplate = useMutation(
    (data: { id: string }) => request(gqlstr(DELETE_TEMPLATE), { data, ...headers() }),
    { onSuccess: () => { queryClient.invalidateQueries(['addresses']) } }
  );

  return {
    createAddressTemplate,
    updateAddressTemplate,
    deleteAddressTemplate,
  };
}
