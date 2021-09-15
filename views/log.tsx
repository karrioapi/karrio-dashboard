import AuthorizedPage from "@/components/layouts/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import { Loading } from "@/components/loader";
import StatusCode from "@/components/status-code-badge";
import { formatDateTimeLong, isNone, notEmptyJSON } from "@/lib/helper";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import AppLink from "@/components/app-link";
import { useRouter } from "next/dist/client/router";
import LogProvider, { Log } from "@/context/log-provider";
import hljs from "highlight.js";
import json from 'highlight.js/lib/languages/json';
import { withSessionCookies } from "@/lib/middleware";

hljs.registerLanguage('json', json);


export default withSessionCookies(function (pageProps) {
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
        <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
          <ul>
            <li><AppLink href="/developers/logs">Logs</AppLink></li>
            <li className="is-active"><a href="#" aria-current="page">details</a></li>
          </ul>
        </nav>

        {log !== undefined && <div className="card">

          <div className="log-card-header px-5 pt-5 pb-3">
            <p className="subtitle is-6">Request</p>
            <p className="title is-4">{log.method} {log.path} <StatusCode code={log.status_code as number} /></p>
          </div>

          <div className="card-content py-3">
            <div className="columns my-0">
              <div className="column is-3 py-1">ID</div>
              <div className="column is-8 py-1">{log.id}</div>
            </div>
            <div className="columns my-0">
              <div className="column is-3 py-1">Date</div>
              <div className="column is-8 py-1">{formatDateTimeLong(log.requested_at)}</div>
            </div>
            <div className="columns my-0">
              <div className="column is-3 py-1">IP Address</div>
              <div className="column is-8 py-1">{log.host}</div>
            </div>
            <div className="columns my-0">
              <div className="column is-3 py-1">Origin</div>
              <div className="column is-8 py-1">{log.remote_addr}</div>
            </div>
          </div>

        </div>}

        {notEmptyJSON(query_params) && query_params !== data && <div className="card my-3">

          <div className="log-card-header px-5 pt-5 pb-3">
            <p className="title is-4">Request query params</p>
          </div>

          <div className="card-content py-3">
            <pre>
              <code
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(query_params as string, { language: 'json' }).value,
                }}
              />
            </pre>
          </div>

        </div>}

        {notEmptyJSON(data) && <div className="card my-3">

          <div className="log-card-header px-5 pt-5 pb-3">
            <p className="title is-4">Request {log?.method} body</p>
          </div>

          <div className="card-content py-3">
            <pre>
              <code
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(data as string, { language: 'json' }).value,
                }}
              />
            </pre>
          </div>

        </div>}

        {notEmptyJSON(response) && <div className="card my-3">

          <div className="log-card-header px-5 pt-5 pb-3">
            <p className="title is-4">Response body</p>
          </div>

          <div className="card-content py-3">
            <pre>
              <code
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(response as string, { language: 'json' }).value,
                }}
              />
            </pre>
          </div>

        </div>}
      </>
    );
  };

  return AuthorizedPage(() => (
    <DashboardLayout>
      <Head><title>Log</title></Head>
      <LogProvider>
        <Component />
      </LogProvider>
    </DashboardLayout>
  ), pageProps);
})
