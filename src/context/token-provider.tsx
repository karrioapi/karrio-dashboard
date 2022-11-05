import React from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GetToken, GetTokenVariables, GetToken_token, GET_TOKEN } from 'karrio/graphql';
import { setCookie, useLocation } from '@/lib/helper';

export type TokenType = GetToken_token;
type TokenDataType = LazyQueryResult<GetToken, any> & {
  token: TokenType;
  load: () => Promise<any>;
  authenticateOrg: (orgId: string) => Promise<any | undefined>
};

export const TokenData = React.createContext<TokenDataType>({ token: { key: '' } } as TokenDataType);

const TokenProvider: React.FC<any> = ({ children, orgId: org_id, org }) => {
  const { insertUrlParam } = useLocation();
  const [initialLoad, result] = useLazyQuery<GetToken, GetTokenVariables>(GET_TOKEN, { notifyOnNetworkStatusChange: true });

  const fetchMore = (options: any) => result.called ? result.fetchMore(options) : initialLoad(options);
  const load = () => {
    const variables = { org_id }
    return result.called ? fetchMore({ variables }) : initialLoad({ variables })
  };
  const authenticateOrg = async (orgId: string) => {
    setCookie("orgId", orgId);
    insertUrlParam({});
    setTimeout(() => location.reload(), 1000);
  };

  return (
    <TokenData.Provider value={{ load, authenticateOrg, token: (result?.data?.token || {} as TokenType), ...result }}>
      {children}
    </TokenData.Provider>
  );
};

export default TokenProvider;
