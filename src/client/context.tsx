import React, { useEffect } from "react";
import getConfig from 'next/config';
import { KarrioClient } from "karrio/rest/index";
import * as apollo from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { BehaviorSubject } from "rxjs";
import { isNone } from "@/lib/helper";
import { useSession } from "next-auth/react";
import logger from "@/lib/logger";
import { SessionType } from "@/lib/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloLink } from "@apollo/client";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const BASE_PATH = (publicRuntimeConfig.BASE_PATH || '/').replace('//', '/');
export const TEST_BASE_PATH = (publicRuntimeConfig.BASE_PATH + '/test').replace('//', '/');
export const KARRIO_API = (
  typeof window === 'undefined'
    ? serverRuntimeConfig?.KARRIO_HOSTNAME
    : publicRuntimeConfig?.KARRIO_API_URL
);

logger.debug("API clients initialized for Server: " + KARRIO_API);

const queryClient = new QueryClient()
export const restClient = new BehaviorSubject<KarrioClient>(createRestContext());
export const RestContext = React.createContext<KarrioClient | undefined>(restClient.getValue());


export const ClientsProvider: React.FC<{ authenticated?: boolean }> = ({ children, authenticated }) => {
  const { data: session } = useSession() as (any & { data: SessionType });
  const sessionState = new BehaviorSubject<SessionType | null>(session);
  const [graphqlCli] = React.useState<apollo.ApolloClient<any> | undefined>(createGrapQLContext(sessionState));
  const [restCli] = React.useState<KarrioClient | undefined>(createRestContext(sessionState));

  sessionState.subscribe(_ => logger.debug('session updated'));

  useEffect(() => { sessionState.next(session) }, [session]);

  if (authenticated && !graphqlCli) return <></>;

  return (
    <QueryClientProvider client={queryClient}>
      <apollo.ApolloProvider client={graphqlCli as any}>
        <RestContext.Provider value={restCli}>
          {children}
        </RestContext.Provider>
      </apollo.ApolloProvider>
    </QueryClientProvider>
  );
};


function createRestContext(session?: BehaviorSubject<SessionType | null>): KarrioClient {
  const orgHeader = session?.value?.orgId ? { 'x-org-id': session?.value?.orgId } : {};
  const testHeader = session?.value?.testMode ? { 'x-test-mode': session?.value?.testMode } : {};
  const authHeader = session?.value?.accessToken ? `Bearer ${session?.value?.accessToken}` : "";

  return new KarrioClient({
    basePath: KARRIO_API || '',
    apiKey: authHeader,
    headers: { ...orgHeader, ...testHeader } as any,
    ...(typeof window !== 'undefined' ? {} : { fetchApi: require('node-fetch') }),
  });
}

function createGrapQLContext(session: BehaviorSubject<SessionType | null>): apollo.ApolloClient<any> {
  const httpLink = apollo.createHttpLink({
    uri: `${KARRIO_API || ''}/graphql`,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const orgHeader = session?.value?.orgId ? { 'x-org-id': session?.value?.orgId } : {};
    const testHeader = session?.value?.testMode ? { 'x-test-mode': session?.value?.testMode } : {};
    const authHeader = session?.value?.accessToken ? { 'authorization': `Bearer ${session?.value?.accessToken}` } : {};

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...orgHeader,
        ...testHeader,
        ...authHeader,
      }
    }));

    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) =>
        logger.debug(`[GraphQL error]: Message: ${message}`)
      );
    if (networkError) logger.debug(`[Network error]: ${networkError}`);
  });

  const GRAPHQL_QUERIES = [
    'logs', 'events', 'trackers', 'shipments', 'shipment',
    'customs_templates', 'address_templates', 'parcel_templates',
    'orders', 'order',
    'shipment_results', 'order_results', 'tracker_results',
  ];

  return new apollo.ApolloClient({
    link: apollo.from([errorLink, authMiddleware, httpLink]),
    cache: new apollo.InMemoryCache({
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
