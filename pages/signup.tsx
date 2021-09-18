import { References } from "@/api";
import { PURPLSHIP_API_URL, restClient } from "@/client/context";
import SectionLayout from "@/components/layouts/section-layout";
import APIReferenceProvider from "@/context/references-provider";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { FormEvent, useRef } from "react";


const SignUp: NextPage<{ references: References }> = ({ references }) => {
  const email = useRef<HTMLInputElement>(null);
  const full_name = useRef<HTMLInputElement>(null);
  const password1 = useRef<HTMLInputElement>(null);
  const password2 = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${PURPLSHIP_API_URL}/signup/`, {
        method: 'POST',
        body: JSON.stringify({
          email: email.current?.value,
          full_name: full_name.current?.value,
          password1: password1.current?.value,
          password2: password2.current?.value,
        })
      });
      console.log(res, '<<<<<<<<<<<<<');
    } catch(error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <APIReferenceProvider references={references}>
        <SectionLayout>
          <Head><title>Sign Up - {references?.app_name}</title></Head>

          <div className="card isolated-card">
            <div className="card-content">
              <p className="subtitle has-text-centered">Sign up with credentials</p>

              <form method="post" onSubmit={onSubmit}>

                <div className="field mt-6">
                  <label className="label" htmlFor="id_email">Email</label>
                  <div className="control">
                    <input className="input" id="id_email" name="email" type="email" placeholder="Email" ref={email} required/>
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label" htmlFor="id_full_name">Full Name</label>
                  <div className="control">
                    <input className="input" id="id_full_name" name="full_name" type="text" placeholder="Full name" ref={full_name}/>
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label" htmlFor="id_password1">Password</label>
                  <div className="control">
                    <input className="input" id="id_password" name="Password" type="password" placeholder="Password" ref={password1} required/>
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label level" htmlFor="id_password2">Password Confirmation</label>
                  <div className="control">
                    <input className="input" id="id_password2" name="password2" type="password" placeholder="Password Confirmation" ref={password2} required/>
                  </div>
                </div>

                <div className="field mt-6">
                  <div className="control">
                    <input className="button is-primary is-fullwidth" type="submit" value="Create account" />
                  </div>
                </div>

              </form>

            </div>
          </div>

          <div className="has-text-centered my-4 is-size-6">
            <span>Have an account? <a href="/login">Sign in</a></span>
          </div>
        </SectionLayout>
      </APIReferenceProvider>
    </>
  )
};


export const getStaticProps: GetStaticProps = async (_) => {
  const references = await restClient.value.API.data()

  return {
    props: { references }
  }
};

export default SignUp;
