import { NotificationType, ShipmentType } from '@/lib/types';
import React, { useContext, useEffect, useState } from 'react';
import CustomsInfoForm from '@/components/form-parts/customs-info-form';
import AddressForm from '@/components/form-parts/address-form';
import ShipmentOptions from '@/components/form-parts/shipment-options';
import LiveRates from '@/components/live-rates';
import Tabs, { TabStateContext, TabStateProvider } from '@/components/generic/tabs';
import { isNone } from '@/lib/helper';
import ShipmentProvider, { LabelData, } from '@/context/shipment-provider';
import { DefaultTemplatesData } from '@/context/default-templates-provider';
import { Notify } from '@/components/notifier';
import { AppMode } from '@/context/app-mode-provider';
import ModeIndicator from '@/components/mode-indicator';
import Spinner from '@/components/spinner';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import DashboardLayout from '@/layouts/dashboard-layout';
import AuthenticatedPage from '@/layouts/authenticated-page';
import AppLink from '@/components/app-link';
import TemplatesProvider from '@/context/default-templates-provider';
import GoogleGeocodingScript from '@/components/google-geocoding-script';
import ParcelTemplatesProvider from '@/context/parcel-templates-provider';
import AddressTemplatesProvider from '@/context/address-templates-provider';
import ShipmentMutationProvider, { ShipmentMutationContext } from '@/context/shipment-mutation';
import ShipmentParcelsEditor from '@/components/shipment-parcels-editor';
import { PartialShipmentUpdateInput, ShipmentStatus } from '@purplship/graphql';

export { getServerSideProps } from "@/lib/middleware";

type ChangeContext = {
  selectTab?: (tab: string, disabled?: string[] | undefined) => void;
  tab?: string;
};

export default function LabelPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { notify } = useContext(Notify);
    const { basePath } = useContext(AppMode);
    const mutation = useContext(ShipmentMutationContext);
    const { shipment, called, loading, loadShipment, updateShipment } = useContext(LabelData);
    const { default_address, default_parcel, ...template } = useContext(DefaultTemplatesData);
    const tabs = ["shipper", "recipient", "parcels", "customs info", "options"];
    const [ready, setReady] = useState<boolean>(false);
    const [ckey, setKey] = useState<string>(`${id}-${Date.now()}`);

    const onChange = async (changes: Partial<ShipmentType>, { tab, selectTab }: ChangeContext | undefined = {}) => {
      if (changes === undefined) { return; }
      let isDraft = id === 'new';

      if (isDraft) {
        const update = updateShipment(changes);
        const disabledTabs = filterDisabled(tabs, update);
        const currentIndex = tabs.indexOf(tab || "");
        const nextTab = tabs.reduce((next, curr, index) => {
          if (index > currentIndex && !disabledTabs.includes(curr)) {
            return next !== tab ? next : curr;
          }
          return next
        }, tab || "");
        if (nextTab !== "" && selectTab) {
          setTimeout(() => selectTab(nextTab as string, disabledTabs), 800);
        }
      } else {
        await mutation.updateShipment({ id, ...changes } as PartialShipmentUpdateInput);
      }

      if (
        !isDraft &&
        // check if shipment related object being updated already exists
        Object.values(changes).filter(
          (change: any | any[]) => Array.isArray(change) ? change.some(item => !isNone(item.id)) : !isNone(change.id)
        ).length === Object.values(changes).length
      ) {
        // trigger components to re-render
        setKey(`${id}-${Date.now()}`);
      }
    };

    useEffect(() => {
      if (!called && !loading && loadShipment) { loadShipment(id as string); }
    }, []);
    useEffect(() => {
      if (shipment.status === ShipmentStatus.created) {
        notify({ type: NotificationType.info, message: 'Label already purchased! redirecting...' });
        setTimeout(() => router.push(basePath), 1000);
      }
    }, [shipment]);
    useEffect(() => {
      if (!template.called && !template.loading && template.load) template.load();
    }, []);
    useEffect(() => {
      if (!ready && called && template.called) setReady(true);
    }, [template.called, called]);

    return (
      <>
        <ModeIndicator />
        <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
          <ul>
            <li><AppLink href="/">Shipments</AppLink></li>
            <li className="is-active"><a href="#" aria-current="page">Create Label</a></li>
          </ul>
        </nav>

        {ready && <div className="columns px-2 pb-6">
          <div className="column is-7 px-0" style={{ minHeight: '850px' }}>

            <div className="card px-3 py-3" style={{ overflow: 'visible' }}>
              <TabStateProvider tabs={tabs} disabledTabs={filterDisabled(tabs, shipment)}>
                <TabStateContext.Consumer>{({ selectTab }) => <>
                  <Tabs style={{ overflowY: 'auto', minHeight: '100%', maxHeight: '75vh' }}>

                    <AddressForm
                      key={`${ckey}-shipper`}
                      value={shipment.shipper}
                      default_value={default_address as any}
                      shipment={shipment}
                      onSubmit={(shipper: any) => onChange({ shipper }, { tab: 'shipper', selectTab })}
                      name="shipper" />

                    <AddressForm
                      key={`${ckey}-recipient`}
                      value={shipment.recipient}
                      shipment={shipment}
                      onSubmit={(recipient: any) => onChange({ recipient }, { tab: 'recipient', selectTab })}
                      name="recipient" />

                    <ShipmentParcelsEditor
                      key={`${ckey}-parcels`}
                      defaultValue={shipment.parcels}
                      onSubmit={(parcels: any) => onChange({ parcels }, { tab: 'parcels', selectTab })}
                    />

                    <CustomsInfoForm
                      key={`${ckey}-customs`}
                      value={shipment.customs}
                      shipment={shipment}
                      onSubmit={(customs: any) => onChange({ customs }, { tab: 'customs info', selectTab })} />

                    <ShipmentOptions
                      key={`${ckey}-options`}
                      shipment={shipment}
                      onSubmit={changes => onChange(changes)} />

                  </Tabs>
                </>}</TabStateContext.Consumer>
              </TabStateProvider>
            </div>

          </div>
          <div className="column is-5 pb-6">

            <div className="card px-3 py-3">
              <LiveRates key={ckey} />
            </div>

          </div>
        </div>}

        {!ready && <Spinner />}

      </>
    )
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <GoogleGeocodingScript />
      <Head><title>Buy Label - {(pageProps as any).references?.app_name}</title></Head>
      <ShipmentProvider>
        <TemplatesProvider>
          <ParcelTemplatesProvider>
            <AddressTemplatesProvider>
              <ShipmentMutationProvider>

                <Component />

              </ShipmentMutationProvider>
            </AddressTemplatesProvider>
          </ParcelTemplatesProvider>
        </TemplatesProvider>
      </ShipmentProvider>
    </DashboardLayout>
  ), pageProps);
}

function filterDisabled(tabs: string[], shipment: ShipmentType) {
  return tabs.reduce((disabled: string[], value: string) => {
    const is_local = shipment?.shipper?.country_code === shipment?.recipient.country_code;

    // Disable tab if >>>
    if (
      // is 'recipient' AND 'shipment.shipper' hasn't been defined yet
      (value === "recipient" && shipment.shipper.address_line1 === undefined)

      || // OR

      // is 'parcel' AND 'shipment.recipient' hasn't been defined yet
      (value === "parcels" && shipment.recipient.address_line1 === undefined)

      || // OR

      // is 'customs info' AND local shipment
      (value === "customs info" && is_local)

      || // OR

      // is 'customs info' AND 'shipment.parcels' is empty
      (value === "customs info" && shipment.parcels.length == 0)

      || // OR

      // is 'options' AND 'shipment.parcels' is empty
      (value === "options" && shipment.parcels.length == 0)
    ) {
      return disabled.concat(value);
    }

    return disabled;
  }, []);
};
