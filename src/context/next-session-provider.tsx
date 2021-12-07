import { Session } from 'next-auth';
import { useSession } from 'next-auth/client';
import React from 'react';

export const NextSession = React.createContext<Session | null | undefined>(undefined);

const NextSessionProvider: React.FC = ({ children }) => {
  const [session] = useSession();
  const [sessionState, setSessionState] = React.useState<Session | null>(session as Session);

  React.useEffect(() => {
    if (session?.error !== sessionState?.error || session?.accessToken !== sessionState?.accessToken || session === null) {
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
