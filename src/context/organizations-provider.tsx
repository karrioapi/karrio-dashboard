import React from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GET_ORGANIZATIONS, get_organizations, get_organizations_organizations } from '@/graphql';


export type OrganizationType = get_organizations_organizations;

type OrganizationsQueryResult = LazyQueryResult<get_organizations, any> & {
  organizations: OrganizationType[];
  organization: OrganizationType;
  load: () => void;
};

export const Organizations = React.createContext<OrganizationsQueryResult>({} as OrganizationsQueryResult);

const OrganizationsProvider: React.FC<{ organizations: OrganizationType[], org_id: string }> = ({ children, organizations, org_id }) => {
  const [initialLoad, result] = useLazyQuery<get_organizations>(GET_ORGANIZATIONS);

  const load = () => result.called ? result.fetchMore({}) : initialLoad({});
  const extractList = (results: any[]): OrganizationType[] => (results).filter(r => r !== null);
  const extractCurrent = (results: any[]): OrganizationType => {
    const current = results.find(org => org.id === org_id)
    return current || {}
  };

  return (
    <Organizations.Provider value={{
      load,
      organization: extractCurrent(result.data?.organizations || organizations || []),
      organizations: extractList(result.data?.organizations || organizations || []),
      ...result
    }}>
      {children}
    </Organizations.Provider>
  );
};

export default OrganizationsProvider;
