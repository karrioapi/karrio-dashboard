import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import UserProvider from '@/context/user-provider';
import OrganizationsProvider from '@/context/organizations-provider';
import APIReferenceProvider, { APIReference } from '@/context/references-provider';
import { isNone } from '@/lib/helper';
import { AuthToken, PURPLSHIP_API_URL, RestContext } from '@/client/context';
import { PurplshipClient, TokenPair } from '@/api';
import AppModeProvider from '@/context/app-mode-provider';
import LoadingProvider from '@/components/loader';
import TokenProvider from '@/context/token-provider';
import Notifier from '@/components/notifier';


const DATA_CONTEXTS = [
  OrganizationsProvider,
  APIReferenceProvider,
  AppModeProvider,
  LoadingProvider,
  TokenProvider,
  Notifier,
];


const ContextProviders: React.FC = ({ children }) => {
  const NestedContexts = DATA_CONTEXTS.reduce((_, Ctx) => <Ctx>{_}</Ctx>, children);

  return (
    <>
      <UserProvider>{NestedContexts}</UserProvider>
    </>
  );
};

const AuthorizedPage = (Component: React.FC) => {
  const router = useRouter();
  const [session] = useSession();
  const purplship = useContext(RestContext);
  const { app_website, app_name } = useContext(APIReference);

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

  if (!session) return <></>;

  return (
    <ContextProviders>
      {isReady(purplship) && <>

        <Component />

        <footer className="footer py-6">
          <div className="content columns">
            <div className="column"></div>
            <div className="column has-text-centered">
              <a href={ app_website }>
                <Image src="/favicon.svg" width="50" height="100%" alt={app_name} />
              </a>
            </div>
            <div className="column has-text-right-desktop">
              <a className="button is-white footer-api-reference-link" target="_blank" href={`${PURPLSHIP_API_URL}/openapi`}>
                <span>API Reference</span>
                <span className="icon is-small">
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </a>
              <a className="button is-white footer-api-reference-link" target="_blank" href={`${PURPLSHIP_API_URL}/graphql`}>
                <span>GraphQL</span>
                <span className="icon is-small">
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </a>
              <a className="button is-white footer-docs-link" target="_blank" href="https://docs.purplship.com">
                <span>Docs</span>
                <span className="icon is-small">
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </a>
            </div>
          </div>
        </footer>

      </>}
    </ContextProviders>
  );
};

export default AuthorizedPage;
