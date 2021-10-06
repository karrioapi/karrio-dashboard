import React from 'react';
import { FetchResult, MutationFunctionOptions, MutationResult, useMutation } from '@apollo/client';
import { CreateOrganizationInput, CREATE_ORGANIZATION, create_connectionVariables, UpdateOrganizationInput, UPDATE_ORGANIZATION, update_connectionVariables } from '@/graphql';

export type OrganizationMutator<T> = T & {
  createOrganization: (data: CreateOrganizationInput) => Promise<FetchResult<CreateOrganizationInput, Record<string, any>, Record<string, any>>>;
  updateOrganization: (data: UpdateOrganizationInput) => Promise<FetchResult<UpdateOrganizationInput, Record<string, any>, Record<string, any>>>;
}

export type OrganizationMutationType = (options?: MutationFunctionOptions<create_connectionVariables, {
  data: Partial<CreateOrganizationInput>;
}> | undefined) => Promise<FetchResult<CreateOrganizationInput, Record<string, any>, Record<string, any>>>;
export type OrganizationMutationResultType = MutationResult<CreateOrganizationInput>;

const OrganizationMutation = <T extends {}>(Component: React.FC<OrganizationMutator<T>>) => {
  return ({ children, ...props }: any) => {
    const [createMutation] = useMutation<CreateOrganizationInput, create_connectionVariables>(CREATE_ORGANIZATION);
    const [updateMutation] = useMutation<UpdateOrganizationInput, update_connectionVariables>(UPDATE_ORGANIZATION);

    const createOrganization = (data: CreateOrganizationInput) => createMutation({ variables: { data } });
    const updateOrganization = (data: UpdateOrganizationInput) => updateMutation({ variables: { data } });

    return (
      <Component {...props}
        createOrganization={createOrganization}
        updateOrganization={updateOrganization}
      >
        {children}
      </Component>
    );
  };
}

export default OrganizationMutation;
