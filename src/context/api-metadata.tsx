import { getCookie, onError, url$, useSessionHeader } from '@/lib/helper';
import { Metadata, References } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import axios from 'axios';

const APIMetadata = React.createContext<Metadata>({} as Metadata);
const APIReference = React.createContext<References>({} as References);

const APIMetadataProvider: React.FC<{ metadata: Metadata }> = ({ children, metadata }) => {
  const headers: any = useSessionHeader();
  const { data: references } = useQuery({
    queryKey: ['references'],
    queryFn: () => (
      axios
        .get<References>(url$`${getCookie("apiUrl")}/v1/references`, { ...headers() })
        .then(({ data }) => data)
    ),
    staleTime: 5000,
    onError
  });

  return (
    <APIMetadata.Provider value={metadata || {}}>
      <APIReference.Provider value={references || metadata as any || {} as References}>
        {children}
      </APIReference.Provider>
    </APIMetadata.Provider>
  );
};

export function useAPIMetadata() {
  return useContext(APIMetadata);
}

export function useAPIReference() {
  return useContext(APIReference);
}

export default APIMetadataProvider;
