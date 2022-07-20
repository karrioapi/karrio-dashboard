import React from 'react';
import { MessageType, RequestError } from '@/lib/types';
import { formatMessage } from '@/components/notifier';

interface MessagesDescriptionComponent {
  messages?: RequestError | MessageType[];
}

const MessagesDescription: React.FC<MessagesDescriptionComponent> = ({ messages }) => {
  return (
    <>
      {formatMessage(messages as any)}
    </>
  );
};

export default MessagesDescription;
