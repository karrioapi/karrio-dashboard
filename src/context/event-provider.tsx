import React, { useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_event, GET_EVENT, get_eventVariables, get_event_event } from '@purplship/graphql';


type Event = get_event_event;
export type EventResultType = LazyQueryResult<get_event, get_eventVariables> & {
  event?: Event;
  loadEvent: (id: string) => Promise<any>;
  setEvent: React.Dispatch<React.SetStateAction<get_event_event | undefined>>;
};

export const Event = React.createContext<EventResultType>({} as EventResultType);

const EventProvider: React.FC = ({ children }) => {
  const [load, result] = useLazyQuery<get_event, get_eventVariables>(GET_EVENT, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [event, setEvent] = useState<Event>();

  const loadEvent = (id: string) => load({ variables: { id } });

  useEffect(() => { setEvent(result.data?.event as Event); }, [result]);

  return (
    <Event.Provider value={{
      event,
      setEvent,
      loadEvent,
      ...result
    }}>
      {children}
    </Event.Provider>
  );
};

export default EventProvider;
