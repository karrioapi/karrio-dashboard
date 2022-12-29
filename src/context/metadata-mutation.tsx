import React from 'react';
import { useMutation } from '@apollo/client';
import { MetadataMutationInput, mutate_metadata, MUTATE_METADATA, mutate_metadataVariables, mutate_metadata_mutate_metadata } from 'karrio/graphql';
import { handleGraphQLRequest } from '@/lib/helper';


type TemplateMutator = {
  mutateMetadata: (data: MetadataMutationInput) => Promise<mutate_metadata_mutate_metadata | null>;
};

export const MetadataMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const MetadataMutationProvider: React.FC<{}> = ({ children }) => {
  const [updateMutation] = useMutation<mutate_metadata, mutate_metadataVariables>(MUTATE_METADATA);

  const mutateMetadata = (data: MetadataMutationInput) => (
    handleGraphQLRequest("mutate_metadata", updateMutation)({ variables: { data } })
  );

  return (
    <MetadataMutationContext.Provider value={{ mutateMetadata }}>
      {children}
    </MetadataMutationContext.Provider>
  )
};

export default MetadataMutationProvider;
