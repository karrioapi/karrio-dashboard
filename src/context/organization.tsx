import { accept_organization_invitation, ACCEPT_ORGANIZATION_INVITATION, ChangeOrganizationOwnerMutationInput, change_organization_owner, CHANGE_ORGANIZATION_OWNER, CreateOrganizationMutationInput, create_organization, CREATE_ORGANIZATION, delete_organization, DELETE_ORGANIZATION, delete_organization_invitation, DELETE_ORGANIZATION_INVITES, get_organizations, GET_ORGANIZATIONS, get_organizations_organizations, get_organization_invitation, GET_ORGANIZATION_INVITATION, SendOrganizationInvitesMutationInput, send_organization_invites, SEND_ORGANIZATION_INVITES, SetOrganizationUserRolesMutationInput, set_organization_user_roles, SET_ORGANIZATION_USER_ROLES, UpdateOrganizationMutationInput, update_organization, UPDATE_ORGANIZATION } from "@karrio/graphql";
import { DefinedUseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, insertUrlParam, onError, request, setCookie, useSessionHeader } from "@/lib/helper";
import React from "react";

export type OrganizationType = get_organizations_organizations;
type OrganizationContextType = {
  query?: DefinedUseQueryResult<any, any>;
  organization?: OrganizationType,
  organizations?: OrganizationType[],
};
export const OrganizationContext = React.createContext<OrganizationContextType>({} as any);

const extractCurrent = (orgs?: OrganizationType[], orgId?: string): OrganizationType | undefined => {
  const current = (orgs || []).find(org => org?.id === orgId)
  return current
};

export const OrganizationProvider: React.FC<any> = ({ children, ...props }) => {
  const headers = useSessionHeader();
  const [organizations, setOrganizations] = React.useState<OrganizationType[] | undefined>(props.organizations);
  const [organization, setOrganization] = React.useState<OrganizationType | undefined>(
    extractCurrent(props.organizations, props.orgId)
  );

  const query = useQuery(
    ['organizations'],
    () => request<get_organizations>(gqlstr(GET_ORGANIZATIONS), { ...headers() }).then(
      data => {
        setOrganizations(data?.organizations)
        setOrganization(extractCurrent(data?.organizations, props.orgId));
        return data;
      }
    ),
    { initialData: props.organizations, onError }
  );

  return (
    <OrganizationContext.Provider value={{ organization, organizations, query }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export function useOrganizations() {
  return React.useContext(OrganizationContext);
}

export function useOrganizationMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => { queryClient.invalidateQueries(['organizations']) };

  // Mutations
  const createOrganization = useMutation(
    (data: CreateOrganizationMutationInput) => request<create_organization>(
      gqlstr(CREATE_ORGANIZATION), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const updateOrganization = useMutation(
    (data: UpdateOrganizationMutationInput) => request<update_organization>(
      gqlstr(UPDATE_ORGANIZATION), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const deleteOrganization = useMutation(
    (data: { id: string }) => request<delete_organization>(
      gqlstr(DELETE_ORGANIZATION), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const changeOrganizationOwner = useMutation(
    (data: ChangeOrganizationOwnerMutationInput) => request<change_organization_owner>(
      gqlstr(CHANGE_ORGANIZATION_OWNER), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const setOrganizationUserRoles = useMutation(
    (data: SetOrganizationUserRolesMutationInput) => request<set_organization_user_roles>(
      gqlstr(SET_ORGANIZATION_USER_ROLES), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const sendOrganizationInvites = useMutation(
    (data: SendOrganizationInvitesMutationInput) => request<send_organization_invites>(
      gqlstr(SEND_ORGANIZATION_INVITES), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const deleteOrganizationInvitation = useMutation(
    (data: { id: string }) => request<delete_organization_invitation>(
      gqlstr(DELETE_ORGANIZATION_INVITES), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );

  // Helpers
  const changeActiveOrganization = async (orgId: string) => {
    setCookie("orgId", orgId);
    insertUrlParam({});
    setTimeout(() => location.reload(), 1000);
  };

  return {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    changeOrganizationOwner,
    setOrganizationUserRoles,
    sendOrganizationInvites,
    deleteOrganizationInvitation,
    changeActiveOrganization,
  };
}

export function useOrganizationInvitation(guid?: string) {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => { queryClient.invalidateQueries(['organizations']) };

  // Queries
  const query = useQuery({
    queryKey: ['invitation', guid],
    queryFn: () => request<get_organization_invitation>(
      gqlstr(GET_ORGANIZATION_INVITATION), { data: { guid }, ...headers() }
    ),
    enabled: !!guid,
  });

  // Mutations
  const acceptInvitation = useMutation(
    (data: { guid: string }) => request<accept_organization_invitation>(
      gqlstr(ACCEPT_ORGANIZATION_INVITATION), { data, ...headers() }
    ),
    { onSuccess: invalidateCache }
  );

  return {
    query,
    acceptInvitation,
  };
}
