import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { CreateConnectionInput, create_connection, CREATE_CONNECTION, create_connectionVariables, create_connection_create_connection, delete_connection, DELETE_CONNECTION, delete_connectionVariables, delete_connection_delete_connection, UpdateConnectionInput, update_connection, UPDATE_CONNECTION, update_connectionVariables, update_connection_update_connection } from '@purplship/graphql';
import { handleGraphQLRequest } from '@/lib/helper';

export type ConnectionMutator = {
  createConnection: (data: CreateConnectionInput) => Promise<create_connection_create_connection | null>;
  updateConnection: (data: UpdateConnectionInput) => Promise<update_connection_update_connection | null>;
  deleteConnection: (id: string) => Promise<delete_connection_delete_connection | null>;
}

export const ConnectionMutationContext = React.createContext<ConnectionMutator>({} as ConnectionMutator);

const ConnectionMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<create_connection, create_connectionVariables>(CREATE_CONNECTION);
  const [updateMutation] = useMutation<update_connection, update_connectionVariables>(UPDATE_CONNECTION);
  const [deleteMutation] = useMutation<delete_connection, delete_connectionVariables>(DELETE_CONNECTION);

  const createConnection = (data: CreateConnectionInput) => (
    handleGraphQLRequest("create_connection", createMutation)({ variables: { data } })
  );
  const updateConnection = (data: UpdateConnectionInput) => (
    handleGraphQLRequest("update_connection", updateMutation)({ variables: { data } })
  );
  const deleteConnection = (id: string) => (
    handleGraphQLRequest("delete_connection", deleteMutation)({ variables: { data: { id } } })
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
