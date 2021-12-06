import React, { useEffect } from "react";
import getConfig from 'next/config';
import { PurplshipClient, TokenObtainPair, TokenPair } from "@/purplship/rest/index";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BehaviorSubject, Subject } from "rxjs";
import { isNone } from "@/lib/helper";
import { useSession } from "next-auth/client";
import logger from "@/lib/logger";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
export const BASE_PATH = (publicRuntimeConfig.BASE_PATH || '/').replaceAll('//', '/');
export const TEST_BASE_PATH = (publicRuntimeConfig.BASE_PATH + '/test').replaceAll('//', '/');
export const PURPLSHIP_API = (
  typeof window === 'undefined'
    ? serverRuntimeConfig?.PURPLSHIP_HOSTNAME
    : publicRuntimeConfig?.PURPLSHIP_API_URL
)

export const AuthToken = new Subject<TokenPair>();
export const graphqlClient = new BehaviorSubject<ApolloClient<any>>(createGrapQLContext());
export const restClient = new BehaviorSubject<PurplshipClient>(createRestContext());
export const RestContext = React.createContext<PurplshipClient | undefined>(restClient.getValue());
export const OrgToken = new BehaviorSubject<TokenPair | undefined>(undefined);

AuthToken.subscribe(async ({ access }: { access?: string }) => {
  graphqlClient.next(createGrapQLContext(access));
  restClient.next(createRestContext(access));
});

logger.debug("API clients initialized for Server: " + PURPLSHIP_API);

export const ClientsProvider: React.FC = ({ children }) => {
  const [session] = useSession();
  const [graphqlCli, setGraphqlCli] = React.useState<ApolloClient<any>>(graphqlClient.getValue());
  const [restCli, setRestCli] = React.useState<PurplshipClient | undefined>();

  useEffect(() => {
    if (!isNone(session?.accessToken)) {
      const newCli = createRestContext(session?.accessToken as string);

      if (newCli !== restCli) {
        setGraphqlCli(createGrapQLContext(session?.accessToken as string));
        setRestCli(newCli);
      }
    }
  }, [session?.accessToken]);

  return (
    <ApolloProvider client={graphqlCli}>
      <RestContext.Provider value={restCli}>
        {children}
      </RestContext.Provider>
    </ApolloProvider>
  );
};


export async function authenticate(data: TokenObtainPair) {
  const token = await restClient.getValue().API.authenticate({ data });

  AuthToken.next(token);

  return token;
}

export async function refreshToken(refresh: string, org_id?: string) {
  const response = await restClient.getValue().API.refreshToken({
    data: { refresh, ...(isNone(org_id) ? {} : { org_id }) }
  });
  const token = {
    refresh: response.refresh,
    access: response.access
  } as TokenPair;

  AuthToken.next(token);

  return token;
}

function createRestContext(accessToken?: string): PurplshipClient {
  return new PurplshipClient({
    basePath: PURPLSHIP_API || '',
    apiKey: accessToken ? `Bearer ${accessToken}` : "",
    ...(typeof window !== 'undefined' ? {} : { fetchApi: require('node-fetch') }),
  });
}

function createGrapQLContext(accessToken?: string): ApolloClient<any> {
  const httpLink = createHttpLink({
    uri: `${PURPLSHIP_API || ''}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      }
    }
  });

  const GRAPHQL_QUERIES = [
    'logs', 'events', 'shipments', 'trackers',
    'customs_templates', 'address_templates', 'parcel_templates'
  ];

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false,
      typePolicies: {
        Query: {
          fields: {
            ...(GRAPHQL_QUERIES.reduce((fields, field) => ({
              ...fields,
              [field]: {
                keyArgs: false,
                merge(existing = {}, incoming = {}) {
                  return { ...existing, ...incoming };
                },
              }
            }), {}))
          },
        },
      },
    })
  });
}
