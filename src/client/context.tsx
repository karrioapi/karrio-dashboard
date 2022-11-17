import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onError } from "@apollo/client/link/error";
import { KarrioClient } from "karrio/rest/index";
import { BehaviorSubject, filter } from "rxjs";
import { useSession } from "next-auth/react";
import { ApolloLink } from "@apollo/client";
import { SessionType } from "@/lib/types";
import * as apollo from "@apollo/client";
import React, { useEffect } from "react";
import { isNone } from "@/lib/helper";
import getConfig from 'next/config';
import logger from "@/lib/logger";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const BASE_PATH = (publicRuntimeConfig.BASE_PATH || '/').replace('//', '/');
export const TEST_BASE_PATH = (publicRuntimeConfig.BASE_PATH + '/test').replace('//', '/');
export const KARRIO_API = (
  typeof window === 'undefined'
    ? serverRuntimeConfig?.KARRIO_HOSTNAME
    : publicRuntimeConfig?.KARRIO_API_URL
);

logger.debug("API clients initialized for Server: " + KARRIO_API);

const queryClient = new QueryClient();
const session$ = new BehaviorSubject<SessionType | null>(null);
export const rest$ = new BehaviorSubject<KarrioClient | undefined>(createRestContext(session$));
export const RestContext = React.createContext<KarrioClient | undefined>(createRestContext(session$));

session$
  .pipe(filter(_ => !isNone(_)))
  .subscribe(_ => {
    console.log('session updated');
    rest$.next(createRestContext(session$));
  });


export const ClientsProvider: React.FC<{ authenticated?: boolean }> = ({ children, authenticated }) => {
  const { data: session } = useSession() as (any & { data: SessionType });
  const [restCli] = React.useState<KarrioClient | undefined>(createRestContext(session$));
  const [graphqlCli] = React.useState<apollo.ApolloClient<any> | undefined>(createGrapQLContext(session$));

  useEffect(() => { if (session) { session$.next(session); } }, [session]);

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


function createRestContext(session$: BehaviorSubject<SessionType | null>): KarrioClient {
  const client = new KarrioClient({ basePath: KARRIO_API || '' });

  client.axios.interceptors.request.use((config) => {
    const orgHeader: any = session$?.value?.orgId ? { 'x-org-id': session$?.value?.orgId } : {};
    const testHeader: any = session$?.value?.testMode ? { 'x-test-mode': session$?.value?.testMode } : {};
    const authHeader: any = session$?.value?.accessToken ? { 'authorization': `Bearer ${session$?.value?.accessToken}` } : {};

    config.headers = {
      ...config.headers,
      ...authHeader,
      ...orgHeader,
      ...testHeader
    };
    return config;
  });

  return client;
}

function createGrapQLContext(session$: BehaviorSubject<SessionType | null>): apollo.ApolloClient<any> {
  const httpLink = apollo.createHttpLink({ uri: `${KARRIO_API || ''}/graphql` });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
      const orgHeader = session$?.value?.orgId ? { 'x-org-id': session$?.value?.orgId } : {};
      const testHeader = session$?.value?.testMode ? { 'x-test-mode': session$?.value?.testMode } : {};
      const authHeader = session$?.value?.accessToken ? { 'authorization': `Bearer ${session$?.value?.accessToken}` } : {};

      return {
        headers: {
          ...headers,
          ...orgHeader,
          ...testHeader,
          ...authHeader,
        }
      }
    });

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
