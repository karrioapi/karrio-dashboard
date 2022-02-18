import React from 'react';
import { useMutation } from '@apollo/client';
import { CreateCustomsTemplateInput, CREATE_CUSTOMS_TEMPLATE, create_customs_templateVariables, DELETE_TEMPLATE, delete_templateVariables, DISCARD_COMMODITY, UPDATED_CUSTOMS_TEMPLATE, UpdateCustomsTemplateInput, update_customs_templateVariables, create_customs_template, update_customs_template, delete_template, discard_commodity, discard_commodityVariables, create_customs_template_create_customs_template, update_customs_template_update_customs_template, delete_template_delete_template, discard_commodity_discard_commodity } from '@purplship/graphql';
import { handleGraphQLRequest } from '@/lib/helper';


export type TemplateMutator = {
  createCustomsTemplate: (data: CreateCustomsTemplateInput) => Promise<create_customs_template_create_customs_template | null>;
  updateCustomsTemplate: (data: UpdateCustomsTemplateInput) => Promise<update_customs_template_update_customs_template | null>;
  deleteCustomsTemplate: (id: string) => Promise<delete_template_delete_template | null>;
  deleteCommodity: (id: string) => Promise<discard_commodity_discard_commodity | null>;
}

export const CustomsMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const CustomsMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<create_customs_template, create_customs_templateVariables>(CREATE_CUSTOMS_TEMPLATE);
  const [updateMutation] = useMutation<update_customs_template, update_customs_templateVariables>(UPDATED_CUSTOMS_TEMPLATE);
  const [deleteMutation] = useMutation<delete_template, delete_templateVariables>(DELETE_TEMPLATE);
  const [commodityDeleteMutation] = useMutation<discard_commodity, discard_commodityVariables>(DISCARD_COMMODITY);

  const createCustomsTemplate = (data: CreateCustomsTemplateInput) => (
    handleGraphQLRequest("create_customs_template", createMutation)({ variables: { data } })
  );
  const updateCustomsTemplate = (data: UpdateCustomsTemplateInput) => (
    handleGraphQLRequest("update_customs_template", updateMutation)({ variables: { data } })
  );
  const deleteCustomsTemplate = (id: string) => (
    handleGraphQLRequest("delete_template", deleteMutation)({ variables: { data: { id } } })
  );
  const deleteCommodity = (id: string) => (
    handleGraphQLRequest("discard_commodity", commodityDeleteMutation)({ variables: { data: { id } } })
  );

  return (
    <CustomsMutationContext.Provider value={{
      createCustomsTemplate,
      updateCustomsTemplate,
      deleteCustomsTemplate,
      deleteCommodity,
    }}>
      {children}
    </CustomsMutationContext.Provider>
  )
};

export default CustomsMutationProvider;
