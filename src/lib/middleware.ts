import { AuthToken, OrgToken, graphqlClient, PURPLSHIP_API, restClient } from "@/client/context";
import { gql } from "@apollo/client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createServerError, isNone, ServerErrorCode } from "@/lib/helper";
import { References } from "@purplship/rest";
import logger from "@/lib/logger";
import { Response } from "node-fetch";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  await setOrgHeader(ctx, session);

  const pathname = ctx.resolvedUrl;
  const org_id = session?.org_id || "";
  const data = await loadData(session);

  ctx.res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');

  return {
    props: { pathname, org_id, ...data }
  };
};

export async function connectAPI(): Promise<{ references?: References }> {
  // Attempt connection to the purplship API to retrieve the refereneces (API metadata)
  return new Promise(async (resolve, reject) => {
    try {
      const references = await restClient.value.API.data();

      // TODO:: implement version compatibility check here.

      resolve({ references });
    } catch (e: any | Response) {
      logger.error(`Failed to fetch API metadata from (${PURPLSHIP_API})`, e);

      if (e.status === 403) {
        AuthToken.next({ access: "", refresh: "" });
        OrgToken.next({ access: "", refresh: "" });

        connectAPI();
      } else {
        const error = createServerError({
          code: ServerErrorCode.API_CONNECTION_ERROR,
          message: `
          Server (${PURPLSHIP_API}) unreachable.
          Please make sure that NEXT_PUBLIC_PURPLSHIP_API_URL is set to a running API instance
        `
        })
        reject({ error });
      }
    }
  });
}

async function setOrgHeader(ctx: GetServerSidePropsContext, session: Session | null) {
  // Sets the authentication org_id cookie if the session has one
  if (ctx.res && session?.org_id) {
    ctx.res.setHeader('Set-Cookie', `org_id=${session.org_id}`);
  }
}

async function loadData(session: Session | null) {
  if (session === null) return {};

  try {
    const metadata = await connectAPI();

    return await graphqlClient.value
      .query({
        query: dataQuery(session?.org_id as string),
        variables: { "org_id": session?.org_id }
      })
      .then(({ data }) => ({ ...metadata, ...data }))
      .catch((e) => {
        logger.error('Failed to load initial data', e);
        const error = createServerError({ message: 'Failed to load intial data...' });

        return { ...metadata, error };
      });
  } catch (e) {
    logger.error(e)
    return e;
  }
}

function dataQuery(org_id?: string) {
  const organizationQueries = isNone(org_id) ? '' : `
  organizations {
    id
    name
    slug
    token
    user {
      email
      full_name
      is_admin
    }
    users {
      email
      full_name
      is_admin
    }
  }
  `;

  return gql`
    query loadData {
      user {
        email
        full_name
        is_staff
        last_login
        date_joined
      }
      ${organizationQueries}
    }
  `;
}
