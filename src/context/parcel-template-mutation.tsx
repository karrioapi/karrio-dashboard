import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { CreateParcelTemplateInput, CREATE_PARCEL_TEMPLATE, create_parcel_templateVariables, DELETE_TEMPLATE, delete_templateVariables, UPDATED_PARCEL_TEMPLATE, UpdateParcelTemplateInput, update_parcel_templateVariables } from '@purplship/graphql';
import { ParcelType } from '@/lib/types';

export type ParcelTemplateInput = (CreateParcelTemplateInput | UpdateParcelTemplateInput) & {
  id?: string;
  label: string;
  is_default: boolean;
  parcel: ParcelType;
};
type TemplateMutator = {
  createParcelTemplate: (data: CreateParcelTemplateInput) => Promise<FetchResult<CreateParcelTemplateInput, Record<string, any>, Record<string, any>>>;
  updateParcelTemplate: (data: UpdateParcelTemplateInput) => Promise<FetchResult<UpdateParcelTemplateInput, Record<string, any>, Record<string, any>>>;
  deleteTemplate: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
};

export const ParcelMutationContext = React.createContext<TemplateMutator>({} as TemplateMutator);

const ParcelMutationProvider: React.FC<{}> = ({ children }) => {
  const [createMutation] = useMutation<CreateParcelTemplateInput, create_parcel_templateVariables>(CREATE_PARCEL_TEMPLATE);
  const [updateMutation] = useMutation<UpdateParcelTemplateInput, update_parcel_templateVariables>(UPDATED_PARCEL_TEMPLATE);
  const [deleteMutation] = useMutation<{ id: string }, delete_templateVariables>(DELETE_TEMPLATE);

  const createParcelTemplate = (data: CreateParcelTemplateInput) => createMutation({ variables: { data } });
  const updateParcelTemplate = (data: UpdateParcelTemplateInput) => updateMutation({ variables: { data } });
  const deleteTemplate = (id: string) => deleteMutation({ variables: { data: { id } } });

  return (
    <ParcelMutationContext.Provider value={{
      createParcelTemplate,
      updateParcelTemplate,
      deleteTemplate,
    }}>
      {children}
    </ParcelMutationContext.Provider>
  )
};

export default ParcelMutationProvider;
