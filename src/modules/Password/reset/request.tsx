import ButtonField from "@/components/generic/button-field";
import SectionLayout from "@/layouts/section-layout";
import { useRouter } from "next/dist/client/router";
import LoadingProvider from "@/components/loader";
import React, { FormEvent, useRef } from "react";
import { useUserMutation } from "@/context/user";
import { p } from "@/lib/client";
import Head from "next/head";
import Link from "next/link";

export { getServerSideProps } from '@/lib/data-fetching/metadata';


export default function Page(pageProps: any) {

  const Component: React.FC<{}> = () => {
    const router = useRouter();
    const email = useRef<HTMLInputElement>(null);
    const { requestPasswordReset: { isLoading, mutateAsync } } = useUserMutation();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { request_password_reset } = await mutateAsync({
        email: email.current?.value as string,
        redirect_url: location.origin + p`/password/reset`
      });

      if ((request_password_reset?.errors || []).length === 0) router.push(`/password/reset/sent`)
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
                disabled={isLoading}
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
      <SectionLayout {...pageProps}>
        <Head><title>{`Password Reset - ${pageProps.metadata?.APP_NAME}`}</title></Head>

        <LoadingProvider>
          <Component />
        </LoadingProvider>

      </SectionLayout>
    </>
  )
}
