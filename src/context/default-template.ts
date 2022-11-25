import { get_default_templates, GET_DEFAULT_TEMPLATES } from "@karrio/graphql";
import { gqlstr, onError, request, useSessionHeader } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";


export function useDefaultTemplates() {
  const headers = useSessionHeader();

  // Queries
  const query = useQuery(
    ['default_templates'],
    () => request<get_default_templates>(gqlstr(GET_DEFAULT_TEMPLATES), { ...headers() }),
    { keepPreviousData: true, staleTime: 5000, onError },
  );

  return {
    query,
  };
}
