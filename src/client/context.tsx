import { useSyncedSession } from "@/context/session";
import { KarrioClient } from "karrio/rest/index";
import { BehaviorSubject, filter } from "rxjs";
import { SessionType } from "@/lib/types";
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
  const { query: { data: session } } = useSyncedSession() as (any & { query: { data: SessionType } });
  const [restCli] = React.useState<KarrioClient | undefined>(createRestContext(session$));

  useEffect(() => { if (session) { session$.next(session); } }, [session]);

  if (authenticated && !restCli) return <></>;

  return (
    <RestContext.Provider value={restCli}>
      {children}
    </RestContext.Provider>
  );
};


function createRestContext(session$: BehaviorSubject<SessionType | null>): KarrioClient {
  const client = new KarrioClient({ basePath: `${KARRIO_API || ''}` });

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
