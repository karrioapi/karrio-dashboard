import { KARRIO_API } from "@/client/context";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createServerError, isNone, ServerErrorCode } from "@/lib/helper";
import { Response } from "node-fetch";
import { ContextDataType, Metadata, References, SessionType } from "@/lib/types";
import axios from "axios";
import getConfig from "next/config";
import logger from "./logger";

const { publicRuntimeConfig } = getConfig();
const AUTH_HTTP_CODES = [401, 403, 407];


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  await setOrgHeader(ctx, session);

  const pathname = ctx.resolvedUrl;
  const org_id = session?.org_id || "";
  const data = session ? await loadContextData(session as SessionType) : {};

  return {
    props: { pathname, org_id, ...data }
  };
};

export async function checkAPI(): Promise<{ metadata?: Metadata }> {
  // Attempt connection to the karrio API to retrieve the API metadata
  return new Promise(async (resolve, reject) => {
    try {
      const { data: metadata } = await axios.get<Metadata>(KARRIO_API);

      // TODO:: implement version compatibility check here.
      resolve({ metadata });
    } catch (e: any | Response) {
      logger.error(`Failed to fetch API metadata from (${KARRIO_API})`);
      logger.error(e.response);
      const code = AUTH_HTTP_CODES.includes(e.response?.status) ?
        ServerErrorCode.API_AUTH_ERROR : ServerErrorCode.API_CONNECTION_ERROR;

      const error = createServerError({
        code,
        message: `
          Server (${KARRIO_API}) unreachable.
          Please make sure taht the API is running and reachable.
        `
      });
      reject({ error });
    }
  });
}

export async function loadContextData({ accessToken, org_id }: SessionType): Promise<any> {
  const { metadata } = await checkAPI();
  const headers = { Authorization: `Bearer ${accessToken}` };
  const getReferences = () => axios
    .get<References>(
      publicRuntimeConfig.KARRIO_API_URL + '/v1/references', { headers }
    )
    .then(({ data }) => data);
  const getUserData = () => axios
    .get<ContextDataType>(KARRIO_API + '/graphql', {
      headers,
      data: { query: dataQuery(org_id), variables: { org_id } }
    })
    .then(({ data }) => data);

  try {
    const [references, { data }] = await Promise.all([getReferences(), getUserData()]);

    return { metadata, references, ...data };
  } catch (e: any | Response) {
    logger.error(`Failed to fetch API data from (${KARRIO_API})`);
    logger.error(e.response);
    const code = AUTH_HTTP_CODES.includes(e.response?.status) ?
      ServerErrorCode.API_AUTH_ERROR : ServerErrorCode.API_CONNECTION_ERROR;

    const error = createServerError({
      code,
      message: 'Failed to load intial data...'
    });
    return { metadata, error };
  }
}

async function setOrgHeader(ctx: GetServerSidePropsContext, session: Session | null) {
  // Sets the authentication org_id cookie if the session has one
  if (ctx.res && session?.org_id) {
    ctx.res.setHeader('Set-Cookie', `org_id=${session.org_id}`);
  }
}

function dataQuery(org_id?: string) {
  const organizationQueries = isNone(org_id) ? '' : `
  organizations {
    id
    name
    slug
    token
    current_user {
      email
      full_name
      is_admin
      is_staff
      is_owner
      last_login
    }
    members {
      email
      full_name
      is_admin
      is_owner
      invitation {
        id
        guid
        invitee_identifier
        created
        modified
      }
      last_login
    }
  }
  `;

  return `
    {
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
