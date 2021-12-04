import { ListStatusEnum } from "@/purplship/rest/generated/apis/ShipmentsApi";
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
import { AppMode } from "@/context/app-mode-provider";
import ShipmentsProvider from "@/context/shipments-provider";
import { Shipments } from "@/context/shipments-provider";
import { formatAddress, formatDateTime, formatRef, isNone, p, shipmentCarrier } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import ShipmentMutationProvider from "@/context/shipment-mutation";

export { getServerSideProps } from "@/lib/middleware";


export default function ShipmentsPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { basePath } = useContext(AppMode);
    const { loading, results, load, loadMore, previous, next, called } = useContext(Shipments);
    const [status, setStatus] = useState<ListStatusEnum>();

    const viewShipment = (id: string) => (_: React.MouseEvent) => {
      router.push(`${basePath}/shipments/` + id);
    };
    const fetch = (newStatus?: ListStatusEnum) => {
      (!loading && load) && (called ? loadMore : load)({ status: newStatus, cursor: '' });
    };

    useEffect(() => { setLoading && setLoading(loading); }, [loading]);
    useEffect(() => {
      const newStatus = (new URLSearchParams(location.search)).get('status') as ListStatusEnum || undefined;
      setStatus(newStatus);
      fetch(newStatus);
    }, [router]);

    return (
      <>
        <ModeIndicator />

        <header className="px-2 pt-1 pb-4">
          <span className="title is-4">Shipments</span>
          <AppLink href="/buy_label/new" className="button is-success is-pulled-right">
            <span>Create Label</span>
          </AppLink>
        </header>

        <div className="tabs">
          <ul>
            <li className={`is-capitalized has-text-weight-semibold ${isNone(status) ? 'is-active' : ''}`}>
              <AppLink href="">all</AppLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'created' ? 'is-active' : ''}`}>
              <AppLink href="?status=created">created</AppLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'purchased' ? 'is-active' : ''}`}>
              <AppLink href="?status=purchased">purchased</AppLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'delivered' ? 'is-active' : ''}`}>
              <AppLink href="?status=delivered">delivered</AppLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'cancelled' ? 'is-active' : ''}`}>
              <AppLink href="?status=cancelled">cancelled</AppLink>
            </li>
          </ul>
        </div>

        {loading && <Spinner />}

        {(!loading && results?.length > 0) && <div className="table-container">
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

              {results?.map(shipment => (
                <tr key={shipment.id} className="items" onClick={viewShipment(shipment.id as string)}>
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
                    <StatusBadge status={shipment.status} style={{ width: '100%' }} />
                  </td>
                  <td className="recipient is-vcentered">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">{formatAddress(shipment.recipient)}</p>
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
            <span className="is-size-7 has-text-weight-semibold">{(results || []).length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right">
              <button className="button is-small" onClick={() => loadMore({ cursor: previous, status })} disabled={isNone(previous)}>
                <span>Previous</span>
              </button>
              <button className="button is-small" onClick={() => loadMore({ cursor: next, status })} disabled={isNone(next)}>
                <span>Next</span>
              </button>
            </div>
          </footer>

        </div>}

        {(!loading && (results || []).length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No shipment has been created yet.</p>
            <p>Use the <strong>API</strong> to create your first shipment.</p>
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

              <Component />

            </ShipmentsProvider>
          </CustomInvoicePrinter>
        </LabelPrinter>
      </ShipmentMutationProvider>
    </DashboardLayout>
  ), pageProps)
};
