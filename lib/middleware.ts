import { NextPage } from "next";
import { getSession } from "next-auth/client";


export function withSessionCookies(page: NextPage) {
  const getInitialProps = page.getInitialProps;

  page.getInitialProps = async ctx => {
    if (ctx.res) {
      const session = await getSession({ req: ctx.req });
      if (session?.org_id) {
        ctx.res.setHeader('Set-Cookie', `org_id=${session.org_id}`)
      }
    }

    if (getInitialProps) {
      return getInitialProps(ctx)
    }

    return { props: {} };
  };

  return page;
}
