import React, { useContext, useState } from 'react';
import { TrackerList } from '@/api/index';
import { RestContext } from '@/client/context';
import { RequestError } from '@/lib/types';
import { getCursorPagination, isNone } from '@/lib/helper';
import { AppMode } from '@/context/app-mode-provider';

const DEFAULT_PAGINATED_RESULT = { results: [] };
type RequestOptions = { cursor?: string } & any;

type ResultType = TrackerList & {
  error?: RequestError;
  called: boolean;
  loading: boolean;
  load: (options?: RequestOptions) => void;
  loadMore: (options?: RequestOptions) => void;
  refetch: (options?: RequestOptions) => void;
};
export const Trackers = React.createContext<ResultType>({} as ResultType);

const TrackersProvider: React.FC = ({ children }) => {
  const purplship = useContext(RestContext);
  const { testMode } = useContext(AppMode);
  const [result, setValue] = useState<TrackerList>(DEFAULT_PAGINATED_RESULT);
  const [error, setError] = useState<RequestError>();
  const [called, setCalled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setCursor] = useState<RequestOptions>({ cursor: '' });

  const loadMore = async (options: RequestOptions = {}) => {
    const { cursor, status } = options;
    const params = {
      testMode: testMode,
      ...getCursorPagination(cursor),
      ...(isNone(status) ? {} : { status }),
    };

    setCursor(params);
    setLoading(true);

    return (purplship as any)
      .trackers
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
    <Trackers.Provider value={{
      load,
      loadMore,
      called,
      loading,
      error,
      refetch,
      ...result
    }}>
      {children}
    </Trackers.Provider>
  );
};

export default TrackersProvider;
