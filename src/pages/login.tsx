import { References } from "@/api";
import SectionLayout from "@/components/layouts/section-layout";
import APIReferenceProvider from "@/context/references-provider";
import { getCookie } from "@/lib/helper";
import { NextPage } from "next";
import { signIn } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, useRef } from "react";

export { getServerSideProps } from '@/static/references';


const LoginPage: NextPage<any, { references: References }> = ({ references }) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const org_id = getCookie('org_id');
    await signIn('credentials', {
      email: email.current?.value,
      password: password.current?.value,
      callbackUrl: `${(new URLSearchParams(location.search)).get('next') || '/'}`,
      ...((org_id || '').length == 0 ? {} : { org_id })
    });
  };

  return (
    <>
      <APIReferenceProvider references={references}>
        <SectionLayout>
          <Head><title>Login - {references?.app_name}</title></Head>

          <div className="card isolated-card">
            <div className="card-content">
              <p className="subtitle has-text-centered">Sign in to your account</p>

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
                    <Link href="/password/reset/request"><a className="is-size-7">Forgot your password?</a></Link>
                  </label>

                  <div className="control">
                    <input className="input" id="id_password" name="password" type="password" placeholder="Password" required ref={password} />
                  </div>
                </div>

                <div className="field mt-6">
                  <div className="control">
                    <input className="button is-primary is-fullwidth" type="submit" value="Log in" />
                  </div>
                </div>

              </form>
            </div>
          </div>

          <div className="has-text-centered my-4 is-size-6">
            Dont have an account? <Link href="/signup"><a>Sign Up</a></Link>
          </div>
        </SectionLayout>
      </APIReferenceProvider>
    </>
  )
};

export default LoginPage;
