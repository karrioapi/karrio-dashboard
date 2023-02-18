import CreateOrganizationModalProvider from '@/components/create-organization-modal';
import AcceptInvitationProvider from '@/components/accept-invitation-modal';
import { forceSignOut, ServerError, ServerErrorCode } from '@/lib/helper';
import NextSessionProvider, { NextSession } from '@/context/session';
import { OrganizationProvider } from '@/context/organization';
import SubscriptionProvider from '@/context/subscription';
import ErrorBoundary from '@/components/error-boudaries';
import APIReferenceProvider from '@/context/reference';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { ClientsProvider } from '@/lib/client';
import LoadingProvider from '@/components/loader';
import AppModeProvider from '@/context/app-mode';
import Notifier from '@/components/notifier';


const CONTEXT_PROVIDERS: React.FC<any>[] = [
  OrganizationProvider,
  SubscriptionProvider,
  APIReferenceProvider,
  AppModeProvider,
  LoadingProvider,
];


const ContextProviders: React.FC = ({ children, ...props }) => {
  const NestedContexts = CONTEXT_PROVIDERS.reduce((_, Ctx) => <Ctx {...props}>{_}</Ctx>, children);

  return (
    <>
      <Notifier>{NestedContexts}</Notifier>
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
        forceSignOut();
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
