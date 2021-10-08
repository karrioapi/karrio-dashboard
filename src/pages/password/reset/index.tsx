import { References } from "@/api";
import ButtonField from "@/components/generic/button-field";
import InputField from "@/components/generic/input-field";
import SectionLayout from "@/components/layouts/section-layout";
import LoadingProvider, { Loading } from "@/components/loader";
import APIReferenceProvider from "@/context/references-provider";
import UserMutation from "@/context/user-mutation";
import { ConfirmPasswordResetInput, confirm_password_reset_confirm_password_reset_errors } from "@/graphql";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, useContext, useEffect, useReducer, useState } from "react";

export { getStaticProps } from '@/static/references';

const DEFAULT_VALUE: Partial<ConfirmPasswordResetInput> = {
  new_password1: "",
  new_password2: ""
};

function reducer(state: Partial<ConfirmPasswordResetInput>, { name, value }: { name: string, value: string | object }) {
  switch (name) {
    case "full":
      return { ...(value as object) };
    case "partial":
      return { ...state, ...(value as object) };
    default:
      return { ...state, [name]: value };
  }
}

const Component: React.FC<{}> = UserMutation<{}>(({ confirmPasswordReset }) => {
  const router = useRouter();
  const { uidb64, token } = router.query;
  const { loading, setLoading } = useContext(Loading);
  const [data, dispatch] = useReducer(reducer, DEFAULT_VALUE, () => DEFAULT_VALUE);
  const [errors, setErrors] = useState<confirm_password_reset_confirm_password_reset_errors[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const name: string = event.target.name;

    dispatch({ name, value });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { errors } = await confirmPasswordReset(data as ConfirmPasswordResetInput);

      setErrors(errors as confirm_password_reset_confirm_password_reset_errors[] || []);
      if ((errors || []).length === 0) router.push('/password/reset/done');
    } catch (error: any) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => { dispatch({ name: "partial", value: { uid: uidb64, token } }); }, [uidb64, token]);

  return (
    <>
      <div className="card isolated-card">
        <div className="card-content">
          <p className="subtitle has-text-centered mb-4">New Password</p>
          <p className="has-text-centered mb-4">Enter your new email and password.</p>

          {errors
            .filter(error => !['new_password1', 'new_password2'].includes(error.field))
            .map(({ messages }) => (
              messages.map((message, index) => <p key={index} className="has-text-danger is-size-7">{message}</p>)
            ))}

          <form method="post" onSubmit={onSubmit}>

            <InputField
              label="Password" name="new_password1" type="password"
              placeholder="New Password" fieldClass="mt-3"
              onChange={handleChange} value={data.new_password1} required>
              {errors.filter(error => error.field === 'new_password1').map(({ messages }) => (
                messages.map((message, index) => <p key={index} className="has-text-danger is-size-7 my-1">{message}</p>)
              ))}
            </InputField>

            <InputField
              label="Confirm Password" name="new_password2" type="password"
              placeholder="Confirm Password" fieldClass="mt-3"
              onChange={handleChange} value={data.new_password2} required>
              {errors.filter(error => error.field === 'new_password2').map(({ messages }) => (
                messages.map((message, index) => <p key={index} className="has-text-danger is-size-7 my-1">{message}</p>)
              ))}
            </InputField>


            <ButtonField type="submit"
              className={`is-primary is-fullwidth ${loading ? 'is-loading' : ''} mt-6`}
              controlClass="has-text-centered">
              <span>Change my password</span>
            </ButtonField>

          </form>

        </div>
      </div>

      <div className="has-text-centered my-4 is-size-6">
        <span>Return to <Link href="/login">Sign in</Link></span>
      </div>
    </>
  )
});

export default function Page({ references }: { references: References }) {
  return (
    <>
      <APIReferenceProvider references={references}>
        <SectionLayout>
          <Head><title>Password Reset - {references?.app_name}</title></Head>

          <LoadingProvider>
            <Component />
          </LoadingProvider>

        </SectionLayout>
      </APIReferenceProvider>
    </>
  )
}
