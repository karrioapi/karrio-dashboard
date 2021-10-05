import SectionLayout from "@/components/layouts/section-layout";
import APIReferenceProvider from "@/context/references-provider";
import { withReferences } from "@/lib/middleware";
import Head from "next/head";
import React from "react";


export default withReferences(({ references }) => (
  <>
    <APIReferenceProvider references={references}>
      <SectionLayout>
        <Head><title>Password Reset Sent - {references?.app_name}</title></Head>

        <div className="card isolated-card my-6">
          <div className="card-content has-text-centered">
            <p className="subtitle mb-4">Password Reset Sent</p>

            <p>We’ve emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly.</p>
            <p className="is-size-6 has-text-weight-light pt-2">If you don’t receive an email, please make sure you’ve entered the address you registered with, and check your spam folder.</p>

          </div>
        </div>

        <div className="has-text-centered my-4 is-size-6">
          <a href="/login">Sign in</a>
        </div>

      </SectionLayout>
    </APIReferenceProvider>
  </>
));
