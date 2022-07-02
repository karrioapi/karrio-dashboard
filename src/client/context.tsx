import React, { useEffect } from "react";
import getConfig from 'next/config';
import { KarrioClient, TokenPair } from "karrio/rest/index";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BehaviorSubject } from "rxjs";
import { isNone } from "@/lib/helper";
import { useSession } from "next-auth/react";
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

export const graphqlClient = new BehaviorSubject<ApolloClient<any>>(createGrapQLContext());
export const restClient = new BehaviorSubject<KarrioClient>(createRestContext());
export const RestContext = React.createContext<KarrioClient | undefined>(restClient.getValue());
export const OrgToken = new BehaviorSubject<{ [key: string]: TokenPair }>({});
const AuthToken = new BehaviorSubject<string | undefined>(undefined);


export const ClientsProvider: React.FC<{ authenticated?: boolean }> = ({ children, authenticated }) => {
  const { data: session } = useSession();
  const [graphqlCli, setGraphqlCli] = React.useState<ApolloClient<any> | undefined>();
  const [restCli, setRestCli] = React.useState<KarrioClient | undefined>();

  useEffect(() => {
    if (!isNone(session?.accessToken)) {
      AuthToken.next(session?.accessToken as string);

      setRestCli(createRestContext(session?.accessToken as string));
      !graphqlCli && setGraphqlCli(createGrapQLContext(session?.accessToken as string));
    }
  }, [session?.accessToken]);

  if (authenticated && !graphqlCli) return <></>;

  return (
    <ApolloProvider client={graphqlCli || createGrapQLContext(session?.accessToken as string)}>
      <RestContext.Provider value={restCli}>
        {children}
      </RestContext.Provider>
    </ApolloProvider>
  );
};


function createRestContext(accessToken?: string): KarrioClient {
  return new KarrioClient({
    basePath: KARRIO_API || '',
    apiKey: accessToken ? `Bearer ${accessToken}` : "",
    ...(typeof window !== 'undefined' ? {} : { fetchApi: require('node-fetch') }),
  });
}

function createGrapQLContext(accessToken?: string): ApolloClient<any> {
  const httpLink = createHttpLink({
    uri: `${KARRIO_API || ''}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: AuthToken.value ? `Bearer ${AuthToken.value}` : "",
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
