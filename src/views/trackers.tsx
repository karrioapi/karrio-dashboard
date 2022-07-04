import { TrackingEvent } from "karrio/rest";
import AuthenticatedPage from "@/layouts/authenticated-page";
import ConfirmModal, { ConfirmModalContext } from "@/components/confirm-modal";
import DashboardLayout from "@/layouts/dashboard-layout";
import TrackingPreview, { TrackingPreviewContext } from "@/components/descriptions/tracking-preview";
import { Loading } from "@/components/loader";
import ModeIndicator from "@/components/mode-indicator";
import Spinner from "@/components/spinner";
import StatusBadge from "@/components/status-badge";
import TrackerModalProvider, { TrackerModalContext } from "@/components/track-shipment-modal";
import SystemConnectionsProvider from "@/context/system-connections-provider";
import { TrackerMutationContext } from "@/context/tracker-mutation";
import TrackersProvider, { TrackersContext } from "@/context/trackers-provider";
import UserConnectionsProvider from "@/context/user-connections-provider";
import { getURLSearchParams, isNone, isNoneOrEmpty, p } from "@/lib/helper";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import TrackerMutationProvider from "@/context/tracker-mutation";
import { useRouter } from "next/dist/client/router";
import TrackersFilter from "@/components/filters/trackers-filter";
import CarrierBadge from "@/components/carrier-badge";

export { getServerSideProps } from "@/lib/middleware";


export default function TrackersPage(pageProps: any) {
  const Component: React.FC<any> = () => {
    const router = useRouter();
    const { modal } = router.query;
    const { setLoading } = useContext(Loading);
    const { previewTracker } = useContext(TrackingPreviewContext);
    const { confirm: confirmDeletion } = useContext(ConfirmModalContext);
    const { removeTracker } = useContext(TrackerMutationContext);
    const { addTracker } = useContext(TrackerModalContext);
    const { loading, called, trackers, next, previous, variables, load, loadMore } = useContext(TrackersContext);
    const [filters, setFilters] = React.useState<typeof variables>(variables);
    const [initialized, setInitialized] = React.useState(false);

    const remove = (id?: string) => async () => {
      await removeTracker(id as string);
      fetchTrackers();
    };
    const fetchTrackers = (extra: Partial<typeof variables> = {}) => {
      const query = {
        ...filters,
        ...getURLSearchParams(),
        ...extra
      };

      setFilters(query);
      (!loading) && (called ? loadMore : load)(query);
    }

    useEffect(() => { window.setTimeout(() => setLoading(loading), 1000); });
    useEffect(() => { fetchTrackers(); }, [router.query]);
    useEffect(() => { setFilters({ ...variables }); }, [variables]);
    useEffect(() => {
      if (called && !initialized && !isNoneOrEmpty(modal)) {
        const tracker = trackers.find(t => t.id === modal);
        (modal === 'new') && addTracker({ onChange: fetchTrackers });
        tracker && previewTracker(tracker);
        setInitialized(true);
      }
    }, [modal, called]);

    return (
      <>
        <ModeIndicator />

        <header className="px-0 py-4 is-flex is-justify-content-space-between">
          <span className="title is-4">Trackers</span>
          <div>
            <TrackersFilter />
            <button className="button is-small is-primary ml-1" onClick={() => addTracker({ onChange: fetchTrackers })}>
              <span>Track a Shipment</span>
            </button>
          </div>
        </header>

        <div className="tabs">
          <ul>
            <li className={`is-capitalized has-text-weight-semibold ${isNone(filters?.status) ? 'is-active' : ''}`}>
              <a onClick={() => !isNone(filters?.status) && fetchTrackers({ status: null, offset: 0 })}>all</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('in_transit') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('in_transit') && fetchTrackers({ status: ['in_transit'], offset: 0 })}>in-transit</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('pending') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('pending') && fetchTrackers({ status: ['pending'], offset: 0 })}>pending</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('delivered') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('pedeliverednding') && fetchTrackers({ status: ['delivered'], offset: 0 })}>delivered</a>
            </li>
          </ul>
        </div>

        {loading && <Spinner />}

        {(!loading && trackers.length > 0) && <>
          <div className="table-container pb-3">
            <table className="trackers-table table is-fullwidth">

              <tbody className="trackers-table">
                <tr>
                  <td className="carrier is-size-7 has-text-centered">CARRIER</td>
                  <td className="tracking-number is-size-7">TRACKING #</td>
                  <td className="status"></td>
                  <td className="last-event is-size-7">LAST EVENT</td>
                  <td className="date is-size-7"></td>
                  <td className="action"></td>
                </tr>

                {trackers.map(tracker => (
                  <tr key={tracker.id} className="items" onClick={() => previewTracker(tracker)}>
                    <td className="carrier is-vcentered has-text-centered p-2">
                      <CarrierBadge
                        className="has-background-primary has-text-weight-bold has-text-white-bis is-size-7"
                        carrier={tracker.carrier_name}
                        custom_name={tracker.carrier_id}
                      />
                    </td>
                    <td className="tracking-number is-vcentered p-1">
                      <p className="is-subtitle is-size-7 has-text-weight-semibold has-text-info">{tracker.tracking_number}</p>
                    </td>
                    <td className="status is-vcentered">
                      <StatusBadge status={tracker.status as string} style={{ width: '100%' }} />
                    </td>
                    <td className="last-event is-vcentered py-1 last-event is-size-7 has-text-weight-bold has-text-grey text-ellipsis">
                      <span className="text-ellipsis"
                        title={isNoneOrEmpty(tracker?.events) ? "" : formatEventDescription((tracker?.events as TrackingEvent[])[0])}>
                        {isNoneOrEmpty(tracker?.events) ? "" : formatEventDescription((tracker?.events as TrackingEvent[])[0])}
                      </span>
                    </td>
                    <td className="date is-vcentered has-text-right">
                      <p className="is-size-7 has-text-weight-semibold has-text-grey">
                        {isNoneOrEmpty(tracker?.events) ? "" : formatEventDate((tracker?.events as TrackingEvent[])[0])}
                      </p>
                    </td>
                    <td className="action is-vcentered p-1">
                      <button className="button is-white is-pulled-right"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDeletion({ label: "Shipment Tracker", identifier: tracker.id as string, onConfirm: remove(tracker.id) })
                        }}>
                        <span className="icon is-small">
                          <i className="fas fa-trash"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="px-2 py-2 is-vcentered">
            <span className="is-size-7 has-text-weight-semibold">{trackers.length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right">
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: previous })} disabled={isNone(previous)}>Previous</button>
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: next })} disabled={isNone(next)}>Next</button>
            </div>
          </div>
        </>}

        {(!loading && trackers.length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No shipment trackers found.</p>
          </div>

        </div>}

      </>
    );
  };


  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Trackers - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <UserConnectionsProvider>
        <SystemConnectionsProvider>
          <TrackerMutationProvider>
            <TrackerModalProvider>
              <TrackersProvider>
                <TrackingPreview>
                  <ConfirmModal>

                    <Component />

                  </ConfirmModal>
                </TrackingPreview>
              </TrackersProvider>
            </TrackerModalProvider>
          </TrackerMutationProvider>
        </SystemConnectionsProvider>
      </UserConnectionsProvider>
    </DashboardLayout>
  ), pageProps)
}

function formatEventDescription(last_event?: TrackingEvent): string {
  return last_event?.description || '';
}

function formatEventDate(last_event?: TrackingEvent): string {
  if (isNone(last_event)) return '';

  return [
    last_event?.date,
    last_event?.time
  ].filter(a => !isNone(a) && a !== "").join(" ");
}
