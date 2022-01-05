import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { CreateConnectionInput, CREATE_CONNECTION, create_connectionVariables, DELETE_CONNECTION, delete_connectionVariables, UpdateConnectionInput, UPDATE_CONNECTION, update_connectionVariables } from '@purplship/graphql';

export type ConnectionMutator = {
  createConnection: (data: CreateConnectionInput) => Promise<FetchResult<CreateConnectionInput, Record<string, any>, Record<string, any>>>;
  updateConnection: (data: UpdateConnectionInput) => Promise<FetchResult<UpdateConnectionInput, Record<string, any>, Record<string, any>>>;
  deleteConnection: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
}

export const ConnectionMutationContext = React.createContext<ConnectionMutator>({} as ConnectionMutator);

const ConnectionMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<CreateConnectionInput, create_connectionVariables>(CREATE_CONNECTION);
  const [updateMutation] = useMutation<UpdateConnectionInput, update_connectionVariables>(UPDATE_CONNECTION);
  const [deleteMutation] = useMutation<{ id: string }, delete_connectionVariables>(DELETE_CONNECTION);

  const createConnection = (data: CreateConnectionInput) => createMutation({ variables: { data } });
  const updateConnection = (data: UpdateConnectionInput) => updateMutation({ variables: { data } });
  const deleteConnection = (id: string) => deleteMutation({ variables: { data: { id } } });

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
