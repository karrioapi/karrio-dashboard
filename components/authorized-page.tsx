import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import UserProvider from '@/context/user-provider';
import APIReferenceProvider from '@/context/references-provider';
import { isNone } from '@/lib/helper';
import { AuthToken, RestContext } from '@/client/context';
import { TokenPair } from '@/api';


const DATA_CONTEXTS = [
  APIReferenceProvider,
];


const ContextProviders: React.FC = ({ children }) => {
  const NestedContexts = DATA_CONTEXTS.reduce((_, Ctx) => <Ctx>{_}</Ctx>, children);

  return (
    <>
      <UserProvider>{NestedContexts}</UserProvider>
    </>
  );
};

const AuthorizedPage = (Component: React.FC) => {
  const router = useRouter();
  const [session] = useSession();
  const purplship = useContext(RestContext);

  const isReady = (purplship: any) => {
    return ((purplship?.config.apiKey as string || '').length > 0);
  };

  useEffect(() => {
    if (session === null) router.push('/login?next=' + window.location.pathname);
  }, [session, router]);
  useEffect(() => {
    !isNone(session?.accessToken) && AuthToken.next({ access: session?.accessToken } as TokenPair);
  }, [session]);

  if (!session) return <></>;

  return (
    <ContextProviders>
      {isReady(purplship) && <Component />}
    </ContextProviders>
  );
};

export default AuthorizedPage;
