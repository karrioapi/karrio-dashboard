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
import NextSessionProvider, { NextSession } from '@/context/next-session-provider';
import ErrorBoundary from '@/components/error-boudaries';
import SubscriptionProvider from '@/context/subscription-provider';
import AcceptInvitationProvider from '@/components/accept-invitation-modal';
import CreateOrganizationModalProvider from '@/components/create-organization-modal';
import { forceSignOut, ServerError, ServerErrorCode } from '@/lib/helper';
import { getSession } from 'next-auth/react';


const CONTEXT_PROVIDERS: React.FC<any>[] = [
  OrganizationsProvider,
  SubscriptionProvider,
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
  const SessionWrapper: React.FC<{ error?: ServerError }> = ({ children, error }) => {
    const router = useRouter();
    const session = useContext(NextSession);

    useEffect(() => {
      if (session === null || (session as any)?.error === "RefreshAccessTokenError") {
        router.push('/login?next=' + window.location.pathname + window.location.search);
      }
      if (error?.code === ServerErrorCode.API_AUTH_ERROR) {
        getSession()
          .then(_session => { if (_session === null) forceSignOut(); })
          .catch(_ => forceSignOut());
      }
    }, [session, error]);

    return (
      <>
        <ClientsProvider authenticated={true}>
          <ContextProviders {...(pageProps || {})}>
            <ErrorBoundary>
              {session && children}
            </ErrorBoundary>
          </ContextProviders>
        </ClientsProvider>
      </>
    );
  };

  return (
    <NextSessionProvider>
      <SessionWrapper {...(pageProps || {})}>
        <AcceptInvitationProvider>
          <CreateOrganizationModalProvider>

            {content}

          </CreateOrganizationModalProvider>
        </AcceptInvitationProvider>
      </SessionWrapper>
    </NextSessionProvider>
  )
};

export default AuthenticatedPage;
