import { graphqlClient, restClient } from "@/client/context";
import { gql } from "@apollo/client";
import { NextPage, NextPageContext } from "next";
import { Session } from "next-auth";
import getConfig from 'next/config';
import { getSession } from "next-auth/client";
import { createServerError, isNone, ServerErrorCode } from "@/lib/helper";
import { References } from "@/api";
import logger from "@/lib/logger";

const { publicRuntimeConfig } = getConfig();

export function withSessionCookies(page: NextPage) {
  const getInitialProps = page.getInitialProps;

  page.getInitialProps = async ctx => {
    const session = await getSession({ req: ctx.req });
    await setOrgHeader(ctx, session);

    return {
      pathname: ctx.pathname,
      org_id: session?.org_id,
      ...(await loadData(session)),
      ...(getInitialProps ? await getInitialProps(ctx) : {}),
    };
  };

  return page;
}

export async function connectAPI(): Promise<{ references?: References }> {
  // Attempt connection to the purplship API to retrieve the refereneces (API metadata)
  return new Promise(async (resolve, reject) => {
    try {
      const references = await restClient.value.API.data();

      // TODO:: implement version compatibility check here.

      resolve({ references });
    } catch (e) {
      logger.error(`Failed to fetch API metadata from (${publicRuntimeConfig?.PURPLSHIP_API_URL})`, e);
      const error = createServerError({
        code: ServerErrorCode.API_CONNECTION_ERROR,
        message: `
          Server (${publicRuntimeConfig?.PURPLSHIP_API_URL}) unreachable.
          Please make sure that NEXT_PUBLIC_PURPLSHIP_API_URL is set to a running API instance
        `
      })

      reject({ error });
    }
  });
}

async function setOrgHeader(ctx: NextPageContext, session: Session | null) {
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
