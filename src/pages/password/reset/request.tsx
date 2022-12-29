import { request_password_reset, REQUEST_PASSWORD_RESET } from "karrio/graphql";
import ButtonField from "@/components/generic/button-field";
import SectionLayout from "@/layouts/section-layout";
import { useRouter } from "next/dist/client/router";
import LoadingProvider from "@/components/loader";
import React, { FormEvent, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Metadata } from "@/lib/types";
import { p } from "@/lib/helper";
import Head from "next/head";
import Link from "next/link";

export { getServerSideProps } from '@/lib/static/references';


export default function Page({ metadata }: { metadata: Metadata }) {

  const Component: React.FC<{}> = () => {
    const router = useRouter();
    const email = useRef<HTMLInputElement>(null);
    const [send_request, { loading }] = useMutation(REQUEST_PASSWORD_RESET);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { data } = await send_request({
        variables: {
          data: {
            email: email.current?.value,
            redirect_url: location.origin + p`/password/reset`
          }
        }
      }) as { data: request_password_reset };

      if ((data?.request_password_reset?.errors || []).length === 0) router.push(`/password/reset/sent`)
    };

    return (
      <>
        <div className="card isolated-card">
          <div className="card-content">
            <p className="subtitle has-text-centered mb-4">Forgotten your password?</p>
            <p className="has-text-centered mb-4">Enter your email address below, and we’ll email instructions for setting a new one.</p>

            <form method="post" onSubmit={onSubmit}>

              <div className="field mt-6">
                <div className="control">
                  <input className="input" id="id_email" name="email" type="email" placeholder="Email" ref={email} required />
                </div>
              </div>

              <ButtonField type="submit"
                disabled={loading}
                className={`is-primary is-fullwidth mt-6`}
                controlClass="has-text-centered">
                <span>Reset my password</span>
              </ButtonField>

            </form>

          </div>
        </div>

        <div className="has-text-centered my-4 is-size-6">
          <span>Return to <Link href="/login">Sign in</Link></span>
        </div>
      </>
    )
  };

  return (
    <>
      <SectionLayout metadata={metadata}>
        <Head><title>Password Reset - {metadata?.APP_NAME}</title></Head>

        <LoadingProvider>
          <Component />
        </LoadingProvider>

      </SectionLayout>
    </>
  )
}
