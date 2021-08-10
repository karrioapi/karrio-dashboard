import { TokenPair } from '@/api';
import { authenticate, refreshToken, AuthToken } from '@/client/context';
import { NextApiRequest } from 'next';
import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';


const auth = NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string>, req: NextApiRequest) {
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
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.exp as number)) {
        return token;
      }

      // Access token has expired, try to update it
      const { access, refresh } = await refreshToken(token.refreshToken as string);
      return {
        ...token,
        accessToken: access,
        refreshToken: refresh,
      };
    },
    session: async (session, token) => {
      session.accessToken = token.accessToken;
      AuthToken.next({ access: token.accessToken } as TokenPair);
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
});

export default auth;
