import React from 'react';
import { useMutation } from '@apollo/client';
import { CreateDocumentTemplateMutationInput, create_document_template, CREATE_DOCUMENT_TEMPLATE, create_document_templateVariables, create_document_template_create_document_template, DELETE_DOCUMENT_TEMPLATE, delete_document_template, delete_document_templateVariables, delete_document_template_delete_document_template, UpdateDocumentTemplateMutationInput, update_document_template, UPDATE_DOCUMENT_TEMPLATE, update_document_templateVariables, update_document_template_update_document_template } from 'karrio/graphql';
import { DocumentTemplateType } from '@/lib/types';
import { handleGraphQLRequest } from '@/lib/helper';

export type DocumentTemplateInput = (CreateDocumentTemplateMutationInput | UpdateDocumentTemplateMutationInput) & {
  id?: string;
  label: string;
  is_default: boolean;
  template: DocumentTemplateType;
};
type TemplateMutator = {
  createDocumentTemplate: (data: CreateDocumentTemplateMutationInput) => Promise<create_document_template_create_document_template | null>;
  updateDocumentTemplate: (data: UpdateDocumentTemplateMutationInput) => Promise<update_document_template_update_document_template | null>;
  deleteTemplate: (id: string) => Promise<delete_document_template_delete_document_template | null>;
};

export const DocumentTemplateMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const DocumentTemplateMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<create_document_template, create_document_templateVariables>(CREATE_DOCUMENT_TEMPLATE);
  const [updateMutation] = useMutation<update_document_template, update_document_templateVariables>(UPDATE_DOCUMENT_TEMPLATE);
  const [deleteMutation] = useMutation<delete_document_template, delete_document_templateVariables>(DELETE_DOCUMENT_TEMPLATE);

  const createDocumentTemplate = (data: CreateDocumentTemplateMutationInput) => (
    handleGraphQLRequest("create_document_template", createMutation)({ variables: { data } })
  );
  const updateDocumentTemplate = (data: UpdateDocumentTemplateMutationInput) => (
    handleGraphQLRequest("update_document_template", updateMutation)({ variables: { data } })
  );
  const deleteTemplate = (id: string) => (
    handleGraphQLRequest("delete_document_template", deleteMutation)({ variables: { data: { id } } })
  );

  return (
    <DocumentTemplateMutationContext.Provider value={{
      createDocumentTemplate,
      updateDocumentTemplate,
      deleteTemplate,
    }}>
      {children}
    </DocumentTemplateMutationContext.Provider>
  )
};

export function useDocumentTemplateMutation() {
  return React.useContext(DocumentTemplateMutationContext);
}

export default DocumentTemplateMutationProvider;
