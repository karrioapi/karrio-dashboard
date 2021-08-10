import React, { useContext, useState } from 'react';
import { PurplshipClient, ShipmentList } from '@/api/index';
import { RestContext } from '@/client/context';
import { RequestError } from '@/lib/types';
import { getCursorPagination, isNone } from '@/lib/helper';
import { AppMode } from '@/context/app-mode-provider';
import { ListRequest } from '@/api/generated/apis/ShipmentsApi';

const DEFAULT_PAGINATED_RESULT = { results: [] };
type RequestOptions = { cursor?: string } & ListRequest;

type ResultType = ShipmentList & {
  error?: RequestError;
  called: boolean;
  loading: boolean;
  load: (options?: RequestOptions) => void;
  loadMore: (options?: RequestOptions) => void;
  refetch: (options?: RequestOptions) => void;
};
export const Shipments = React.createContext<ResultType>({} as ResultType);

const ShipmentsProvider: React.FC = ({ children }) => {
  const purplship = useContext(RestContext);
  const { testMode } = useContext(AppMode);
  const [result, setValue] = useState<ShipmentList>(DEFAULT_PAGINATED_RESULT);
  const [error, setError] = useState<RequestError>();
  const [called, setCalled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setCursor] = useState<RequestOptions>({ cursor: '' });

  const loadMore = async (options: RequestOptions = {}) => {
    const { cursor, status } = options;
    const params = {
      testMode: testMode,
      ...getCursorPagination(cursor),
      ...(isNone(status) ? {} : { status })
    };

    setCursor(params);
    setLoading(true);

    return (purplship as PurplshipClient).shipments
      .list(params)
      .then(setValue)
      .catch(setError)
      .then(() => setLoading(false));
  };
  const load = async (options?: RequestOptions) => {
    setCalled(true);

    return loadMore(options);
  };
  const refetch = async () => loadMore(options);

  return (
    <Shipments.Provider value={{
      load,
      loadMore,
      called,
      loading,
      error,
      refetch,
      ...result
    }}>
      {children}
    </Shipments.Provider>
  );
};

export default ShipmentsProvider;
