import { formatRef, isNone } from '@/lib/helper';
import { useRouter } from 'next/dist/client/router';
import { APIError, CustomsType, NotificationType, PaymentType, RequestError, ShipmentType } from '@/lib/types';
import React, { useContext, useEffect, useState } from 'react';
import AddressDescription from '@/components/descriptions/address-description';
import CustomsInfoDescription from '@/components/descriptions/customs-info-description';
import OptionsDescription from '@/components/descriptions/options-description';
import ParcelDescription from '@/components/descriptions/parcel-description';
import ButtonField from '@/components/generic/button-field';
import InputField from '@/components/generic/input-field';
import { ShipmentMutationContext } from '@/context/shipment-mutation';
import { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';
import { AppMode } from '@/context/app-mode-provider';
import RateDescription from '@/components/descriptions/rate-description';
import MessagesDescription from '@/components/descriptions/messages-description';
import { LabelTypeEnum, PaidByEnum } from '@purplship/graphql';

interface LiveRatesComponent {
  shipment: ShipmentType;
}

const DEFAULT_PAYMENT: Partial<PaymentType> = { paid_by: PaidByEnum.sender };

const LiveRates: React.FC<LiveRatesComponent> = ({ shipment }) => {
  const router = useRouter();
  const { notify } = useContext(Notify);
  const { basePath } = useContext(AppMode);
  const { loading, setLoading } = useContext(Loading);
  const { fetchRates, buyLabel } = useContext(ShipmentMutationContext);
  const [selected_rate_id, setSelectedRate] = useState<string | undefined>(shipment?.selected_rate_id || undefined);
  const [label_type, setLabelType] = useState<LabelTypeEnum>(shipment?.label_type as LabelTypeEnum || LabelTypeEnum.PDF);
  const [payment, setPayment] = useState<Partial<PaymentType>>(DEFAULT_PAYMENT);
  const [showMessage, setShowMessage] = useState(false);
  const [key, setKey] = useState<string>(`details-${Date.now()}`);

  const computeDisabled = (shipment: ShipmentType) => {
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
      const { id } = shipment;
      const response = await fetchRates(shipment);
      if (id === undefined) router.push('' + response.id);
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
      let { currency } = (shipment.options || {} as any);
      await buyLabel({
        ...shipment,
        label_type,
        selected_rate_id,
        payment: { ...payment, currency }
      } as ShipmentType);
      notify({ type: NotificationType.success, message: 'Label successfully purchased!' });
      router.push(basePath);
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { setKey(`details-${Date.now()}`); }, [shipment]);

  return (
    <div key={key}>
      <div className="columns is-multiline">

        <div className="column is-12 pb-2">
          <span className="title is-5">Shipment Details</span>

          <button className={`button is-small is-outlined is-info is-pulled-right ${loading ? 'is-loading' : ''}`} onClick={updateRates} disabled={computeDisabled(shipment)}>
            <span>Fetch Rates</span>
          </button>
        </div>

        <div className="column is-12 py-1" style={shipment.shipper.address_line1 === undefined ? { display: 'none' } : {}}>

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Shipper Address</p>
          <AddressDescription address={shipment.shipper} />

        </div>

        <div className="column is-12 py-1" style={{ display: `${shipment.recipient.address_line1 === undefined ? 'none' : 'block'}` }}>

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Recipient Address</p>
          <AddressDescription address={shipment.recipient} />

        </div>

        <div className="column is-12 py-1" style={{ display: `${shipment.parcels.length == 0 ? 'none' : 'block'}` }}>

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Parcels</p>
          <ParcelDescription parcel={shipment.parcels[0]} />

        </div>

        <div className="column is-12 py-1" style={{ display: `${Object.values(shipment.options as object).length === 0 ? 'none' : 'block'}` }}>

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Options</p>
          <OptionsDescription options={shipment.options} />

        </div>

        {!isNone(shipment.customs) && <div className="column is-12 py-1">

          <p className="is-title is-size-6 my-2 has-text-weight-semibold">Customs Declaration</p>
          <CustomsInfoDescription customs={shipment.customs as CustomsType} />

        </div>}

        <div className="column is-12 py-4 px-0" style={{ display: `${(shipment.rates || []).length === 0 ? 'none' : 'block'}` }} key={key}>

          <h6 className="is-title is-size-6 px-3 my-1 has-text-weight-semibold">Live Rates</h6>

          <div className="menu-list py-2 rates-list-box">
            {(shipment.rates || []).map(rate => (
              <a key={rate.id} {...(rate.test_mode ? { title: "Test Mode" } : {})}
                className={`columns m-0 p-1 ${rate.id === selected_rate_id ? 'has-text-grey-dark' : 'has-text-grey'}`}
                onClick={() => setSelectedRate(rate.id)}>

                <span className={`icon is-medium ${rate.id === selected_rate_id ? 'has-text-success' : ''}`}>
                  {(rate.id === selected_rate_id) ? <i className="fas fa-check-square"></i> : <i className="fas fa-square"></i>}
                </span>

                <RateDescription rate={rate} />

                {rate.test_mode && <div className="has-text-warning p-1">
                  <i className="fas fa-exclamation-circle"></i>
                </div>}
              </a>
            ))}
          </div>

        </div>

        {(shipment.messages || []).length > 0 &&
          <article className="column is-12 py-1 mb-1 panel is-white is-shadowless">
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
              <input
                className="mr-1"
                type="radio"
                name="label_type"
                defaultChecked={label_type === LabelTypeEnum.PDF}
                onChange={() => setLabelType(LabelTypeEnum.PDF)}
              />
              <span className="is-size-7 has-text-weight-bold">{LabelTypeEnum.PDF}</span>
            </label>
            <label className="radio">
              <input
                className="mr-1"
                type="radio"
                name="label_type"
                defaultChecked={label_type === LabelTypeEnum.ZPL}
                onChange={() => setLabelType(LabelTypeEnum.ZPL)}
              />
              <span className="is-size-7 has-text-weight-bold">{LabelTypeEnum.ZPL}</span>
            </label>
          </div>

        </div>

        <div className="column is-12 py-2" style={{ display: `${(shipment.rates || []).length === 0 ? 'none' : 'block'}` }}>

          <h6 className="is-title is-size-6 mt-1 mb-2 has-text-weight-semibold">Shipment Paid By</h6>

          <div className="control">
            <label className="radio">
              <input
                className="mr-1"
                type="radio"
                name="paid_by"
                defaultChecked={payment.paid_by === PaidByEnum.sender}
                onChange={() => setPayment({ paid_by: PaidByEnum.sender })}
              />
              <span className="is-size-7 has-text-weight-bold">{formatRef(PaidByEnum.sender.toString())}</span>
            </label>
            <label className="radio">
              <input
                className="mr-1"
                type="radio"
                name="paid_by"
                defaultChecked={payment.paid_by === PaidByEnum.recipient}
                onChange={() => setPayment({ ...payment, paid_by: PaidByEnum.recipient })}
              />
              <span className="is-size-7 has-text-weight-bold">{formatRef(PaidByEnum.recipient.toString())}</span>
            </label>
            <label className="radio">
              <input
                className="mr-1"
                type="radio"
                name="paid_by"
                defaultChecked={payment.paid_by === PaidByEnum.third_party}
                onChange={() => setPayment({ ...payment, paid_by: PaidByEnum.third_party })}
              />
              <span className="is-size-7 has-text-weight-bold">{formatRef(PaidByEnum.third_party.toString())}</span>
            </label>
          </div>

          {(payment.paid_by !== PaidByEnum.sender) &&
            <div className="columns ml-3 my-1 px-2 py-0" style={{ borderLeft: "solid 2px #ddd" }}>
              <InputField
                label="account number"
                className="is-small"
                fieldClass="column"
                defaultValue={payment?.account_number as string}
                onChange={e => setPayment({ ...payment, account_number: e.target.value })} />
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
