import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { AddressTemplateInput, CREATE_ADDRESS_TEMPLATE, create_address_templateVariables, DELETE_TEMPLATE, delete_templateVariables, UPDATED_ADDRESS_TEMPLATE, PartialAddressTemplateInput, update_address_templateVariables } from '@/graphql';


export type TemplateMutator = {
  createAddressTemplate: (data: AddressTemplateInput) => Promise<FetchResult<AddressTemplateInput, Record<string, any>, Record<string, any>>>;
  updateAddressTemplate: (data: PartialAddressTemplateInput) => Promise<FetchResult<PartialAddressTemplateInput, Record<string, any>, Record<string, any>>>;
  deleteAddressTemplate: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
}

export const AddressMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const AddressMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<AddressTemplateInput, create_address_templateVariables>(CREATE_ADDRESS_TEMPLATE);
  const [updateMutation] = useMutation<PartialAddressTemplateInput, update_address_templateVariables>(UPDATED_ADDRESS_TEMPLATE);
  const [deleteMutation] = useMutation<{ id: string }, delete_templateVariables>(DELETE_TEMPLATE);

  const createAddressTemplate = (data: AddressTemplateInput) => createMutation({ variables: { data } });
  const updateAddressTemplate = (data: PartialAddressTemplateInput) => updateMutation({ variables: { data } });
  const deleteAddressTemplate = (id: string) => deleteMutation({ variables: { data: { id } } });

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
