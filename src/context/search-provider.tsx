import React, { useContext, useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { search_data, SEARCH_DATA, search_dataVariables, SEARCH_DATA_BY_ADDRESS, search_data_by_address, search_data_by_addressVariables, SEARCH_DATA_BY_ADDRESS_EXTENDED, search_data_by_address_extended, search_data_by_address_extendedVariables, SEARCH_DATA_BY_ORDER_ID, search_data_by_order_id, search_data_by_order_idVariables, SEARCH_DATA_BY_REFERENCE, search_data_by_reference, search_data_by_referenceVariables, SEARCH_DATA_BY_TRACKING_NUMBER, search_data_by_tracking_number, search_data_by_tracking_numberVariables, SEARCH_DATA_EXTENDED, search_data_extended, search_data_extendedVariables } from 'karrio/graphql';
import { OrderType, ShipmentType, TrackerType } from '@/lib/types';
import { AppMode } from '@/context/app-mode-provider';
import { APIReference } from '@/context/references-provider';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";

const DEFAULT_SETTINGS: any = {
  fetchPolicy: "network-only",
  notifyOnNetworkStatusChange: true
};

export type SearchFilterType =
  search_dataVariables
  & search_data_extendedVariables
  & search_data_by_addressVariables
  & search_data_by_address_extendedVariables
  & search_data_by_order_idVariables
  & search_data_by_referenceVariables
  & search_data_by_tracking_numberVariables
  ;
export type SearchResultType = (OrderType | TrackerType | ShipmentType);
export type SearchFilterTypeKeys = keyof SearchFilterType;
export type SearchCallType = (searchFilterType: SearchFilterTypeKeys, searchValue: string) => void;

type SearchType = LazyQueryResult<(search_data_by_address | search_data_by_address_extended | search_data_by_tracking_number | search_data_by_order_id | search_data_by_reference), SearchFilterType> & {
  variables: SearchFilterType;
  searchResults: SearchResultType[]
  search: (search_type: keyof SearchFilterType, search_value: string) => Promise<any>;
};

export const SearchContext = React.createContext<SearchType>({} as SearchType);

const SearchProvider: React.FC = ({ children }) => {
  const { testMode } = useContext(AppMode);
  const { ORDERS_MANAGEMENT } = useContext(APIReference);
  const [query, setQuery] = useState<any>();
  const [variables, setVariables] = useState<SearchFilterType>({});
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const searchData = useLazyQuery<search_data, SearchFilterType>(SEARCH_DATA, DEFAULT_SETTINGS);
  const searchDataExtended = useLazyQuery<search_data_extended, SearchFilterType>(SEARCH_DATA_EXTENDED, DEFAULT_SETTINGS);
  const searchDataByAddress = useLazyQuery<search_data_by_address, SearchFilterType>(SEARCH_DATA_BY_ADDRESS, DEFAULT_SETTINGS);
  const searchDataByOrderId = useLazyQuery<search_data_by_order_id, SearchFilterType>(SEARCH_DATA_BY_ORDER_ID, DEFAULT_SETTINGS);
  const searchDataByReference = useLazyQuery<search_data_by_reference, SearchFilterType>(SEARCH_DATA_BY_REFERENCE, DEFAULT_SETTINGS);
  const searchDataByTrackingNumber = useLazyQuery<search_data_by_tracking_number, SearchFilterType>(SEARCH_DATA_BY_TRACKING_NUMBER, DEFAULT_SETTINGS);
  const searchDataByAddressExtended = useLazyQuery<search_data_by_address_extended, SearchFilterType>(SEARCH_DATA_BY_ADDRESS_EXTENDED, DEFAULT_SETTINGS);

  function searchCall(searchFilterType: keyof SearchFilterType, searchValue: string) {
    if (searchValue.length == 0) {
      setSearchResults([]);
      return;
    }
    if (searchValue.length < 2) { return; }

    const requestVariables = { [searchFilterType]: searchValue, test_mode: testMode };
    const defaultQuery = ORDERS_MANAGEMENT ? searchDataExtended : searchData;
    let [initialLoad, _query] = {
      'keyword': defaultQuery,
      'test_mode': defaultQuery,
      'order_id': searchDataByOrderId,
      'reference': searchDataByReference,
      'tracking_number': searchDataByTrackingNumber,
      'address': ORDERS_MANAGEMENT ? searchDataByAddressExtended : searchDataByAddress,
    }[searchFilterType];

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
  const searchSubject: Subject<{ searchType: keyof SearchFilterType, searchValue: string }> = new Subject();

  searchSubject.pipe(debounceTime(500)).subscribe(({ searchType, searchValue }) => {
    searchCall(searchType, searchValue);
  });

  return (searchType: keyof SearchFilterType, searchValue: string) => {
    searchSubject.next({ searchType, searchValue });
  };
}

export default SearchProvider;
