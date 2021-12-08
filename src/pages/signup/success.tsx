import { References } from "@/purplship/rest";
import SectionLayout from "@/layouts/section-layout";
import APIReferenceProvider from "@/context/references-provider";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export { getServerSideProps } from '@/lib/static/references';


const SignUpSuccess: NextPage<any, { references: References }> = ({ references }) => {

  return (
    <>
      <APIReferenceProvider references={references}>
        <SectionLayout>
          <Head><title>Sign Up Success - {references?.app_name}</title></Head>

          <div className="card isolated-card my-6">
            <div className="card-content has-text-centered ">

              <p>Your account has been created.</p>
              <p>Check your registration email inbox to verify the address and activate your account.</p>

            </div>
          </div>

          <div className="has-text-centered my-4 is-size-6">
            <Link href="/login">Sign in</Link>
          </div>

        </SectionLayout>
      </APIReferenceProvider>
    </>
  )
};


export default SignUpSuccess;
