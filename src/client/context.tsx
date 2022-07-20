import React, { useEffect } from "react";
import getConfig from 'next/config';
import { KarrioClient } from "karrio/rest/index";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BehaviorSubject } from "rxjs";
import { isNone } from "@/lib/helper";
import { useSession } from "next-auth/react";
import logger from "@/lib/logger";
import { SessionType } from "@/lib/types";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const BASE_PATH = (publicRuntimeConfig.BASE_PATH || '/').replace('//', '/');
export const TEST_BASE_PATH = (publicRuntimeConfig.BASE_PATH + '/test').replace('//', '/');
export const KARRIO_API = (
  typeof window === 'undefined'
    ? serverRuntimeConfig?.KARRIO_HOSTNAME
    : publicRuntimeConfig?.KARRIO_API_URL
);

logger.debug("API clients initialized for Server: " + KARRIO_API);

export const restClient = new BehaviorSubject<KarrioClient>(createRestContext());
export const graphqlClient = new BehaviorSubject<ApolloClient<any>>(createGrapQLContext());
export const RestContext = React.createContext<KarrioClient | undefined>(restClient.getValue());


export const ClientsProvider: React.FC<{ authenticated?: boolean }> = ({ children, authenticated }) => {
  const { data: session } = useSession() as (any & { data: SessionType });
  const [graphqlCli, setGraphqlCli] = React.useState<ApolloClient<any> | undefined>();
  const [restCli, setRestCli] = React.useState<KarrioClient | undefined>();

  useEffect(() => {
    if (!isNone(session?.accessToken)) {

      setRestCli(createRestContext(session));
      !graphqlCli && setGraphqlCli(createGrapQLContext(session));
    }
  }, [session?.accessToken, session?.testMode, session?.orgId]);

  if (authenticated && !graphqlCli) return <></>;

  return (
    <ApolloProvider client={graphqlCli || createGrapQLContext()}>
      <RestContext.Provider value={restCli}>
        {children}
      </RestContext.Provider>
    </ApolloProvider>
  );
};


function createRestContext(session?: SessionType | null): KarrioClient {
  const orgHeader = session?.orgId ? { 'x-org-id': session?.orgId } : {};
  const testHeader = session?.testMode ? { 'x-test-mode': session?.testMode } : {};
  const authHeader = session?.accessToken ? `Bearer ${session?.accessToken}` : "";

  return new KarrioClient({
    basePath: KARRIO_API || '',
    apiKey: authHeader,
    headers: { ...orgHeader, ...testHeader } as any,
    ...(typeof window !== 'undefined' ? {} : { fetchApi: require('node-fetch') }),
  });
}

function createGrapQLContext(session?: SessionType | null): ApolloClient<any> {
  const httpLink = createHttpLink({
    uri: `${KARRIO_API || ''}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    const orgHeader = session?.orgId ? { 'x-org-id': session?.orgId } : {};
    const testHeader = session?.testMode ? { 'x-test-mode': session?.testMode } : {};
    const authHeader = session?.accessToken ? { 'authorization': `Bearer ${session?.accessToken}` } : {};

    return {
      headers: {
        ...headers,
        ...orgHeader,
        ...testHeader,
        ...authHeader,
      }
    }
  });

  const GRAPHQL_QUERIES = [
    'logs', 'events', 'trackers', 'shipments', 'shipment',
    'customs_templates', 'address_templates', 'parcel_templates',
    'orders', 'order',
    'shipment_results', 'order_results', 'tracker_results',
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
