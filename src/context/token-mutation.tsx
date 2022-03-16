import React, { useContext } from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { GetToken, mutate_token, MUTATE_TOKEN, mutate_tokenVariables, TokenMutationInput } from 'karrio/graphql';
import { TokenData } from '@/context/token-provider';
import { handleGraphQLRequest } from '@/lib/helper';

type TemplateMutator<T> = T & {
  updateToken: (data: TokenMutationInput) => Promise<FetchResult<GetToken, Record<string, any>, Record<string, any>>>;
}

export type TokenUpdateType = (data: TokenMutationInput) => Promise<FetchResult<GetToken, Record<string, any>, Record<string, any>>>;

const TokenMutation = <T extends {}>(Component: React.FC<TemplateMutator<T>>) => (
  function TokenMutationWrapper({ children, ...props }: any) {
    const [mutateToken] = useMutation<mutate_token, mutate_tokenVariables>(MUTATE_TOKEN);
    const { load } = useContext(TokenData);

    const updateToken = (data: TokenMutationInput) => (
      handleGraphQLRequest("mutate_token", mutateToken)({ variables: { data } })
        .then(() => load())
    );

    return (
      <Component {...props} updateToken={updateToken}>
        {children}
      </Component>
    );
  }
);

export default TokenMutation;
