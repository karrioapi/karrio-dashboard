import React from 'react';
import { FetchResult, MutationFunctionOptions, MutationResult, useMutation } from '@apollo/client';
import { CreateOrganizationInput, CREATE_ORGANIZATION, create_connectionVariables, UpdateOrganizationInput, UPDATE_ORGANIZATION, update_connectionVariables, create_organizationVariables, update_organizationVariables, SendOrganizationInvitesInput, send_organization_invitesVariables, SEND_ORGANIZATION_INVITES, delete_organization_invitationVariables, DELETE_ORGANIZATION_INVITES } from '@purplship/graphql';

type OrganizationMutator = {
  createOrganization: (data: CreateOrganizationInput) => Promise<FetchResult<CreateOrganizationInput, Record<string, any>, Record<string, any>>>;
  updateOrganization: (data: UpdateOrganizationInput) => Promise<FetchResult<UpdateOrganizationInput, Record<string, any>, Record<string, any>>>;
  sendOrganizationInvites: (data: SendOrganizationInvitesInput) => Promise<FetchResult<SendOrganizationInvitesInput, Record<string, any>, Record<string, any>>>;
  deleteOrganizationInvitation: (id: string) => Promise<any>;
}
export type OrganizationMutationType = (options?: MutationFunctionOptions<create_connectionVariables, {
  data: Partial<CreateOrganizationInput>;
}> | undefined) => Promise<FetchResult<CreateOrganizationInput, Record<string, any>, Record<string, any>>>;
export type OrganizationMutationResultType = MutationResult<CreateOrganizationInput>;


export const OrganizationMutationContext = React.createContext<OrganizationMutator>({} as OrganizationMutator);

const OrganizationMutationProvider: React.FC = ({ children }: any) => {
  const [createMutation] = useMutation<CreateOrganizationInput, create_organizationVariables>(CREATE_ORGANIZATION);
  const [updateMutation] = useMutation<UpdateOrganizationInput, update_organizationVariables>(UPDATE_ORGANIZATION);
  const [sendOrgInvitesMutation] = useMutation<SendOrganizationInvitesInput, send_organization_invitesVariables>(SEND_ORGANIZATION_INVITES);
  const [deleteInvatationMutation] = useMutation<{ id: string }, delete_organization_invitationVariables>(DELETE_ORGANIZATION_INVITES);

  const createOrganization = (data: CreateOrganizationInput) => createMutation({ variables: { data } });
  const updateOrganization = (data: UpdateOrganizationInput) => updateMutation({ variables: { data } });
  const sendOrganizationInvites = (data: SendOrganizationInvitesInput) => sendOrgInvitesMutation({ variables: { data } });
  const deleteOrganizationInvitation = (id: string) => deleteInvatationMutation({ variables: { data: { id } } });

  return (
    <OrganizationMutationContext.Provider value={{
      createOrganization,
      updateOrganization,
      sendOrganizationInvites,
      deleteOrganizationInvitation
    }}>
      {children}
    </OrganizationMutationContext.Provider>
  );
};

export default OrganizationMutationProvider;
