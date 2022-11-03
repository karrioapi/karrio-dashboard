import { MetadataMutationInput, MUTATE_METADATA } from "@karrio/graphql";
import { gqlstr, request, useSessionHeader } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";


export function useMetadataMutation() {
  const headers = useSessionHeader();

  // Mutations
  const updateMetadata = useMutation(
    (data: MetadataMutationInput) => request(gqlstr(MUTATE_METADATA), { data, ...headers() }),
  );

  return {
    updateMetadata,
  };
}
