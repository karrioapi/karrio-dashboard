import React, { useContext, useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GetUser, GetUser_user, GET_USER } from '@purplship/graphql';

export type UserType = GetUser_user;
type UserDataType = LazyQueryResult<GetUser, any> & { user: UserType };

export const UserData = React.createContext<UserDataType>({} as UserDataType);

const UserProvider: React.FC<{ user: UserType }> = ({ user, children }) => {
  const [_, result] = useLazyQuery<GetUser>(GET_USER);
  const [state, setState] = useState<UserType>(user);

  useEffect(() => {
    result.data?.user && setState(result.data?.user as UserType);
  }, [result.data]);

  return (
    <UserData.Provider value={{ user: state, ...result }}>
      {children}
    </UserData.Provider>
  );
};

export function useUser() {
  const { user } = useContext(UserData);
  return user;
}

export default UserProvider;
