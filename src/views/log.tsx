import { failsafe, formatDateTimeLong, isNone, jsonify, notEmptyJSON } from "@/lib/helper";
import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import StatusCode from "@/components/status-code-badge";
import { useRouter } from "next/dist/client/router";
import json from 'highlight.js/lib/languages/json';
import { useLoader } from "@/components/loader";
import AppLink from "@/components/app-link";
import { useLog } from "@/context/log";
import hljs from "highlight.js";
import Head from "next/head";
import React from "react";

export { getServerSideProps } from "@/lib/middleware";

hljs.registerLanguage('json', json);


export const LogComponent: React.FC<{ logId?: string }> = ({ logId }) => {
  const router = useRouter();
  const { setLoading } = useLoader();
  const entity_id = logId || router.query.id as string;
  const [data, setData] = React.useState<string>();
  const [response, setResponse] = React.useState<string>();
  const [query_params, setQueryParams] = React.useState<string>();
  const { query: { data: { log } = {}, ...query } } = useLog(entity_id);

  React.useEffect(() => { setLoading(query.isFetching); }, [query.isFetching]);
  React.useEffect(() => {
    if (log !== undefined) {
      setQueryParams(failsafe(() => jsonify(log?.query_params), '{}'));
      setResponse(failsafe(() => jsonify(log?.response), '{}'));
      setData(failsafe(() => jsonify(log?.data), '{}'));
    }
  });

  return (
    <>
      {log !== undefined && <>

        <div className="columns my-1">
          <div className="column is-10">
            <span className="subtitle is-size-7 has-text-weight-semibold">LOG</span>
            <br />
            <span className="title is-5 mr-2">
              {log?.method} {log?.path} <StatusCode code={log?.status_code as number} />
            </span>
          </div>
          {!isNone(logId) && <div className="column is-2 is-flex is-justify-content-end">
            <AppLink href={`/developers/logs/${logId}`} target="blank"
              className="button is-default has-text-info is-small mx-1">
              <span className="icon">
                <i className="fas fa-external-link-alt"></i>
              </span>
            </AppLink>
          </div>}
        </div>

        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        <div className="py-3">
          <div className="columns my-0">
            <div className="column is-3 py-1">ID</div>
            <div className="column is-8 py-1">{log?.id}</div>
          </div>
          <div className="columns my-0">
            <div className="column is-3 py-1">Date</div>
            <div className="column is-8 py-1">{formatDateTimeLong(log?.requested_at)}</div>
          </div>
          <div className="columns my-0">
            <div className="column is-3 py-1">Origin</div>
            <div className="column is-8 py-1">{log?.remote_addr}</div>
          </div>
          <div className="columns my-0">
            <div className="column is-3 py-1">IP Address</div>
            <div className="column is-8 py-1">{log?.host}</div>
          </div>
        </div>


        {notEmptyJSON(response) && <>

          <h2 className="title is-5 my-4">Response body</h2>
          <hr className="mt-1 mb-2" style={{ height: '1px' }} />

          <div className="py-3">
            <pre className="code p-1">
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
            <pre className="code p-1">
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
            <pre className="code p-1">
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


export default function LogPage(pageProps: any) {

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Log - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <LogComponent />
    </DashboardLayout>
  ), pageProps);
}
