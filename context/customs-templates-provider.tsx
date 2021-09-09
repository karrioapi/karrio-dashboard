import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_customs_info_templates, get_customs_info_templates_customs_templates_edges, GET_CUSTOMS_TEMPLATES } from '@/graphql';
import { CustomsTemplateType } from '@/lib/types';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

type Edges = (get_customs_info_templates_customs_templates_edges | null)[];
type CustomInfoTemplatesQueryResult = LazyQueryResult<get_customs_info_templates, any> & {
  templates: CustomsTemplateType[];
  next?: number | null;
  previous?: number | null;
  load: () => void;
  loadMore: (cursor?: number | null) => void;
};

export const CustomInfoTemplates = React.createContext<CustomInfoTemplatesQueryResult>({} as CustomInfoTemplatesQueryResult);

const CustomInfoTemplatesProvider: React.FC = ({ children }) => {
  const [initialLoad, query] = useLazyQuery<get_customs_info_templates>(GET_CUSTOMS_TEMPLATES, { notifyOnNetworkStatusChange: true });
  const [variables, setVariables] = useState<any>(PAGINATION);

  const extract = (edges?: Edges): CustomsTemplateType[] => (edges || []).map(item => item?.node as CustomsTemplateType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore({
    ...options,
    updateQuery: (previous, { fetchMoreResult, variables }) => {
      const data = fetchMoreResult || previous;
      setVariables(variables);
      return { customs_templates: { ...data.customs_templates, pageInfo: { ...data.customs_templates?.pageInfo, hasPreviousPage: variables?.offset > 0 } } }
    }
  });
  const load = () => query.called ? fetchMore({ variables: PAGINATION }) : initialLoad({ variables });
  const loadMore = (offset?: number | null) => fetchMore({ variables: { ...variables, offset: offset || 0 } });

  return (
    <CustomInfoTemplates.Provider value={{
      load, loadMore,
      templates: extract(query?.data?.customs_templates?.edges),
      next: query.data?.customs_templates?.pageInfo?.hasNextPage ? (variables?.offset + PAGE_SIZE) : null,
      previous: query.data?.customs_templates?.pageInfo?.hasPreviousPage ? (variables?.offset - PAGE_SIZE) : null,
      ...query
    }}>
      {children}
    </CustomInfoTemplates.Provider>
  );
};

export default CustomInfoTemplatesProvider;
