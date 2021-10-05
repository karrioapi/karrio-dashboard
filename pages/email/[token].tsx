import SectionLayout from "@/components/layouts/section-layout";
import Spinner from "@/components/spinner";
import APIReferenceProvider from "@/context/references-provider";
import { CONFIRM_EMAIL } from "@/graphql";
import { isNone } from "@/lib/helper";
import { withReferences } from "@/lib/middleware";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect } from "react";


export default withReferences(({ references }) => {
  const router = useRouter();
  const { token } = router.query;
  const [confirm, { data, loading }] = useMutation(CONFIRM_EMAIL);

  const isConfirmed = (value?: any) => value?.success;

  useEffect(() => { !isNone(token) && confirm({variables: { data: {token} }}) }, [token]);

  return (
    <>
      <APIReferenceProvider references={references}>
        <SectionLayout>
          <Head><title>Sign Up Confirmation - {references?.app_name}</title></Head>

          <div className="card isolated-card my-6">
            <div className="card-content has-text-centered ">

            {loading && <Spinner/>}

            {(!loading && isConfirmed(data?.confirm_email)) && <p>Your account is verified!</p>}
            {(!loading && !isConfirmed(data?.confirm_email)) && <p>Error, invalid or expired account activation token!</p>}

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
