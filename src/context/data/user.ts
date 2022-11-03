import { UPDATE_USER, GET_USER, GetToken, UpdateUserInput, RegisterUserMutationInput, RequestEmailChangeMutationInput, REGISTER_USER, CONFIRM_EMAIL_CHANGE, ConfirmEmailChangeMutationInput, CONFIRM_PASSWORD_RESET, ConfirmPasswordResetMutationInput, ChangePasswordMutationInput } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";


export function useUser() {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['user'],
    () => request<GetToken>(gqlstr(GET_USER), { ...headers() }),
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
    (data: UpdateUserInput) => request(gqlstr(UPDATE_USER), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const closeAccount = useMutation(
    () => request(gqlstr(UPDATE_USER), { data: { is_active: false }, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const registerUser = useMutation(
    (data: RegisterUserMutationInput) => request(gqlstr(REGISTER_USER), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const requestEmailChange = useMutation(
    (data: RequestEmailChangeMutationInput) => request(gqlstr(REGISTER_USER), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const confirmEmailChange = useMutation(
    (data: ConfirmEmailChangeMutationInput) => request(gqlstr(CONFIRM_EMAIL_CHANGE), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const confirmPasswordReset = useMutation(
    (data: ConfirmPasswordResetMutationInput) => request(gqlstr(CONFIRM_PASSWORD_RESET), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const changePassword = useMutation(
    (data: ChangePasswordMutationInput) => request(gqlstr(CONFIRM_PASSWORD_RESET), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );

  return {
    closeAccount,
    changePassword,
    confirmEmailChange,
    confirmPasswordReset,
    requestEmailChange,
    registerUser,
    updateUser,
  };
}
