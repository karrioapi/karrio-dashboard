import React from 'react';
import { References } from '@/api/index';

export const APIReference = React.createContext<References>({} as References);

const APIReferenceProvider: React.FC<{ references: References }> = ({ children, references }) => {
  return (
    <APIReference.Provider value={references}>
      {references && children}
    </APIReference.Provider>
  );
};

export default APIReferenceProvider;
