import { TokenPair } from '@/api';
import { authenticate, refreshToken, AuthToken } from '@/client/context';
import { NextApiRequest } from 'next';
import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';

const secret = process.env.JWT_SECRET;


const auth = NextAuth({
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
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.exp as number)) {
        return token;
      }

      // Access token has expired, try to update it
      try {
        const { access, refresh } = await processRefreshToken(token);
        return {
          ...token,
          accessToken: access,
          refreshToken: refresh,
        };
      } catch (error) {
        console.log(error);

        return {
          ...token,
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
  },
  pages: {
    signIn: '/login',
  },
  jwt: {
    secret,
    encryption: true,
  }
});


export async function processRefreshToken(token: JWT) {
  return refreshToken(token.refreshToken as string)
}

const parseJwt = (token: string) => {
  try {
    const content = Buffer.from(token.split('.')[1], 'base64').toString();
    return JSON.parse(content);
  } catch (e) {
    console.log(e);
    return {};
  }
};

export default auth;
