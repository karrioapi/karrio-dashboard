import EventProvider from '@/context/event-provider';
import { EventComponent } from '@/views/event';
import React, { useState } from 'react';

type EventPreviewContextType = {
  previewEvent: (eventId: string) => void,
};

interface EventPreviewComponent { }

export const EventPreviewContext = React.createContext<EventPreviewContextType>({} as EventPreviewContextType);

const EventPreview: React.FC<EventPreviewComponent> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`event-${Date.now()}`);
  const [eventId, setEventId] = useState<string>();

  const previewEvent = (eventId: string) => {
    setEventId(eventId);
    setIsActive(true);
    setKey(`event-${Date.now()}`);
  };
  const dismiss = (_?: React.MouseEvent) => {
    setEventId(undefined);
    setIsActive(false);
    setKey(`event-${Date.now()}`);
  };

  return (
    <>
      <EventPreviewContext.Provider value={{ previewEvent }}>
        {children}
      </EventPreviewContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background" onClick={dismiss}></div>

        {isActive && <div className="modal-card is-medium-modal">
          <section className="modal-card-body px-5 pt-0 pb-6">
            <EventProvider>
              <EventComponent eventId={eventId} />
            </EventProvider>
          </section>
        </div>}

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={dismiss}></button>

      </div>
    </>
  )
};

export default EventPreview;
