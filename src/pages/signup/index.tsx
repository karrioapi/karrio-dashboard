import { References } from "@/api";
import ButtonField from "@/components/generic/button-field";
import InputField from "@/components/generic/input-field";
import SectionLayout from "@/layouts/section-layout";
import LoadingProvider, { Loading } from "@/components/loader";
import APIReferenceProvider from "@/context/references-provider";
import UserMutation from "@/context/user-mutation";
import { RegisterUserInput, register_user_register_user_errors } from "@/graphql";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, useContext, useReducer, useState } from "react";
import logger from "@/lib/logger";

export { getServerSideProps } from '@/lib/static/references';

const DEFAULT_VALUE: Partial<RegisterUserInput> = {
  email: "",
  full_name: "",
  password1: "",
  password2: "",
};

function reducer(state: Partial<RegisterUserInput>, { name, value }: { name: string, value: string | object }) {
  switch (name) {
    case "full":
      return { ...(value as object) };
    case "partial":
      return { ...state, ...(value as object) };
    default:
      return { ...state, [name]: value };
  }
}

const Component: React.FC<{}> = UserMutation<{}>(({ registerUser }) => {
  const router = useRouter();
  const { loading, setLoading } = useContext(Loading);
  const [user, dispatch] = useReducer(reducer, DEFAULT_VALUE, () => DEFAULT_VALUE);
  const [errors, setErrors] = useState<register_user_register_user_errors[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const name: string = event.target.name;

    dispatch({ name, value });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await registerUser(user as RegisterUserInput);
      setErrors(response.errors as register_user_register_user_errors[]);

      if ((response.errors || []).length === 0) router.push('/signup/success');
    } catch (error: any) {
      logger.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="card isolated-card">
        <div className="card-content">
          <p className="subtitle has-text-centered mb-6">Sign up with credentials</p>

          <form method="post" onSubmit={onSubmit}>

            <InputField
              label="Email" name="email"
              placeholder="Email" fieldClass="mt-3"
              onChange={handleChange} value={user.email} required>
              {errors.filter(error => error.field === 'email').map(({ messages }) => (
                messages.map((message, index) => <p key={index} className="has-text-danger is-size-7">{message}</p>)
              ))}
            </InputField>

            <InputField
              label="Full Name" name="full_name"
              placeholder="Full Name" fieldClass="mt-3"
              onChange={handleChange} value={user.full_name as string} required>
              {errors.filter(error => error.field === 'full_name').map(({ messages }) => (
                messages.map((message, index) => <p key={index} className="has-text-danger is-size-7">{message}</p>)
              ))}
            </InputField>

            <InputField
              label="Password" name="password1" type="password"
              placeholder="Password" fieldClass="mt-3"
              onChange={handleChange} value={user.password1} required>
              {errors.filter(error => error.field === 'password1').map(({ messages }) => (
                messages.map((message, index) => <p key={index} className="has-text-danger is-size-7">{message}</p>)
              ))}
            </InputField>

            <InputField
              label="Confirm Password" name="password2" type="password"
              placeholder="Confirm Password" fieldClass="mt-3"
              onChange={handleChange} value={user.password2} required>
              {errors.filter(error => error.field === 'password2').map(({ messages }) => (
                messages.map((message, index) => <p key={index} className="has-text-danger is-size-7">{message}</p>)
              ))}
            </InputField>


            <ButtonField type="submit"
              disabled={loading}
              className={`is-primary is-fullwidth mt-6`}
              controlClass="has-text-centered">
              <span>Create account</span>
            </ButtonField>

          </form>

        </div>
      </div>

      <div className="has-text-centered my-4 is-size-6">
        <span>Have an account? <Link href="/login">Sign in</Link></span>
      </div>
    </>
  )
});

const SignUp: NextPage<any, { references: References }> = ({ references }) => {
  return (
    <>
      <APIReferenceProvider references={references}>
        <SectionLayout>
          <Head><title>Sign Up - {references?.app_name}</title></Head>

          <LoadingProvider>
            <Component />
          </LoadingProvider>

        </SectionLayout>
      </APIReferenceProvider>
    </>
  )
};

export default SignUp;
