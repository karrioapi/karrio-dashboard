import React, { useContext, useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { search_data, SEARCH_DATA, search_dataVariables, SEARCH_DATA_EXTENDED, search_data_extended, search_data_extendedVariables } from 'karrio/graphql';
import { OrderType, ShipmentType, TrackerType } from '@/lib/types';
import { APIReference } from '@/context/references-provider';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";

const DEFAULT_SETTINGS: any = {
  fetchPolicy: "network-only",
  notifyOnNetworkStatusChange: true
};

export type SearchFilterType = search_dataVariables & search_data_extendedVariables;
export type SearchResultType = (OrderType | TrackerType | ShipmentType);
export type SearchFilterTypeKeys = keyof SearchFilterType;
export type SearchCallType = (searchValue: string) => void;

type SearchType = LazyQueryResult<(search_data_by_address | search_data_by_address_extended), SearchFilterType> & {
  variables: SearchFilterType;
  searchResults: SearchResultType[]
  search: (search_value: string) => Promise<any>;
};

export const SearchContext = React.createContext<SearchType>({} as SearchType);

const SearchProvider: React.FC = ({ children }) => {
  const { ORDERS_MANAGEMENT } = useContext(APIReference);
  const [query, setQuery] = useState<any>();
  const [variables, setVariables] = useState<SearchFilterType>({});
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const searchData = useLazyQuery<search_data, SearchFilterType>(SEARCH_DATA, DEFAULT_SETTINGS);
  const searchDataExtended = useLazyQuery<search_data_extended, SearchFilterType>(SEARCH_DATA_EXTENDED, DEFAULT_SETTINGS);

  function searchCall(searchValue: string) {
    if (searchValue.length == 0) {
      setSearchResults([]);
      return;
    }
    if (searchValue.length < 2) { return; }

    const requestVariables = { keyword: searchValue };
    const [initialLoad, _query] = ORDERS_MANAGEMENT ? searchDataExtended : searchData;

    setQuery(_query);
    setVariables(requestVariables);

    if (_query.called) {
      return Promise.resolve(_query.fetchMore({ variables: requestVariables })?.then(response => {
        setVariables(requestVariables);
        return response;
      }));
    }

    return Promise.resolve(initialLoad({ variables: requestVariables }) as any);
  };

  const mergeResults = (data: any) => {
    return [
      ...(data?.order_results?.edges || []),
      ...(data?.tracker_results?.edges || []),
      ...(data?.shipment_results?.edges || []),
    ].map((item: any) => item.node as SearchResultType)
      .sort((i1: SearchResultType, i2: SearchResultType) => {
        return (new Date(i2.created_at as string) as any) - (new Date(i1.created_at as string) as any)
      });
  }

  useEffect(() => {
    query?.data && setSearchResults(mergeResults(query.data));
  }, [query?.data])

  return (
    <SearchContext.Provider value={{
      ...query,
      variables,
      search: initSearchObservable(searchCall),
      searchResults
    } as SearchType}>
      {children}
    </SearchContext.Provider>
  );
};

function initSearchObservable(searchCall: SearchCallType): SearchCallType {
  const searchSubject: Subject<{ searchValue: string }> = new Subject();

  searchSubject.pipe(debounceTime(500)).subscribe(({ searchValue }) => {
    searchCall(searchValue);
  });

  return (searchValue: string) => {
    searchSubject.next({ searchValue });
  };
}

export default SearchProvider;
