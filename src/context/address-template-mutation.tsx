import { CREATE_ADDRESS_TEMPLATE, UPDATED_ADDRESS_TEMPLATE, DELETE_ADDRESS_TEMPLATE } from 'karrio/graphql';
import { getSessionHeader, request } from '@/lib/helper';
import * as rQuery from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { SessionType } from '@/lib/types';


export function useAddressTemplateMutation() {
  const { data: session } = useSession();
  const queryClient = rQuery.useQueryClient();
  const config = () => ({
    config: { headers: getSessionHeader(session as SessionType) }
  });

  // Mutations
  const createAddressTemplate = rQuery.useMutation(
    (data: any) => request({ query: CREATE_ADDRESS_TEMPLATE, variables: { data }, ...config() }), {
    onSuccess: () => { queryClient.invalidateQueries(['addresses']) },
  });
  const updateAddressTemplate = rQuery.useMutation(
    (data: any) => request({ query: UPDATED_ADDRESS_TEMPLATE, variables: { data }, ...config() }), {
    onSuccess: () => { queryClient.invalidateQueries(['addresses']) },
  });
  const deleteAddressTemplate = rQuery.useMutation(
    (data: { id: string }) => request({ query: DELETE_ADDRESS_TEMPLATE, variables: { data }, ...config() }), {
    onSuccess: () => { queryClient.invalidateQueries(['addresses']) },
  });

  return { createAddressTemplate, updateAddressTemplate, deleteAddressTemplate };
}
