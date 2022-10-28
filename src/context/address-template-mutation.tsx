import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { CreateAddressTemplateInput, CREATE_ADDRESS_TEMPLATE, create_address_templateVariables, DELETE_TEMPLATE, delete_templateVariables, UPDATED_ADDRESS_TEMPLATE, UpdateAddressTemplateInput, update_address_templateVariables, create_address_template, update_address_template, delete_template, delete_template_delete_template, update_address_template_update_address_template, create_address_template_create_address_template, DELETE_ADDRESS_TEMPLATE, GET_ADDRESS_TEMPLATES } from 'karrio/graphql';
import { getSessionHeader, handleGraphQLRequest, request } from '@/lib/helper';
import * as rQuery from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { SessionType } from '@/lib/types';


export type TemplateMutator = {
  createAddressTemplate: (data: CreateAddressTemplateInput) => Promise<create_address_template_create_address_template | null>;
  updateAddressTemplate: (data: UpdateAddressTemplateInput) => Promise<update_address_template_update_address_template | null>;
  deleteAddressTemplate: (id: string) => Promise<delete_template_delete_template | null>;
}

export const AddressMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const AddressMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<create_address_template, create_address_templateVariables>(gql`${CREATE_ADDRESS_TEMPLATE}`);
  const [updateMutation] = useMutation<update_address_template, update_address_templateVariables>(gql`${UPDATED_ADDRESS_TEMPLATE}`);
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

export function useAddressTemplateMutation() {
  const { data: session } = useSession();
  const queryClient = rQuery.useQueryClient();
  const config = () => ({
    config: { headers: getSessionHeader(session as SessionType) }
  });

  // Mutations
  const createAddressTemplate = rQuery.useMutation(
    (data: CreateAddressTemplateInput) => request({ query: CREATE_ADDRESS_TEMPLATE, variables: { data }, ...config() }), {
    onSuccess: () => { queryClient.invalidateQueries(['addresses']) },
  });
  const updateAddressTemplate = rQuery.useMutation(
    (data: UpdateAddressTemplateInput) => request({ query: UPDATED_ADDRESS_TEMPLATE, variables: { data }, ...config() }), {
    onSuccess: () => { queryClient.invalidateQueries(['addresses']) },
  });
  const deleteAddressTemplate = rQuery.useMutation(
    (id: string) => request({ query: DELETE_ADDRESS_TEMPLATE, variables: { id }, ...config() }), {
    onSuccess: () => { queryClient.invalidateQueries(['addresses']) },
  });

  return { createAddressTemplate, updateAddressTemplate, deleteAddressTemplate };
}

export default AddressMutationProvider;
