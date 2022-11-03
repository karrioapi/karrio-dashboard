import { DocumentTemplateFilter, CreateDocumentTemplateMutationInput, CREATE_DOCUMENT_TEMPLATE, DELETE_DOCUMENT_TEMPLATE, get_document_templates, GET_DOCUMENT_TEMPLATES, UpdateDocumentTemplateMutationInput, UPDATE_DOCUMENT_TEMPLATE, GET_DOCUMENT_TEMPLATE, get_document_template } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export function useDocumentTemplates() {
  const headers = useSessionHeader();
  const [filter, setFilter] = React.useState<DocumentTemplateFilter>(PAGINATION);

  // Queries
  const query = useQuery(
    ['document_templates'],
    () => request<get_document_templates>(gqlstr(GET_DOCUMENT_TEMPLATES), { filter, ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
    filter,
    setFilter,
  };
}

export function useDocumentTemplate(id: string) {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['document_templates', id],
    () => request<get_document_template>(gqlstr(GET_DOCUMENT_TEMPLATE), { data: { id }, ...headers() }),
    { onError }
  );

  return {
    query,
  };
}


export function useDocumentTemplateMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => { queryClient.invalidateQueries(['document_templates']) };

  // Mutations
  const createDocumentTemplate = useMutation(
    (data: CreateDocumentTemplateMutationInput) => request(gqlstr(CREATE_DOCUMENT_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const updateDocumentTemplate = useMutation(
    (data: UpdateDocumentTemplateMutationInput) => request(gqlstr(UPDATE_DOCUMENT_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const deleteDocumentTemplate = useMutation(
    (data: { id: string }) => request(gqlstr(DELETE_DOCUMENT_TEMPLATE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );

  return {
    createDocumentTemplate,
    updateDocumentTemplate,
    deleteDocumentTemplate,
  };
}
