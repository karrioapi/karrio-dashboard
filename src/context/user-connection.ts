import { CreateCarrierConnectionMutationInput, CREATE_CARRIER_CONNECTION, DELETE_CARRIER_CONNECTION, get_user_connections, GET_USER_CONNECTIONS, get_user_connections_user_connections, UpdateCarrierConnectionMutationInput, UPDATE_CARRIER_CONNECTION } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";


export type CarrierConnectionType = get_user_connections_user_connections;

export function useCarrierConnections() {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['user_connections'],
    () => request<get_user_connections>(gqlstr(GET_USER_CONNECTIONS), { ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
  };
}


export function useCarrierConnectionMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => { queryClient.invalidateQueries(['user_connections']) };

  // Mutations
  const createCarrierConnection = useMutation(
    (data: CreateCarrierConnectionMutationInput) => request(gqlstr(CREATE_CARRIER_CONNECTION), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const updateCarrierConnection = useMutation(
    (data: UpdateCarrierConnectionMutationInput) => request(gqlstr(UPDATE_CARRIER_CONNECTION), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );
  const deleteCarrierConnection = useMutation(
    (data: { id: string }) => request(gqlstr(DELETE_CARRIER_CONNECTION), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );

  return {
    createCarrierConnection,
    updateCarrierConnection,
    deleteCarrierConnection,
  };
}
