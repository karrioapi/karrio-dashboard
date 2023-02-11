import { Metadata, SessionType } from '@/lib/types';
import { ClientsProvider } from '@/lib/client';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '@/layouts/main-layout';
import { p, ServerError } from '@/lib/helper';
import React from 'react';
import Link from 'next/link';

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
                  <Link legacyBehavior href="/" className="button is-white">
                    <span>&copy; {metadata?.APP_NAME}</span>
                  </Link>
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
