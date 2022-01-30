import AppLink from "@/components/app-link";
import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import CustomInvoicePrinter from "@/components/descriptions/custom-invoice-printer";
import LabelPrinter from "@/components/label/label-printer";
import { Loading } from "@/components/loader";
import ModeIndicator from "@/components/mode-indicator";
import ShipmentMenu from "@/components/shipment-menu";
import Spinner from "@/components/spinner";
import StatusBadge from "@/components/status-badge";
import ShipmentsProvider from "@/context/shipments-provider";
import { ShipmentsContext } from "@/context/shipments-provider";
import { formatAddress, formatDateTime, formatRef, getURLSearchParams, isNone, isNoneOrEmpty, p, shipmentCarrier } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import ShipmentMutationProvider from "@/context/shipment-mutation";
import ShipmentsFilter from "@/components/filters/shipments-filter";
import { AddressType } from "@/lib/types";
import ShipmentPreview, { ShipmentPreviewContext } from "@/components/descriptions/shipment-preview";

export { getServerSideProps } from "@/lib/middleware";


export default function ShipmentsPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { previewShipment } = useContext(ShipmentPreviewContext);
    const { loading, called, shipments, next, previous, variables, load, loadMore } = useContext(ShipmentsContext);
    const [filters, setFilters] = React.useState<typeof variables>(variables);
    const [initialized, setInitialized] = React.useState(false);

    const fetchShipments = (extra: Partial<typeof variables> = {}) => {
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
    useEffect(() => { fetchShipments(); }, [router.query]);
    useEffect(() => { setFilters({ ...variables }); }, [variables]);
    useEffect(() => {
      if (called && !initialized && !isNoneOrEmpty(router.query.modal)) {
        previewShipment(router.query.modal as string);
        setInitialized(true);
      }
    }, [router.query.modal, called]);

    return (
      <>
        <ModeIndicator />

        <header className="px-2 pt-1 pb-4 is-flex is-justify-content-space-between">
          <span className="title is-4">Shipments</span>
          <div>
            <ShipmentsFilter />
            <AppLink href="/buy_label/new" className="button is-primary is-small is-pulled-right ml-1">
              <span>Create Label</span>
            </AppLink>
          </div>
        </header>

        <div className="tabs">
          <ul>
            <li className={`is-capitalized has-text-weight-semibold ${isNone(filters?.status) ? 'is-active' : ''}`}>
              <a onClick={() => !isNone(filters?.status) && fetchShipments({ status: null, offset: 0 })}>all</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('created') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('created') && fetchShipments({ status: ['created'], offset: 0 })}>created</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('purchased') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('purchased') && fetchShipments({ status: ['purchased'], offset: 0 })}>purchased</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('delivered') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('delivered') && fetchShipments({ status: ['delivered'], offset: 0 })}>delivered</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('cancelled') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('cancelled') && fetchShipments({ status: ['cancelled'], offset: 0 })}>cancelled</a>
            </li>
          </ul>
        </div>

        {loading && <Spinner />}

        {(!loading && shipments?.length > 0) && <div className="table-container">
          <table className="shipments-table table is-fullwidth">
            <tbody>

              <tr>
                <td className="carrier is-size-7 has-text-centered">CARRIER</td>
                <td className="service is-size-7">SERVICE</td>
                <td className="status"></td>
                <td className="recipient is-size-7">RECIPIENT</td>
                <td className="date is-size-7">DATE</td>
                <td className="action"></td>
              </tr>

              {shipments?.map(shipment => (
                <tr key={shipment.id} className="items" onClick={() => previewShipment(shipment.id)}>
                  <td className="carrier is-vcentered has-text-centered">
                    {!isNone(shipment.carrier_name) &&
                      <Image src={p`/carriers/${shipmentCarrier(shipment)}_logo.svg`} height={25} width={'100%'} alt="carrier logo" />
                    }
                    {isNone(shipment.carrier_name) &&
                      <Image src={p`/logo.svg`} width="100%" height="25" alt="logo" />
                    }
                  </td>
                  <td className="service is-vcentered p-1">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">
                      {!isNone(shipment.carrier_name) && formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)}
                      {isNone(shipment.carrier_name) && "NOT COMPLETED"}
                    </p>
                  </td>
                  <td className="status is-vcentered">
                    <StatusBadge status={shipment.status as string} style={{ width: '100%' }} />
                  </td>
                  <td className="recipient is-vcentered">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">{formatAddress(shipment.recipient as AddressType)}</p>
                  </td>
                  <td className="date is-vcentered">
                    <p className="is-size-7 has-text-weight-semibold has-text-grey">{formatDateTime(shipment.created_at)}</p>
                  </td>
                  <td className="action is-vcentered px-0">
                    <ShipmentMenu shipment={shipment} onClick={e => e.stopPropagation()} className="is-pulled-right" style={{ width: '150px' }} />
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

          <footer className="px-2 py-2 is-vcentered">
            <span className="is-size-7 has-text-weight-semibold">{(shipments || []).length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right">
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: previous })} disabled={isNone(previous)}>Previous</button>
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: next })} disabled={isNone(next)}>Next</button>
            </div>
          </footer>

        </div>}

        {(!loading && (shipments || []).length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No shipment found.</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Shipments - {(pageProps as any).references?.app_name}</title></Head>
      <ShipmentMutationProvider>
        <LabelPrinter>
          <CustomInvoicePrinter>
            <ShipmentsProvider>
              <ShipmentPreview>

                <Component />

              </ShipmentPreview>
            </ShipmentsProvider>
          </CustomInvoicePrinter>
        </LabelPrinter>
      </ShipmentMutationProvider>
    </DashboardLayout>
  ), pageProps)
};
