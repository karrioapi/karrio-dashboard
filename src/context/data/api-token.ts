import { SystemCarrierMutationInput, MUTATE_API_TOKEN, GET_API_TOKEN, GetToken } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";


export function useAPIToken() {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['api_token'],
    () => request<GetToken>(gqlstr(GET_API_TOKEN), { ...headers() }),
    { onError }
  );

  return {
    query,
  };
}

export function useAPITokenMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => {
    queryClient.invalidateQueries(['api_token']);
    queryClient.invalidateQueries(['organizations']);
  };

  // Mutations
  const updateToken = useMutation(
    (data: SystemCarrierMutationInput) => request(gqlstr(MUTATE_API_TOKEN), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );

  return {
    updateToken,
  };
}
