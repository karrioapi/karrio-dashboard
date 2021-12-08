import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_address_templates, GET_ADDRESS_TEMPLATES, get_address_templates_address_templates_edges } from '@/purplship/graphql';
import { AddressTemplate } from '@/lib/types';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

type Edges = (get_address_templates_address_templates_edges | null)[];
export type AddressTemplatesType = LazyQueryResult<get_address_templates, any> & {
  templates: AddressTemplate[];
  next?: number | null;
  previous?: number | null;
  load: () => void;
  loadMore: (cursor?: number | null) => void;
};

export const AddressTemplates = React.createContext<AddressTemplatesType>({} as AddressTemplatesType);

const AddressTemplatesProvider: React.FC = ({ children }) => {
  const [initialLoad, query] = useLazyQuery<get_address_templates>(GET_ADDRESS_TEMPLATES, { notifyOnNetworkStatusChange: true });
  const [variables, setVariables] = useState<any>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as AddressTemplate);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore(options);
  const load = () => query.called ? fetchMore({ variables: PAGINATION }) : initialLoad({ variables });
  const loadMore = (offset?: number | null) => {
    const options = { ...variables, offset: offset || 0 };
    return fetchMore({ variables: options })?.then(response => {
      setVariables(options);
      return response;
    });
  };

  return (
    <AddressTemplates.Provider value={{
      load, loadMore,
      templates: extract(query?.data?.address_templates?.edges),
      next: query.data?.address_templates?.pageInfo?.hasNextPage ? (variables?.offset + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (variables?.offset - PAGE_SIZE) : null,
      ...query
    }}>
      {children}
    </AddressTemplates.Provider>
  );
};

export default AddressTemplatesProvider;
