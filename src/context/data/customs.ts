import { TemplateFilter, CreateCustomsTemplateInput, CREATE_CUSTOMS_TEMPLATE, DELETE_TEMPLATE, get_customs_info_templates, GET_CUSTOMS_TEMPLATES, UpdateCustomsTemplateInput, UPDATE_CUSTOMS_TEMPLATE, DISCARD_COMMODITY } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export function useCustomsTemplates() {
  const headers = useSessionHeader();
  const [filter, setFilter] = React.useState<TemplateFilter>(PAGINATION);

  // Queries
  const query = useQuery(
    ['customs_infos'],
    () => request<get_customs_info_templates>(gqlstr(GET_CUSTOMS_TEMPLATES), { filter, ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
    filter,
    setFilter,
  };
}


export function useCustomsTemplateMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => {
    queryClient.invalidateQueries(['customs_infos']);
    queryClient.invalidateQueries(['default_templates']);
  };

  // Mutations
  const createCustomsTemplate = useMutation(
    (data: CreateCustomsTemplateInput) => request(gqlstr(CREATE_CUSTOMS_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const updateCustomsTemplate = useMutation(
    (data: UpdateCustomsTemplateInput) => request(gqlstr(UPDATE_CUSTOMS_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const deleteCustomsTemplate = useMutation(
    (data: { id: string }) => request(gqlstr(DELETE_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const deleteCommodity = useMutation(
    (data: { id: string }) => request(gqlstr(DISCARD_COMMODITY), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );

  return {
    createCustomsTemplate,
    updateCustomsTemplate,
    deleteCustomsTemplate,
    deleteCommodity,
  };
}
