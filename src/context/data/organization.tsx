import { ACCEPT_ORGANIZATION_INVITATION, ChangeOrganizationOwnerMutationInput, CHANGE_ORGANIZATION_OWNER, CreateOrganizationMutationInput, CREATE_ORGANIZATION, DELETE_ORGANIZATION, DELETE_ORGANIZATION_INVITES, get_organizations, GET_ORGANIZATIONS, get_organizations_organizations, get_organization_invitation, GET_ORGANIZATION_INVITATION, SendOrganizationInvitesMutationInput, SEND_ORGANIZATION_INVITES, SetOrganizationUserRolesMutationInput, SET_ORGANIZATION_USER_ROLES, UpdateOrganizationMutationInput, UPDATE_ORGANIZATION } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, insertUrlParam, onError, request, setCookie, useSessionHeader } from "@/lib/helper";
import React from "react";

type OrganizationContextType = {
  organization?: get_organizations_organizations,
  organizations?: get_organizations_organizations[],
};
export const OrganizationContext = React.createContext<OrganizationContextType>({} as any);

const extractCurrent = (orgs?: get_organizations_organizations[], orgId?: string): get_organizations_organizations | undefined => {
  const current = (orgs || []).find(org => org?.id === orgId)
  return current
};

export const OrganizationProvider: React.FC<any> = ({ children, ...props }) => {
  const headers = useSessionHeader();
  const [organizations, setOrganizations] = React.useState<get_organizations_organizations[] | undefined>(props.organizations);
  const [organization, setOrganization] = React.useState<get_organizations_organizations | undefined>(
    extractCurrent(props.organizations, props.orgId)
  );

  useQuery(
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
    <OrganizationContext.Provider value={{ organization, organizations }}>
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
    (data: CreateOrganizationMutationInput) => request(gqlstr(CREATE_ORGANIZATION), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const updateOrganization = useMutation(
    (data: UpdateOrganizationMutationInput) => request(gqlstr(UPDATE_ORGANIZATION), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const deleteOrganization = useMutation(
    (data: { id: string }) => request(gqlstr(DELETE_ORGANIZATION), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const changeOrganizationOwner = useMutation(
    (data: ChangeOrganizationOwnerMutationInput) => request(gqlstr(CHANGE_ORGANIZATION_OWNER), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const setOrganizationUserRoles = useMutation(
    (data: SetOrganizationUserRolesMutationInput) => request(gqlstr(SET_ORGANIZATION_USER_ROLES), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const sendOrganizationInvites = useMutation(
    (data: SendOrganizationInvitesMutationInput) => request(gqlstr(SEND_ORGANIZATION_INVITES), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const deleteOrganizationInvitation = useMutation(
    (data: { id: string }) => request(gqlstr(DELETE_ORGANIZATION_INVITES), { data, ...headers() }),
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

export function useOrganizationInvitation(guid: string) {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => { queryClient.invalidateQueries(['organizations']) };

  // Queries
  const query = useQuery(
    ['invitation', guid],
    () => request<get_organization_invitation>(gqlstr(GET_ORGANIZATION_INVITATION), { data: { guid }, ...headers() }),
  );

  // Mutations
  const acceptInvitation = useMutation(
    (data: { guid: string }) => request(gqlstr(ACCEPT_ORGANIZATION_INVITATION), { data, ...headers() }),
    { onSuccess: invalidateCache }
  );

  return {
    query,
    acceptInvitation,
  };
}
