import React from 'react';
import { useMutation } from '@apollo/client';
import { MutateMetadataInput, mutate_metadata, MUTATE_METADATA, mutate_metadataVariables, mutate_metadata_mutate_metadata } from '@purplship/graphql';
import { handleGraphQLRequest } from '@/lib/helper';


type TemplateMutator = {
  mutateMetadata: (data: MutateMetadataInput) => Promise<mutate_metadata_mutate_metadata | null>;
};

export const MetadataMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const MetadataMutationProvider: React.FC<{}> = ({ children }) => {
  const [updateMutation] = useMutation<mutate_metadata, mutate_metadataVariables>(MUTATE_METADATA);

  const mutateMetadata = (data: MutateMetadataInput) => (
    handleGraphQLRequest("mutate_metadata", updateMutation)({ variables: { data } })
  );

  return (
    <MetadataMutationContext.Provider value={{ mutateMetadata }}>
      {children}
    </MetadataMutationContext.Provider>
  )
};

export default MetadataMutationProvider;
