import AppLink from "@/components/app-link";
import AuthorizedPage from "@/layouts/authorized-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import Spinner from "@/components/spinner";
import StatusCode from "@/components/status-code-badge";
import { AppMode } from "@/context/app-mode-provider";
import LogsProvider, { Logs } from "@/context/logs-provider";
import { formatDateTimeLong, isNone } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";

export { getServerSideProps } from "@/lib/middleware";


export default function LogsPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { basePath } = useContext(AppMode);
    const { setLoading } = useContext(Loading);
    const { loading, called, logs, next, previous, load, loadMore } = useContext(Logs);
    const [status, setStatus] = React.useState<string>();

    const viewLog = (id: string) => (_: React.MouseEvent) => {
      router.push(`${basePath}/developers/logs/` + id);
    };

    useEffect(() => { setLoading(loading); });
    useEffect(() => {
      const newStatus = (new URLSearchParams(location.search)).get('status') as string || undefined;

      setStatus(newStatus);
      (!loading) && (called ? loadMore : load)({ status: newStatus });
    }, [location.search]);

    return (
      <>

        <header className="px-2 pt-1 pb-4">
          <span className="title is-4">Logs</span>
        </header>

        <div className="tabs">
          <ul>
            <li className={`is-capitalized has-text-weight-semibold ${isNone(status) ? 'is-active' : ''}`}>
              <AppLink href="/developers/logs">all</AppLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'succeeded' ? 'is-active' : ''}`}>
              <AppLink href="/developers/logs?status=succeeded">succeeded</AppLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'failed' ? 'is-active' : ''}`}>
              <AppLink href="/developers/logs?status=failed">failed</AppLink>
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

                <tr key={log.id} onClick={viewLog(log.id)}>
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
              <button className="button is-small" onClick={() => loadMore({ offset: previous })} disabled={isNone(previous)}>Previous</button>
              <button className="button is-small" onClick={() => loadMore({ offset: next })} disabled={isNone(next)}>Next</button>
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

  return AuthorizedPage((
    <DashboardLayout>
      <Head><title>Logs - {(pageProps as any).references?.app_name}</title></Head>
      <LogsProvider>
        <Component />
      </LogsProvider>
    </DashboardLayout>
  ), pageProps)
}
