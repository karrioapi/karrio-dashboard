import AuthorizedPage from "@/layouts/authorized-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import Spinner from "@/components/spinner";
import { AppMode } from "@/context/app-mode-provider";
import EventsProvider, { Events } from "@/context/events-provider";
import { formatDateTimeLong, isNone } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";

export { getServerSideProps } from "@/lib/middleware";

export default function EventsPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { basePath } = useContext(AppMode);
    const { setLoading } = useContext(Loading);
    const { loading, called, events, next, previous, load, loadMore } = useContext(Events);

    const viewEvent = (id: string) => (_: React.MouseEvent) => {
      router.push(`${basePath}/developers/events/` + id);
    };

    useEffect(() => { setLoading(loading); });
    useEffect(() => { (!loading) && (called ? loadMore : load)(); }, []);

    return (
      <>

        <header className="px-2 pt-1 pb-4">
          <span className="title is-4">Events</span>
        </header>

        {loading && <Spinner />}


        {(!loading && events.length > 0) && <div className="table-container">
          <table className="table is-fullwidth is-hoverable is-size-7">

            <tbody className="events-table">
              <tr>
                <td className="event is-size-7"><span className="ml-2">EVENT</span></td>
                <td className="id has-text-right is-size-7">ID</td>
                <td className="date has-text-right is-size-7"><span className="mr-2">DATE</span></td>
              </tr>

              {events.map((event) => (

                <tr key={event.id} onClick={viewEvent(event.id)}>
                  <td className="description">{`${event.type}`}</td>
                  <td className="id has-text-right">
                    <span>{event.id}</span>
                  </td>
                  <td className="date has-text-right">
                    <span className="mx-2">{formatDateTimeLong(event.created_at)}</span>
                  </td>
                </tr>

              ))}
            </tbody>

          </table>

          <footer className="px-2 py-2 is-vcentered">
            <span className="is-size-7 has-text-weight-semibold">{events.length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right">
              <button className="button is-small" onClick={() => loadMore({ offset: previous })} disabled={isNone(previous)}>Previous</button>
              <button className="button is-small" onClick={() => loadMore({ offset: next })} disabled={isNone(next)}>Next</button>
            </div>
          </footer>

        </div>}


        {(!loading && events.length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No API events has been captured yet.</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthorizedPage((
    <DashboardLayout>
      <Head><title>Events - {(pageProps as any).references?.app_name}</title></Head>
      <EventsProvider>
        <Component />
      </EventsProvider>
    </DashboardLayout>
  ), pageProps)
}
