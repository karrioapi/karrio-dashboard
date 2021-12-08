import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_parcel_templates, GET_PARCEL_TEMPLATES, get_parcel_templates_parcel_templates_edges } from '@/purplship/graphql';
import { ParcelTemplateType } from '@/lib/types';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

type Edges = (get_parcel_templates_parcel_templates_edges | null)[];
export type ParcelTemplatesType = LazyQueryResult<get_parcel_templates, any> & {
  templates: ParcelTemplateType[];
  next?: number | null;
  previous?: number | null;
  load: () => void;
  loadMore: (cursor?: number | null) => void;
};

export const ParcelTemplates = React.createContext<ParcelTemplatesType>({} as ParcelTemplatesType);

const ParcelTemplatesProvider: React.FC = ({ children }) => {
  const [initialLoad, query] = useLazyQuery<get_parcel_templates>(GET_PARCEL_TEMPLATES, { notifyOnNetworkStatusChange: true });
  const [variables, setVariables] = useState<any>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as ParcelTemplateType);
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
    <ParcelTemplates.Provider value={{
      load, loadMore,
      templates: extract(query?.data?.parcel_templates?.edges),
      next: query.data?.parcel_templates?.pageInfo?.hasNextPage ? (variables?.offset + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (variables?.offset - PAGE_SIZE) : null,
      ...query
    }}>
      {children}
    </ParcelTemplates.Provider>
  );
};

export default ParcelTemplatesProvider;
