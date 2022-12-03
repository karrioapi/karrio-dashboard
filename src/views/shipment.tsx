import AuthenticatedPage from "@/layouts/authenticated-page";
import CopiableLink from "@/components/copiable-link";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import StatusBadge from "@/components/status-badge";
import ShipmentProvider, { ShipmentContext } from "@/context/shipment-provider";
import { formatDateTime, formatRef, isNone, shipmentCarrier } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import AppLink from "@/components/app-link";
import { MetadataObjectType } from "karrio/graphql";
import MetadataMutationProvider from "@/context/metadata-mutation";
import { CustomsType, ParcelType } from "@/lib/types";
import MetadataEditor, { MetadataEditorContext } from "@/components/metadata-editor";
import Spinner from "@/components/spinner";
import EventsProvider, { EventsContext } from "@/context/events-provider";
import LogsProvider, { LogsContext } from "@/context/logs-provider";
import StatusCode from "@/components/status-code-badge";
import CarrierBadge from "@/components/carrier-badge";
import ParcelDescription from "@/components/descriptions/parcel-description";
import ShipmentMenu from "@/components/shipment-menu";
import DocumentTemplatesProvider, { useDocumentTemplates } from "@/context/document-templates-provider";
import AddressDescription from "@/components/descriptions/address-description";
import CommodityDescription from "@/components/descriptions/commodity-description";
import CustomsInfoDescription from "@/components/descriptions/customs-info-description";
import ShipmentMutationProvider from "@/context/shipment-mutation";
import ConfirmModal from "@/components/confirm-modal";
import ShipmentsProvider from "@/context/shipments-provider";

export { getServerSideProps } from "@/lib/middleware";


export const ShipmentComponent: React.FC<{ shipmentId?: string }> = ({ shipmentId }) => {
  const router = useRouter();
  const logs = useContext(LogsContext);
  const events = useContext(EventsContext);
  const { setLoading } = useContext(Loading);
  const { templates } = useDocumentTemplates();
  const { shipment, loading, called, loadShipment } = useContext(ShipmentContext);
  const { id } = router.query;

  useEffect(() => { setLoading(loading); });
  useEffect(() => {
    if (!called && !loading && loadShipment) {
      loadShipment((id || shipmentId) as string);
    }
  }, [called, loading, id || shipmentId]);
  useEffect(() => {
    if (called && !isNone(shipment)) {
      (!logs.called && !logs.loading && logs.load) && logs.load({ first: 6, entity_id: shipment?.id });
      (!events.called && !events.loading && events.load) && events.load({ first: 6, entity_id: shipment?.id });
    }
  }, [called, shipment]);

  return (
    <>

      {!called && loading && <Spinner />}

      {shipment && <>

        {/* Header Section */}
        <div className="columns my-1">
          <div className="column is-6">
            <span className="subtitle is-size-7 has-text-weight-semibold">SHIPMENT</span>
            <br />
            <span className="title is-4 mr-2">{shipment.tracking_number || "NOT COMPLETED"}</span>
            <StatusBadge status={shipment.status} />
          </div>

          <div className="column is-6 pb-0">
            <div className="is-flex is-justify-content-right">
              <CopiableLink text={shipment.id as string} title="Copy ID" />
            </div>
            <div className="is-flex is-justify-content-right">

              {!isNone(shipmentId) && <AppLink
                href={`/shipments/${shipmentId}`} target="blank"
                className="button is-white has-text-info is-small mx-1">
                <span className="icon">
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </AppLink>}

              <div style={{ display: 'inline-flex' }}>
                <ShipmentMenu shipment={shipment} templates={templates} isViewing />
              </div>

            </div>
          </div>
        </div>

        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        {/* Reference and highlights section */}
        <div className="columns mb-4">
          <div className="p-4 mr-4">
            <span className="subtitle is-size-7 my-4">Date</span><br />
            <span className="subtitle is-size-7 mt-1 has-text-weight-semibold">{formatDateTime(shipment.created_at)}</span>
          </div>

          {!isNone(shipment.service) && <>
            <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>
            <div className="p-4 mr-4">
              <span className="subtitle is-size-7 my-4">Courier</span><br />
              <CarrierBadge
                className="has-background-primary has-text-centered has-text-weight-bold has-text-white-bis is-size-7"
                carrier={shipmentCarrier(shipment)}
                custom_name={(shipment as any).carrier_id as string}
                style={{ minWidth: '90px' }}
                short
              />
            </div>

            <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>
            <div className="p-4 mr-4">
              <span className="subtitle is-size-7 my-4">Service Level</span><br />
              <span className="subtitle is-size-7 mt-1 has-text-weight-semibold">
                {formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)}
              </span>
            </div>
          </>}

          {!isNone(shipment.reference) && <>
            <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>
            <div className="p-4 mr-4">
              <span className="subtitle is-size-7 my-4">Reference</span><br />
              <span className="subtitle is-size-7 has-text-weight-semibold">{shipment.reference}</span>
            </div>
          </>}
        </div>

        {!isNone(shipment.selected_rate) && <>

          <h2 className="title is-5 my-4">Service Details</h2>
          <hr className="mt-1 mb-2" style={{ height: '1px' }} />

          <div className="mt-3 mb-6">
            <div className="columns my-0 py-1">
              <div className="column is-6 is-size-6">
                <div className="columns my-0">
                  <div className="column is-4 is-size-6 py-1">Service</div>
                  <div className="column is-size-6 has-text-weight-semibold py-1">
                    {formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)}
                  </div>
                </div>
                <div className="columns my-0">
                  <div className="column is-4 is-size-6 py-1">Courier</div>
                  <div className="column is-size-6 has-text-weight-semibold py-1">
                    {formatRef((shipment.meta.rate_provider === 'generic' ? shipment.carrier_name : shipment.meta.rate_provider) as string)}
                  </div>
                </div>
                <div className="columns my-0">
                  <div className="column is-4 is-size-6 py-1">Rate</div>
                  <div className="column is-size-6 py-1">
                    <span className="has-text-weight-semibold mr-1">{shipment.selected_rate?.total_charge}</span>
                    <span>{shipment.selected_rate?.currency}</span>
                  </div>
                </div>
                <div className="columns my-0">
                  <div className="column is-4 is-size-7 py-1">Rate Provider</div>
                  <div className="column is-size-7 has-text-info has-text-weight-semibold py-1">
                    {formatRef(shipment.carrier_name as string)}
                  </div>
                </div>
                <div className="columns my-0">
                  <div className="column is-4 is-size-7 py-1">Tracking Number</div>
                  <div className="column has-text-info py-1">
                    {shipment.tracker_id
                      ? <a className="p-0 m-0 is-size-7 has-text-weight-semibold"
                        href={`/tracking/${shipment.tracker_id}`} target="_blank" rel="noreferrer">
                        <span>{shipment.tracking_number as string}</span> {" "}
                        <span style={{ fontSize: '0.7em' }}><i className="fas fa-external-link-alt"></i></span>
                      </a>
                      : <span className="is-size-7 has-text-weight-semibold">{shipment.tracking_number as string}</span>
                    }
                  </div>
                </div>
              </div>

              {(shipment.selected_rate?.extra_charges || []).length > 0 &&
                <div className="column is-6 is-size-6 py-1">
                  <p className="is-title is-size-6 my-2 has-text-weight-semibold">CHARGES</p>
                  <hr className="mt-1 mb-2" style={{ height: '1px' }} />

                  {(shipment.selected_rate?.extra_charges || []).map((charge, index) => <div key={index} className="columns m-0">
                    <div className="column is-5 is-size-7 px-0 py-1">
                      <span className="is-uppercase">{charge?.name?.toLocaleLowerCase()}</span>
                    </div>
                    <div className="is-size-7 py-1 has-text-grey has-text-right" style={{ minWidth: '100px' }}>
                      <span className="mr-1">{charge?.amount}</span>
                      {!isNone(charge?.currency) && <span>{charge?.currency}</span>}
                    </div>
                  </div>)}
                </div>}

            </div>
          </div>

        </>}


        {/* Shipment details section */}
        <h2 className="title is-5 my-4">Shipment Details</h2>
        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        <div className="mt-3 mb-6">

          <div className="columns my-0">
            {/* Recipient Address section */}
            <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">ADDRESS</p>

              <AddressDescription address={shipment.recipient} />
            </div>

            {/* Options section */}
            {(Object.values(shipment.options as object).length > 0) && <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">OPTIONS</p>

              {Object.entries(shipment.options).map(([key, value]: any, index) => <React.Fragment key={index + "item-info"}>
                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                  <span>
                    {formatRef(key).toLowerCase()}: <strong>{String(value)}</strong>
                    {['insurance', 'cash_on_delivery', 'declared_value'].includes(key) && ` ${shipment.options.currency || ''}`}
                  </span>
                </p>
              </React.Fragment>)}

            </div>}
          </div>

          {/* Parcels section */}
          <div className="mt-6 mb-0">
            <p className="is-title is-size-6 my-2 has-text-weight-semibold">
              PARCEL{shipment.parcels.length > 1 && "S"}
            </p>

            {shipment.parcels.map((parcel: ParcelType, index) => <React.Fragment key={index + "parcel-info"}>

              <hr className="my-4" style={{ height: '1px' }} />

              <div className="columns mb-0 is-multiline">

                {/* Parcel details */}
                <div className="column is-6 is-size-6 py-1">
                  <ParcelDescription parcel={parcel} />
                </div>

                {/* Parcel items */}
                {((parcel.items || []).length > 0) &&
                  <div className="column is-6 is-size-6 py-1">
                    <p className="is-title is-size-6 my-2 has-text-weight-semibold">
                      ITEMS {" "}
                      <span className="is-size-7">({(parcel.items || []).reduce((acc, { quantity }) => acc + (quantity || 0), 0)})</span>
                    </p>

                    {(parcel.items || []).map((item, index) => <React.Fragment key={index + "item-info"}>
                      <hr className="mt-1 mb-2" style={{ height: '1px' }} />
                      <CommodityDescription commodity={item} />
                    </React.Fragment>)}
                  </div>}

              </div>

            </React.Fragment>)}
          </div>

          {/* Customs section */}
          <div className="columns mt-6 mb-0 is-multiline">

            {/* Customs details */}
            {!isNone(shipment.customs) && <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">CUSTOMS DECLARATION</p>

              <CustomsInfoDescription customs={shipment.customs as CustomsType} />
            </div>}

            {/* Customs commodities */}
            {(!isNone(shipment.customs) && (shipment.customs?.commodities || []).length > 0) && <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">
                COMMODITIES {" "}
                <span className="is-size-7">({(shipment.customs?.commodities || []).reduce((acc, { quantity }) => acc + (quantity || 0), 0)})</span>
              </p>

              {(shipment.customs?.commodities || []).map((commodity, index) => <React.Fragment key={index + "parcel-info"}>
                <hr className="mt-1 mb-2" style={{ height: '1px' }} />
                <CommodityDescription commodity={commodity} />
              </React.Fragment>)}
            </div>}

          </div>

        </div>


        {/* Metadata section */}
        <MetadataEditor
          id={shipment.id}
          object_type={MetadataObjectType.shipment}
          metadata={shipment.metadata}
        >
          <MetadataEditorContext.Consumer>{({ isEditing, editMetadata }) => (<>

            <div className="is-flex is-justify-content-space-between">
              <h2 className="title is-5 my-4">Metadata</h2>

              <button
                type="button"
                className="button is-default is-small is-align-self-center"
                disabled={isEditing}
                onClick={() => editMetadata()}>
                <span className="icon is-small">
                  <i className="fas fa-pen"></i>
                </span>
                <span>Edit metadata</span>
              </button>
            </div>

            <hr className="mt-1 mb-2" style={{ height: '1px' }} />

          </>)}</MetadataEditorContext.Consumer>
        </MetadataEditor>

        <div className="my-6 pt-1"></div>

        {/* Logs section */}
        <h2 className="title is-5 my-4">Logs</h2>

        {logs.loading && <Spinner />}

        {!logs.loading && (logs.logs || []).length == 0 && <div>No logs</div>}

        {!logs.loading && (logs.logs || []).length > 0 && <div className="table-container">
          <table className="related-item-table table is-hoverable is-fullwidth">
            <tbody>
              {(logs.logs || []).map(log => (
                <tr key={log.id} className="items is-clickable">
                  <td className="status is-vcentered p-0">
                    <AppLink href={`/developers/logs/${log.id}`} className="pr-2">
                      <StatusCode code={log.status_code as number} />
                    </AppLink>
                  </td>
                  <td className="description is-vcentered p-0">
                    <AppLink href={`/developers/logs/${log.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex py-3">
                      {`${log.method} ${log.path}`}
                    </AppLink>
                  </td>
                  <td className="date is-vcentered p-0">
                    <AppLink href={`/developers/logs/${log.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex is-justify-content-right py-3">
                      <span>{formatDateTime(log.requested_at)}</span>
                    </AppLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

        <div className="my-6 pt-1"></div>

        {/* Events section */}
        <h2 className="title is-5 my-4">Events</h2>

        {events.loading && <Spinner />}

        {!events.loading && (events.events || []).length == 0 && <div>No events</div>}

        {!events.loading && (events.events || []).length > 0 && <div className="table-container">
          <table className="related-item-table table is-hoverable is-fullwidth">
            <tbody>
              {(events.events || []).map(event => (
                <tr key={event.id} className="items is-clickable">
                  <td className="description is-vcentered p-0">
                    <AppLink href={`/developers/events/${event.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex py-3">
                      {`${event.type}`}
                    </AppLink>
                  </td>
                  <td className="date is-vcentered p-0">
                    <AppLink href={`/developers/events/${event.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex is-justify-content-right py-3">
                      <span>{formatDateTime(event.created_at)}</span>
                    </AppLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

      </>}

      {called && !loading && isNone(shipment) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>Uh Oh!</p>
          <p>{"We couldn't find any shipment with that reference"}</p>
        </div>

      </div>}
    </>
  );
};

export default function ShipmentPage(pageProps: any) {
  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Shipment - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <ShipmentProvider>
        <ShipmentMutationProvider>
          <ShipmentsProvider>
            <DocumentTemplatesProvider filter={{ related_object: "shipment" }}>
              <EventsProvider setVariablesToURL={false}>
                <LogsProvider setVariablesToURL={false}>
                  <ConfirmModal>
                    <MetadataMutationProvider>

                      <ShipmentComponent />

                    </MetadataMutationProvider>
                  </ConfirmModal>
                </LogsProvider>
              </EventsProvider>
            </DocumentTemplatesProvider>
          </ShipmentsProvider>
        </ShipmentMutationProvider>
      </ShipmentProvider>
    </DashboardLayout>
  ), pageProps);
}
