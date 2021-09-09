import { Commodity, CommodityWeightUnitEnum, Customs, CustomsContentTypeEnum, CustomsIncotermEnum, Payment, PaymentCurrencyEnum, PaymentPaidByEnum, Shipment } from '@/api/index';
import React, { ChangeEvent, FormEvent, useContext, useReducer, useRef, useState } from 'react';
import InputField from '@/components/generic/input-field';
import TextAreaField from '@/components/generic/textarea-field';
import CheckBoxField from '@/components/generic/checkbox-field';
import ButtonField from '@/components/generic/button-field';
import SelectField from '@/components/generic/select-field';
import { deepEqual, formatRef, isNone } from '@/lib/helper';
import { Collection, CommodityType, CURRENCY_OPTIONS, NotificationType, PAYOR_OPTIONS } from '@/lib/types';
import { UserData } from '@/context/user-provider';
import { APIReference } from '@/context/references-provider';
import ShipmentMutation from '@/context/shipment-mutation';
import { Notify } from '@/components/notifier';
import CommodityDescription from '@/components/descriptions/commodity-description';
import CommodityForm from '@/components/form-parts/commodity-form';
import { DefaultTemplatesData } from '@/context/default-templates-provider';
import { Loading } from '@/components/loader';


export const DEFAULT_CUSTOMS_CONTENT: Customs = {
  duty: undefined,
  certify: true,
  incoterm: CustomsIncotermEnum.Ddu,
  content_type: CustomsContentTypeEnum.Merchandise,
};
const DEFAULT_DUTY: Payment = {
  paid_by: PaymentPaidByEnum.Recipient,
  currency: PaymentCurrencyEnum.Usd
};

interface CustomsInfoFormComponent {
  value?: Customs;
  shipment?: Shipment;
  cannotOptOut?: boolean;
  update: (data: { changes?: Partial<Shipment>, refresh?: boolean }) => void;
  commodityDiscarded?: (id: string) => void
}

const CustomsInfoForm: React.FC<CustomsInfoFormComponent> = ShipmentMutation<CustomsInfoFormComponent>(
  ({ children, value, shipment, cannotOptOut, update, commodityDiscarded, updateCustoms, discardCustoms, addCustoms, discardCommodity }) => {
    const form = useRef<any>(null);
    const { notify } = useContext(Notify);
    const { loading, setLoading } = useContext(Loading);
    const { default_customs } = useContext(DefaultTemplatesData);
    const { incoterms, customs_content_type } = useContext(APIReference);
    const [editCommodity, setEditCommodity] = useState<boolean>(false);
    const [commodity, setCommodity] = useState<CommodityType>();
    const [customs, dispatch] = useReducer((state: any, { name, value }: { name: string, value: string | boolean | object }) => {
      switch (name) {
        case 'hasDuty':
          return { ...state, duty: value === true ? DEFAULT_DUTY : null };
        case 'optOut':
          return value === true ? null : { ...(default_customs || DEFAULT_CUSTOMS_CONTENT) as Customs };
        case 'full':
          return { ...(value as object) };
        default:
          return { ...state, [name]: value };
      }
    }, value, () => value);

    const handleChange = (event: React.ChangeEvent<any> & CustomEvent<{ name: keyof Customs, value: object }>) => {
      const target = event.target;
      const name = target.name;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      dispatch({ name, value });
    };
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      try {
        if (customs.id === undefined && shipment?.id !== undefined) {
          setLoading(true);
          await addCustoms(shipment.id, customs);
          update({ refresh: true });
          notify({ type: NotificationType.success, message: 'Customs Declaration added updated!' });
        } else if (customs.id !== undefined) {
          setLoading(true);
          await updateCustoms(customs);
          update({ refresh: true });
          notify({ type: NotificationType.success, message: 'Customs Declaration successfully updated!' });
        }
        else {
          update({ changes: { customs } });
          form.current?.dispatchEvent(
            new CustomEvent('label-select-tab', { bubbles: true, detail: { nextTab: 'options' } })
          );
        }
      } catch (err) {
        notify({ type: NotificationType.error, message: err });
      }
      setLoading(false);
    };
    const applyOptOut = async (e: ChangeEvent<any>) => {
      e.preventDefault();
      setLoading(true);
      try {
        if (!isNone(shipment?.id) && !isNone(shipment?.customs?.id)) {
          await discardCustoms(shipment?.customs?.id as string);
          notify({ type: NotificationType.success, message: 'Customs declaration discarded successfully!' });
        } else {
          update({ changes: { customs: undefined } });
        }
      } catch (err) {
        notify({ type: NotificationType.error, message: err });
      }
      setLoading(false);
    };
    const removeCommodity = async (id: string) => {
      const commodities = (customs.commodities || []).filter((c: CommodityType) => c.id !== id);
      dispatch({ name: 'commodities', value: commodities });
      if (!id.includes('new-')) {
        if (!isNone(customs.id)) discardCommodity(customs.id, id);
        else commodityDiscarded && commodityDiscarded(id);
      }
    };
    const toggleCommodity = (commodity?: CommodityType) => {
      setCommodity({ id: `new-${Date.now()}`, ...(commodity || { weight_unit: CommodityWeightUnitEnum.Kg, quantity: 1 }) } as any);
      setEditCommodity(!editCommodity);
    };
    const refreshCommodities = async (commodity: CommodityType) => {
      const commodities = (customs.commodities || []).filter((c: CommodityType) => c.id !== commodity.id);
      dispatch({ name: 'commodities', value: [...commodities, commodity] });
      if (!isNone(customs.id)) {
        await updateCustoms({ id: customs.id, commodities: [commodity as Commodity] });
        notify({ type: NotificationType.success, message: 'Customs Commodity successfully updated!' });
      }
      toggleCommodity();
    };

    return (
      <>
        {!cannotOptOut && <div className="columns is-multiline">
          <CheckBoxField defaultChecked={isNone(customs)} onChange={handleChange} name="optOut" fieldClass="column mb-0 is-12 px-3 py-3 has-text-weight-semibold">
            <span>Opt out of customs</span>
          </CheckBoxField>
        </div>}

        {isNone(customs) && <div>
          <ButtonField className="is-primary" fieldClass="has-text-centered mt-3" onClick={applyOptOut} disabled={isNone(value)}>
            <span>Save</span>
            <span className="icon is-small">
              <i className="fas fa-chevron-right"></i>
            </span>
          </ButtonField>
        </div>}

        {!isNone(customs) && <form className="px-1 py-2" onSubmit={handleSubmit} ref={form} style={{ display: `${!editCommodity ? 'block' : 'none'}` }}>

          {React.Children.map(children, (child: any) => React.cloneElement(child, { ...child.props, customs, onChange: handleChange }))}

          <div className="columns is-multiline mb-0">

            <SelectField label="Content type" value={customs?.content_type} onChange={handleChange} name="content_type" className="is-fullwidth" fieldClass="column mb-0 is-6 px-2 py-1" required >
              {customs_content_type && Object
                .entries(customs_content_type as Collection)
                .map(([code, name]) => (
                  <option key={code} value={code}>{formatRef(name)}</option>
                ))
              }
            </SelectField>

            <SelectField label="incoterm" value={customs?.incoterm} onChange={handleChange} name="incoterm" className="is-fullwidth" fieldClass="column mb-0 is-6 px-2 py-1" required >
              {incoterms && Object
                .entries(incoterms as Collection)
                .map(([code, name]) => (
                  <option key={code} value={code}>{`${code} (${name})`}</option>
                ))
              }
            </SelectField>

            <InputField label="AES" value={customs?.aes} onChange={handleChange} name="aes" fieldClass="column mb-0 is-6 px-2 py-1" />

            <InputField label="EEL / PFC" value={customs?.eel_pfc} onChange={handleChange} name="eel_pfc" fieldClass="column mb-0 is-6 px-2 py-1" />

            <InputField label="certificate number" value={customs?.certificate_number} onChange={handleChange} name="certificate_number" fieldClass="column mb-0 is-6 px-2 py-1" />

            <CheckBoxField name="commercial_invoice" defaultChecked={customs?.commercial_invoice} onChange={handleChange} fieldClass="column mb-0 is-12 px-2 py-2">
              <span>Commercial Invoice</span>
            </CheckBoxField>

            <InputField label="invoice number" value={customs?.invoice} onChange={handleChange} name="invoice" fieldClass="column mb-0 is-6 px-2 py-1" />

            <InputField label="invoice date" value={customs?.invoice_date} onChange={handleChange} name="invoice_date" type="date" fieldClass="column mb-0 is-6 px-2 py-1" />

          </div>

          <div className="columns is-multiline mb-0 pt-2">

            <CheckBoxField defaultChecked={!isNone(customs?.duty)} onChange={handleChange} name="hasDuty" fieldClass="column mb-0 is-12 px-2 py-2">
              <span>Duties</span>
            </CheckBoxField>

            <div className="columns column is-multiline mb-0 ml-6 my-1 px-2 py-0" style={{ borderLeft: "solid 2px #ddd", display: `${!isNone(customs?.duty) ? 'block' : 'none'}` }}>

              <SelectField label="paid by" onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, paid_by: e.target.value, account_number: (e.target.value == PaymentPaidByEnum.ThirdParty) ? customs?.duty?.account_number : undefined } })} value={customs?.duty?.paid_by} name="paid_by" className="is-small is-fullwidth" fieldClass="column is-4 mb-0 px-1 py-2" required={!isNone(customs?.duty)}>
                {PAYOR_OPTIONS.map(unit => <option key={unit} value={unit}>{formatRef(unit)}</option>)}
              </SelectField>

              {customs?.duty?.paid_by === PaymentPaidByEnum.ThirdParty &&
                <InputField label="account number" onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, account_number: e.target.value } })} value={customs?.duty?.account_number} name="account_number" className="is-small" fieldClass="column mb-0 is-4 px-1 py-2" />}

              <SelectField label="prefered currency" onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, currency: e.target.value } })} value={customs?.duty?.currency} name="currency" className="is-small is-fullwidth" fieldClass="column is-4 mb-0 px-1 py-2">
                {CURRENCY_OPTIONS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
              </SelectField>

              <InputField label="Declared value" onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, declared_value: e.target.value } })} value={customs?.duty?.declared_value} name="declared_value" type="number" min={0} step="any" className="is-small" fieldClass="column mb-0 is-4 px-1 py-2" />

            </div>

          </div>

          <hr className="my-2" />

          <div className="mb-0 pt-2">

            <div className="table-container">
              <table className="table is-fullwidth">

                <thead className="commodities-table">
                  <tr>
                    <th className="commodity px-0">Customs Commodities</th>
                    <th className="action">
                      <button className="button is-small is-light is-success is-pulled-right" onClick={e => { e.preventDefault(); toggleCommodity(); return false; }}>
                        <span className="icon is-small"><i className="fas fa-plus"></i></span>
                      </button>
                    </th>
                  </tr>
                </thead>

                <tbody className="commodities-table">
                  {(customs?.commodities || []).map((commodity: CommodityType) => (

                    <tr key={`${commodity.id}-${Date.now()}`}>
                      <td className="commodity px-0">
                        <CommodityDescription commodity={commodity} />
                      </td>
                      <td className="action is-vcentered">
                        <div className="buttons is-pulled-right">
                          <button type="button" className="button is-small is-white" onClick={e => { e.preventDefault(); toggleCommodity(commodity); return false; }}>
                            <span className="icon is-small"><i className="fas fa-pen"></i></span>
                          </button>
                          <button type="button" className="button is-small is-white" onClick={e => { e.preventDefault(); removeCommodity(commodity.id); return false; }}>
                            <span className="icon is-small"><i className="fas fa-trash"></i></span>
                          </button>
                        </div>
                      </td>
                    </tr>

                  ))}
                </tbody>

              </table>

              {((customs?.commodities || []).length === 0) && <div className="card my-2">

                <div className="card-content has-text-centered">
                  <p>No commodity declared yet.</p>
                  <p>Use the <span className="icon is-small"><i className="fas fa-plus"></i></span> button above to add</p>
                </div>

              </div>}

            </div>
          </div>

          <hr className="my-2" />

          <div className="columns is-multiline mb-6 pt-2">

            <TextAreaField label="content description" value={customs?.content_description} onChange={handleChange} name="content_description" fieldClass="column mb-0 is-12 px-2 py-2" placeholder="Content type description" />

            <UserData.Consumer>
              {({ user }) => (
                <InputField label="Signed By" value={(customs?.signer || user?.full_name) as string} onChange={handleChange} name="signer" fieldClass="column mb-0 is-12 px-2 py-2" required={!cannotOptOut} />
              )}
            </UserData.Consumer>

            <CheckBoxField defaultChecked={customs?.certify} onChange={handleChange} name="certify" fieldClass="column mb-0 is-12 px-2 py-2">
              <span>I certify this customs declaration.</span>
            </CheckBoxField>

          </div>

          <ButtonField type="submit"
            className={`is-primary ${loading ? 'is-loading' : ''} m-0`}
            fieldClass="form-floating-footer p-3"
            controlClass="has-text-centered"
            disabled={deepEqual(value, customs) && deepEqual(value?.duty, customs?.duty)}>
            <span>Save</span>
          </ButtonField>

        </form>}

        {(!isNone(customs) && editCommodity) && <div className="block" style={{ display: `${editCommodity ? 'block' : 'none'}` }}>
          <button type="button"
            className="button is-light mb-3 mx-0"
            onClick={e => { e.preventDefault(); toggleCommodity(); return false; }}
            disabled={loading}>
            <span className="icon is-small is-dark"><i className="fas fa-arrow-left"></i></span>
          </button>
          <CommodityForm value={commodity} update={refreshCommodities} />
        </div>}
      </>
    )
  });

export default CustomsInfoForm;
