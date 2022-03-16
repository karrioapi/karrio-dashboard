import { FieldError, NotificationType, Notification, RequestError, ErrorType } from '@/lib/types';
import React, { useState } from 'react';

interface LoadingNotifier {
  notify: (notification: Notification) => void;
}

export const Notify = React.createContext<LoadingNotifier>({} as LoadingNotifier);

const Notifier: React.FC = ({ children }) => {
  const [notification, setNotification] = useState<Notification>();
  const [timer, setTimer] = useState<NodeJS.Timeout | number>();

  const dismiss = (evt?: React.MouseEvent) => {
    evt?.preventDefault();
    evt?.stopPropagation();
    setNotification(undefined);
    timer && clearTimeout(timer as NodeJS.Timeout);
  };
  const notify = (notification: Notification) => {
    dismiss();
    setNotification(notification);
    setTimer(setTimeout(() => { dismiss() }, 10000));
  };

  return (
    <Notify.Provider value={{ notify }}>
      {notification !== undefined &&
        <div className={`notification ${notification?.type || NotificationType.info} karrio-notifier`}>
          <progress
            className={`progress karrio-notification-loader ${notification?.type || NotificationType.info}`}
            max="100">50%</progress>
          <button className="delete" onClick={dismiss}></button>
          {formatMessage(notification?.message || '')}
        </div>
      }
      {children}
    </Notify.Provider>
  )
};

export function formatMessage(msg: Notification['message']) {
  try {
    // Process plain text message
    if (typeof msg === 'string') {
      return msg;
    }

    // Process GraphQL errors
    if (Array.isArray(msg) && msg.length > 0 && msg[0] instanceof ErrorType) {
      return msg.map((error: ErrorType, index) => {
        return <p key={index}><strong>{error.field}:</strong> {error.messages.join(' | ')}</p>;
      });
    }

    // Process API errors
    if (msg instanceof RequestError) {
      const error = msg.data.error;
      if (error?.message !== undefined) {
        return error.message;
      } else if (error?.details?.messages !== undefined) {
        return (error.details.messages || []).map((msg, index) => {
          const carrier_name = msg.carrier_name !== undefined ? `${msg.carrier_name} (${msg.carrier_id}) :` : '';
          return <p key={index}>{carrier_name} {msg.message}</p>;
        });
      } else {
        return Object.entries(error?.details as FieldError)
          .map(([_, msg], index) => {
            if (typeof msg.message === 'string') return <p><strong>{msg.code}</strong> {msg.message}</p>;
            return <p key={index}><strong>{msg.code}</strong> {(Object.values(msg)[0] as any).message}</p>;
          });
      }
    }

    return (msg as any).message;
  } catch (e) {
    return 'Uh Oh! An uncaught error occured...';
  }
};

export function useNotifier() {
  return React.useContext(Notify);
}

export default Notifier;
