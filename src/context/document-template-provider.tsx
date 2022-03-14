import React, { useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_document_template, GET_DOCUMENT_TEMPLATE, get_document_templateVariables, get_document_template_document_template } from '@purplship/graphql';
import { DocumentTemplateType } from '@/lib/types';


export type DocumentTemplateResultType = LazyQueryResult<get_document_template, get_document_templateVariables> & {
  template?: DocumentTemplateType;
  loadDocumentTemplate: (id: string) => Promise<any>;
  setDocumentTemplate: React.Dispatch<React.SetStateAction<get_document_template_document_template | undefined>>;
};

export const DocumentTemplate = React.createContext<DocumentTemplateResultType>({} as DocumentTemplateResultType);

const DocumentTemplateProvider: React.FC = ({ children }) => {
  const [load, result] = useLazyQuery<get_document_template, get_document_templateVariables>(GET_DOCUMENT_TEMPLATE, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [template, setDocumentTemplate] = useState<DocumentTemplateType>();

  const loadDocumentTemplate = (id: string) => load({ variables: { id } });

  useEffect(() => {
    setDocumentTemplate(result.data?.document_template as DocumentTemplateType);
  }, [result]);

  return (
    <DocumentTemplate.Provider value={{
      template,
      setDocumentTemplate,
      loadDocumentTemplate,
      ...result
    }}>
      {children}
    </DocumentTemplate.Provider>
  );
};

export function useDocumentTemplate() {
  return React.useContext(DocumentTemplate);
}

export default DocumentTemplateProvider;
