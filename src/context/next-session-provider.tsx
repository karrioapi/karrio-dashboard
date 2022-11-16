import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import React from 'react';

export const NextSession = React.createContext<Session | null | undefined>(undefined);

const NextSessionProvider: React.FC = ({ children }) => {
  const { data: session } = useSession();
  const [sessionState, setSessionState] = React.useState<Session | null>(session as Session);

  React.useEffect(() => {
    // set session state if session is not null, has no error and has a new access token
    if (session?.error !== sessionState?.error || session?.accessToken !== sessionState?.accessToken || session === null) {
      setSessionState(session as Session);
    }
  }, [session, sessionState]);

  return (
    <NextSession.Provider value={sessionState}>
      {sessionState !== undefined ? children : <>...</>}
    </NextSession.Provider>
  );
};

export default NextSessionProvider;
