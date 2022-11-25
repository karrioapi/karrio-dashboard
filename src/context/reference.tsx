import { References } from '@/lib/types';
import React, { useContext } from 'react';

const APIReference = React.createContext<References>({} as References);

const APIReferenceProvider: React.FC<{ references: References }> = ({ children, references }) => {
  return (
    <APIReference.Provider value={references || {}}>
      {children}
    </APIReference.Provider>
  );
};

export function useAPIReference() {
  return useContext(APIReference);
}

export default APIReferenceProvider;
