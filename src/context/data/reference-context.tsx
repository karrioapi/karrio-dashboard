import { References } from '@/lib/types';
import React from 'react';

export const APIReference = React.createContext<References>({} as References);

const APIReferenceProvider: React.FC<{ references: References }> = ({ children, references }) => {
  return (
    <APIReference.Provider value={references || {}}>
      {children}
    </APIReference.Provider>
  );
};

export default APIReferenceProvider;
