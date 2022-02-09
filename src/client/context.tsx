import React, { useEffect } from "react";
import getConfig from 'next/config';
import { PurplshipClient, TokenObtainPair, TokenPair } from "@purplship/rest/index";
import { ApolloClient, ApolloConsumer, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BehaviorSubject, filter, Subject } from "rxjs";
import { isNone } from "@/lib/helper";
import { useSession } from "next-auth/react";
import logger from "@/lib/logger";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
export const BASE_PATH = (publicRuntimeConfig.BASE_PATH || '/').replaceAll('//', '/');
export const TEST_BASE_PATH = (publicRuntimeConfig.BASE_PATH + '/test').replaceAll('//', '/');
export const PURPLSHIP_API = (
  typeof window === 'undefined'
    ? serverRuntimeConfig?.PURPLSHIP_HOSTNAME
    : publicRuntimeConfig?.PURPLSHIP_API_URL
);

logger.debug("API clients initialized for Server: " + PURPLSHIP_API);

export const graphqlClient = new BehaviorSubject<ApolloClient<any>>(createGrapQLContext());
export const restClient = new BehaviorSubject<PurplshipClient>(createRestContext());
export const RestContext = React.createContext<PurplshipClient | undefined>(restClient.getValue());
export const OrgToken = new BehaviorSubject<TokenPair | undefined>(undefined);


export const ClientsProvider: React.FC<{ authenticated?: boolean }> = ({ children, authenticated }) => {
  const { data: session } = useSession();
  const [graphqlCli, setGraphqlCli] = React.useState<ApolloClient<any> | undefined>();
  const [restCli, setRestCli] = React.useState<PurplshipClient | undefined>();

  useEffect(() => {
    if (!isNone(session?.accessToken)) {
      setRestCli(createRestContext(session?.accessToken as string));
      setGraphqlCli(createGrapQLContext(session?.accessToken as string));
    }
  }, [session?.accessToken]);

  if (authenticated && !graphqlCli) return <></>;

  return (
    <ApolloProvider client={graphqlCli || createGrapQLContext(session?.accessToken as string)}>
      <RestContext.Provider value={restCli}>
        <ApolloConsumer>{
          client => client && <>{children}</>
        }</ApolloConsumer>
      </RestContext.Provider>
    </ApolloProvider>
  );
};


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
    'logs', 'events', 'trackers', 'shipments', 'shipment',
    'customs_templates', 'address_templates', 'parcel_templates',
    'orders', 'order',
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
