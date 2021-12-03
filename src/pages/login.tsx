import { References } from "@/api";
import SectionLayout from "@/layouts/section-layout";
import APIReferenceProvider from "@/context/references-provider";
import { getCookie } from "@/lib/helper";
import { NextPage } from "next";
import { signIn } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, useRef } from "react";
import { useRouter } from "next/dist/client/router";
import { BASE_PATH } from "@/client/context";

export { getServerSideProps } from '@/lib/static/references';


const LoginPage: NextPage<any, { references: References }> = ({ references }) => {
  const router = useRouter();
  const [showError, setShowError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(false);
    setIsLoading(true);

    const org_id = getCookie('org_id');
    const response: any = await signIn('credentials', {
      redirect: false,
      email: email.current?.value,
      password: password.current?.value,
      ...((org_id || '').length == 0 ? {} : { org_id })
    });

    if (response.ok) {
      router.push(`${(new URLSearchParams(location.search)).get('next')?.replace(BASE_PATH, "") || '/'}`);
    } else {
      setIsLoading(false);
      setShowError(true);
    }
  };

  return (
    <>
      <APIReferenceProvider references={references}>
        <SectionLayout>
          <Head><title>Login - {references?.app_name}</title></Head>

          <div className="card isolated-card">
            <div className="card-content">
              <p className="subtitle has-text-centered">Sign in to your account</p>

              {showError && <p className="has-text-danger is-size-6 has-text-centered">
                Please enter a correct email address and password. <br />
                Note that both fields may be case-sensitive.
              </p>}

              <form method="post" onSubmit={onSubmit}>

                <div className="field mt-6">
                  <label className="label" htmlFor="id_email">Email</label>
                  <div className="control">
                    <input className="input" id="id_email" name="email" type="email" placeholder="Email" required ref={email} />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label level" htmlFor="id_password">
                    <span>Password</span>
                    <Link href="/password/reset/request" passHref><a className="is-size-7" tabIndex={-1}>Forgot your password?</a></Link>
                  </label>

                  <div className="control">
                    <input className="input" id="id_password" name="password" type="password" placeholder="Password" required ref={password} />
                  </div>
                </div>

                <div className="field mt-6">
                  <div className="control">
                    <input
                      disabled={isLoading}
                      className={"button is-primary is-fullwidth"}
                      type="submit"
                      value="Log in"
                    />
                  </div>
                </div>

              </form>
            </div>
          </div>

          <div className="has-text-centered my-4 is-size-6">
            Dont have an account? <Link href="/signup" passHref><a>Sign Up</a></Link>
          </div>
        </SectionLayout>
      </APIReferenceProvider>
    </>
  )
};

export default LoginPage;
