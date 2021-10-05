import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { GetUser_user, UPDATE_USER, update_userVariables, UpdateUserInput, REGISTER_USER, register_userVariables, register_user_register_user, RegisterUserInput, ConfirmPasswordResetInput, confirm_password_reset_confirm_password_reset, confirm_password_resetVariables, CONFIRM_PASSWORD_RESET, ChangePasswordInput, CHANGE_PASSWORD, change_password_change_password, change_passwordVariables } from '@/graphql';


export type UserMutator<T> = T & {
  registerUser: (data: RegisterUserInput) => Promise<register_user_register_user>;
  changePassword: (data: ChangePasswordInput) => Promise<change_password_change_password>
  confirmPasswordReset: (data: ConfirmPasswordResetInput) => Promise<confirm_password_reset_confirm_password_reset>;
  updateUser: (data: UpdateUserInput) => Promise<FetchResult<GetUser_user, Record<string, any>, Record<string, any>>>;
  closeAccount: () => Promise<FetchResult<GetUser_user, Record<string, any>, Record<string, any>>>;
}

export type UserUpdateType = (data: UpdateUserInput) => Promise<FetchResult<GetUser_user, Record<string, any>, Record<string, any>>>;

const UserMutation = <T extends {}>(Component: React.FC<UserMutator<T>>) => (
  function UserMutationWrapper({ children, ...props }: any) {
    const [registerMutation] = useMutation<register_user_register_user, register_userVariables>(REGISTER_USER);
    const [changePasswordMutation] = useMutation<change_password_change_password, change_passwordVariables>(CHANGE_PASSWORD);
    const [confirmResetMutation] = useMutation<confirm_password_reset_confirm_password_reset, confirm_password_resetVariables>(CONFIRM_PASSWORD_RESET);
    const [updateMutation] = useMutation<GetUser_user, update_userVariables>(UPDATE_USER);

    const updateUser = (data: UpdateUserInput) => updateMutation({ variables: { data } });
    const closeAccount = () => updateMutation({ variables: { data: { is_active: false } } });
    const registerUser = (data: RegisterUserInput) => (
      registerMutation({ variables: { data } })
        .then((response: any) => response.data?.register_user as register_user_register_user)
    );
    const confirmPasswordReset = (data: ConfirmPasswordResetInput) => (
      confirmResetMutation({ variables: { data } })
        .then((response: any) => response.data?.confirm_password_reset as confirm_password_reset_confirm_password_reset)
    );
    const changePassword = (data: ChangePasswordInput) => (
      changePasswordMutation({ variables: { data } })
        .then((response: any) => response.data?.change_password as change_password_change_password)
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
