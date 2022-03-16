import React from 'react';
import { useMutation } from '@apollo/client';
import { mutate_system_connection, MUTATE_SYSTEM_CONNECTION, mutate_system_connectionVariables, mutate_system_connection_mutate_system_connection, SystemCarrierMutationInput } from 'karrio/graphql';
import { handleGraphQLRequest } from '@/lib/helper';

type ConnectionMutator = {
  updateConnection: (data: SystemCarrierMutationInput) => Promise<mutate_system_connection_mutate_system_connection | null>
};

export const SystemConnectionMutationContext = React.createContext<ConnectionMutator>({} as ConnectionMutator);

const SystemConnectionsMutationProvider: React.FC<{}> = ({ children }) => {
  const [mutateConnection] = useMutation<mutate_system_connection, mutate_system_connectionVariables>(MUTATE_SYSTEM_CONNECTION);

  const updateConnection = (data: SystemCarrierMutationInput) => (
    handleGraphQLRequest("mutate_system_connection", mutateConnection)({ variables: { data } })
  );

  return (
    <SystemConnectionMutationContext.Provider value={{ updateConnection }}>
      {children}
    </SystemConnectionMutationContext.Provider>
  )
};

export function useSystemConnectionMutation() {
  return React.useContext(SystemConnectionMutationContext);
}

export default SystemConnectionsMutationProvider;
