import React from 'react';
import { FetchResult, MutationFunctionOptions, MutationResult, useMutation } from '@apollo/client';
import { CreateOrganizationInput, CREATE_ORGANIZATION, create_connectionVariables, UpdateOrganizationInput, UPDATE_ORGANIZATION, update_connectionVariables, create_organizationVariables, update_organizationVariables, SendOrganizationInvitesInput, send_organization_invitesVariables, SEND_ORGANIZATION_INVITES, delete_organization_invitationVariables, DELETE_ORGANIZATION_INVITES, create_organization_create_organization_organization, update_organization_update_organization_organization, create_organization, update_organization, send_organization_invites, delete_organization_invitation, create_organization_create_organization, update_organization_update_organization, delete_organization_invitation_delete_organization_invitation, send_organization_invites_send_organization_invites, SetOrganizationUserRolesInput, set_organization_user_roles, set_organization_user_rolesVariables, SET_ORGANIZATION_USER_ROLES, set_organization_user_roles_set_organization_user_roles, change_organization_owner, change_organization_ownerVariables, CHANGE_ORGANIZATION_OWNER, ChangeOrganizationOwnerInput, change_organization_owner_change_organization_owner } from 'karrio/graphql';
import { handleGraphQLRequest } from '@/lib/helper';

type OrganizationMutator = {
  createOrganization: (data: CreateOrganizationInput) => Promise<create_organization_create_organization | null>;
  updateOrganization: (data: UpdateOrganizationInput) => Promise<update_organization_update_organization | null>;
  changeOrganizationOwner: (data: ChangeOrganizationOwnerInput) => Promise<change_organization_owner_change_organization_owner | null>;
  setOrganizationUserRoles: (data: SetOrganizationUserRolesInput) => Promise<set_organization_user_roles_set_organization_user_roles | null>
  sendOrganizationInvites: (data: SendOrganizationInvitesInput) => Promise<send_organization_invites_send_organization_invites | null>;
  deleteOrganizationInvitation: (id: string) => Promise<delete_organization_invitation_delete_organization_invitation | null>;
}
export type OrganizationMutationType = (options?: MutationFunctionOptions<create_connectionVariables, { data: Partial<CreateOrganizationInput>; }> | undefined) => Promise<FetchResult<CreateOrganizationInput, Record<string, any>, Record<string, any>>>;
export type OrganizationMutationResultType = MutationResult<CreateOrganizationInput>;


export const OrganizationMutationContext = React.createContext<OrganizationMutator>({} as OrganizationMutator);

const OrganizationMutationProvider: React.FC = ({ children }: any) => {
  const [createMutation] = useMutation<create_organization, create_organizationVariables>(CREATE_ORGANIZATION);
  const [updateMutation] = useMutation<update_organization, update_organizationVariables>(UPDATE_ORGANIZATION);
  const [changeOwnerMutation] = useMutation<change_organization_owner, change_organization_ownerVariables>(CHANGE_ORGANIZATION_OWNER);
  const [setRolesMutation] = useMutation<set_organization_user_roles, set_organization_user_rolesVariables>(SET_ORGANIZATION_USER_ROLES);
  const [sendOrgInvitesMutation] = useMutation<send_organization_invites, send_organization_invitesVariables>(SEND_ORGANIZATION_INVITES);
  const [deleteInvatationMutation] = useMutation<delete_organization_invitation, delete_organization_invitationVariables>(DELETE_ORGANIZATION_INVITES);

  const createOrganization = (data: create_organizationVariables['data']) => (
    handleGraphQLRequest("create_organization", createMutation)({ variables: { data } })
  );
  const updateOrganization = (data: UpdateOrganizationInput) => (
    handleGraphQLRequest("update_organization", updateMutation)({ variables: { data } })
  );
  const changeOrganizationOwner = (data: ChangeOrganizationOwnerInput) => (
    handleGraphQLRequest("change_organization_owner", changeOwnerMutation)({ variables: { data } })
  );
  const setOrganizationUserRoles = (data: SetOrganizationUserRolesInput) => (
    handleGraphQLRequest("set_organization_user_roles", setRolesMutation)({ variables: { data } })
  );
  const sendOrganizationInvites = (data: SendOrganizationInvitesInput) => (
    handleGraphQLRequest("send_organization_invites", sendOrgInvitesMutation)({ variables: { data } })
  );
  const deleteOrganizationInvitation = (id: string) => (
    handleGraphQLRequest("delete_organization_invitation", deleteInvatationMutation)({ variables: { data: { id } } })
  );

  return (
    <OrganizationMutationContext.Provider value={{
      createOrganization,
      updateOrganization,
      changeOrganizationOwner,
      setOrganizationUserRoles,
      sendOrganizationInvites,
      deleteOrganizationInvitation
    }}>
      {children}
    </OrganizationMutationContext.Provider>
  );
};

export function useOrganizationMutation() {
  return React.useContext(OrganizationMutationContext);
}

export default OrganizationMutationProvider;
