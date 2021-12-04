import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { CustomsTemplateInput, CREATE_CUSTOMS_TEMPLATE, create_customs_templateVariables, DELETE_TEMPLATE, delete_templateVariables, DISCARD_COMMODITY, UPDATED_CUSTOMS_TEMPLATE, PartialCustomsTemplateInput, update_customs_templateVariables } from '@/purplship/graphql';


export type TemplateMutator = {
  createCustomsTemplate: (data: CustomsTemplateInput) => Promise<FetchResult<CustomsTemplateInput, Record<string, any>, Record<string, any>>>;
  updateCustomsTemplate: (data: PartialCustomsTemplateInput) => Promise<FetchResult<PartialCustomsTemplateInput, Record<string, any>, Record<string, any>>>;
  deleteCustomsTemplate: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
  deleteCommodity: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
}

export const CustomsMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const CustomsMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<CustomsTemplateInput, create_customs_templateVariables>(CREATE_CUSTOMS_TEMPLATE);
  const [updateMutation] = useMutation<PartialCustomsTemplateInput, update_customs_templateVariables>(UPDATED_CUSTOMS_TEMPLATE);
  const [deleteMutation] = useMutation<{ id: string }, delete_templateVariables>(DELETE_TEMPLATE);
  const [commodityDeleteMutation] = useMutation<{ id: string }, delete_templateVariables>(DISCARD_COMMODITY);

  const createCustomsTemplate = (data: CustomsTemplateInput) => createMutation({ variables: { data } });
  const updateCustomsTemplate = (data: PartialCustomsTemplateInput) => updateMutation({ variables: { data } });
  const deleteCustomsTemplate = (id: string) => deleteMutation({ variables: { data: { id } } });
  const deleteCommodity = (id: string) => commodityDeleteMutation({ variables: { data: { id } } });

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
