import React, { useEffect } from "react";
import { PurplshipClient, TokenPair } from "@/api/index";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BehaviorSubject, Subject } from "rxjs";
import { isNone } from "@/lib/helper";
import { useSession } from "next-auth/client";

const PURPLSHIP_API_URL = process.env.NEXT_PUBLIC_PURPLSHIP_API_URL || 'https://api.purplship.com';

export const AuthToken = new Subject<TokenPair>();
export const graphqlClient = new BehaviorSubject<ApolloClient<any>>(createGrapQLContext());
export const restClient = new BehaviorSubject<PurplshipClient>(createRestContext());
export const RestContext = React.createContext<PurplshipClient | undefined>(restClient.getValue());

AuthToken.subscribe(async ({ access }) => {
  graphqlClient.next(createGrapQLContext(access));
  restClient.next(createRestContext(access));
});


export const ClientsProvider: React.FC = ({ children }) => {
  const [session] = useSession();
  const [graphqlCli, setGraphqlCli] = React.useState<ApolloClient<any>>(createGrapQLContext());
  const [restCli, setRestCli] = React.useState<PurplshipClient | undefined>();

  useEffect(() => {
    if (!isNone(session?.accessToken)) {
      setGraphqlCli(createGrapQLContext(session?.accessToken as string));
      setRestCli(createRestContext(session?.accessToken as string));
    }
  }, [session]);

  return (
    <ApolloProvider client={graphqlCli}>
      <RestContext.Provider value={restCli}>
        {children}
      </RestContext.Provider>
    </ApolloProvider>
  );
};


export async function authenticate(credentials: { email: string, password: string }) {
  const { data } = await restClient.getValue().API.authenticate(credentials);

  AuthToken.next(data);

  return data;
}

export async function refreshToken(refresh: string) {
  const { data } = await restClient.getValue().API.refreshToken({ refresh });
  const token = { refresh, access: data.access } as TokenPair;

  AuthToken.next(token);

  return token;
}


function createRestContext(accessToken?: string): PurplshipClient {
  return new PurplshipClient({
    basePath: PURPLSHIP_API_URL,
    apiKey: accessToken ? `Bearer ${accessToken}` : "",
  });
}

function createGrapQLContext(accessToken?: string): ApolloClient<any> {
  const httpLink = createHttpLink({
    uri: `${PURPLSHIP_API_URL}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      }
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({ addTypename: false })
  });
}
