import AuthenticatedPage from "@/layouts/authenticated-page";
import CopiableLink from "@/components/copiable-link";
import DashboardLayout from "@/layouts/dashboard-layout";
import CustomInvoicePrinter, { CustomInvoicePrinterContext } from "@/components/descriptions/custom-invoice-printer";
import LabelPrinter, { LabelPrinterContext } from "@/components/label/label-printer";
import { Loading } from "@/components/loader";
import StatusBadge from "@/components/status-badge";
import { AppMode } from "@/context/app-mode-provider";
import ShipmentProvider, { LabelData } from "@/context/shipment-provider";
import { formatAddressLocation, formatCustomsLabel, formatDate, formatDateTime, formatDimension, formatParcelLabel, formatRef, formatWeight, isNone, p, shipmentCarrier } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import AppLink from "@/components/app-link";
import { MetadataObjectType, ShipmentStatus } from "@purplship/graphql";
import MetadataMutationProvider from "@/context/metadata-mutation";
import { CustomsType } from "@/lib/types";
import MetadataEditor, { MetadataEditorContext } from "@/components/metadata-editor";
import Spinner from "@/components/spinner";

export { getServerSideProps } from "@/lib/middleware";


export const ShipmentComponent: React.FC<{ shipmentId?: string }> = ({ shipmentId }) => {
  const router = useRouter();
  const { basePath } = useContext(AppMode);
  const { setLoading } = useContext(Loading);
  const { printLabel } = useContext(LabelPrinterContext);
  const { printInvoice } = useContext(CustomInvoicePrinterContext);
  const { shipment, loading, called, loadShipment } = useContext(LabelData);
  const { id } = router.query;

  const buyLabel = (_: React.MouseEvent) => {
    router.push(basePath + '/buy_label/' + shipment.id);
  };

  useEffect(() => { setLoading(loading); });
  useEffect(() => {
    (!loading && loadShipment) && loadShipment((id || shipmentId) as string);
  }, [id || shipmentId]);

  return (
    <>

      {loading && <Spinner />}

      {!loading && !isNone(shipment.id) && <>
        <div className="columns my-1">
          <div className="column is-6">
            <span className="subtitle is-size-7 has-text-weight-semibold">SHIPMENT</span>
            <br />
            <span className="title is-4 mr-2">{shipment.tracking_number || "NOT COMPLETED"}</span>
            <StatusBadge status={shipment.status} />
          </div>

          <div className="column is-6 has-text-right pb-0">
            <CopiableLink text={shipment.id as string} title="Copy ID" />
            <br />
            {!isNone(shipment.label) && <button className="button is-default is-small ml-1" onClick={() => printLabel(shipment)}>
              <i className="fas fa-print"></i>
              <span className="ml-1">Print Label</span>
            </button>}
            {!isNone((shipment?.meta as any).custom_invoice) &&
              <button className="button is-default is-small ml-1" onClick={() => printInvoice(shipment)}>
                <i className="fas fa-print"></i>
                <span className="ml-1">Print Invoice</span>
              </button>}
            {(isNone(shipment.label) && shipment.status === ShipmentStatus.created) &&
              <button className="button is-default is-small ml-1" onClick={buyLabel}>Buy Label</button>}

            {!isNone(shipmentId) &&
              <AppLink
                href={`/shipments/${shipmentId}`} target="blank"
                className="button is-default has-text-info is-small mx-1">
                <span className="icon">
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </AppLink>}
          </div>
        </div>

        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        <div className="columns mb-4">
          <div className="p-4 mr-4">
            <span className="subtitle is-size-7 my-4">Date</span><br />
            <span className="subtitle is-size-7 mt-1 has-text-weight-semibold">{formatDateTime(shipment.created_at)}</span>
          </div>

          {!isNone(shipment.service) && <>
            <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>
            <div className="p-4 mr-4">
              <span className="subtitle is-size-7 my-4">Courier</span><br />
              <Image src={p`/carriers/${shipmentCarrier(shipment)}_logo.svg`} width={100} height={25} alt="logo" className="mt-1" />
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
                  <div className="column is-4 is-size-6 py-1">Courier Provider</div>
                  <div className="column is-size-6 has-text-weight-semibold py-1">
                    {formatRef(shipment.carrier_name as string)}
                  </div>
                </div>
                <div className="columns my-0">
                  <div className="column is-4 is-size-6 py-1">Service Level</div>
                  <div className="column is-size-6 has-text-weight-semibold py-1">
                    {formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)}
                  </div>
                </div>
                <div className="columns my-0">
                  <div className="column is-4 is-size-6 py-1">Cost</div>
                  <div className="column is-size-6 py-1">
                    <span className="has-text-weight-semibold mr-1">{shipment.selected_rate?.total_charge}</span>
                    <span>{shipment.selected_rate?.currency}</span>
                  </div>
                </div>
              </div>

              <div className="column is-6 is-size-6 py-1">
                <p className="is-title is-size-6 my-2 has-text-weight-semibold">CHARGES</p>
                <hr className="mt-1 mb-2" style={{ height: '1px' }} />

                <div className="columns m-0">
                  <div className="column is-5 is-size-7 px-0 py-1">
                    <span className="is-uppercase">Base Charge</span>
                  </div>
                  <div className="is-size-7 py-1 has-text-grey has-text-right" style={{ minWidth: '100px' }}>
                    <span className="mr-1">{shipment.selected_rate?.base_charge}</span>
                    {!isNone(shipment.selected_rate?.currency) && <span>{shipment.selected_rate?.currency}</span>}
                  </div>
                </div>

                {(shipment.selected_rate?.extra_charges || []).map((charge, index) => <div key={index} className="columns m-0">
                  <div className="column is-5 is-size-7 px-0 py-1">
                    <span className="is-uppercase">{charge?.name?.toLocaleLowerCase()}</span>
                  </div>
                  <div className="is-size-7 py-1 has-text-grey has-text-right" style={{ minWidth: '100px' }}>
                    <span className="mr-1">{charge?.amount}</span>
                    {!isNone(charge?.currency) && <span>{charge?.currency}</span>}
                  </div>
                </div>)}
              </div>
            </div>
          </div>

        </>}


        <h2 className="title is-5 my-4">Shipment Details</h2>
        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        <div className="mt-3 mb-6">

          <div className="columns my-0">
            <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">ADDRESS</p>

              <p className="is-size-6 my-1">{shipment.recipient.person_name}</p>
              <p className="is-size-6 my-1">{shipment.recipient.company_name}</p>
              <p className="is-size-6 my-1 has-text-info">{shipment.recipient.email}</p>
              <p className="is-size-6 my-1 has-text-info">{shipment.recipient.phone_number}</p>
              <p className="is-size-6 my-1">
                <span>{shipment.recipient.address_line1}</span>
                {!isNone(shipment.recipient.address_line2) && <span>{shipment.recipient.address_line2}</span>}
              </p>
              <p className="is-size-6 my-1">{formatAddressLocation(shipment.recipient)}</p>
            </div>

            <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">PARCELS</p>

              {shipment.parcels.map((parcel, index) => <React.Fragment key={index + "parcel-info"}>
                <hr className="mt-1 mb-2" style={{ height: '1px' }} />
                <p className="is-size-7 my-1">{formatParcelLabel(parcel)}</p>
                <p className="is-size-7 my-1 has-text-grey">{formatDimension(parcel)}</p>
                <p className="is-size-7 my-1 has-text-grey">{formatWeight(parcel)}</p>
              </React.Fragment>)}
            </div>
          </div>

          <div className="columns mt-6 mb-0 is-multiline">

            {!isNone(shipment.customs) && <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">CUSTOMS DECLARATION</p>

              <p className="is-size-6 my-1">{formatCustomsLabel(shipment.customs as CustomsType)}</p>
              <p className="is-size-6 my-1 has-text-grey">
                {!isNone(shipment.customs?.options?.aes) && <span>AES: <strong>{shipment.customs?.options?.aes}</strong></span>}
              </p>
              <p className="is-size-6 my-1 has-text-grey">
                {!isNone(shipment.customs?.options?.eel_pfc) && <span>EEL / PFC: <strong>{shipment.customs?.options?.eel_pfc}</strong></span>}
              </p>
              <p className="is-size-6 my-1 has-text-grey">
                {!isNone(shipment.customs?.invoice) && <span>Invoice Number: <strong>{shipment.customs?.invoice}</strong></span>}
              </p>
              <p className="is-size-6 my-1 has-text-grey">
                {!isNone(shipment.customs?.invoice_date) && <span>Invoice Date: <strong>{shipment.customs?.invoice_date}</strong></span>}
              </p>
              <p className="is-size-6 my-1 has-text-grey">
                {!isNone(shipment.customs?.options?.certificate_number) && <span>Certificate Number: <strong>{shipment.customs?.options?.certificate_number}</strong></span>}
              </p>
              <p className="is-size-6 my-1 has-text-grey">
                {!isNone(shipment.customs?.duty) && <span>Duties paid by <strong>{formatRef('' + shipment.customs?.duty?.paid_by)}</strong></span>}
              </p>
              <p className="is-size-6 my-1 has-text-grey">
                {!isNone(shipment.customs?.signer) && <span>Certified and Signed By <strong>{shipment.customs?.signer}</strong></span>}
              </p>
              <p className="is-size-6 my-1 has-text-grey">
                {!isNone(shipment.customs?.content_description) && <span>Content: {shipment.customs?.content_description}</span>}
              </p>
            </div>}

            {(!isNone(shipment.customs) && (shipment.customs?.commodities || []).length > 0) && <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">COMMODITIES</p>

              {(shipment.customs?.commodities || []).map((commodity, index) => <React.Fragment key={index + "parcel-info"}>
                <hr className="mt-1 mb-2" style={{ height: '1px' }} />
                <p className="is-size-7 my-1 has-text-weight-semibold">{commodity.sku}</p>
                <p className="is-size-7 my-1">{commodity.description}</p>
                <p className="is-size-7 my-1 has-text-grey">
                  {isNone(commodity?.value_amount) ? '' : <>
                    <span>Value: {commodity?.quantity} x {commodity?.value_amount} {commodity?.value_currency}</span>
                  </>}
                </p>
                <p className="is-size-7 my-1 has-text-grey">{formatWeight(commodity)}</p>
              </React.Fragment>)}
            </div>}

            {(Object.values(shipment.options as object).length > 0) && <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">SHIPMENT OPTIONS</p>

              {[shipment.options].map((options: any, index) => <React.Fragment key={index + "parcel-info"}>
                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                  {!isNone(options.shipment_date) && <span>Shipment Date: <strong>{formatDate(options.shipment_date)}</strong></span>}
                </p>
                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                  {!isNone(options.currency) && <span>Preferred Currency: <strong>{options.currency}</strong></span>}
                </p>
                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                  {!isNone(options.signature_confirmation) && <span>Signature Confirmation <strong>Required</strong></span>}
                </p>
                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                  {!isNone(options.insurance) && <>
                    <span>Insurance (Coverage Amount <strong>{options.insurance} {options.currency}</strong>)</span>
                  </>}
                </p>
                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                  {!isNone(options.declared_value) && <>
                    <span>Declared Value: <strong>{options.declared_value}</strong> {options.currency}</span>
                  </>}
                </p>
                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                  {!isNone(options.cash_on_delivery) && <>
                    <span>Amount To Collect <strong>{options.cash_on_delivery}</strong> {options.currency}</span>
                  </>}
                </p>
              </React.Fragment>)}

            </div>}
          </div>

        </div>


        <MetadataEditor
          id={shipment.id}
          object_type={MetadataObjectType.shipment}
          metadata={shipment.metadata}
          onChange={() => loadShipment(shipment.id)}
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

      </>}

      {called && !loading && isNone(shipment.id) && <div className="card my-6">

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
      <Head><title>Shipment - {(pageProps as any).references?.app_name}</title></Head>
      <ShipmentProvider>
        <LabelPrinter>
          <CustomInvoicePrinter>
            <MetadataMutationProvider>

              <ShipmentComponent />

            </MetadataMutationProvider>
          </CustomInvoicePrinter>
        </LabelPrinter>
      </ShipmentProvider>
    </DashboardLayout>
  ), pageProps);
}
