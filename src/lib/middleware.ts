import axios from "axios";
import logger from "@/lib/logger";
import getConfig from "next/config";
import { Response } from "node-fetch";
import { getSession } from "next-auth/react";
import { KARRIO_API } from "@/client/context";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createServerError, ServerErrorCode } from "@/lib/helper";
import { ContextDataType, Metadata, References, SessionType } from "@/lib/types";

const { publicRuntimeConfig } = getConfig();
const AUTH_HTTP_CODES = [401, 403, 407];


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const data = session ? await loadContextData(session as SessionType) : {};
  const pathname = ctx.resolvedUrl;
  const orgId = (session?.orgId as string) || null;
  const testMode = (session?.testMode as boolean);

  await setSessionCookies(ctx, testMode, orgId)

  return {
    props: { pathname, orgId, ...data }
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
          Please make sure that the API is running and reachable.
        `
      });
      reject({ error });
    }
  });
}

export async function loadContextData({ accessToken, orgId, testMode }: SessionType): Promise<any> {
  const { metadata } = await checkAPI();
  const headers = {
    ...(orgId ? { 'x-org-id': orgId } : {}),
    ...(testMode ? { 'x-test-id': testMode } : {}),
    'authorization': `Bearer ${accessToken}`,
  } as any;

  const getReferences = () => axios
    .get<References>(
      publicRuntimeConfig.KARRIO_API_URL + '/v1/references', { headers }
    )
    .then(({ data }) => data);
  const getUserData = () => axios
    .get<ContextDataType>(KARRIO_API + '/graphql', {
      headers,
      data: { query: dataQuery(metadata) }
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

export async function setSessionCookies(ctx: GetServerSidePropsContext, testMode: boolean, orgId?: string | null) {
  // Sets the authentication orgId cookie if the session has one
  if (ctx.res && orgId) {
    ctx.res.setHeader('Set-Cookie', `orgId=${orgId}`);
  }
  ctx.res.setHeader('Set-Cookie', `testMode=${testMode}`);
}

function dataQuery(metadata: any) {
  const organizationQueries = metadata?.MULTI_ORGANIZATIONS ? `
  organization {
    id
  }
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
  `: "";

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
