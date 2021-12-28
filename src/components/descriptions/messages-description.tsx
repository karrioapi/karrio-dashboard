import React from 'react';
import { Message } from '@purplship/rest';
import { APIError, RequestError } from '@/lib/types';
import { formatMessage } from '@/components/notifier';

interface MessagesDescriptionComponent {
  messages?: Message[];
}

const MessagesDescription: React.FC<MessagesDescriptionComponent> = ({ messages }) => {
  const error: APIError = {
    error: { code: "notes", details: { messages } as APIError['error']['details'] }
  };
  const message = new RequestError(error);

  return (
    <>
      {formatMessage(message)}
    </>
  );
};

export default MessagesDescription;
