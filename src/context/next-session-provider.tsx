import { restClient } from '@/client/context';
import { isNoneOrEmpty } from '@/lib/helper';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';

export const NextSession = React.createContext<Session | null | undefined>(undefined);

const NextSessionProvider: React.FC = ({ children }) => {
  const { data: session } = useSession();
  const [sessionState, setSessionState] = React.useState<Session | null>(session as Session);

  React.useEffect(() => {
    if (session?.error !== sessionState?.error || session?.accessToken !== sessionState?.accessToken || session === null) {
      if (
        session?.accessToken &&
        !isNoneOrEmpty(restClient.value.config.apiKey) &&
        !(restClient.value.config.apiKey as string).includes(session?.accessToken as string)
      ) {
        window.location.reload();
      }
      setSessionState(session as Session);
    }
  }, [session]);

  return (
    <NextSession.Provider value={sessionState || session}>
      {session !== undefined && children}
    </NextSession.Provider>
  );
};

export default NextSessionProvider;
