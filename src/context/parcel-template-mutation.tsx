import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { ParcelTemplateInput, CREATE_PARCEL_TEMPLATE, create_parcel_templateVariables, DELETE_TEMPLATE, delete_templateVariables, UPDATED_PARCEL_TEMPLATE, PartialParcelTemplateInput, update_parcel_templateVariables } from '@/graphql';


export type TemplateMutator<T> = T & {
  createParcelTemplate: (data: ParcelTemplateInput) => Promise<FetchResult<ParcelTemplateInput, Record<string, any>, Record<string, any>>>;
  updateParcelTemplate: (data: PartialParcelTemplateInput) => Promise<FetchResult<PartialParcelTemplateInput, Record<string, any>, Record<string, any>>>;
  deleteTemplate: (id: string) => Promise<FetchResult<{ id: string; }, Record<string, any>, Record<string, any>>>;
}

const ParcelTemplateMutation = <T extends {}>(Component: React.FC<TemplateMutator<T>>) => (
  function ParcelTemplateMutationWrapper({ children, ...props }: any) {
    const [createMutation] = useMutation<ParcelTemplateInput, create_parcel_templateVariables>(CREATE_PARCEL_TEMPLATE);
    const [updateMutation] = useMutation<PartialParcelTemplateInput, update_parcel_templateVariables>(UPDATED_PARCEL_TEMPLATE);
    const [deleteMutation] = useMutation<{ id: string }, delete_templateVariables>(DELETE_TEMPLATE);

    const createParcelTemplate = (data: ParcelTemplateInput) => createMutation({ variables: { data } });
    const updateParcelTemplate = (data: PartialParcelTemplateInput) => updateMutation({ variables: { data } });
    const deleteTemplate = (id: string) => deleteMutation({ variables: { data: { id } } });

    return (
      <Component {...props}
        createParcelTemplate={createParcelTemplate}
        updateParcelTemplate={updateParcelTemplate}
        deleteTemplate={deleteTemplate}
      >
        {children}
      </Component>
    );
  }
);

export default ParcelTemplateMutation;
