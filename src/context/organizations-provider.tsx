import React, { useContext, useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GET_ORGANIZATIONS, get_organizations, get_organizations_organizations } from 'karrio/graphql';
import { APIReference } from '@/context/references-provider';
import OrganizationMutationProvider from './organization-mutation';


export type OrganizationType = get_organizations_organizations;

type OrganizationsQueryResult = LazyQueryResult<get_organizations, any> & {
  organizations: OrganizationType[];
  organization: OrganizationType;
  load: () => Promise<any>;
};

export const Organizations = React.createContext<OrganizationsQueryResult>({} as OrganizationsQueryResult);

const OrganizationsProvider: React.FC<{ organizations: OrganizationType[], orgId: string }> = ({ children, organizations, orgId }) => {
  const { MULTI_ORGANIZATIONS } = useContext(APIReference);
  const [initialLoad, result] = useLazyQuery<get_organizations>(GET_ORGANIZATIONS);
  const [state, setState] = useState<OrganizationType[]>(organizations);

  const load = () => result.called ? result.fetchMore({}) : initialLoad({});
  const extractList = (results?: any[]): OrganizationType[] => (results || []).filter(r => r !== null);
  const extractCurrent = (results?: any[]): OrganizationType => {
    const current = (results || []).find(org => org?.id === orgId)
    return current || {}
  };

  useEffect(() => {
    result.data?.organizations && setState(extractList(result.data?.organizations));
  }, [result.data?.organizations]);

  if (!MULTI_ORGANIZATIONS) return <>{children}</>;

  return (
    <Organizations.Provider value={{
      load,
      organization: extractCurrent(state),
      organizations: state,
      ...result
    }}>
      <OrganizationMutationProvider>
        {children}
      </OrganizationMutationProvider>
    </Organizations.Provider>
  );
};

export default OrganizationsProvider;
