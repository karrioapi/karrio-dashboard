import { TokenPair } from '@/api';
import { authenticate, refreshToken, AuthToken } from '@/client/context';
import { isNone, parseJwt } from '@/lib/helper';
import { NextApiRequest } from 'next';
import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';
import { BehaviorSubject } from 'rxjs';

const secret = process.env.JWT_SECRET;
export const orgToken = new BehaviorSubject<TokenPair | undefined>(undefined);


const auth = NextAuth({
  pages: {
    signIn: '/login',
  },
  jwt: {
    secret,
    encryption: true,
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password" | "org_id", string>, req: NextApiRequest) {
        try {
          const token = await authenticate(credentials);

          return { accessToken: token.access, refreshToken: token.refresh };
        } catch (err) {
          console.error(err);
        }

        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  callbacks: {
    jwt: async (token: JWT, user?: User): Promise<JWT> => {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiration = parseJwt(user.accessToken as string).exp
      }

      if (!isNone(orgToken.value)) {
        const { access, refresh } = orgToken.value as TokenPair;
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
        const { access, refresh } = await refreshToken(token.refreshToken as string);

        return {
          ...token,
          accessToken: access,
          refreshToken: refresh,
          expiration: parseJwt(access).exp
        };
      } catch (error) {
        console.log(error);

        AuthToken.next({} as TokenPair);

        return {
          error: "RefreshAccessTokenError",
        }
      }
    },
    session: async (session, token) => {
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
