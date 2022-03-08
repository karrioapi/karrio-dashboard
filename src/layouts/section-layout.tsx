import React from 'react';
import { p, ServerError } from '@/lib/helper';
import { Metadata, SessionType } from '@/lib/types';
import { SessionProvider } from 'next-auth/react';
import { ClientsProvider } from '@/client/context';
import MainLayout from '@/layouts/main-layout';

type SectionLayoutProps = {
  metadata?: Metadata,
  error?: ServerError,
  session?: SessionType,
};

const SectionLayout: React.FC<SectionLayoutProps> = ({ session, metadata, error, children }) => {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ClientsProvider>
        <MainLayout error={error}>
          <section className="hero is-fullheight">

            <div className="container">
              <div className="has-text-centered my-6 pt-5">
                <a href={p`/`} className="is-size-4 has-text-primary has-text-weight-bold is-lowercase">
                  {metadata?.APP_NAME}
                </a>
              </div>

              {children}

            </div>

            <div className="hero-footer">
              <div className="content has-text-centered">
                <p>
                  <a href={metadata?.APP_WEBSITE || ""} className="button is-white">&copy; {metadata?.APP_NAME}</a>
                  <a href="https://docs.karrio.io" className="button is-white">Documentation</a>
                </p>
              </div>
            </div>

          </section>
        </MainLayout>
      </ClientsProvider>
    </SessionProvider>
  );
};

export default SectionLayout;
