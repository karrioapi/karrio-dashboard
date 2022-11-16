import { isNoneOrEmpty, parseJwt } from '@/lib/helper';
import getConfig from 'next/config';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialProvider from "next-auth/providers/credentials";
import logger from '@/lib/logger';
import { authenticate, computeTestMode, getCurrentOrg, refreshToken } from '@/lib/auth';
import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';

const { serverRuntimeConfig } = getConfig();
const secret = serverRuntimeConfig?.JWT_SECRET;


async function AuthAPI(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth({
    secret,
    pages: { signIn: '/login' },
    session: { strategy: 'jwt' },
    providers: [
      CredentialProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize({ orgId, ...credentials }: any) {
          try {
            const token = await authenticate(credentials as any);
            const org = await getCurrentOrg(token.access, orgId);
            const testMode = req.headers.referer?.includes("/test");

            return { accessToken: token.access, refreshToken: token.refresh, orgId: org?.id, testMode };
          } catch (err) {
            logger.error(err);
          }

          // Return null if user data could not be retrieved
          return null;
        }
      })
    ],
    callbacks: {
      jwt: async ({ token, user }): Promise<JWT> => {
        if (user?.accessToken) {
          token.orgId = user.orgId;
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.expiration = parseJwt(user.accessToken as string).exp;
          token.testMode = user.testMode;
        } else {
          token.testMode = computeTestMode(req);
        }

        // Check if organization updated
        const cookieOrgId = req.cookies['orgId'];
        if (!isNoneOrEmpty(cookieOrgId) && !isNoneOrEmpty((token as any).orgId) && cookieOrgId !== (token as any).orgId) {
          logger.debug(`Switching organization to ${cookieOrgId}...`);

          const org = await getCurrentOrg((token as any).accessToken, cookieOrgId);
          token.orgId = org.id;
        }

        // Return previous token if the access token has not expired yet
        if (moment().subtract(13, 'm').toDate().getTime() < (token.expiration as number) * 1000) {
          return token;
        }

        // Access token has expired, try to update it OR orgId has changed
        try {
          logger.debug('Refreshing expired token...');
          const { access, refresh } = await refreshToken(token.refreshToken as string);

          return {
            ...token,
            accessToken: access,
            refreshToken: refresh,
            expiration: parseJwt(access).exp
          };
        } catch (error) {
          logger.debug(error);

          return {
            error: "RefreshAccessTokenError",
          }
        }
      },
      session: async ({ session, token }) => {
        session.error = token.error;
        session.orgId = token.orgId;
        session.accessToken = token.accessToken;
        session.testMode = token.testMode;

        return session
      }
    }
  })(req, res);
}

export default withSentry(AuthAPI);
