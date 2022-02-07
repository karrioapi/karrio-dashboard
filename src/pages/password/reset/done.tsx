import SectionLayout from "@/layouts/section-layout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Metadata } from "@/lib/types";

export { getServerSideProps } from '@/lib/static/references';


export default function Page({ metadata }: { metadata: Metadata }) {
  return (
    <>
      <SectionLayout metadata={metadata}>
        <Head><title>Password Reset Complete - {metadata?.APP_NAME}</title></Head>

        <div className="card isolated-card my-6">
          <div className="card-content has-text-centered">
            <p className="subtitle mb-4">Password Reset Complete</p>

            <p>Your password has been set.</p>
            <p>You may go ahead and log in now.</p>

          </div>
        </div>

        <div className="has-text-centered my-4 is-size-6">
          <Link href="/login">Sign in</Link>
        </div>

      </SectionLayout>
    </>
  );
}
