import { ContextDataType, Metadata, PortalSessionType, References, SessionType, SubscriptionType } from "@/lib/types";
import { createServerError, isNone, ServerErrorCode } from "@/lib/helper";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { KARRIO_API } from "@/client/context";
import { getSession } from "next-auth/react";
import logger from "@/lib/logger";
import axios from "axios";

const AUTH_HTTP_CODES = [401, 403, 407];
const ACTIVE_SUBSCRIPTIONS = ["active", "trialing", "incomplete", "free"];


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const data = await loadContextData(session as SessionType);
  const pathname = ctx.resolvedUrl;
  const orgId = ((session as any)?.orgId as string) || null;
  const testMode = ((session as any)?.testMode as boolean);
  const subscription = await checkSubscription(session, data.metadata);

  await setSessionCookies(ctx, testMode, orgId);

  if (needValidSubscription(subscription)) {
    return {
      redirect: {
        permanent: false,
        destination: '/billing'
      }
    }
  }

  return {
    props: { pathname, orgId, ...subscription, ...data }
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
      logger.error(e.response?.data || e.response);
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

export async function loadContextData(session: SessionType): Promise<any> {
  if (isNone(session)) return {};

  const { accessToken, orgId, testMode } = session;
  const { metadata } = await checkAPI();
  const headers = {
    ...(orgId ? { 'x-org-id': orgId } : {}),
    ...(testMode ? { 'x-test-id': testMode } : {}),
    'authorization': `Bearer ${accessToken}`,
  } as any;

  const getReferences = () => axios
    .get<References>(KARRIO_API + '/v1/references', { headers })
    .then(({ data }) => data);
  const getUserData = () => axios
    .post<ContextDataType>(
      KARRIO_API + '/graphql/', { query: dataQuery(metadata) }, { headers }
    )
    .then(({ data }) => data);

  try {
    const [references, { data }] = await Promise.all([getReferences(), getUserData()]);
    return { metadata, references, ...data };
  } catch (e: any | Response) {
    logger.error(`Failed to fetch API data from (${KARRIO_API})`);
    logger.error(e.response?.data || e.response);
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

export async function checkSubscription(session: SessionType | any, metadata?: Metadata) {
  if (isNone(session)) return {};
  const { accessToken, orgId } = session;

  if (orgId && (metadata?.ORG_LEVEL_BILLING || metadata?.TENANT_LEVEL_BILLING)) {
    const headers = {
      ...(orgId ? { 'x-org-id': orgId } : {}),
      'authorization': `Bearer ${accessToken}`,
    } as any;
    const getOrgSubscription = () => axios
      .get<SubscriptionType>(KARRIO_API + '/v1/billing/subscription', { headers })
      .then(({ data }) => data)
      .catch(() => { return null });

    try {
      const subscription = await getOrgSubscription();

      return { subscription };
    } catch (e: any | Response) {
      logger.error(`Failed to fetch API subscription details from (${KARRIO_API})`);
      logger.error(e.response?.data || e.response);
    }
  }

  return { subscription: null };
}

export async function createPortalSession(session: SessionType | any, host: string, subscription?: SubscriptionType) {
  if (subscription?.is_owner) {
    const return_url = 'http://' + host;
    const getCustomerPortalSession = () => axios
      .post<PortalSessionType>(KARRIO_API + '/v1/billing/portal', { return_url }, {
        headers: {
          ...(session.orgId ? { 'x-org-id': session.orgId } : {}),
          'authorization': `Bearer ${session.accessToken}`,
        } as any
      })
      .then(({ data }) => data);

    try {
      const portal_session = await getCustomerPortalSession();

      return { session_url: portal_session.url };
    } catch (e: any | Response) {
      logger.error(`Failed to create customer portal session from (${KARRIO_API})`);
      logger.error(e.response?.data || e.response);
    }
  }

  return {};
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

function needValidSubscription({ subscription }: { subscription?: SubscriptionType | null }) {
  return (
    subscription &&
    !ACTIVE_SUBSCRIPTIONS.includes(subscription?.status as string)
  )
}
