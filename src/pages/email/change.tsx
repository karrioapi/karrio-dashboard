import SectionLayout from "@/layouts/section-layout";
import Spinner from "@/components/spinner";
import { isNone } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { Metadata } from "@/lib/types";
import AuthenticatedPage from "@/layouts/authenticated-page";
import { UserMutationProvider, useUserMutation } from "@/context/user-mutation";

export { getServerSideProps } from '@/lib/middleware';


export default function Page(pageProps: { metadata: Metadata }) {
  const { metadata } = pageProps;

  const Component: React.FC = () => {
    const router = useRouter();
    const { token } = router.query;
    const { confirmEmailChange } = useUserMutation();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const confirm = async () => {
      setLoading(true);
      try {
        const data = await confirmEmailChange({ token: token as string });
        const email = data?.user?.email;
        setSuccess(!isNone(email));
        setEmail(email || '');
      } catch (e) {
        setSuccess(false);
        console.error(e);
      }
      setLoading(false);
    };

    useEffect(() => {
      if (!isNone(token)) {
        confirm();
      }
    }, [token]);

    return (
      <>
        <div className="card isolated-card my-6">
          <div className="card-content has-text-centered ">

            {loading && <Spinner />}

            {(!loading && success === true) && <p>Your email has been changed to <strong>{email}</strong>!</p>}
            {(!loading && success === false) && <p>Error, invalid or expired email change token!</p>}

          </div>
        </div>

        <div className="has-text-centered my-4 is-size-6">
          <Link legacyBehavior href="/">Return Home</Link>
        </div>
      </>
    );
  };

  return AuthenticatedPage((
    <SectionLayout metadata={metadata}>
      <Head><title>Email change confirmation - {metadata?.APP_NAME}</title></Head>

      <UserMutationProvider>
        <Component />
      </UserMutationProvider>

    </SectionLayout>
  ), pageProps);
}
