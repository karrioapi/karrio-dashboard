import { graphqlClient, restClient } from "@/client/context";
import { gql } from "@apollo/client";
import { NextPage, NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { isNone } from "@/lib/helper";

export const API_INSTANCE_ERROR = { error: 'Server unreachable. Please make sure that NEXT_PUBLIC_PURPLSHIP_API_URL is set to a running API instance' }


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


async function setOrgHeader(ctx: NextPageContext, session: Session | null) {
  // Sets the authentication org_id cookie if the session has one
  if (ctx.res && session?.org_id) {
    ctx.res.setHeader('Set-Cookie', `org_id=${session.org_id}`);
  }
}

async function loadData(session: Session | null) {
  if (session === null) return {};

  try {
    const [references, { user, organizations }] = await Promise.all([
      restClient.value.API.data(),
      graphqlClient.value.query({
        query: dataQuery(session?.org_id as string),
        variables: { "org_id": session?.org_id }
      }).then(({ data }) => data)
    ]);
  
    return { references, user, organizations };
  } catch(e) {
    console.error('Failed to load initial data', e);

    return API_INSTANCE_ERROR;
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
