import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { AddressTemplateInput, CREATE_ADDRESS_TEMPLATE, create_address_templateVariables, DELETE_TEMPLATE, delete_templateVariables, UPDATED_ADDRESS_TEMPLATE, PartialAddressTemplateInput, update_address_templateVariables } from '@/graphql';


export type TemplateMutator<T> = T & {
  createTemplate: (data: AddressTemplateInput) => Promise<FetchResult<AddressTemplateInput, Record<string, any>, Record<string, any>>>;
  updateTemplate: (data: PartialAddressTemplateInput) => Promise<FetchResult<PartialAddressTemplateInput, Record<string, any>, Record<string, any>>>;
  deleteTemplate: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
}

const AddressTemplateMutation = <T extends {}>(Component: React.FC<TemplateMutator<T>>) => (
  function AddressTemplateMutationWrapper({ children, ...props }: any) {
    const [createMutation] = useMutation<AddressTemplateInput, create_address_templateVariables>(CREATE_ADDRESS_TEMPLATE);
    const [updateMutation] = useMutation<PartialAddressTemplateInput, update_address_templateVariables>(UPDATED_ADDRESS_TEMPLATE);
    const [deleteMutation] = useMutation<{ id: string }, delete_templateVariables>(DELETE_TEMPLATE);

    const createTemplate = (data: AddressTemplateInput) => createMutation({ variables: { data } });
    const updateTemplate = (data: PartialAddressTemplateInput) => updateMutation({ variables: { data } });
    const deleteTemplate = (id: string) => deleteMutation({ variables: { data: { id } } });

    return (
      <Component {...props}
        createTemplate={createTemplate}
        updateTemplate={updateTemplate}
        deleteTemplate={deleteTemplate}
      >
        {children}
      </Component>
    );
  }
);

export default AddressTemplateMutation;
