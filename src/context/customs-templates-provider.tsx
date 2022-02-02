import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_customs_info_templates, get_customs_info_templates_customs_templates_edges, GET_CUSTOMS_TEMPLATES } from '@purplship/graphql';
import { CustomsTemplateType } from '@/lib/types';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

type Edges = (get_customs_info_templates_customs_templates_edges | null)[];
type CustomInfoTemplatesQueryResult = LazyQueryResult<get_customs_info_templates, any> & {
  templates: CustomsTemplateType[];
  next?: number | null;
  previous?: number | null;
  load: () => void;
  loadMore: (cursor?: number | null) => Promise<any>;
};

export const CustomInfoTemplates = React.createContext<CustomInfoTemplatesQueryResult>({} as CustomInfoTemplatesQueryResult);

const CustomInfoTemplatesProvider: React.FC = ({ children }) => {
  const [initialLoad, query] = useLazyQuery<get_customs_info_templates>(GET_CUSTOMS_TEMPLATES, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [variables, setVariables] = useState<any>(PAGINATION);

  const extract = (edges?: Edges): CustomsTemplateType[] => (edges || []).map(item => item?.node as CustomsTemplateType);
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
    <CustomInfoTemplates.Provider value={{
      load, loadMore,
      templates: extract(query?.data?.customs_templates?.edges),
      next: query.data?.customs_templates?.pageInfo?.hasNextPage ? (variables?.offset + PAGE_SIZE) : null,
      previous: variables.offset > 0 ? (variables?.offset - PAGE_SIZE) : null,
      ...query
    }}>
      {children}
    </CustomInfoTemplates.Provider>
  );
};

export default CustomInfoTemplatesProvider;
