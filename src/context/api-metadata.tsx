import { Metadata, References } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { onError, url$ } from '@/lib/helper';
import React, { useContext } from 'react';
import getConfig from 'next/config';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();
type APIMeta = {
  host: string,
  metadata: Metadata,
  references: References,
};
const APIMetadata = React.createContext<APIMeta>({} as any);

const APIMetadataProvider: React.FC<{ metadata: Metadata }> = ({ children, metadata }) => {
  const context = {
    metadata: (metadata || {}) as Metadata,
    get host() {
      return (!!publicRuntimeConfig?.MULTI_TENANT
        ? metadata?.HOST || publicRuntimeConfig?.KARRIO_PUBLIC_URL
        : publicRuntimeConfig?.KARRIO_PUBLIC_URL
      )
    }
  };

  const { data: references } = useQuery({
    queryKey: ['references'],
    queryFn: () => (
      axios
        .get<References>(url$`${context.host}/v1/references`)
        .then(({ data }) => data)
    ),
    staleTime: 5000,
    onError
  });

  return (
    <APIMetadata.Provider value={{
      ...context,
      references: (references || metadata || {}) as References,
    }}>
      {children}
    </APIMetadata.Provider>
  );
};

export function useAPIMetadata() {
  return useContext(APIMetadata);
}

export default APIMetadataProvider;
