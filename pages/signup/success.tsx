import SectionLayout from "@/components/layouts/section-layout";
import APIReferenceProvider from "@/context/references-provider";
import { withReferences } from "@/lib/middleware";
import Head from "next/head";
import React from "react";


const SignUpSuccess = withReferences(({ references }) => {

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
            <a href="/login">Sign in</a>
          </div>

        </SectionLayout>
      </APIReferenceProvider>
    </>
  )
});


export default SignUpSuccess;
