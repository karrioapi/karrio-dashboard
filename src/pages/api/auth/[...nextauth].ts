import { TokenPair } from '@purplship/rest';
import { authenticate, refreshToken, AuthToken, OrgToken } from '@/client/context';
import { isNone, parseJwt } from '@/lib/helper';
import getConfig from 'next/config';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialProvider from "next-auth/providers/credentials";
import logger from '@/lib/logger';

const { serverRuntimeConfig } = getConfig();
const secret = serverRuntimeConfig?.JWT_SECRET;


const auth = NextAuth({
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
      async authorize(credentials) {
        try {
          const token = await authenticate(credentials as any);

          return { accessToken: token.access, refreshToken: token.refresh };
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
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiration = parseJwt(user.accessToken as string).exp
      }

      // Refresh the token with a new organization if provideed
      if (!isNone(OrgToken.value)) {
        logger.info('Refreshing token with new organization');
        AuthToken.next(OrgToken.value as TokenPair);
        const { access, refresh } = OrgToken.value as TokenPair;
        return {
          ...token,
          accessToken: access,
          refreshToken: refresh,
          expiration: parseJwt(access).exp
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expiration as number) * 1000) {
        return token;
      }

      // Access token has expired, try to update it OR orgId has changed
      try {
        logger.info('Refreshing expired token...');
        const { access, refresh } = await refreshToken(token.refreshToken as string);

        return {
          ...token,
          accessToken: access,
          refreshToken: refresh,
          expiration: parseJwt(access).exp
        };
      } catch (error) {
        logger.log(error);

        AuthToken.next({} as TokenPair);

        return {
          error: "RefreshAccessTokenError",
        }
      }
    },
    session: async ({ session, token }) => {
      const { org_id } = parseJwt(token.accessToken as string);
      session.org_id = org_id;
      session.error = token.error;
      session.accessToken = token.accessToken;

      AuthToken.next({ access: session.accessToken } as TokenPair);

      return session
    }
  }
});

export default auth;
