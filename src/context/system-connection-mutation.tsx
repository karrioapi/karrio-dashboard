import React from 'react';
import { FetchResult, MutationFunctionOptions, MutationResult, useMutation } from '@apollo/client';
import { MUTATE_SYSTEM_CONNECTION, mutate_system_connectionVariables, SystemCarrierMutationInput } from '@purplship/graphql';

export type ConnectionMutator<T> = T & {
  mutateConnection: (data: SystemCarrierMutationInput) => Promise<FetchResult<SystemCarrierMutationInput, Record<string, any>, Record<string, any>>>;
}

export type ConnectionMutationType = (options?: MutationFunctionOptions<mutate_system_connectionVariables, {
  data: Partial<SystemCarrierMutationInput>;
}> | undefined) => Promise<FetchResult<SystemCarrierMutationInput, Record<string, any>, Record<string, any>>>;
export type ConnectionMutationResultType = MutationResult<SystemCarrierMutationInput>;

const SystemConnectionMutation = <T extends {}>(Component: React.FC<ConnectionMutator<T>>) => {
  return ({ children, ...props }: any) => {
    const [mutattion] = useMutation<SystemCarrierMutationInput, mutate_system_connectionVariables>(MUTATE_SYSTEM_CONNECTION);

    const mutateConnection = (data: SystemCarrierMutationInput) => mutattion({ variables: { data } });

    return (
      <Component {...props}
        mutateConnection={mutateConnection}
      >
        {children}
      </Component>
    );
  };
}

export default SystemConnectionMutation;
