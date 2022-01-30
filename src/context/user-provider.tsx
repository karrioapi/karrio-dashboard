import React, { useEffect } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GetUser, GetUser_user, GET_USER } from '@purplship/graphql';

export type UserType = GetUser_user;
type UserDataType = LazyQueryResult<GetUser, any> & { user: UserType };

export const UserData = React.createContext<UserDataType>({} as UserDataType);

const UserProvider: React.FC = ({ children }) => {
  const [initialLoad, result] = useLazyQuery<GetUser>(GET_USER);

  useEffect(() => { if (!result.called) initialLoad(); }, []);

  return (
    <UserData.Provider value={{ user: result.data?.user as UserType, ...result }}>
      {children}
    </UserData.Provider>
  );
};

export default UserProvider;
