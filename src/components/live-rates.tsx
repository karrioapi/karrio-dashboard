import { formatRef, isNone } from '@/lib/helper';
import { useRouter } from 'next/dist/client/router';
import { APIError, NotificationType, RequestError } from '@/lib/types';
import { Customs, Payment, PaymentCurrencyEnum, PaymentPaidByEnum, Shipment, ShipmentLabelTypeEnum } from '@/purplship/rest/index';
import React, { useContext, useState } from 'react';
import AddressDescription from '@/components/descriptions/address-description';
import CustomsInfoDescription from '@/components/descriptions/customs-info-description';
import OptionsDescription from '@/components/descriptions/options-description';
import ParcelDescription from '@/components/descriptions/parcel-description';
import ButtonField from '@/components/generic/button-field';
import InputField from '@/components/generic/input-field';
import { ShipmentMutationContext } from '@/context/shipment-mutation';
import { LabelData } from '@/context/shipment-provider';
import { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';
import { AppMode } from '@/context/app-mode-provider';
import RateDescription from '@/components/descriptions/rate-description';
import MessagesDescription from '@/components/descriptions/messages-description';

interface LiveRatesComponent {
  update: (payload: {}, refresh?: boolean) => void;
}

const DEFAULT_PAYMENT: Partial<Payment> = { paid_by: PaymentPaidByEnum.Sender };

const LiveRates: React.FC<LiveRatesComponent> = ({ update }) => {
  const router = useRouter();
  const { notify } = useContext(Notify);
  const { basePath } = useContext(AppMode);
  const { shipment } = useContext(LabelData);
  const { loading, setLoading } = useContext(Loading);
  const { fetchRates, buyLabel } = useContext(ShipmentMutationContext);
  const [selected_rate_id, setSelectedRate] = useState<string | undefined>(shipment?.selected_rate_id || undefined);
  const [label_type, setLabelType] = useState<ShipmentLabelTypeEnum>(shipment?.label_type || ShipmentLabelTypeEnum.Pdf);
  const [payment, setPayment] = useState<Partial<Payment>>(DEFAULT_PAYMENT);
  const [reference, setReference] = useState(shipment?.reference);
  const [showMessage, setShowMessage] = useState(false);

  const computeDisabled = (shipment: Shipment) => {
    return (
      shipment.recipient.address_line1 === undefined ||
      shipment.shipper.address_line1 === undefined ||
      shipment.parcels.length === 0 ||
      loading === true
    );
  };
  const updateRates = async () => {
    if (computeDisabled(shipment)) return;
    try {
      setLoading(true);
      let payload = { ...shipment, reference };
      const response = await fetchRates(payload);
      if (payload.id === undefined) router.push('' + response.id);
      update(response, true);
      if ((response.messages || []).length > 0) {
        const error: APIError = {
          error: {
            code: "notes",
            details: { messages: response.messages } as APIError['error']['details']
          }
        };
        const message = new RequestError(error);

        notify({ type: NotificationType.warning, message });
      }
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    } finally {
      setLoading(false);
    }
  };
  const buyShipment = async () => {
    try {
      setLoading(true);
      let currency = (shipment.options || {} as any).currency || PaymentCurrencyEnum.Cad;
      await buyLabel({
        ...shipment,
        reference,
        label_type,
        selected_rate_id,
        payment: { ...payment, currency }
      });
      update(shipment as Shipment);
      notify({ type: NotificationType.success, message: 'Label successfully purchased!' });
      router.push(basePath);
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="columns is-multiline">

        <div className="column is-12 pb-2">
          <span className="title is-5">Shipment Details</span>

          <button className={`button is-small is-outlined is-info is-pulled-right ${loading ? 'is-loading' : ''}`} onClick={updateRates} disabled={computeDisabled(shipment)}>
            <span>Fetch Rates</span>
          </button>
        </div>

        <div className="column is-12 py-2">

          <InputField
            label="reference"
            name="reference"
            defaultValue={shipment?.reference as string}
            onChange={e => setReference(e.target.value || null)}
            placeholder="shipment reference"
            className="is-small"
            autoComplete="off" />

        </div>

        <hr className="column p-0 mx-3 my-1" />

        <div className="column is-12 py-1" style={shipment.shipper.address_line1 === undefined ? { display: 'none' } : {}}>

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Shipper Address</p>
          <AddressDescription address={shipment.shipper} />

        </div>

        <div className="column is-12 py-1" style={{ display: `${shipment.recipient.address_line1 === undefined ? 'none' : 'block'}` }}>

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Recipient Address</p>
          <AddressDescription address={shipment.recipient} />

        </div>

        <div className="column is-12 py-1" style={{ display: `${shipment.parcels.length == 0 ? 'none' : 'block'}` }}>

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Parcel</p>
          <ParcelDescription parcel={shipment.parcels[0]} />

        </div>

        <div className="column is-12 py-1" style={{ display: `${Object.values(shipment.options as object).length === 0 ? 'none' : 'block'}` }}>

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Options</p>
          <OptionsDescription options={shipment.options} />

        </div>

        <div className="column is-12 py-1" style={{ display: `${isNone(shipment.customs) ? 'none' : 'block'}` }}>

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Customs Declaration</p>
          <CustomsInfoDescription customs={(shipment.customs || {}) as Customs} />

        </div>

        <div className="column is-12 py-4" style={{ display: `${(shipment.rates || []).length === 0 ? 'none' : 'block'}` }}>

          <h6 className="is-title is-size-6 mt-1 mb-4 has-text-weight-semibold">Live Rates</h6>

          <ul className="menu-list py-2 rates-list-box">
            {shipment.rates?.map(rate => (
              <li key={rate.id} {...(rate.test_mode ? { title: "Test Mode" } : {})}>
                <a className={`columns mb-1 ${rate.id === selected_rate_id ? 'has-text-grey-dark' : 'has-text-grey'}`} onClick={() => setSelectedRate(rate.id)}>

                  <span className={`icon is-medium ${rate.id === selected_rate_id ? 'has-text-success' : ''}`}>
                    {(rate.id === selected_rate_id) ? <i className="fas fa-check-square"></i> : <i className="fas fa-square"></i>}
                  </span>

                  <RateDescription rate={rate} />

                  {rate.test_mode && <div className="has-text-warning p-1">
                    <i className="fas fa-exclamation-circle"></i>
                  </div>}
                </a>
              </li>
            ))}
          </ul>

        </div>

        {(shipment.messages || []).length > 0 && <article className="column is-12 py-1 mb-1 panel is-white is-shadowless">
          <p className="panel-heading is-fullwidth px-0 pt-3" onClick={() => setShowMessage(!showMessage)}>
            <span className="is-title is-size-6 my-2 has-text-weight-semibold">Messages</span>
            <span className="icon is-small is-pulled-right pt-2">
              <i className={`fas ${showMessage ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </p>

          {showMessage && <div className="notification is-warning is-size-7">
            <MessagesDescription messages={shipment.messages} />
          </div>}
        </article>}

        <div className="column is-12 py-2" style={{ display: `${(shipment.rates || []).length === 0 ? 'none' : 'block'}` }}>

          <h6 className="is-title is-size-6 mt-1 mb-2 has-text-weight-semibold">Select your label type</h6>
          <div className="control">
            <label className="radio">
              <input className="mr-1" type="radio" name="label_type" defaultChecked={label_type === ShipmentLabelTypeEnum.Pdf} onChange={() => setLabelType(ShipmentLabelTypeEnum.Pdf)} />
              <span className="is-size-7 has-text-weight-bold">{ShipmentLabelTypeEnum.Pdf}</span>
            </label>
            <label className="radio">
              <input className="mr-1" type="radio" name="label_type" defaultChecked={label_type === ShipmentLabelTypeEnum.Zpl} onChange={() => setLabelType(ShipmentLabelTypeEnum.Zpl)} />
              <span className="is-size-7 has-text-weight-bold">{ShipmentLabelTypeEnum.Zpl}</span>
            </label>
          </div>

        </div>

        <div className="column is-12 py-2" style={{ display: `${(shipment.rates || []).length === 0 ? 'none' : 'block'}` }}>

          <h6 className="is-title is-size-6 mt-1 mb-2 has-text-weight-semibold">Shipment Paid By</h6>

          <div className="control">
            <label className="radio">
              <input className="mr-1" type="radio" name="paid_by" defaultChecked={payment.paid_by === PaymentPaidByEnum.Sender} onChange={() => setPayment({ paid_by: PaymentPaidByEnum.Sender })} />
              <span className="is-size-7 has-text-weight-bold">{formatRef(PaymentPaidByEnum.Sender.toString())}</span>
            </label>
            <label className="radio">
              <input className="mr-1" type="radio" name="paid_by" defaultChecked={payment.paid_by === PaymentPaidByEnum.Recipient} onChange={() => setPayment({ ...payment, paid_by: PaymentPaidByEnum.Recipient })} />
              <span className="is-size-7 has-text-weight-bold">{formatRef(PaymentPaidByEnum.Recipient.toString())}</span>
            </label>
            <label className="radio">
              <input className="mr-1" type="radio" name="paid_by" defaultChecked={payment.paid_by === PaymentPaidByEnum.ThirdParty} onChange={() => setPayment({ ...payment, paid_by: PaymentPaidByEnum.ThirdParty })} />
              <span className="is-size-7 has-text-weight-bold">{formatRef(PaymentPaidByEnum.ThirdParty.toString())}</span>
            </label>
          </div>

          {(payment.paid_by !== PaymentPaidByEnum.Sender) && <div className="columns ml-3 my-1 px-2 py-0" style={{ borderLeft: "solid 2px #ddd" }}>
            <InputField label="account number" defaultValue={payment?.account_number as string} onChange={e => setPayment({ ...payment, account_number: e.target.value })} fieldClass="column" />
          </div>}

        </div>

      </div>

      <ButtonField
        onClick={buyShipment}
        fieldClass="has-text-centered mt-3"
        className={`is-success ${loading ? 'is-loading' : ''}`}
        style={(shipment.rates || []).length === 0 ? { display: 'none' } : {}}
        disabled={(shipment.rates || []).filter(r => r.id === selected_rate_id).length === 0}>
        <span className="px-6">Buy</span>
      </ButtonField>

    </div>
  )
};

export default LiveRates;
