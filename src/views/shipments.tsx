import AppLink from "@/components/app-link";
import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import CustomInvoicePrinter from "@/components/descriptions/custom-invoice-printer";
import { Loading } from "@/components/loader";
import ModeIndicator from "@/components/mode-indicator";
import ShipmentMenu from "@/components/shipment-menu";
import Spinner from "@/components/spinner";
import StatusBadge from "@/components/status-badge";
import ShipmentsProvider from "@/context/shipments-provider";
import { ShipmentsContext } from "@/context/shipments-provider";
import { formatAddressShort, formatAddressLocationShort, formatDateTime, formatRef, getURLSearchParams, isListEqual, isNone, isNoneOrEmpty, shipmentCarrier } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import ShipmentMutationProvider from "@/context/shipment-mutation";
import ShipmentsFilter from "@/components/filters/shipments-filter";
import { AddressType } from "@/lib/types";
import ShipmentPreview, { ShipmentPreviewContext } from "@/components/descriptions/shipment-preview";
import AppBadge from "@/components/app-badge";
import CarrierBadge from "@/components/carrier-badge";
import DocumentTemplatesProvider, { useDocumentTemplates } from "@/context/document-templates-provider";
import ConfirmModal from "@/components/confirm-modal";

export { getServerSideProps } from "@/lib/middleware";


export default function ShipmentsPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { templates } = useDocumentTemplates();
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

    useEffect(() => { window.setTimeout(() => setLoading(loading), 1000); });
    useEffect(() => { fetchShipments({ status: ['purchased', 'delivered', 'in_transit', 'cancelled'] }); }, [router.query]);
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

        <header className="px-0 py-4 is-flex is-justify-content-space-between">
          <span className="title is-4">Shipments</span>
          <div>
            <ShipmentsFilter />
            <AppLink href="/create_label?shipment_id=new" className="button is-primary is-small is-pulled-right ml-1">
              <span>Create Label</span>
            </AppLink>
          </div>
        </header>

        <div className="tabs">
          <ul>
            <li className={`is-capitalized has-text-weight-semibold ${isListEqual(filters?.status || [], ['purchased', 'delivered', 'in_transit', 'cancelled']) ? 'is-active' : ''}`}>
              <a onClick={() => fetchShipments({ status: ['purchased', 'delivered', 'in_transit', 'cancelled'], offset: 0 })}>all</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${isListEqual(filters?.status || [], ['purchased', 'in_transit']) ? 'is-active' : ''}`}>
              <a onClick={() => fetchShipments({ status: ['purchased', 'in_transit'], offset: 0 })}>purchased</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('delivered') && filters?.status?.length === 1 ? 'is-active' : ''}`}>
              <a onClick={() => fetchShipments({ status: ['delivered'], offset: 0 })}>delivered</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('cancelled') && filters?.status?.length === 1 ? 'is-active' : ''}`}>
              <a onClick={() => fetchShipments({ status: ['cancelled'], offset: 0 })}>cancelled</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('draft') && filters?.status?.length === 1 ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('draft') && fetchShipments({ status: ['draft'], offset: 0 })}>draft</a>
            </li>
          </ul>
        </div>

        {loading && <Spinner />}

        {(!loading && shipments?.length > 0) && <>
          <div className="table-container pb-3">
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
                  <tr key={shipment.id} className="items is-clickable">
                    <td className="carrier is-vcentered has-text-centered p-2" onClick={() => previewShipment(shipment.id)}>
                      {!isNone(shipment.carrier_name) && <CarrierBadge
                        className="has-background-primary has-text-weight-bold has-text-white-bis"
                        style={{ fontSize: '0.6rem' }}
                        carrier={shipmentCarrier(shipment)}
                        custom_name={(shipment as any).carrier_name as string}
                        short
                      />}
                      {isNone(shipment.carrier_name) && <AppBadge />}
                    </td>
                    <td className="service is-vcentered p-1 pl-2 is-size-7 has-text-weight-bold has-text-grey text-ellipsis"
                      onClick={() => previewShipment(shipment.id)}
                      title={
                        isNone(shipment.carrier_name) ? "NOT COMPLETED"
                          : formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)
                      }>
                      <span className="text-ellipsis">
                        {!isNone(shipment.carrier_name) && formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)}
                        {isNone(shipment.carrier_name) && "NOT COMPLETED"}
                      </span>
                      <br />
                      <span className="has-text-weight-medium has-text-info">{shipment.tracking_number}</span>
                    </td>
                    <td className="status is-vcentered" onClick={() => previewShipment(shipment.id)}>
                      <StatusBadge status={shipment.status as string} style={{ width: '100%' }} />
                    </td>
                    <td className="recipient is-vcentered is-size-7 has-text-weight-bold has-text-grey text-ellipsis" onClick={() => previewShipment(shipment.id)}>
                      <span className="text-ellipsis" title={formatAddressShort(shipment.recipient as AddressType)}>
                        {formatAddressShort(shipment.recipient as AddressType)}
                      </span>
                      <br />
                      <span className="has-text-weight-medium">{formatAddressLocationShort(shipment.recipient as AddressType)}</span>
                    </td>
                    <td className="date is-vcentered px-1" onClick={() => previewShipment(shipment.id)}>
                      <p className="is-size-7 has-text-weight-semibold has-text-grey">
                        {formatDateTime(shipment.created_at)}
                      </p>
                    </td>
                    <td className="action is-vcentered px-0">
                      <ShipmentMenu
                        shipment={shipment}
                        templates={templates}
                        className="is-fullwidth"
                      />
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>

          <div className="px-2 py-2 is-vcentered">
            <span className="is-size-7 has-text-weight-semibold">{(shipments || []).length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right">
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: previous })} disabled={isNone(previous)}>Previous</button>
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: next })} disabled={isNone(next)}>Next</button>
            </div>
          </div>
        </>}

        {(called && !loading && (shipments || []).length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No shipment found.</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Shipments - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <ShipmentMutationProvider>
        <DocumentTemplatesProvider filter={{ related_object: "shipment" }}>
          <CustomInvoicePrinter>
            <ShipmentsProvider>
              <ShipmentPreview>
                <ConfirmModal>

                  <Component />

                </ConfirmModal>
              </ShipmentPreview>
            </ShipmentsProvider>
          </CustomInvoicePrinter>
        </DocumentTemplatesProvider>
      </ShipmentMutationProvider>
    </DashboardLayout>
  ), pageProps)
};
