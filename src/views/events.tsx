import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import Spinner from "@/components/spinner";
import EventsProvider, { EventsContext } from "@/context/events-provider";
import { formatDateTimeLong, getURLSearchParams, isNone, isNoneOrEmpty } from "@/lib/helper";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import EventsFilter from "@/components/filters/events-filter";
import EventPreview, { EventPreviewContext } from "@/components/descriptions/event-preview";
import { useRouter } from "next/dist/client/router";

export { getServerSideProps } from "@/lib/middleware";

export default function EventsPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { previewEvent } = useContext(EventPreviewContext);
    const { loading, called, events, next, previous, variables, load, loadMore } = useContext(EventsContext);
    const [filters, setFilters] = React.useState<typeof variables>(variables);
    const [initialized, setInitialized] = React.useState(false);

    const fetchEvents = (extra: Partial<typeof variables> = {}) => {
      const query = {
        ...filters,
        ...getURLSearchParams(),
        ...extra
      };

      setFilters(query);
      (!loading) && (called ? loadMore : load)(query);
    }

    useEffect(() => { window.setTimeout(() => setLoading(loading), 1000); });
    useEffect(() => { fetchEvents(); }, [router.query]);
    useEffect(() => { setFilters({ ...variables }); }, [variables]);
    useEffect(() => {
      if (called && !initialized && !isNoneOrEmpty(router.query.modal)) {
        previewEvent(router.query.modal as string);
        setInitialized(true);
      }
    }, [router.query.modal, called]);

    return (
      <>
        <header className="px-0 py-4 is-flex is-justify-content-space-between">
          <span className="title is-4">Events</span>
          <EventsFilter />
        </header>

        {loading && <Spinner />}


        {(!loading && events.length > 0) && <div className="table-container">
          <table className="events-table is-size-7 table is-fullwidth">

            <tbody className="events-table">
              <tr>
                <td className="event is-size-7"><span className="ml-2">EVENT</span></td>
                <td className="id has-text-right is-size-7">ID</td>
                <td className="date has-text-right is-size-7"><span className="mr-2">DATE</span></td>
              </tr>

              {events.map((event) => (

                <tr key={event.id} className="items is-clickable" onClick={() => previewEvent(event.id)}>
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
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: previous })} disabled={isNone(previous)}>Previous</button>
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: next })} disabled={isNone(next)}>Next</button>
            </div>
          </footer>

        </div>}


        {(!loading && events.length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No API events found.</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Events - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <EventsProvider>
        <EventPreview>
          <Component />
        </EventPreview>
      </EventsProvider>
    </DashboardLayout>
  ), pageProps)
}
