import { DocumentTemplateFilter, CreateDocumentTemplateMutationInput, CREATE_DOCUMENT_TEMPLATE, DELETE_DOCUMENT_TEMPLATE, get_document_templates, GET_DOCUMENT_TEMPLATES, UpdateDocumentTemplateMutationInput, UPDATE_DOCUMENT_TEMPLATE, GET_DOCUMENT_TEMPLATE, get_document_template, create_document_template, update_document_template, delete_document_template } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, insertUrlParam, onError, request, useSessionHeader } from "@/lib/helper";
import React from "react";

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export function useDocumentTemplates(initialData: DocumentTemplateFilter = {}) {
  const headers = useSessionHeader();
  const [filter, setFilter] = React.useState<DocumentTemplateFilter>({ ...PAGINATION, ...initialData });

  // Queries
  const query = useQuery(
    ['document_templates', filter],
    () => request<get_document_templates>(gqlstr(GET_DOCUMENT_TEMPLATES), { variables: { filter }, ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
    filter,
    setFilter,
  };
}

type Args = { id?: string, setVariablesToURL?: boolean };

export function useDocumentTemplate({ id, setVariablesToURL = false }: Args = {}) {
  const headers = useSessionHeader();
  const [docId, _setDocId] = React.useState<string>(id || 'new');

  // Queries
  const query = useQuery(['document_templates', docId], {
    queryFn: () => request<get_document_template>(
      gqlstr(GET_DOCUMENT_TEMPLATE), { variables: { id: docId }, ...headers() }
    ),
    enabled: (docId !== 'new'),
    onError,
  });

  function setDocId(docId: string) {
    if (setVariablesToURL) insertUrlParam({ id: docId });
    _setDocId(docId);
  }

  return {
    query,
    docId,
    setDocId,
  };
}


export function useDocumentTemplateMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => { queryClient.invalidateQueries(['document_templates']) };

  // Mutations
  const createDocumentTemplate = useMutation(
    (data: CreateDocumentTemplateMutationInput) => request<create_document_template>(
      gqlstr(CREATE_DOCUMENT_TEMPLATE), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const updateDocumentTemplate = useMutation(
    (data: UpdateDocumentTemplateMutationInput) => request<update_document_template>(
      gqlstr(UPDATE_DOCUMENT_TEMPLATE), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const deleteDocumentTemplate = useMutation(
    (data: { id: string }) => request<delete_document_template>(
      gqlstr(DELETE_DOCUMENT_TEMPLATE), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );

  return {
    createDocumentTemplate,
    updateDocumentTemplate,
    deleteDocumentTemplate,
  };
}
