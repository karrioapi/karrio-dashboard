import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_document_template, GET_DOCUMENT_TEMPLATE, GET_DOCUMENT_TEMPLATES, get_document_templates } from '@purplship/graphql';
import { DocumentTemplateType } from '@/lib/types';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

export type DocumentTemplatesType = LazyQueryResult<get_document_templates, any> & {
  templates: DocumentTemplateType[];
  next?: number | null;
  previous?: number | null;
  load: () => Promise<any>;
  loadMore: (cursor?: number | null) => void;
};

export const DocumentTemplates = React.createContext<DocumentTemplatesType>({} as DocumentTemplatesType);

const DocumentTemplatesProvider: React.FC = ({ children }) => {
  const [initialLoad, query] = useLazyQuery<get_document_templates>(GET_DOCUMENT_TEMPLATES, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [variables, setVariables] = useState<any>(PAGINATION);

  const extract = (edges?: any[]) => (edges || []).map(item => item?.node as DocumentTemplateType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore(options);
  const load = () => query.called ? fetchMore({ variables: PAGINATION }) : initialLoad({ variables });
  const loadMore = async (offset?: number | null) => {
    const options = { ...variables, offset: offset || 0 };
    const response = await fetchMore({ variables: options });
    setVariables(options);
    return response;
  };

  return (
    <DocumentTemplates.Provider value={{
      load,
      loadMore,
      templates: extract(query?.data?.document_templates?.edges),
      next: query.data?.document_templates?.pageInfo?.hasNextPage ? (variables?.offset + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (variables?.offset - PAGE_SIZE) : null,
      ...query
    }}>
      {children}
    </DocumentTemplates.Provider>
  );
};

export function useDocumentTemplates() {
  return React.useContext(DocumentTemplates);
}

export default DocumentTemplatesProvider;
