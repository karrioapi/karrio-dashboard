import React, { useContext } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_user_connections, GET_USER_CONNECTIONS, get_user_connections_user_connections, GET_USER_CONNECTIONS_WITH_GENERICS } from '@purplship/graphql';
import { APIReference } from './references-provider';


export type UserConnectionType = get_user_connections_user_connections;

type UserConnectionsQueryResult = LazyQueryResult<get_user_connections, any> & {
  user_connections: UserConnectionType[];
  load: (options?: any) => Promise<any>;
};

export const UserConnections = React.createContext<UserConnectionsQueryResult>({} as UserConnectionsQueryResult);

const UserConnectionsProvider: React.FC = ({ children }) => {
  const { ORDERS_MANAGEMENT } = useContext(APIReference);
  const [initialLoad, result] = useLazyQuery<get_user_connections>(
    ORDERS_MANAGEMENT ? GET_USER_CONNECTIONS_WITH_GENERICS : GET_USER_CONNECTIONS,
  );

  const extract = (results: any[]): UserConnectionType[] => results.filter(r => r !== null);
  const load = (options?: any) => result.called ? result.fetchMore({}) : initialLoad(options);

  return (
    <UserConnections.Provider value={{ load, user_connections: extract(result.data?.user_connections || []), ...result }}>
      {children}
    </UserConnections.Provider>
  );
};

export default UserConnectionsProvider;
