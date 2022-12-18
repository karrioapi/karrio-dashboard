import { formatRef, formatWeight, getShipmentCommodities, isNone, isNoneOrEmpty, useLocation } from '@/lib/helper';
import { AddressModalEditor, CustomsModalEditor, ParcelModalEditor } from '@/components/form-parts/form-modals';
import { CommodityType, CURRENCY_OPTIONS, CustomsType, NotificationType, ShipmentType } from '@/lib/types';
import CommodityEditModalProvider, { CommodityStateContext } from '@/components/commodity-edit-modal';
import { LabelTypeEnum, MetadataObjectTypeEnum, PaidByEnum, ShipmentStatusEnum } from 'karrio/graphql';
import CustomsInfoDescription from '@/components/descriptions/customs-info-description';
import MetadataEditor, { MetadataEditorContext } from '@/components/metadata-editor';
import { DEFAULT_CUSTOMS_CONTENT } from '@/components/form-parts/customs-info-form';
import CommodityDescription from '@/components/descriptions/commodity-description';
import MessagesDescription from '@/components/descriptions/messages-description';
import AddressDescription from '@/components/descriptions/address-description';
import ParcelDescription from '@/components/descriptions/parcel-description';
import { DEFAULT_PARCEL_CONTENT } from '@/components/form-parts/parcel-form';
import GoogleGeocodingScript from '@/components/google-geocoding-script';
import RateDescription from '@/components/descriptions/rate-description';
import { useDefaultTemplates } from '@/context/default-template';
import CheckBoxField from '@/components/generic/checkbox-field';
import LineItemSelector from '@/components/line-item-selector';
import AuthenticatedPage from '@/layouts/authenticated-page';
import ButtonField from '@/components/generic/button-field';
import SelectField from '@/components/generic/select-field';
import { useLabelDataMutation } from '@/context/label-data';
import InputField from '@/components/generic/input-field';
import DashboardLayout from '@/layouts/dashboard-layout';
import ModalProvider from '@/components/generic/modal';
import CarrierImage from '@/components/carrier-image';
import { useNotifier } from '@/components/notifier';
import React, { useEffect, useState } from 'react';
import { bundleContexts } from '@/context/utils';
import { useAppMode } from '@/context/app-mode';
import { useOrders } from '@/context/order';
import Spinner from '@/components/spinner';
import Head from 'next/head';

export { getServerSideProps } from "@/lib/middleware";

const ContextProviders = bundleContexts([
  CommodityEditModalProvider,
  ModalProvider,
]);

export default function CreateLabelPage(pageProps: any) {
  const { ORDERS_MANAGEMENT } = pageProps?.metadata || {};

  const Component: React.FC = () => {
    const notifier = useNotifier();
    const { basePath } = useAppMode();
    const { addUrlParam, ...router } = useLocation();
    const { query: templates } = useDefaultTemplates();
    const { shipment_id = 'new' } = router.query as { shipment_id: string };
    const { state: { shipment, query }, ...mutation } = useLabelDataMutation(shipment_id);
    const { query: orders } = useOrders({ first: 100, status: ['unfulfilled', 'partial'] as any });
    const [key, setKey] = useState<string>(`${shipment_id}-${Date.now()}`);
    const [ready, setReady] = useState<boolean>(false);
    const [selected_rate, setSelectedRate] = useState<ShipmentType['rates'][0] | undefined>(
      shipment?.selected_rate_id ? { id: shipment?.selected_rate_id } as any : undefined
    );

    const requireInfoForRating = (shipment: ShipmentType) => {
      return (
        shipment.recipient.address_line1 === undefined ||
        shipment.shipper.address_line1 === undefined ||
        shipment.parcels.length === 0 ||
        query.isFetching === true
      );
    };
    const isInternational = (shipment: ShipmentType) => {
      return (
        shipment.recipient.country_code !== undefined &&
        shipment.shipper.country_code !== undefined &&
        shipment.recipient.country_code !== shipment.shipper.country_code
      );
    };
    const getItems = () => {
      return (orders.data?.orders.edges || [])
        .map(({ node: { line_items } }) => line_items).flat();
    }
    const getParent = (id: string | null) => {
      return getItems()
        .find((item) => item.id === id);
    };
    const getOrder = (item_id?: string | null) => {
      return (orders.data?.orders.edges || [])
        .find(({ node: order }) => order.line_items.find((item) => item.id === item_id))
        ?.node;
    };
    const getAvailableQuantity = (shipment: ShipmentType, item: CommodityType, item_index: number) => {
      const parent_quantity = getParent(item.parent_id)?.unfulfilled_quantity || 0;
      const packed_quantity = shipment.parcels
        .map(({ items }) => items || []).flat()
        .filter((_, index) => index !== item_index)
        .reduce((acc, { parent_id, quantity }) => {
          return (parent_id === item.parent_id) ? acc + (quantity as number) : 0;
        }, 0);

      return parent_quantity - packed_quantity;
    };
    const setInitialData = () => {
      const shipper = templates.data?.default_templates.default_address?.address || {};
      const parcel = { ...(templates.data?.default_templates.default_parcel?.parcel || DEFAULT_PARCEL_CONTENT) };

      onChange({
        ...(shipper ? { shipper: (shipper as typeof shipment['shipper']) } : {}),
        ...(parcel ? { parcels: ([parcel] as typeof shipment['parcels']) } : {}),
        label_type: LabelTypeEnum.PDF,
      });

      setReady(true);
    };
    const onChange = async (changes: Partial<ShipmentType>) => {
      if (changes === undefined) { return; }
      await mutation.updateShipment({ id: shipment_id, ...changes });
      setKey(`${shipment_id}-${Date.now()}`);
    };

    useEffect(() => {
      if (shipment.status && shipment.status !== ShipmentStatusEnum.draft) {
        notifier.notify({ type: NotificationType.info, message: 'Label already purchased! redirecting...' });
        setTimeout(() => router.push(basePath), 2000);
      }
    }, [shipment]);
    useEffect(() => {
      const orders_called = (ORDERS_MANAGEMENT && orders.isFetched) || true;
      if (
        !ready && query.isFetched &&
        templates.isFetched &&
        shipment_id === 'new' &&
        orders_called
      ) {
        setTimeout(() => setInitialData(), 1000);
      }
      if (
        !ready && query.isFetched &&
        !isNoneOrEmpty(shipment_id) &&
        shipment_id !== 'new' &&
        orders_called
      ) {
        setReady(true);
      }
    }, [templates.isFetched, orders.isFetched, query.isFetched]);


    return (
      <>
        <header className="px-0 py-6 is-flex is-justify-content-space-between">
          <span className="title is-4">
            Create label
          </span>
        </header>

        {(shipment.messages || []).length > 0 && <div className="notification is-danger is-light is-size-7 my-2 p-2">
          <MessagesDescription messages={shipment.messages} />
        </div>}

        {!ready && <Spinner />}

        {ready && <div className="columns pb-6 m-0">
          <div className="column px-0" style={{ minHeight: '850px' }}>

            {/* Address section */}
            <div className="card p-0">

              <div className="p-3">

                <header className="is-flex is-justify-content-space-between">
                  <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">RECIPIENT</span>
                  <div className="is-vcentered">
                    <AddressModalEditor
                      shipment={shipment}
                      address={shipment.recipient}
                      onSubmit={(address) => onChange({ recipient: address })}
                      trigger={
                        <button className="button is-small is-info is-text is-inverted p-1" disabled={query.isFetching}>
                          Edit recipient address
                        </button>
                      }
                    />
                  </div>
                </header>

                <AddressDescription address={shipment.recipient} />

                {Object.values(shipment.recipient || {}).length === 0 &&
                  <div className="notification is-warning is-light my-2 py-2 px-4">
                    Please add a recipient address.
                  </div>}

              </div>

              <hr className='my-1' style={{ height: '1px' }} />

              <div className="p-3">

                <header className="is-flex is-justify-content-space-between">
                  <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">SHIPPER</span>
                  <div className="is-vcentered">
                    <AddressModalEditor
                      shipment={shipment}
                      address={shipment.shipper}
                      onSubmit={(address) => onChange({ shipper: address })}
                      trigger={
                        <button className="button is-small is-info is-text is-inverted p-1" disabled={query.isFetching}>
                          Edit shipper address
                        </button>
                      }
                    />
                  </div>
                </header>

                <AddressDescription address={shipment.shipper} />

                {Object.values(shipment.shipper || {}).length === 0 &&
                  <div className="notification is-warning is-light my-2 py-2 px-4">
                    Please specify the shipper address.
                  </div>}

              </div>

            </div>

            {/* Parcel & Items section */}
            <div className="card px-0 py-3 mt-5">

              <header className="px-3 is-flex is-justify-content-space-between">
                <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">PACKAGES</span>
                <div className="is-vcentered">
                  <ParcelModalEditor
                    header='Add package'
                    shipment={shipment}
                    onSubmit={mutation.addParcel}
                    trigger={
                      <button className="button is-small is-info is-text is-inverted p-1" disabled={query.isFetching}>
                        Add package
                      </button>
                    }
                  />
                </div>
              </header>

              <hr className='my-1' style={{ height: '1px' }} />

              {shipment.parcels.map((pkg, pkg_index) => (
                <React.Fragment key={pkg.id || `${pkg_index}-${new Date()}`}>
                  {pkg_index > 0 && <hr className='my-1' style={{ height: '3px' }} />}

                  <div className="p-3" key={pkg_index}>
                    {/* Parcel header */}
                    <div className="is-flex is-justify-content-space-between mb-4">
                      <div>
                        <ParcelDescription
                          parcel={pkg}
                          suffix={<span className="tag ml-1 has-text-weight-bold">{pkg_index + 1}</span>}
                        />
                      </div>
                      <div>
                        <ParcelModalEditor header='Edit package'
                          onSubmit={mutation.updateParcel(pkg_index, pkg.id)}
                          parcel={pkg}
                          shipment={shipment}
                          trigger={
                            <button type="button" className="button is-small is-white" disabled={query.isFetching}>
                              <span className="icon is-small"><i className="fas fa-pen"></i></span>
                            </button>
                          }
                        />
                        <button type="button" className="button is-small is-white"
                          disabled={query.isFetching || shipment.parcels.length === 1}
                          onClick={mutation.removeParcel(pkg_index, pkg.id)}>
                          <span className="icon is-small"><i className="fas fa-times"></i></span>
                        </button>
                      </div>
                    </div>

                    {/* Items section */}
                    <span className="is-size-7 has-text-weight-semibold">ITEMS</span>

                    {(pkg.items || []).map((item, item_index) => (
                      <React.Fragment key={item.id || `${item_index}-${new Date()}`}>
                        <hr className='my-1' style={{ height: '1px' }} />
                        <div key={item_index} className="py-1 is-flex is-justify-content-space-between">
                          <div>
                            <p className="is-size-7 my-1 has-text-weight-semibold">
                              {item_index + 1} - {isNoneOrEmpty(item.description) ? 'Item' : item.description}
                            </p>
                            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                              {isNoneOrEmpty(item.sku) ? 'SKU: 0000000' : `SKU: ${item.sku}`}
                              {getOrder(item.parent_id) && <span className='has-text-info'>
                                {` | ORDER: ${getOrder(item.parent_id)?.order_id}`}
                              </span>}
                            </p>
                            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                            </p>
                          </div>
                          <div className="is-flex">
                            <div className="is-size-7 has-text-grey has-text-weight-semibold is-flex px-2">
                              <span className="p-2 has-text-right" style={{ minWidth: '90px' }}>{formatWeight(item)}</span>
                              <div className="field has-addons">
                                <p className="control is-expanded">
                                  <input
                                    min={1}
                                    type="number"
                                    defaultValue={item.quantity as number}
                                    onChange={e => {
                                      mutation.updateItem(pkg_index, item_index, pkg.id, item.id)({
                                        quantity: parseInt(e.target.value)
                                      } as CommodityType)
                                    }}
                                    className="input is-small"
                                    style={{ width: '60px', textAlign: 'center' }}
                                    {...(getParent(item.parent_id) ? {
                                      max: getAvailableQuantity(shipment, item, item_index)
                                    } : {})}
                                  />
                                </p>
                                <p className="control">
                                  <a className="button is-static is-small">
                                    of {getParent(item.parent_id)?.unfulfilled_quantity || item.quantity}
                                  </a>
                                </p>
                              </div>
                            </div>
                            <CommodityStateContext.Consumer>{({ editCommodity }) => (
                              <button type="button" className="button is-small is-white"
                                disabled={query.isFetching || !isNone(item.parent_id)}
                                onClick={() => editCommodity({
                                  commodity: item,
                                  onSubmit: _ => mutation.updateItem(pkg_index, item_index, pkg.id, item.id)(_)
                                })}>
                                <span className="icon is-small"><i className="fas fa-pen"></i></span>
                              </button>
                            )}</CommodityStateContext.Consumer>
                            <button type="button" className="button is-small is-white"
                              onClick={mutation.removeItem(pkg_index, item_index, item.id)}>
                              <span className="icon is-small"><i className="fas fa-times"></i></span>
                            </button>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}

                    {(pkg.items || []).length === 0 && <div className="notification is-light my-2 py-2 px-4 is-size-7">
                      You can specify content items.
                    </div>}

                    <div className="is-flex is-justify-content-space-between mt-4">
                      <CommodityStateContext.Consumer>{({ editCommodity }) => (
                        <button type="button" className="button is-small is-info is-inverted p-2"
                          disabled={query.isFetching}
                          onClick={() => editCommodity({
                            onSubmit: _ => mutation.addItems(pkg_index, pkg.id)([_] as any)
                          })}>
                          <span className="icon is-small">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span>Add item</span>
                        </button>
                      )}</CommodityStateContext.Consumer>
                      {ORDERS_MANAGEMENT && <LineItemSelector
                        title='Add order items'
                        shipment={shipment}
                        onChange={_ => mutation.addItems(pkg_index, pkg.id)(_ as any)}
                      />}
                    </div>
                  </div>
                </React.Fragment>
              ))}

              {(shipment.parcels || []).length === 0 && <div className="m-4 notification is-default">
                Add one or more packages to create a shipment.
              </div>}

            </div>

            {/* Shipping options section */}
            <div className="card px-0 py-3 mt-5">

              <header className="px-3 is-flex is-justify-content-space-between">
                <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">OPTIONS</span>
              </header>

              <hr className='my-1' style={{ height: '1px' }} />

              <div className="p-3 pb-0">

                {/* shipment date */}
                <InputField name="shipment_date"
                  label="shipment date"
                  type="date"
                  className="is-small"
                  fieldClass="column mb-0 is-4 p-0 mb-2"
                  defaultValue={shipment.options?.shipment_date}
                  onChange={e => onChange({ options: { ...shipment.options, shipment_date: e.target.value } })}
                />


                {/* currency */}
                <SelectField name="currency"
                  label="shipment currency"
                  className="is-small is-fullwidth"
                  fieldClass="column is-4 mb-0 px-0 py-2"
                  value={shipment.options?.currency}
                  required={!isNone(shipment.options?.insurance) || !isNone(shipment.options?.cash_on_delivery) || !isNone(shipment.options?.declared_value)}
                  onChange={e => onChange({ options: { ...shipment.options, currency: e.target.value } })}
                >
                  <option value="">Select a currency</option>
                  {CURRENCY_OPTIONS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                </SelectField>


                {/* signature confirmation */}
                <CheckBoxField name="signature_confirmation"
                  fieldClass="column mb-0 is-12 px-0 py-2"
                  defaultChecked={shipment.options?.signature_confirmation}
                  onChange={e => onChange({ options: { ...shipment.options, signature_confirmation: e.target.checked } })}
                >
                  <span>Add signature confirmation</span>
                </CheckBoxField>


                {/* insurance */}
                <CheckBoxField name="addInsurance"
                  fieldClass="column mb-0 is-12 px-0 py-2"
                  defaultChecked={!isNone(shipment.options?.insurance)}
                  onChange={e => onChange({ options: { ...shipment.options, insurance: e.target.checked === true ? "" : null } })}
                >
                  <span>Add insurance coverage</span>
                </CheckBoxField>

                <div className="column is-multiline mb-0 ml-4 my-1 px-2 py-0" style={{
                  borderLeft: "solid 1px #ddd",
                  display: `${isNone(shipment.options?.insurance) ? 'none' : 'block'}`
                }}>

                  <InputField name="insurance"
                    label="Coverage value"
                    type="number"
                    min={0}
                    step="any"
                    className="is-small"
                    fieldClass="column mb-0 is-4 px-1 py-0"
                    controlClass="has-icons-left has-icons-right"
                    defaultValue={shipment.options?.insurance}
                    required={!isNone(shipment.options?.insurance)}
                    onChange={e => onChange({ options: { ...shipment.options, insurance: parseFloat(e.target.value) } })}
                  >
                    <span className="icon is-small is-left">
                      <i className="fas fa-dollar-sign"></i>
                    </span>
                    <span className="icon is-small is-right">{shipment.options?.currency}</span>
                  </InputField>

                </div>


                {/* Cash on delivery */}
                <CheckBoxField name="addCOD"
                  fieldClass="column mb-0 is-12 px-0 py-2"
                  defaultChecked={!isNone(shipment.options?.cash_on_delivery)}
                  onChange={e => onChange({ options: { ...shipment.options, cash_on_delivery: e.target.checked === true ? "" : null } })}
                >
                  <span>Collect on delivery</span>
                </CheckBoxField>

                <div className="column is-multiline mb-0 ml-4 my-1 px-2 py-0" style={{
                  borderLeft: "solid 1px #ddd",
                  display: `${isNone(shipment.options?.cash_on_delivery) ? 'none' : 'block'}`
                }}>

                  <InputField name="cash_on_delivery"
                    label="Amount to collect"
                    type="number" min={0} step="any"
                    className="is-small"
                    controlClass="has-icons-left has-icons-right"
                    fieldClass="column mb-0 is-4 px-1 py-2"
                    defaultValue={shipment.options?.cash_on_delivery}
                    required={!isNone(shipment.options?.cash_on_delivery)}
                    onChange={e => onChange({ options: { ...shipment.options, cash_on_delivery: parseFloat(e.target.value) } })}
                  >
                    <span className="icon is-small is-left">
                      <i className="fas fa-dollar-sign"></i>
                    </span>
                    <span className="icon is-small is-right">{shipment.options?.currency}</span>
                  </InputField>

                </div>


                {/* Declared value */}
                <CheckBoxField name="addCOD"
                  fieldClass="column mb-0 is-12 px-0 py-2"
                  defaultChecked={!isNone(shipment.options?.declared_value)}
                  onChange={e => onChange({ options: { ...shipment.options, declared_value: e.target.checked === true ? "" : null } })}
                >
                  <span>Add package value</span>
                </CheckBoxField>

                <div className="column is-multiline mb-0 ml-4 my-1 px-2 py-0" style={{
                  borderLeft: "solid 1px #ddd",
                  display: `${isNone(shipment.options?.declared_value) ? 'none' : 'block'}`
                }}>

                  <InputField name="declared_value"
                    label="Package value"
                    type="number" min={0} step="any"
                    className="is-small"
                    controlClass="has-icons-left has-icons-right"
                    fieldClass="column mb-0 is-4 px-1 py-2"
                    value={shipment.options?.declared_value}
                    required={!isNone(shipment.options?.declared_value)}
                    onChange={e => onChange({ options: { ...shipment.options, declared_value: parseFloat(e.target.value) } })}
                  >
                    <span className="icon is-small is-left">
                      <i className="fas fa-dollar-sign"></i>
                    </span>
                    <span className="icon is-small is-right">{shipment.options?.currency}</span>
                  </InputField>

                </div>

              </div>

              <hr className='my-1' style={{ height: '1px' }} />

              <div className="p-3">

                <InputField label="Reference"
                  name="reference"
                  defaultValue={shipment.reference as string}
                  onChange={e => mutation.updateShipment({ reference: e.target.value })}
                  placeholder="shipment reference"
                  className="is-small"
                  autoComplete="off"
                />

              </div>

              <hr className='my-1' style={{ height: '1px' }} />

              <div className="p-3">
                <label className="label is-capitalized" style={{ fontSize: '0.8em' }}>Shipment Paid By</label>

                <div className="control">

                  <label className="radio">
                    <input
                      className="mr-1"
                      type="radio"
                      name="paid_by"
                      defaultChecked={shipment.payment?.paid_by === PaidByEnum.sender}
                      onChange={() => mutation.updateShipment({ payment: { paid_by: PaidByEnum.sender } } as any)}
                    />
                    <span className="is-size-7 has-text-weight-bold">{formatRef(PaidByEnum.sender.toString())}</span>
                  </label>
                  <label className="radio">
                    <input
                      className="mr-1"
                      type="radio"
                      name="paid_by"
                      defaultChecked={shipment.payment?.paid_by === PaidByEnum.recipient}
                      onChange={() => mutation.updateShipment({ payment: { ...shipment.payment, paid_by: PaidByEnum.recipient } })}
                    />
                    <span className="is-size-7 has-text-weight-bold">{formatRef(PaidByEnum.recipient.toString())}</span>
                  </label>
                  <label className="radio">
                    <input
                      className="mr-1"
                      type="radio"
                      name="paid_by"
                      defaultChecked={shipment.payment?.paid_by === PaidByEnum.third_party}
                      onChange={() => mutation.updateShipment({ payment: { ...shipment.payment, paid_by: PaidByEnum.third_party } })}
                    />
                    <span className="is-size-7 has-text-weight-bold">{formatRef(PaidByEnum.third_party.toString())}</span>
                  </label>

                </div>

                {(shipment.payment?.paid_by && shipment.payment?.paid_by !== PaidByEnum.sender) &&
                  <div className="columns ml-3 my-1 px-2 py-0" style={{ borderLeft: "solid 2px #ddd" }}>
                    <InputField
                      label="account number"
                      className="is-small"
                      fieldClass="column"
                      defaultValue={shipment?.payment?.account_number as string}
                      onChange={e => mutation.updateShipment({ payment: { ...shipment.payment, account_number: e.target.value } })}
                    />
                  </div>}

              </div>

              {/* Billing address section */}
              {(orders.data?.orders.edges || [{}])[0].node?.billing_address && <>
                <hr className='my-1' style={{ height: '1px' }} />

                <div className="p-3">
                  <label className="label is-capitalized" style={{ fontSize: '0.8em' }}>Billing address</label>

                  <AddressDescription address={(orders.data?.orders.edges || [{}])[0].node!.billing_address as any} />

                </div>
              </>}

            </div>

            {/* Customs declaration section */}
            {isInternational(shipment) && <div className="card px-0 py-3 mt-5">

              <header className="px-3 is-flex is-justify-content-space-between">
                <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">CUSTOMS DECLARATION</span>
                <div className="is-vcentered">
                  <CustomsModalEditor
                    header='Edit customs info'
                    shipment={shipment}
                    customs={shipment?.customs as any || {
                      ...DEFAULT_CUSTOMS_CONTENT,
                      incoterm: shipment.payment?.paid_by == PaidByEnum.sender ? 'DDP' : 'DDU',
                      duty: {
                        ...DEFAULT_CUSTOMS_CONTENT.duty,
                        currency: shipment.options?.currency,
                        paid_by: shipment.payment?.paid_by,
                        account_number: shipment.payment?.account_number
                      },
                      commodities: getShipmentCommodities(shipment)
                    }}
                    onSubmit={mutation.updateCustoms(shipment?.customs?.id)}
                    trigger={
                      <button className="button is-small is-info is-text is-inverted p-1" disabled={query.isFetching}>
                        Edit customs info
                      </button>
                    }
                  />
                </div>
              </header>

              <hr className='my-1' style={{ height: '1px' }} />

              <div className="p-3">

                {!isNone(shipment.customs) && <>
                  <CustomsInfoDescription customs={shipment.customs as CustomsType} />

                  {/* Commodities section */}
                  <span className="is-size-7 mt-4 has-text-weight-semibold">COMMODITIES</span>

                  {(shipment.customs!.commodities || []).map((commodity, index) => <React.Fragment key={index + "parcel-info"}>
                    <hr className="mt-1 mb-2" style={{ height: '1px' }} />
                    <CommodityDescription commodity={commodity} prefix={`${index + 1} - `} />
                  </React.Fragment>)}

                  {(shipment.customs!.commodities || []).length === 0 && <div className="notification is-warning is-light my-2 py-2 px-4 is-size-7">
                    You need to specify customs commodities.
                  </div>}
                </>}

                {isNone(shipment.customs) && <div className="notification is-warning is-light my-2 py-2 px-4 is-size-7">
                  Looks like you have an international shipment.
                  You may need to provide a customs declaration unless you are shipping documents only.
                </div>}

              </div>

            </div>}

          </div>

          <div className="p-2"></div>

          <div className="column is-5 px-0 pb-6 is-relative">
            <div style={{ position: 'sticky', top: '8.5%', right: 0, left: 0 }}>

              <div className="card px-0">

                <header className="px-3 py-2 is-flex is-justify-content-space-between">
                  <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">SHIPPING SERVICES</span>
                  <div className="is-vcentered">
                    <button className="button is-small is-info is-text is-inverted p-1"
                      onClick={() => mutation.fetchRates()}
                      disabled={requireInfoForRating(shipment)}>
                      Refresh rates
                    </button>
                  </div>
                </header>

                <hr className='my-1' style={{ height: '1px' }} />

                {/* Live rates section */}
                <div className="p-3">

                  {(query.isFetching && (shipment.rates || []).length === 0) && <Spinner className="my-1 p-1 has-text-centered" />}

                  {(query.isFetched && (shipment.rates || []).length === 0) && <div className="notification is-default p-2 is-size-7">
                    Provide all shipping details to retrieve shipping rates.
                  </div>}

                  {(query.isFetched && (shipment.rates || []).length > 0) &&
                    <div className="menu-list py-2 rates-list-box" style={{ maxHeight: '20em' }}>
                      {(shipment.rates || []).map(rate => (
                        <a key={rate.id} {...(rate.test_mode ? { title: "Test Mode" } : {})}
                          className={`columns card m-0 mb-1 is-vcentered p-1 ${rate.id === selected_rate?.id ? 'has-text-grey-dark has-background-grey-lighter' : 'has-text-grey'}`}
                          onClick={() => setSelectedRate(rate)}>

                          <CarrierImage carrier_name={(rate.meta as any)?.rate_provider || rate.carrier_name} width={30} height={30} />

                          <RateDescription rate={rate} />

                          {rate.test_mode && <div className="has-text-warning p-1">
                            <i className="fas fa-exclamation-circle"></i>
                          </div>}
                        </a>
                      ))}
                    </div>}

                </div>

                <hr className='my-1' style={{ height: '1px' }} />

                <div className="p-3 has-text-centered">

                  <div className="control">
                    <label className="radio">
                      <input
                        className="mr-1"
                        type="radio"
                        name="label_type"
                        defaultChecked={shipment.label_type === LabelTypeEnum.PDF}
                        onChange={() => onChange({ label_type: LabelTypeEnum.PDF })}
                      />
                      <span className="is-size-7 has-text-weight-bold">{LabelTypeEnum.PDF}</span>
                    </label>
                    <label className="radio">
                      <input
                        className="mr-1"
                        type="radio"
                        name="label_type"
                        defaultChecked={shipment.label_type === LabelTypeEnum.ZPL}
                        onChange={() => onChange({ label_type: LabelTypeEnum.ZPL })}
                      />
                      <span className="is-size-7 has-text-weight-bold">{LabelTypeEnum.ZPL}</span>
                    </label>
                  </div>

                </div>

                <ButtonField
                  onClick={() => mutation.buyLabel(selected_rate as any)}
                  fieldClass="has-text-centered p-3"
                  className={`is-success`}
                  disabled={(shipment.rates || []).filter(r => r.id === selected_rate?.id).length === 0 || query.isFetching}>
                  <span className="px-6">Buy shipping label</span>
                </ButtonField>

              </div>

              {/* Metadata section */}
              <div className="card px-0 mt-5">

                <div className="p-1 pb-4">
                  <MetadataEditor
                    object_type={MetadataObjectTypeEnum.shipment}
                    metadata={shipment.metadata}
                    onChange={(metadata) => onChange({ metadata })}
                  >
                    <MetadataEditorContext.Consumer>{({ isEditing, editMetadata }) => (<>

                      <header className="is-flex is-justify-content-space-between p-2">
                        <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">METADATA</span>
                        <div className="is-vcentered">
                          <button
                            type="button"
                            className="button is-small is-info is-text is-inverted p-1"
                            disabled={isEditing}
                            onClick={() => editMetadata()}>
                            <span>Edit metadata</span>
                          </button>
                        </div>
                      </header>

                    </>)}</MetadataEditorContext.Consumer>
                  </MetadataEditor>
                </div>

              </div>

            </div>
          </div>
        </div>}

      </>
    )
  };

  return AuthenticatedPage((
    <DashboardLayout showModeIndicator={true}>
      <GoogleGeocodingScript />
      <Head><title>Create label - {(pageProps as any).metadata?.APP_NAME}</title></Head>

      <ContextProviders>

        <Component />

      </ContextProviders>
    </DashboardLayout>
  ), pageProps);
}
