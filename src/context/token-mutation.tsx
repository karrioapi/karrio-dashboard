import React, { useContext } from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { GetToken, MUTATE_TOKEN, mutate_tokenVariables, TokenMutationInput } from '@/graphql';
import { TokenData } from '@/context/token-provider';

type TemplateMutator<T> = T & {
  updateToken: (data: TokenMutationInput) => Promise<FetchResult<GetToken, Record<string, any>, Record<string, any>>>;
}

export type TokenUpdateType = (data: TokenMutationInput) => Promise<FetchResult<GetToken, Record<string, any>, Record<string, any>>>;

const TokenMutation = <T extends {}>(Component: React.FC<TemplateMutator<T>>) => (
  function TokenMutationWrapper({ children, ...props }: any) {
    const [mutateToken] = useMutation<GetToken, mutate_tokenVariables>(MUTATE_TOKEN);
    const { load } = useContext(TokenData);

    const updateToken = (data: TokenMutationInput) => {
      return mutateToken({ variables: { data } }).then(() => load());
    };

    return (
      <Component {...props} updateToken={updateToken}>
        {children}
      </Component>
    );
  }
);

export default TokenMutation;
