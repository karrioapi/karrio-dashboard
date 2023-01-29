import { UPDATE_USER, GET_USER, UpdateUserInput, RegisterUserMutationInput, RequestEmailChangeMutationInput, REGISTER_USER, CONFIRM_EMAIL_CHANGE, ConfirmEmailChangeMutationInput, CONFIRM_PASSWORD_RESET, ConfirmPasswordResetMutationInput, ChangePasswordMutationInput, GetUser, confirm_email_change, request_email_change, confirm_password_reset, register_user, change_password, update_user, GetUser_user, REQUEST_EMAIL_CHANGE, ConfirmEmailMutationInput, confirm_email, CONFIRM_EMAIL, CHANGE_PASSWORD, RequestPasswordResetMutationInput, request_password_reset, REQUEST_PASSWORD_RESET } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";

export type UserType = GetUser_user;


export function useUser() {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['user'],
    () => request<GetUser>(gqlstr(GET_USER), { ...headers() }),
    { onError }
  );

  return {
    query,
  };
}

export function useUserMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => { queryClient.invalidateQueries(['user']) };

  // Mutations
  const updateUser = useMutation(
    (data: UpdateUserInput) => request<update_user>(gqlstr(UPDATE_USER), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const closeAccount = useMutation(
    () => request<update_user>(gqlstr(UPDATE_USER), { data: { is_active: false }, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const registerUser = useMutation(
    (data: RegisterUserMutationInput) => request<register_user>(
      gqlstr(REGISTER_USER), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const requestEmailChange = useMutation(
    (data: RequestEmailChangeMutationInput) => request<request_email_change>(
      gqlstr(REQUEST_EMAIL_CHANGE), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const confirmEmailChange = useMutation(
    (data: ConfirmEmailChangeMutationInput) => request<confirm_email_change>(
      gqlstr(CONFIRM_EMAIL_CHANGE), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const changePassword = useMutation(
    (data: ChangePasswordMutationInput) => request<change_password>(
      gqlstr(CHANGE_PASSWORD), { data, ...headers() }
    ),
    { onSuccess: invalidateCache, onError }
  );
  const confirmPasswordReset = useMutation(
    (data: ConfirmPasswordResetMutationInput) => request<confirm_password_reset>(
      gqlstr(CONFIRM_PASSWORD_RESET), { data }
    ),
    { onSuccess: invalidateCache }
  );
  const confirmEmail = useMutation(
    (data: ConfirmEmailMutationInput) => request<confirm_email>(
      gqlstr(CONFIRM_EMAIL), { data }
    ),
    { onSuccess: invalidateCache }
  );
  const requestPasswordReset = useMutation(
    (data: RequestPasswordResetMutationInput) => request<request_password_reset>(
      gqlstr(REQUEST_PASSWORD_RESET), { data }
    ),
    { onSuccess: invalidateCache }
  );

  return {
    closeAccount,
    confirmEmail,
    changePassword,
    confirmEmailChange,
    confirmPasswordReset,
    requestPasswordReset,
    requestEmailChange,
    registerUser,
    updateUser,
  };
}
