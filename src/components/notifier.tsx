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
        <div className={`notification px-2 py-4 ${notification?.type || NotificationType.info} karrio-notifier is-size-6`}>
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
      return msg.map((error: any, index) => {
        return <p key={index}><strong>{error.field}:</strong> {error.messages.join(' | ')}</p>;
      });
    }

    // Process Rest Request errors
    if (Array.isArray(msg) && msg.length > 0 && msg[0] instanceof RequestError) {
      return msg.map(renderError);
    }

    // Process API errors
    if (msg instanceof RequestError) {
      return renderError(msg, 0);
    }

    return (msg as any).message;
  } catch (e) {
    return 'Uh Oh! An uncaught error occured...';
  }
};

function renderError(msg: any, _: number) {
  const error = msg.data.error;
  if (error?.message !== undefined) {
    return error.message;
  } else if (error?.details?.messages !== undefined) {
    return (error.details.messages || []).map((msg: any, index: number) => {
      const carrier_name = msg.carrier_name !== undefined ? `${msg.carrier_id} :` : '';
      return <p key={index}>{carrier_name} {msg.message}</p>;
    });
  } else {
    const render = ([field, msg]: [string, string | FieldError], index: number) => {
      return (<React.Fragment key={index}>
        <span className="is-size-7">{field} {(msg as any).message && `- ${(msg as any).message}`}</span>
        {!(msg as any).message && <ul className='pl-1'>
          <li className="is-size-7">
            {Array.isArray(msg) && msg.map((m, i) => render(["", m], i))}
            {!Array.isArray(msg) && typeof msg === 'object' && !msg.message &&
              Object.entries(msg).map(render as any)}
          </li>
        </ul>}
      </React.Fragment>);
    }
    return Object.entries(error?.details as FieldError)
      .map(render as any);
  }
}

export function useNotifier() {
  return React.useContext(Notify);
}

export default Notifier;
