import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export function useSyncedSession() {
  // Queries
  const query = useQuery(['session'],
    () => getSession().then(_ => { console.log('fetch session', new Date()); return _; }),
    { refetchInterval: 120000 }
  );

  return {
    query,
  };
}