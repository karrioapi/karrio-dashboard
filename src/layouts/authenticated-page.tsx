import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import UserProvider from '@/context/user-provider';
import OrganizationsProvider from '@/context/organizations-provider';
import APIReferenceProvider from '@/context/references-provider';
import { ClientsProvider } from '@/client/context';
import AppModeProvider from '@/context/app-mode-provider';
import LoadingProvider from '@/components/loader';
import TokenProvider from '@/context/token-provider';
import Notifier from '@/components/notifier';
import Footer from '@/components/footer';
import NextSessionProvider, { NextSession } from '@/context/next-session-provider';
import ErrorBoundary from '@/components/error-boudaries';
import AcceptInvitationProvider from '@/components/accept-invitation-modal';


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
      <UserProvider user={(props as any).user}>{NestedContexts}</UserProvider>
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
    }, [session]);

    return (
      <>
        <ClientsProvider authenticated={true}>
          <ContextProviders {...(pageProps || {})}>
            <ErrorBoundary>
              {session && children}
              <Footer />
            </ErrorBoundary>
          </ContextProviders>
        </ClientsProvider>
      </>
    );
  };

  return (
    <NextSessionProvider>
      <SessionWrapper>
        <AcceptInvitationProvider>
          {content}
        </AcceptInvitationProvider>
      </SessionWrapper>
    </NextSessionProvider>
  )
};

AuthenticatedPage.whyDidYouRender = true

export default AuthenticatedPage;
