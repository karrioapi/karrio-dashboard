import { isNone, ServerError, ServerErrorCode } from '@/lib/helper';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const MainLayout: React.FC<{ error?: ServerError }> = ({ children, error }) => {
  return (
    <>
      <noscript>You need to enable JavaScript to run this app.</noscript>

      <div id="root" style={{ minHeight: "100vh" }} >
        {(error?.code !== ServerErrorCode.API_CONNECTION_ERROR)
          ? children
          : <section className="hero is-fullheight">
            <div className="container">
              <div className="has-text-centered mt-4 mb-5">
                <Link href="/" passHref>
                  <Image src="/logo.svg" width="100" height="100" alt="" />
                </Link>
              </div>

              <div className="card isolated-card my-6">
                <div className="card-content has-text-centered ">
                  <p>{error?.message}</p>
                </div>
              </div>
            </div>
          </section>}
      </div>
    </>
  )
};

export default MainLayout;
