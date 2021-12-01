import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import UserProvider from '@/context/user-provider';
import OrganizationsProvider from '@/context/organizations-provider';
import APIReferenceProvider from '@/context/references-provider';
import { isNone } from '@/lib/helper';
import { AuthToken, RestContext } from '@/client/context';
import { PurplshipClient, TokenPair } from '@/api';
import AppModeProvider from '@/context/app-mode-provider';
import LoadingProvider from '@/components/loader';
import TokenProvider from '@/context/token-provider';
import Notifier from '@/components/notifier';
import Footer from '@/components/footer';


const CONTEXT_PROVIDERS: React.FC<any>[] = [
  OrganizationsProvider,
  APIReferenceProvider,
  AppModeProvider,
  LoadingProvider,
  TokenProvider,
  Notifier,
];


const ContextProviders: React.FC = ({ children, ...props }) => {
  const NestedContexts = CONTEXT_PROVIDERS.reduce((_, Ctx) => <Ctx {...props}>{_}</Ctx>, children);

  return (
    <>
      <UserProvider {...props}>{NestedContexts}</UserProvider>
    </>
  );
};

const AuthorizedPage = (children: any, pageProps?: any | {}) => {
  const router = useRouter();
  const [session] = useSession();
  const purplship = useContext(RestContext);

  const isReady = (purplship?: PurplshipClient) => {
    return ((purplship?.config.apiKey as string || '').length > 0);
  };

  useEffect(() => {
    if (session === null || session?.error === "RefreshAccessTokenError") {
      router.push('/login?next=' + window.location.pathname);
    }
    if (!isNone(session?.accessToken)) {
      AuthToken.next({ access: session?.accessToken } as TokenPair);
    }
  }, [session, router]);

  return (
    <ContextProviders {...(pageProps || {})}>
      {isReady(purplship) && <>

        {children}
        <Footer />

      </>}
    </ContextProviders>
  );
};

export default AuthorizedPage;
