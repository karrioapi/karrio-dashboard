import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { CreateAddressTemplateInput, CREATE_ADDRESS_TEMPLATE, create_address_templateVariables, DELETE_TEMPLATE, delete_templateVariables, UPDATED_ADDRESS_TEMPLATE, UpdateAddressTemplateInput, update_address_templateVariables } from '@purplship/graphql';


export type TemplateMutator = {
  createAddressTemplate: (data: CreateAddressTemplateInput) => Promise<FetchResult<CreateAddressTemplateInput, Record<string, any>, Record<string, any>>>;
  updateAddressTemplate: (data: UpdateAddressTemplateInput) => Promise<FetchResult<UpdateAddressTemplateInput, Record<string, any>, Record<string, any>>>;
  deleteAddressTemplate: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
}

export const AddressMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const AddressMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<CreateAddressTemplateInput, create_address_templateVariables>(CREATE_ADDRESS_TEMPLATE);
  const [updateMutation] = useMutation<UpdateAddressTemplateInput, update_address_templateVariables>(UPDATED_ADDRESS_TEMPLATE);
  const [deleteMutation] = useMutation<{ id: string }, delete_templateVariables>(DELETE_TEMPLATE);

  const createAddressTemplate = (data: CreateAddressTemplateInput) => createMutation({ variables: { data } });
  const updateAddressTemplate = (data: UpdateAddressTemplateInput) => updateMutation({ variables: { data } });
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
