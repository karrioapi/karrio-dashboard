import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { GetUser_user, UPDATE_USER, update_userVariables, UpdateUserInput, REGISTER_USER, register_userVariables, register_user_register_user, RegisterUserInput, ConfirmPasswordResetInput, confirm_password_reset_confirm_password_reset, confirm_password_resetVariables, CONFIRM_PASSWORD_RESET, ChangePasswordInput, CHANGE_PASSWORD, change_password_change_password, change_passwordVariables, update_user, register_user, confirm_password_reset, change_password, update_user_update_user, request_email_change, request_email_changeVariables, REQUEST_EMAIL_CHANGE, RequestEmailChangeInput, request_email_change_request_email_change, confirm_email_change, confirm_email_changeVariables, CONFIRM_EMAIL_CHANGE, confirm_email_change_confirm_email_change, ConfirmEmailChangeInput } from 'karrio/graphql';
import { handleGraphQLRequest } from '@/lib/helper';


export type UserMutator<T> = T & {
  updateUser: (data: UpdateUserInput) => Promise<update_user_update_user | null>;
  closeAccount: () => Promise<update_user_update_user | null>;
  registerUser: (data: RegisterUserInput) => Promise<register_user_register_user | null>;
  requestEmailChange: (data: RequestEmailChangeInput) => Promise<request_email_change_request_email_change | null>;
  confirmEmailChange: (data: ConfirmEmailChangeInput) => Promise<confirm_email_change_confirm_email_change | null>;
  confirmPasswordReset: (data: ConfirmPasswordResetInput) => Promise<confirm_password_reset_confirm_password_reset | null>;
  changePassword: (data: ChangePasswordInput) => Promise<change_password_change_password | null>;
};

export const UserMutationContext = React.createContext<UserMutator<{}>>({} as UserMutator<{}>);

export const UserMutationProvider: React.FC = ({ children }) => {
  const [registerMutation] = useMutation<register_user, register_userVariables>(REGISTER_USER);
  const [changePasswordMutation] = useMutation<change_password, change_passwordVariables>(CHANGE_PASSWORD);
  const [changeEmailMutation] = useMutation<request_email_change, request_email_changeVariables>(REQUEST_EMAIL_CHANGE);
  const [confirmEmailMutation] = useMutation<confirm_email_change, confirm_email_changeVariables>(CONFIRM_EMAIL_CHANGE);
  const [confirmResetMutation] = useMutation<confirm_password_reset, confirm_password_resetVariables>(CONFIRM_PASSWORD_RESET);
  const [updateMutation] = useMutation<update_user, update_userVariables>(UPDATE_USER);

  const updateUser = (data: UpdateUserInput) => (
    handleGraphQLRequest("update_user", updateMutation)({ variables: { data } })
  );
  const closeAccount = () => (
    handleGraphQLRequest("update_user", updateMutation)({ variables: { data: { is_active: false } } })
  );
  const registerUser = (data: RegisterUserInput) => (
    handleGraphQLRequest("register_user", registerMutation)({ variables: { data } })
  );
  const requestEmailChange = (data: RequestEmailChangeInput) => (
    handleGraphQLRequest("request_email_change", changeEmailMutation)({ variables: { data } })
  );
  const confirmEmailChange = (data: ConfirmEmailChangeInput) => (
    handleGraphQLRequest("confirm_email_change", confirmEmailMutation)({ variables: { data } })
  );
  const confirmPasswordReset = (data: ConfirmPasswordResetInput) => (
    handleGraphQLRequest("confirm_password_reset", confirmResetMutation)({ variables: { data } })
  );
  const changePassword = (data: ChangePasswordInput) => (
    handleGraphQLRequest("change_password", changePasswordMutation)({ variables: { data } })
  );

  return (
    <UserMutationContext.Provider value={{
      updateUser,
      closeAccount,
      registerUser,
      requestEmailChange,
      confirmEmailChange,
      confirmPasswordReset,
      changePassword
    }}>
      {children}
    </UserMutationContext.Provider>
  )
};

export function useUserMutation() {
  return React.useContext(UserMutationContext);
}

export type UserUpdateType = (data: UpdateUserInput) => Promise<FetchResult<GetUser_user, Record<string, any>, Record<string, any>>>;

const UserMutation = <T extends {}>(Component: React.FC<UserMutator<T>>) => (
  function UserMutationWrapper({ children, ...props }: any) {
    return (
      <>
        <UserMutationProvider>
          <UserMutationContext.Consumer>{(mutator) => (
            <Component
              {...props}
              updateUser={mutator.updateUser}
              closeAccount={mutator.closeAccount}
              registerUser={mutator.registerUser}
              requestEmailChange={mutator.requestEmailChange}
              changePassword={mutator.changePassword}
              confirmEmailChange={mutator.confirmEmailChange}
              confirmPasswordReset={mutator.confirmPasswordReset}>
              {children}
            </Component>
          )}</UserMutationContext.Consumer>
        </UserMutationProvider>
      </>
    );
  }
);

export default UserMutation;
