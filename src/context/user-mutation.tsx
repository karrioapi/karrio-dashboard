import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { GetUser_user, UPDATE_USER, update_userVariables, UpdateUserInput, REGISTER_USER, register_userVariables, register_user_register_user, RegisterUserInput, ConfirmPasswordResetInput, confirm_password_reset_confirm_password_reset, confirm_password_resetVariables, CONFIRM_PASSWORD_RESET, ChangePasswordInput, CHANGE_PASSWORD, change_password_change_password, change_passwordVariables, update_user, register_user, confirm_password_reset, change_password, update_user_update_user } from '@purplship/graphql';
import { handleGraphQLRequest } from '@/lib/helper';


export type UserMutator<T> = T & {
  updateUser: (data: UpdateUserInput) => Promise<update_user_update_user | null>;
  closeAccount: () => Promise<update_user_update_user | null>;
  registerUser: (data: RegisterUserInput) => Promise<register_user_register_user | null>;
  confirmPasswordReset: (data: ConfirmPasswordResetInput) => Promise<confirm_password_reset_confirm_password_reset | null>;
  changePassword: (data: ChangePasswordInput) => Promise<change_password_change_password | null>;
}

export type UserUpdateType = (data: UpdateUserInput) => Promise<FetchResult<GetUser_user, Record<string, any>, Record<string, any>>>;

const UserMutation = <T extends {}>(Component: React.FC<UserMutator<T>>) => (
  function UserMutationWrapper({ children, ...props }: any) {
    const [registerMutation] = useMutation<register_user, register_userVariables>(REGISTER_USER);
    const [changePasswordMutation] = useMutation<change_password, change_passwordVariables>(CHANGE_PASSWORD);
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
    const confirmPasswordReset = (data: ConfirmPasswordResetInput) => (
      handleGraphQLRequest("confirm_password_reset", confirmResetMutation)({ variables: { data } })
    );
    const changePassword = (data: ChangePasswordInput) => (
      handleGraphQLRequest("change_password", changePasswordMutation)({ variables: { data } })
    );

    return (
      <Component
        {...props}
        updateUser={updateUser}
        closeAccount={closeAccount}
        registerUser={registerUser}
        changePassword={changePassword}
        confirmPasswordReset={confirmPasswordReset}>
        {children}
      </Component>
    );
  }
);

export default UserMutation;
