import { useLazyQuery, useMutation } from "@apollo/client";
import { ACCEPT_ORGANIZATION_INVITATION, accept_organization_invitation, accept_organization_invitationVariables, GET_ORGANIZATION_INVITATION, get_organization_invitation, get_organization_invitationVariables, get_organization_invitation_organization_invitation } from "@purplship/graphql";
import { useEffect, useState } from "react";


export function useOrganizationInvitation() {
  const [load, query] = useLazyQuery<get_organization_invitation, get_organization_invitationVariables>(GET_ORGANIZATION_INVITATION);
  const [acceptInvitation, mutation] = useMutation<accept_organization_invitation, accept_organization_invitationVariables>(ACCEPT_ORGANIZATION_INVITATION);
  const [invitation, setInvitation] = useState<get_organization_invitation_organization_invitation | undefined>(undefined);

  useEffect(() => {
    query.data?.organization_invitation && setInvitation(query.data?.organization_invitation);
  }, [query.data?.organization_invitation]);

  return {
    load: (guid: string) => load({ variables: { guid } }).catch(() => { }),
    accept: (guid: string) => acceptInvitation({ variables: { data: { guid } } }),

    ...query,
    invitation,
    error: query.error || mutation.error,
  }
}
