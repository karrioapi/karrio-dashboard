import { useOrganizationInvitation } from "@/context/organization";
import SectionLayout from "@/layouts/section-layout";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/react";
import Spinner from "@/components/spinner";
import React, { useEffect } from "react";
import { Metadata } from "@/lib/types";
import { isNone } from "@/lib/helper";
import Link from "next/link";
import Head from "next/head";

export { getServerSideProps } from '@/lib/data-fetching/references';


export default function Page({ metadata }: { metadata: Metadata }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { token } = router.query;
  const { query: { data: { organization_invitation } = {}, ...query } } = useOrganizationInvitation(token as string);

  useEffect(() => {
    const called = query.isFetched;
    const invite = organization_invitation;

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
  }, [session, organization_invitation, token, router]);

  return (
    <>
      <SectionLayout metadata={metadata}>
        <Head><title>Accept Invitation - {metadata?.APP_NAME}</title></Head>

        <div className="card isolated-card my-6">
          <div className="card-content has-text-centered ">

            {!query.isFetched && query.isFetching && <Spinner />}

            {(query.isFetched && (query.error || !organization_invitation)) &&
              <p>Error, invalid or expired organization invitation token!</p>}

            {organization_invitation && <p>Redirecting...</p>}

          </div>
        </div>

        {query.error && <div className="has-text-centered my-4 is-size-6">
          <span>Return to <Link legacyBehavior href="/login">Sign in</Link></span>
        </div>}

      </SectionLayout>
    </>
  )
}
