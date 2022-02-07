import React, { useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GET_ORGANIZATIONS, get_organizations, get_organizations_organizations } from '@purplship/graphql';


export type OrganizationType = get_organizations_organizations;

type OrganizationsQueryResult = LazyQueryResult<get_organizations, any> & {
  organizations: OrganizationType[];
  organization: OrganizationType;
  load: () => Promise<any>;
};

export const Organizations = React.createContext<OrganizationsQueryResult>({} as OrganizationsQueryResult);

const OrganizationsProvider: React.FC<{ organizations: OrganizationType[], org_id: string }> = ({ children, organizations, org_id }) => {
  const [initialLoad, result] = useLazyQuery<get_organizations>(GET_ORGANIZATIONS);
  const [state, setState] = useState<OrganizationType[]>(organizations);

  const load = () => result.called ? result.fetchMore({}) : initialLoad({});
  const extractList = (results: any[]): OrganizationType[] => (results).filter(r => r !== null);
  const extractCurrent = (results: any[]): OrganizationType => {
    const current = results.find(org => org.id === org_id)
    return current || {}
  };

  useEffect(() => {
    result.data?.organizations && setState(extractList(result.data?.organizations));
  }, [result.data?.organizations]);

  return (
    <Organizations.Provider value={{
      load,
      organization: extractCurrent(state),
      organizations: state,
      ...result
    }}>
      {children}
    </Organizations.Provider>
  );
};

export default OrganizationsProvider;
