import AppLink from "@/components/app-link";
import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import Spinner from "@/components/spinner";
import StatusCode from "@/components/status-code-badge";
import LogsProvider, { LogsContext } from "@/context/logs-provider";
import { formatDateTimeLong, getURLSearchParams, isNone, p } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import LogsFilter from "@/components/filters/logs-filter";
import LogPreview, { LogPreviewContext } from "@/components/descriptions/log-preview";

export { getServerSideProps } from "@/lib/middleware";


export default function LogsPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { previewLog } = useContext(LogPreviewContext);
    const { loading, called, logs, next, previous, variables, load, loadMore } = useContext(LogsContext);
    const [filters, setFilters] = React.useState<typeof variables>(variables);

    const viewLog = (id: string) => (_: React.MouseEvent) => {
      router.push(p`/developers/logs/` + id);
    };
    const fetchLogs = (extra: Partial<typeof variables> = {}) => {
      const query = {
        ...filters,
        ...getURLSearchParams(),
        ...extra
      };

      setFilters(query);
      (!loading) && (called ? loadMore : load)(query);
    }

    useEffect(() => {
      window.setTimeout(() => setLoading(loading), 1000);
    });
    useEffect(() => { fetchLogs(); }, [router.query]);
    useEffect(() => { setFilters({ ...variables }); }, [variables]);

    return (
      <>

        <header className="px-2 pt-1 pb-4 is-flex is-justify-content-space-between">
          <span className="title is-4">Logs</span>
          <LogsFilter />
        </header>

        <div className="tabs">
          <ul>
            <li className={`is-capitalized has-text-weight-semibold ${isNone(filters?.status) ? 'is-active' : ''}`}>
              <a onClick={() => !isNone(filters?.status) && fetchLogs({ status: null, offset: 0 })}>all</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status === 'succeeded' ? 'is-active' : ''}`}>
              <a onClick={() => filters?.status !== 'succeeded' && fetchLogs({ status: 'succeeded', offset: 0 })}>succeeded</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status === 'failed' ? 'is-active' : ''}`}>
              <a onClick={() => filters?.status !== 'failed' && fetchLogs({ status: 'failed', offset: 0 })}>failed</a>
            </li>
          </ul>
        </div>

        {loading && <Spinner />}


        {(!loading && logs.length > 0) && <div className="table-container">
          <table className="table is-fullwidth is-hoverable is-size-7">

            <tbody className="logs-table">
              <tr>
                <td className="status is-size-7"><span className="ml-2">STATUS</span></td>
                <td className="description is-size-7">DESCRIPTION</td>
                <td className="date has-text-right is-size-7"><span className="mr-2">DATE</span></td>
              </tr>

              {logs.map((log) => (

                <tr key={log.id} onClick={() => previewLog(log.id)}>
                  <td className="status"><StatusCode code={log.status_code as number} /></td>
                  <td className="description">{`${log.method} ${log.path}`}</td>
                  <td className="date has-text-right">
                    <span className="mr-2">{formatDateTimeLong(log.requested_at)}</span>
                  </td>
                </tr>

              ))}
            </tbody>

          </table>

          <footer className="px-2 py-2 is-vcentered">
            <span className="is-size-7 has-text-weight-semibold">{logs.length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right">
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: previous })} disabled={isNone(previous)}>Previous</button>
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: next })} disabled={isNone(next)}>Next</button>
            </div>
          </footer>

        </div>}


        {(!loading && logs.length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No API logs has been captured yet.</p>
            <p>Use the <strong>API</strong> to communicate with your logistic providers.</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Logs - {(pageProps as any).references?.app_name}</title></Head>
      <LogsProvider>
        <LogPreview>
          <Component />
        </LogPreview>
      </LogsProvider>
    </DashboardLayout>
  ), pageProps)
}
