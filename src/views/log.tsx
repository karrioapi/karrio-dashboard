import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import StatusCode from "@/components/status-code-badge";
import { formatDateTimeLong, isNone, notEmptyJSON } from "@/lib/helper";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import LogProvider, { Log } from "@/context/log-provider";
import hljs from "highlight.js";
import json from 'highlight.js/lib/languages/json';

export { getServerSideProps } from "@/lib/middleware";

hljs.registerLanguage('json', json);


export default function LogPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { log, loading, loadLog } = useContext(Log);
    const [query_params, setQueryParams] = useState<string>();
    const [response, setResponse] = useState<string>();
    const [data, setData] = useState<string>();
    const { id } = router.query;

    useEffect(() => { setLoading(loading); });
    useEffect(() => { (!isNone(loadLog) && !loading) && loadLog(id as string); }, [id]);
    useEffect(() => {
      if (log !== undefined) {
        setQueryParams(JSON.stringify(JSON.parse(log.query_params || '{}'), null, 2));
        setResponse(JSON.stringify(JSON.parse(log.response || '{}'), null, 2));
        setData(JSON.stringify(JSON.parse(log.data || '{}'), null, 2));
      }
    });

    return (
      <>
        {log !== undefined && <>

          <div className="columns my-1">
            <div className="column is-8">
              <span className="subtitle is-size-7 has-text-weight-semibold">LOG</span>
              <br />
              <span className="title is-5 mr-2">{log.method} {log.path} <StatusCode code={log.status_code as number} /></span>
            </div>
          </div>

          <hr className="mt-1 mb-2" style={{ height: '1px' }} />

          <div className="py-3">
            <div className="columns my-0">
              <div className="column is-3 py-1">ID</div>
              <div className="column is-8 py-1">{log.id}</div>
            </div>
            <div className="columns my-0">
              <div className="column is-3 py-1">Date</div>
              <div className="column is-8 py-1">{formatDateTimeLong(log.requested_at)}</div>
            </div>
            <div className="columns my-0">
              <div className="column is-3 py-1">Origin</div>
              <div className="column is-8 py-1">{log.host}</div>
            </div>
            <div className="columns my-0">
              <div className="column is-3 py-1">IP Address</div>
              <div className="column is-8 py-1">{log.remote_addr}</div>
            </div>
          </div>


          {notEmptyJSON(response) && <>

            <h2 className="title is-5 my-4">Response body</h2>
            <hr className="mt-1 mb-2" style={{ height: '1px' }} />

            <div className="py-3">
              <pre>
                <code
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlight(response as string, { language: 'json' }).value,
                  }}
                />
              </pre>
            </div>

          </>}


          {notEmptyJSON(data) && <>

            <h2 className="title is-5 my-4">Request {log?.method} body</h2>
            <hr className="mt-1 mb-2" style={{ height: '1px' }} />

            <div className="py-3">
              <pre>
                <code
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlight(data as string, { language: 'json' }).value,
                  }}
                />
              </pre>
            </div>

          </>}


          {notEmptyJSON(query_params) && query_params !== data && <>

            <h2 className="title is-5 my-4">Request query params</h2>
            <hr className="mt-1 mb-2" style={{ height: '1px' }} />

            <div className="py-3">
              <pre>
                <code
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlight(query_params as string, { language: 'json' }).value,
                  }}
                />
              </pre>
            </div>

          </>}

        </>}
      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Log - {(pageProps as any).references?.app_name}</title></Head>
      <LogProvider>
        <Component />
      </LogProvider>
    </DashboardLayout>
  ), pageProps);
}
