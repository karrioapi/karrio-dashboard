import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { CreateAddressTemplateInput, CREATE_ADDRESS_TEMPLATE, create_address_templateVariables, DELETE_TEMPLATE, delete_templateVariables, UPDATED_ADDRESS_TEMPLATE, UpdateAddressTemplateInput, update_address_templateVariables, create_address_template, update_address_template, delete_template, delete_template_delete_template, update_address_template_update_address_template, create_address_template_create_address_template } from '@purplship/graphql';
import { handleGraphQLRequest } from '@/lib/helper';


export type TemplateMutator = {
  createAddressTemplate: (data: CreateAddressTemplateInput) => Promise<create_address_template_create_address_template | null>;
  updateAddressTemplate: (data: UpdateAddressTemplateInput) => Promise<update_address_template_update_address_template | null>;
  deleteAddressTemplate: (id: string) => Promise<delete_template_delete_template | null>;
}

export const AddressMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const AddressMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<create_address_template, create_address_templateVariables>(CREATE_ADDRESS_TEMPLATE);
  const [updateMutation] = useMutation<update_address_template, update_address_templateVariables>(UPDATED_ADDRESS_TEMPLATE);
  const [deleteMutation] = useMutation<delete_template, delete_templateVariables>(DELETE_TEMPLATE);

  const createAddressTemplate = (data: CreateAddressTemplateInput) => (
    handleGraphQLRequest("create_address_template", createMutation)({ variables: { data } })
  );
  const updateAddressTemplate = (data: UpdateAddressTemplateInput) => (
    handleGraphQLRequest("update_address_template", updateMutation)({ variables: { data } })
  );
  const deleteAddressTemplate = (id: string) => (
    handleGraphQLRequest("delete_template", deleteMutation)({ variables: { data: { id } } })
  );

  return (
    <AddressMutationContext.Provider value={{
      createAddressTemplate,
      updateAddressTemplate,
      deleteAddressTemplate,
    }}>
      {children}
    </AddressMutationContext.Provider>
  )
};

export default AddressMutationProvider;
