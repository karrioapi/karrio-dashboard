import React from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { GetUser_user, UPDATE_USER, update_userVariables, UpdateUserInput, REGISTER_USER, register_userVariables, register_user_register_user, RegisterUserInput, ConfirmPasswordResetInput, confirm_password_reset_confirm_password_reset, confirm_password_resetVariables, CONFIRM_PASSWORD_RESET } from '@/graphql';


export type UserMutator<T> = T & {
  registerUser: (data: RegisterUserInput) => Promise<register_user_register_user>;
  confirmPasswordReset: (data: ConfirmPasswordResetInput) => Promise<confirm_password_reset_confirm_password_reset>;
  updateUser: (data: UpdateUserInput) => Promise<FetchResult<GetUser_user, Record<string, any>, Record<string, any>>>;
  closeAccount: () => Promise<FetchResult<GetUser_user, Record<string, any>, Record<string, any>>>;
}

export type UserUpdateType = (data: UpdateUserInput) => Promise<FetchResult<GetUser_user, Record<string, any>, Record<string, any>>>;

const UserMutation = <T extends {}>(Component: React.FC<UserMutator<T>>) => (
  function UserMutationWrapper({ children, ...props }: any) {
    const [registerMutation] = useMutation<register_user_register_user, register_userVariables>(REGISTER_USER);
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

    return (
      <Component
        {...props}
        updateUser={updateUser}
        closeAccount={closeAccount}
        registerUser={registerUser}
        confirmPasswordReset={confirmPasswordReset}>
        {children}
      </Component>
    );
  }
);

export default UserMutation;
