import SectionLayout from "@/layouts/section-layout";
import Spinner from "@/components/spinner";
import { get_organization_invitation, GET_ORGANIZATION_INVITATION, get_organization_invitationVariables } from "karrio/graphql";
import { isNone } from "@/lib/helper";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect } from "react";
import { Metadata } from "@/lib/types";
import { useSession } from "next-auth/react";
import Link from "next/link";

export { getServerSideProps } from '@/lib/static/references';


export default function Page({ metadata }: { metadata: Metadata }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { token } = router.query;
  const [retrieve, invitation] = useLazyQuery<get_organization_invitation, get_organization_invitationVariables>(GET_ORGANIZATION_INVITATION);

  useEffect(() => {
    if (!invitation.called && !isNone(token) && retrieve) {
      retrieve({ variables: { guid: token as any } });
    }
  }, [token, retrieve, invitation.called]);
  useEffect(() => {
    const called = invitation.called && !invitation.loading;
    const invite = invitation.data?.organization_invitation;

    // If there is no active session and invitee doesn't exist, redirect to the signup page
    if (called && isNone(session) && invite && !invite?.invitee) {
      setTimeout(() => router.push(`/signup?email=${invite?.invitee_identifier}`), 1000);
      return;
    }
    // If there is no active session and invitee exist, redirect to the login page
    if (called && isNone(session) && invite && invite?.invitee) {
      setTimeout(() => router.push(`/login?email=${invite?.invitee?.email}&next=/?accept_invitation=${token}`), 1000);
      return;
    }
    // If there is an active session, redirect to the dashboard
    if (called && !isNone(session) && invite) {
      setTimeout(() => router.push(`/?accept_invitation=${token}`), 1000);
      return;
    }
  }, [session, invitation.data?.organization_invitation, token, router]);

  return (
    <>
      <SectionLayout metadata={metadata}>
        <Head><title>Accept Invitation - {metadata?.APP_NAME}</title></Head>

        <div className="card isolated-card my-6">
          <div className="card-content has-text-centered ">

            {invitation.loading && <Spinner />}

            {invitation.error &&
              <p>Error, invalid or expired organization invitation token!</p>}

            {invitation.data?.organization_invitation &&
              <p>Redirecting...</p>}

          </div>
        </div>

        {invitation.error && <div className="has-text-centered my-4 is-size-6">
          <span>Return to <Link legacyBehavior href="/login">Sign in</Link></span>
        </div>}

      </SectionLayout>
    </>
  )
}
