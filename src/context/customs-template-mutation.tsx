import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { CustomsTemplateInput, CREATE_CUSTOMS_TEMPLATE, create_customs_templateVariables, DELETE_TEMPLATE, delete_templateVariables, DISCARD_COMMODITY, UPDATED_CUSTOMS_TEMPLATE, PartialCustomsTemplateInput, update_customs_templateVariables } from '@/graphql';


export type TemplateMutator<T> = T & {
  createCustomsTemplate: (data: CustomsTemplateInput) => Promise<FetchResult<CustomsTemplateInput, Record<string, any>, Record<string, any>>>;
  updateCustomsTemplate: (data: PartialCustomsTemplateInput) => Promise<FetchResult<PartialCustomsTemplateInput, Record<string, any>, Record<string, any>>>;
  deleteTemplate: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
  deleteCommodity: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
}

const CustomsTemplateMutation = <T extends {}>(Component: React.FC<TemplateMutator<T>>) => (
  function CustomsTemplateMutationWrapper({ children, ...props }: any) {
    const [createMutation] = useMutation<CustomsTemplateInput, create_customs_templateVariables>(CREATE_CUSTOMS_TEMPLATE);
    const [updateMutation] = useMutation<PartialCustomsTemplateInput, update_customs_templateVariables>(UPDATED_CUSTOMS_TEMPLATE);
    const [deleteMutation] = useMutation<{ id: string }, delete_templateVariables>(DELETE_TEMPLATE);
    const [commodityDeleteMutation] = useMutation<{ id: string }, delete_templateVariables>(DISCARD_COMMODITY);

    const createCustomsTemplate = (data: CustomsTemplateInput) => createMutation({ variables: { data } });
    const updateCustomsTemplate = (data: PartialCustomsTemplateInput) => updateMutation({ variables: { data } });
    const deleteTemplate = (id: string) => deleteMutation({ variables: { data: { id } } });
    const deleteCommodity = (id: string) => commodityDeleteMutation({ variables: { data: { id } } });

    return (
      <Component {...props}
        createCustomsTemplate={createCustomsTemplate}
        updateCustomsTemplate={updateCustomsTemplate}
        deleteTemplate={deleteTemplate}
        deleteCommodity={deleteCommodity}
      >
        {children}
      </Component>
    );
  }
);

export default CustomsTemplateMutation;
