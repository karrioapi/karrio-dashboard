import { get_system_connections, GET_SYSTEM_CONNECTIONS, SystemCarrierMutationInput, MUTATE_SYSTEM_CONNECTION, get_system_connections_system_connections } from "@karrio/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";

export type SystemConnectionType = get_system_connections_system_connections;

export function useSystemConnections() {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['system_connections'],
    () => request<get_system_connections>(gqlstr(GET_SYSTEM_CONNECTIONS), { ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
  };
}


export function useSystemConnectionMutation() {
  const headers = useSessionHeader();
  const queryClient = useQueryClient();
  const invalidateCache = () => { queryClient.invalidateQueries(['system_connections']) };

  // Mutations
  const updateSystemConnection = useMutation(
    (data: SystemCarrierMutationInput) => request(gqlstr(MUTATE_SYSTEM_CONNECTION), { data, ...headers() }),
    { onSuccess: invalidateCache, onError }
  );

  return {
    updateSystemConnection,
  };
}
