import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { MutateMetadataInput, MUTATE_METADATA, mutate_metadataVariables } from '@purplship/graphql';


type TemplateMutator = {
  mutateMetadata: (data: MutateMetadataInput) => Promise<FetchResult<MutateMetadataInput, Record<string, any>, Record<string, any>>>;
};

export const MetadataMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const MetadataMutationProvider: React.FC<{}> = ({ children }) => {
  const [updateMutation] = useMutation<MutateMetadataInput, mutate_metadataVariables>(MUTATE_METADATA);
  const mutateMetadata = (data: MutateMetadataInput) => updateMutation({ variables: { data } });

  return (
    <MetadataMutationContext.Provider value={{ mutateMetadata }}>
      {children}
    </MetadataMutationContext.Provider>
  )
};

export default MetadataMutationProvider;
