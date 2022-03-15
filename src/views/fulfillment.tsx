import { CommodityType, ShipmentType } from '@/lib/types';
import React, { useContext, useEffect, useState } from 'react';
import LabelDataProvider, { useLabelData, } from '@/context/label-data-provider';
import { DefaultTemplatesData } from '@/context/default-templates-provider';
import ModeIndicator from '@/components/mode-indicator';
import Spinner from '@/components/spinner';
import Head from 'next/head';
import DashboardLayout from '@/layouts/dashboard-layout';
import AuthenticatedPage from '@/layouts/authenticated-page';
import TemplatesProvider from '@/context/default-templates-provider';
import GoogleGeocodingScript from '@/components/google-geocoding-script';
import { LabelTypeEnum, MetadataObjectType } from '@purplship/graphql';
import OrdersProvider, { OrdersContext } from '@/context/orders-provider';
import AddressDescription from '@/components/descriptions/address-description';
import ParcelDescription from '@/components/descriptions/parcel-description';
import RateDescription from '@/components/descriptions/rate-description';
import { formatWeight, isNone, isNoneOrEmpty, useLocation } from '@/lib/helper';
import LineItemSelector from '@/components/line-item-selector';
import InputField from '@/components/generic/input-field';
import ButtonField from '@/components/generic/button-field';
import { AddressModalEditor, CustomsModalEditor, ParcelModalEditor } from '@/components/form-parts/form-modals';
import ModalProvider from '@/components/generic/modal';
import { DEFAULT_PARCEL_CONTENT } from '@/components/form-parts/parcel-form';
import LabelMutationProvider, { useLabelMutation } from '@/context/label-data-mutation';
import ShipmentMutationProvider from '@/context/shipment-mutation';
import { useLoader } from '@/components/loader';
import MetadataEditor, { MetadataEditorContext } from '@/components/metadata-editor';
import CustomsInfoDescription from '@/components/descriptions/customs-info-description';

export { getServerSideProps } from "@/lib/middleware";

const CONTEXT_PROVIDERS: React.FC<any>[] = [
  TemplatesProvider,
  LabelMutationProvider,
  ShipmentMutationProvider,
  LabelDataProvider,
  ModalProvider,
];


const ContextProviders: React.FC = ({ children, ...props }) => {
  const NestedContexts = CONTEXT_PROVIDERS.reduce((_, Ctx) => <Ctx {...props}>{_}</Ctx>, children);

  return (
    <>
      <OrdersProvider setVariablesToURL={false}>{NestedContexts}</OrdersProvider>
    </>
  );
};

export default function FulfillmentPage(pageProps: any) {
  const Component: React.FC = () => {
    const mutation = useLabelMutation();
    const orders = useContext(OrdersContext);
    const loader = useLoader();
    const { addUrlParam, ...router } = useLocation();
    const { shipment, called, ...label } = useLabelData();
    const { default_address, default_parcel, ...template } = useContext(DefaultTemplatesData);
    const { shipment_id = 'new', order_id = "" } = router.query as { shipment_id: string, order_id: string };
    const [ready, setReady] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [key, setKey] = useState<string>(`${shipment_id}-${Date.now()}`);
    const [selected_rate, setSelectedRate] = useState<ShipmentType['rates'][0] | undefined>(
      shipment?.selected_rate_id ? { id: shipment?.selected_rate_id } as any : undefined
    );

    const requireInfoForRating = (shipment: ShipmentType) => {
      return (
        shipment.recipient.address_line1 === undefined ||
        shipment.shipper.address_line1 === undefined ||
        shipment.parcels.length === 0 ||
        loading === true
      );
    };
    const isInternational = (shipment: ShipmentType) => {
      return (
        shipment.recipient.country_code !== undefined &&
        shipment.shipper.country_code !== undefined &&
        shipment.recipient.country_code !== shipment.shipper.country_code
      );
    };
    const getParent = (id: string | null) => {
      return orders.orders
        .map(({ line_items }) => line_items).flat()
        .find((item) => item.id === id);
    };
    const getOrder = (item_id?: string | null) => {
      return orders.orders
        .find((order) => order.line_items.find((item) => item.id === item_id));
    };
    const getAvailableQuantity = (shipment: ShipmentType, item: CommodityType, item_index: number) => {
      const parent_quantity = getParent(item.parent_id)?.quantity || 0;
      const packed_quantity = shipment.parcels
        .map(({ items }) => items || []).flat()
        .filter((_, index) => index !== item_index)
        .reduce((acc, { parent_id, quantity }) => {
          return (parent_id === item.parent_id) ? acc + (quantity as number) : 0;
        }, 0);

      return parent_quantity - packed_quantity;
    };
    const setInitialData = () => {
      const { id: _, ...recipient } = orders.orders[0]?.shipping_to || {};
      const { id: __, ...shipper } = (orders.orders[0] as any)?.shipping_from || default_address || {};
      const items = orders.orders
        .map(({ line_items }) => line_items).flat()
        .map(({ id: parent_id, ...item }) => ({ ...item, parent_id }));
      const parcel = { ...(default_parcel || DEFAULT_PARCEL_CONTENT), items };
      const order_ids = orders.orders.map(({ order_id }) => order_id).join(',');

      onChange({
        ...(shipper ? { shipper: (shipper as typeof shipment['shipper']) } : {}),
        ...(recipient ? { recipient: (recipient as typeof shipment['recipient']) } : {}),
        ...(parcel ? { parcels: ([parcel] as typeof shipment['parcels']) } : {}),
        reference: `Order #${order_ids}`,
        label_type: LabelTypeEnum.PDF,
        metadata: { order_ids },
      });
    };
    const onChange = async (changes: Partial<ShipmentType>) => {
      if (changes === undefined) { return; }
      await mutation.updateShipment({ id: shipment_id, ...changes });
      setKey(`${shipment_id}-${Date.now()}`);
    };

    useEffect(() => {
      if (!called && !loading && label.loadShipment) { label.loadShipment(shipment_id); }
    }, []);
    useEffect(() => {
      if (!template.called && !template.loading && template.load) template.load();
    }, []);
    useEffect(() => {
      if (!orders.called && !orders.loading && orders.load) orders.load({
        first: 20,
        status: ['unfulfilled', 'partial'],
        ...(order_id ? { id: order_id.split(',').map(s => s.trim()) } : {})
      });
    }, []);
    useEffect(() => {
      setLoading(label.loading || loader.loading);
    }, [label.loading, loader.loading]);
    useEffect(() => {
      if (
        !ready && called &&
        template.called &&
        orders.called &&
        shipment_id === 'new' &&
        orders.orders.length > 0
      ) {
        setInitialData();
        setReady(true);
      }
    }, [orders.orders, template.called, orders.called, called]);
    useEffect(() => {
      if (router.query.shipment_id === 'new' && isNone(shipment.rates) && !requireInfoForRating(shipment)) {
        mutation.fetchRates();
      }
    }, [shipment]);

    return (
      <>
        <ModeIndicator />

        <header className="px-0 py-3 is-flex is-justify-content-space-between">
          <span className="title is-4">
            Fulfill order{(orders.orders || []).length > 1 ? `s` : ""}
          </span>
        </header>

        {!ready && <Spinner />}

        {(ready && Object.keys(shipment.recipient).length > 0) && <div className="columns pb-6 m-0">
          <div className="column px-0" style={{ minHeight: '850px' }}>

            {/* Header section */}
            <div className="card px-0 py-3">

              <div className="p-3">
                <span className="has-text-weight-bold is-size-6">
                  {(orders.orders || []).length > 1 ? `Multiple Orders` : `Order #${orders.orders[0].order_id}`}
                </span>
              </div>

              <hr className='my-1' style={{ height: '1px' }} />

              <div className="p-3">

                <header className="is-flex is-justify-content-space-between">
                  <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">SHIPPING ADDRESS</span>
                  <div className="is-vcentered">
                    <AddressModalEditor
                      shipment={shipment}
                      address={shipment.recipient}
                      onSubmit={(address) => onChange({ recipient: address })}
                      trigger={
                        <button className="button is-small is-info is-text is-inverted p-1" disabled={loading}>
                          Edit shipping address
                        </button>
                      }
                    />
                  </div>
                </header>

                <AddressDescription address={shipment.recipient} />

              </div>

            </div>

            {/* Parcel & Items section */}
            <div className="card px-0 py-3 mt-4">

              <header className="px-3 is-flex is-justify-content-space-between">
                <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">PACKAGES AND ITEMS</span>
                <div className="is-vcentered">
                  <ParcelModalEditor
                    header='Add package'
                    shipment={shipment}
                    onSubmit={mutation.addParcel}
                    trigger={
                      <button className="button is-small is-info is-text is-inverted p-1" disabled={loading}>
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
                            <button type="button" className="button is-small is-white" disabled={loading}>
                              <span className="icon is-small"><i className="fas fa-pen"></i></span>
                            </button>
                          }
                        />
                        <button type="button" className="button is-small is-white"
                          disabled={loading || shipment.parcels.length === 1}
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
                              <span className='has-text-info'>{` ORDER: ${getOrder(item.parent_id)?.order_id}`}</span>
                              {isNoneOrEmpty(item.sku) ? ' | SKU: 0000000' : ` | SKU: ${item.sku}`}
                              {isNoneOrEmpty(item.quantity) && ` | ORDER QTY: ${item.quantity}`}
                            </p>
                            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                            </p>
                          </div>
                          <div className="is-flex">
                            <div className="is-size-7 has-text-grey has-text-weight-semibold is-flex px-2">
                              <span className='p-2'>{formatWeight(item)}</span>
                              <div className="field has-addons">
                                <p className="control is-expanded">
                                  <input
                                    min={1}
                                    type="number"
                                    defaultValue={item.quantity as number}
                                    max={getAvailableQuantity(shipment, item, item_index)}
                                    onChange={e => {
                                      mutation.updateItem(pkg_index, item_index, pkg.id, item.id)({
                                        quantity: parseInt(e.target.value)
                                      } as CommodityType)
                                    }}
                                    className="input is-small"
                                    style={{ width: '60px', textAlign: 'center' }}
                                  />
                                </p>
                                <p className="control">
                                  <a className="button is-static is-small">
                                    of {getParent(item.parent_id)?.quantity}
                                  </a>
                                </p>
                              </div>
                            </div>
                            <button type="button" className="button is-small is-white"
                              onClick={mutation.removeItem(pkg_index, item_index, item.id)}
                              disabled={pkg.items.length === 1}>
                              <span className="icon is-small"><i className="fas fa-times"></i></span>
                            </button>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}

                    {(pkg.items || []).length === 0 && <div className="notification is-warning is-light my-2 py-2 px-4 is-size-7">
                      You must add at least one item to this package.
                    </div>}

                    <div className="mt-4">
                      <LineItemSelector
                        title='Edit items'
                        shipment={shipment}
                        onChange={_ => mutation.addItems(pkg_index, pkg.id)(_ as any)}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}

              {(shipment.parcels || []).length === 0 && <div className="m-4 notification is-default">
                Add one or more packages to create a shipment.
              </div>}

            </div>

            {/* Customs section */}
            {isInternational(shipment) && <div className="card px-0 py-3 mt-4">

              <header className="px-3 is-flex is-justify-content-space-between">
                <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">CUSTOMS DECLARATION</span>
                <div className="is-vcentered">
                  <CustomsModalEditor
                    header='Edit customs info'
                    shipment={shipment}
                    customs={shipment?.customs}
                    onSubmit={mutation.updateCustoms(shipment?.customs?.id)}
                    trigger={
                      <button className="button is-small is-info is-text is-inverted p-1" disabled={loading}>
                        Edit customs info
                      </button>
                    }
                  />
                </div>
              </header>

              <hr className='my-1' style={{ height: '1px' }} />

              <div className="p-3">

                {!isNone(shipment.customs) && <CustomsInfoDescription customs={shipment.customs} />}


                {isNone(shipment.customs) && <div className="notification is-warning is-light my-2 py-2 px-4 is-size-7">
                  Looks like you have an international shipment.
                  You need to add customs information to ensure safe delivery.
                </div>}


              </div>

            </div>}

            {/* Live rates section */}
            <div className="card px-0 py-3 mt-4">

              <header className="px-3 is-flex is-justify-content-space-between">
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

              <div className="p-3">

                {(shipment.rates || []).length === 0 && <div className="notification is-default">
                  Provide all shipping details to retrieve shipping rates.
                </div>}

                {(shipment.rates || []).length > 0 && <div className="menu-list py-2 rates-list-box" style={{ maxHeight: '20em' }}>
                  {(shipment.rates || []).map(rate => (
                    <a key={rate.id} {...(rate.test_mode ? { title: "Test Mode" } : {})}
                      className={`columns m-0 p-1 ${rate.id === selected_rate?.id ? 'has-text-grey-dark has-background-grey-lighter' : 'has-text-grey'}`}
                      onClick={() => setSelectedRate(rate)}>

                      <span className={`icon is-medium ${rate.id === selected_rate?.id ? 'has-text-success' : ''}`}>
                        {(rate.id === selected_rate?.id) ? <i className="fas fa-check-square"></i> : <i className="fas fa-square"></i>}
                      </span>

                      <RateDescription rate={rate} />

                      {rate.test_mode && <div className="has-text-warning p-1">
                        <i className="fas fa-exclamation-circle"></i>
                      </div>}
                    </a>
                  ))}
                </div>}

              </div>

            </div>

          </div>

          <div className="p-2"></div>

          <div className="column is-5 px-0 pb-6 is-relative">
            <div style={{ position: 'sticky', top: '8.5%', right: 0, left: 0 }}>

              {/* Metadata section */}
              <div className="card px-0">

                <header className="p-3">
                  <span className="has-text-weight-bold is-size-6">Shipping</span>
                </header>

                <div className="p-3">

                  <InputField label="Reference"
                    name="reference"
                    defaultValue={shipment.reference as string}
                    onChange={e => label.updateShipment({ reference: e.target.value })}
                    placeholder="shipment reference"
                    className="is-small"
                    autoComplete="off"
                  />

                </div>

                <hr className='my-1' style={{ height: '1px' }} />

                <div className="p-3">

                  <header className="is-flex is-justify-content-space-between">
                    <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">SHIPPING FROM</span>
                    <div className="is-vcentered">
                      <AddressModalEditor
                        shipment={shipment}
                        address={shipment.shipper}
                        onSubmit={(address) => onChange({ shipper: address })}
                        trigger={
                          <button className="button is-small is-info is-text is-inverted p-1" disabled={loading}>
                            Edit origin address
                          </button>
                        }
                      />
                    </div>
                  </header>

                  <AddressDescription address={shipment.shipper} />

                  {Object.values(shipment.shipper || {}).length === 0 &&
                    <div className="notification is-warning is-light my-2 py-2 px-4">
                      Please specify the origin address.
                    </div>}

                </div>

                <hr className='my-1' style={{ height: '1px' }} />

                <div className="p-3 pb-0">

                  <header className="is-flex is-justify-content-space-between">
                    <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">SHIPPING DATE</span>
                  </header>

                  <InputField
                    name="shipment_date"
                    type="date"
                    className="is-small"
                    fieldClass="column mb-0 is-5 p-0"
                    defaultValue={shipment.options?.shipment_date}
                    onChange={e => onChange({ options: { ...shipment.options, shipment_date: e.target.value } })}
                  />

                </div>

                <div className="p-3">

                  <header className="is-flex is-justify-content-space-between">
                    <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">LABEL TYPE</span>
                  </header>

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

                <hr className='my-1' style={{ height: '1px' }} />

                <ButtonField
                  onClick={() => mutation.buyLabel(selected_rate as any)}
                  fieldClass="has-text-centered mt-3 p-3"
                  className={`is-success`}
                  disabled={(shipment.rates || []).filter(r => r.id === selected_rate?.id).length === 0 || loading}>
                  <span className="px-6">Buy shipping label</span>
                </ButtonField>

              </div>

              {/* Metadata section */}
              <div className="card px-0 mt-4">

                <div className="p-1 pb-4">
                  <MetadataEditor
                    object_type={MetadataObjectType.shipment}
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
    <DashboardLayout>
      <GoogleGeocodingScript />
      <Head><title>Fulfillment - {(pageProps as any).metadata?.APP_NAME}</title></Head>

      <ContextProviders>

        <Component />

      </ContextProviders>
    </DashboardLayout>
  ), pageProps);
}
