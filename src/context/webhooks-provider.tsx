import React, { useContext, useState } from 'react';
import { WebhookList } from 'karrio/rest/index';
import { RestContext } from '@/client/context';
import { RequestError } from '@/lib/types';
import { getCursorPagination } from '@/lib/helper';
import { AppMode } from '@/context/app-mode-provider';

const DEFAULT_PAGINATED_RESULT = { results: [] };


type ResultType = WebhookList & {
  error?: RequestError;
  called: boolean;
  loading: boolean;
  load: (options?: any) => Promise<any>;
  loadMore: (cursor: string) => Promise<any>;
  refetch: (options?: any) => Promise<any>;
};
export const Webhooks = React.createContext<ResultType>({} as ResultType);

const WebhooksProvider: React.FC = ({ children }) => {
  const karrio = useContext(RestContext);
  const [result, setValue] = useState<WebhookList>(DEFAULT_PAGINATED_RESULT);
  const [error, setError] = useState<RequestError>();
  const [called, setCalled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>('');

  const loadMore = async (cursor?: string) => {
    setCursor(cursor || '');
    setLoading(true);

    return (karrio)!.webhooks
      .list({ ...getCursorPagination(cursor) })
      .then(({ data }) => {
        setValue(data as any)
        return data;
      })
      .catch(setError)
      .then(() => setLoading(false));
  };
  const load = async () => {
    setCalled(true);

    return loadMore();
  };
  const refetch = async () => loadMore(cursor);

  return (
    <Webhooks.Provider value={{
      load,
      loadMore,
      called,
      loading,
      error,
      refetch,
      ...result
    }}>
      {children}
    </Webhooks.Provider>
  );
};

export default WebhooksProvider;
