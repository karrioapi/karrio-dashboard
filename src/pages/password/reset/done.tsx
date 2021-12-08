import { References } from "@/purplship/rest";
import SectionLayout from "@/layouts/section-layout";
import APIReferenceProvider from "@/context/references-provider";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export { getServerSideProps } from '@/lib/static/references';


export default function Page({ references }: { references: References }) {
  return (
    <>
      <APIReferenceProvider references={references}>
        <SectionLayout>
          <Head><title>Password Reset Complete - {references?.app_name}</title></Head>

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
      </APIReferenceProvider>
    </>
  );
}
