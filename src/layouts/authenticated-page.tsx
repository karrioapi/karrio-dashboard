import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import UserProvider from '@/context/user-provider';
import OrganizationsProvider from '@/context/organizations-provider';
import APIReferenceProvider from '@/context/references-provider';
import { AuthToken } from '@/client/context';
import { TokenPair } from '@purplship/rest';
import AppModeProvider from '@/context/app-mode-provider';
import LoadingProvider from '@/components/loader';
import TokenProvider from '@/context/token-provider';
import Notifier from '@/components/notifier';
import Footer from '@/components/footer';
import NextSessionProvider, { NextSession } from '@/context/next-session-provider';
import ErrorBoundary from '@/components/error-boudaries';


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

const AuthenticatedPage = (content: any, pageProps?: any | {}) => {
  const SessionWrapper: React.FC = ({ children }) => {
    const router = useRouter();
    const session = useContext(NextSession);

    useEffect(() => {
      if (session === null || session?.error === "RefreshAccessTokenError") {
        router.push('/login?next=' + window.location.pathname + window.location.search);
      }
      if (session?.accessToken) {
        AuthToken.next({ access: session?.accessToken } as TokenPair);
      }
    }, [session]);

    if (!session) return <></>;

    return (
      <ContextProviders {...(pageProps || {})}>
        <ErrorBoundary>
          {children}
          <Footer />
        </ErrorBoundary>
      </ContextProviders>
    );
  };

  return (
    <NextSessionProvider>
      <SessionWrapper>{content}</SessionWrapper>
    </NextSessionProvider>
  )
};

AuthenticatedPage.whyDidYouRender = true

export default AuthenticatedPage;
