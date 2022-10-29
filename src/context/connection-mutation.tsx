import React from 'react';
import { useMutation } from '@apollo/client';
import { CreateCarrierConnectionMutationInput, create_connection, CREATE_CONNECTION, create_connectionVariables, create_connection_create_carrier_connection, delete_connection, DELETE_CONNECTION, delete_connectionVariables, delete_connection_delete_carrier_connection, UpdateCarrierConnectionMutationInput, update_connection, UPDATE_CONNECTION, update_connectionVariables, update_connection_update_carrier_connection } from 'karrio/graphql';
import { handleGraphQLRequest } from '@/lib/helper';

export type ConnectionMutator = {
  createConnection: (data: CreateCarrierConnectionMutationInput) => Promise<create_connection_create_carrier_connection | null>;
  updateConnection: (data: UpdateCarrierConnectionMutationInput) => Promise<update_connection_update_carrier_connection | null>;
  deleteConnection: (id: string) => Promise<delete_connection_delete_carrier_connection | null>;
}

export const ConnectionMutationContext = React.createContext<ConnectionMutator>({} as ConnectionMutator);

const ConnectionMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<create_connection, create_connectionVariables>(CREATE_CONNECTION);
  const [updateMutation] = useMutation<update_connection, update_connectionVariables>(UPDATE_CONNECTION);
  const [deleteMutation] = useMutation<delete_connection, delete_connectionVariables>(DELETE_CONNECTION);

  const createConnection = (data: CreateCarrierConnectionMutationInput) => (
    handleGraphQLRequest("create_carrier_connection", createMutation)({ variables: { data } })
  );
  const updateConnection = (data: UpdateCarrierConnectionMutationInput) => (
    handleGraphQLRequest("update_carrier_connection", updateMutation)({ variables: { data } })
  );
  const deleteConnection = (id: string) => (
    handleGraphQLRequest("delete_carrier_connection", deleteMutation)({ variables: { data: { id } } })
  );

  return (
    <ConnectionMutationContext.Provider value={{
      createConnection,
      updateConnection,
      deleteConnection,
    }}>
      {children}
    </ConnectionMutationContext.Provider>
  )
};

export default ConnectionMutationProvider;
