import { Metadata } from '@/lib/types';
import React, { useContext } from 'react';

const APIMetadata = React.createContext<Metadata>({} as Metadata);

const APIMetadataProvider: React.FC<{ metadata: Metadata }> = ({ children, metadata }) => {
  return (
    <APIMetadata.Provider value={metadata || {}}>
      {children}
    </APIMetadata.Provider>
  );
};

export function useAPIMetadata() {
  return useContext(APIMetadata);
}

export default APIMetadataProvider;
