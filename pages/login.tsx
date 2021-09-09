import SectionLayout from "@/components/section-layout";
import { signIn } from "next-auth/client";
import Head from "next/head";
import React, { FormEvent, useRef } from "react";


const Login: React.FC = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('credentials', {
      email: email.current?.value,
      password: password.current?.value,
      callbackUrl: `${(new URLSearchParams(location.search)).get('next') || '/'}`,
    });
  };

  return (
    <SectionLayout>
      <Head><title>Login</title></Head>

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
                <a className="is-size-7" href="/password/reset" tabIndex={-1}>Forgot your password?</a>
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
        Dont have an account? <a href="/signup">Sign Up</a>
      </div>
    </SectionLayout>
  )
};

export default Login;
