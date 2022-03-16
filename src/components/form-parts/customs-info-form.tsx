import React, { ChangeEvent, FormEvent, useContext, useEffect, useReducer, useRef, useState } from 'react';
import InputField from '@/components/generic/input-field';
import TextAreaField from '@/components/generic/textarea-field';
import CheckBoxField from '@/components/generic/checkbox-field';
import ButtonField from '@/components/generic/button-field';
import SelectField from '@/components/generic/select-field';
import { deepEqual, formatRef, isNone, validationMessage, validityCheck } from '@/lib/helper';
import { Collection, CommodityType, CURRENCY_OPTIONS, CustomsType, CUSTOMS_CONTENT_TYPES, DutyType, INCOTERMS, NotificationType, PAYOR_OPTIONS, ShipmentType } from '@/lib/types';
import { UserData, useUser } from '@/context/user-provider';
import { APIReference } from '@/context/references-provider';
import { ShipmentMutationContext } from '@/context/shipment-mutation';
import { Notify } from '@/components/notifier';
import { DefaultTemplatesData } from '@/context/default-templates-provider';
import { Loading } from '@/components/loader';
import CommodityCollectionEditor, { CommodityCollectionEditorContext } from '../commodity-list-editor';
import { CurrencyCodeEnum, CustomsContentTypeEnum, IncotermCodeEnum, PaidByEnum } from 'karrio/graphql';


export const DEFAULT_CUSTOMS_CONTENT: Partial<CustomsType> = {
  duty: undefined,
  certify: true,
  commodities: [],
  incoterm: IncotermCodeEnum.DDU,
  content_type: CustomsContentTypeEnum.merchandise,
  options: {}
};
const DEFAULT_DUTY: Partial<DutyType> = {
  paid_by: PaidByEnum.recipient,
  currency: CurrencyCodeEnum.USD,
};

interface CustomsInfoFormComponent {
  value?: CustomsType;
  shipment?: ShipmentType;
  isTemplate?: boolean;
  onChange?: (customs: CustomsType | null) => void;
  onSubmit: (customs: CustomsType | null) => Promise<any>;
  onTemplateChange?: (isUnchanged: boolean) => boolean;
}

const CustomsInfoForm: React.FC<CustomsInfoFormComponent> = ({ children, value, shipment, isTemplate, onSubmit, onChange, onTemplateChange }) => {
  const form = useRef<any>(null);
  const user = useUser();
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useContext(Loading);
  const { discardCustoms, discardCommodity } = useContext(ShipmentMutationContext);
  const { default_customs } = useContext(DefaultTemplatesData);
  const [customs, dispatch] = useReducer((state: any, { name, value }: { name: string, value: string | boolean | object }) => {
    switch (name) {
      case 'hasDuty':
        return { ...state, duty: value === true ? DEFAULT_DUTY : null };
      case 'optOut':
        return value === true ? null : { ...(default_customs || DEFAULT_CUSTOMS_CONTENT) as CustomsType };
      case 'full':
        return { ...(value as object) };
      case 'commercial_invoice':
        return value === true ?
          { ...state, [name]: value } :
          { ...state, [name]: value, invoice: null, invoice_date: null };
      default:
        return { ...state, [name]: value };
    }
  }, value, () => value);
  const [commodities, setCommodities] = useState<CommodityType[]>([]);
  const [optionsExpanded, setOptionsExpanded] = useState<boolean>(false);

  const computeDisableState = (state: CustomsType, commoditiesState: CommodityType[]): boolean => {
    const isUnchanged = (
      deepEqual(value, state) &&
      deepEqual(value?.duty, state?.duty) &&
      deepEqual(value?.options, state?.options) &&
      deepEqual(value?.commodities, commodities)
    );

    return onTemplateChange ? onTemplateChange(isUnchanged) : isUnchanged;
  };

  const updateCustomsCommodity = async (commodity: CommodityType) => {
    await onSubmit([{ id: customs.id, commodities: [commodity] }] as any);
  }
  const removeCustomsCommodity = async (id: string) => {
    setLoading(true);
    try {
      await discardCommodity(id);
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<any> & CustomEvent<{ name: keyof CustomsType, value: object }>) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    dispatch({ name, value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { ...customs, commodities };
      await onSubmit(payload);

      if (customs.id === undefined && shipment?.id !== undefined) {
        notify({ type: NotificationType.success, message: 'Customs Declaration successfully added!' });
      } else if (customs.id !== undefined) {
        notify({ type: NotificationType.success, message: 'Customs Declaration successfully updated!' });
      }
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
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
        onSubmit(null);
      }
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
    setLoading(false);
  };

  useEffect(() => { if (onChange && !deepEqual(value, customs)) onChange(customs) }, [customs]);
  useEffect(() => {
    if (shipment && !deepEqual(shipment.customs, customs)) {
      dispatch({ name: "full", value: shipment.customs });
    }
  }, [shipment]);
  useEffect(() => {
    if (user && isNone(value?.signer)) {
      dispatch({ name: "signer", value: user.full_name });
    }
  }, [user])

  return (
    <>
      {!isTemplate && <div className="columns is-multiline mb-0">
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

      {!isNone(customs) && <form className="pl-1 pr-2 pb-2" onSubmit={handleSubmit} ref={form}>

        {children}

        {/* Customs Info */}
        <div className="columns is-multiline mb-0 mt-4">

          <SelectField label="Content type" value={customs?.content_type} onChange={handleChange} name="content_type" className="is-small is-fullwidth" fieldClass="column mb-0 is-6 px-2 py-1" required >
            {CUSTOMS_CONTENT_TYPES.map((code) => (
              <option key={code} value={code}>{formatRef(code)}</option>
            ))}
          </SelectField>

          <SelectField label="incoterm" value={customs?.incoterm} onChange={handleChange} name="incoterm" className="is-small is-fullwidth" fieldClass="column mb-0 is-6 px-2 py-1" required >
            {INCOTERMS.map((code) => (
              <option key={code} value={code}>{formatRef(code)}</option>
            ))}
          </SelectField>

        </div>

        {/* Commercial Invoice */}
        <div className="columns is-multiline mb-0 pt-4">

          <CheckBoxField name="commercial_invoice" defaultChecked={customs?.commercial_invoice} onChange={handleChange} fieldClass="column mb-0 is-12 px-2 py-2">
            <span>Commercial Invoice</span>
          </CheckBoxField>

          <div className="columns column is-multiline mb-0 ml-6 my-1 px-2 py-0" style={{ borderLeft: "solid 2px #ddd", display: `${customs?.commercial_invoice ? 'block' : 'none'}` }}>

            <InputField label="invoice number" value={customs?.invoice} onChange={handleChange} name="invoice" className="is-small is-fullwidth" fieldClass="column mb-0 is-5 px-2 py-1" />

            <InputField label="invoice date" value={customs?.invoice_date} onChange={handleChange} name="invoice_date" type="date" className="is-small is-fullwidth" fieldClass="column mb-0 is-5 px-2 py-1" />

          </div>

        </div>

        {/* Duties */}
        <div className="columns is-multiline mb-0 pt-4">

          <CheckBoxField defaultChecked={!isNone(customs?.duty)} onChange={handleChange} name="hasDuty" fieldClass="column mb-0 is-12 px-2 py-2">
            <span>Duties</span>
          </CheckBoxField>

          <div className="columns column is-multiline mb-0 ml-6 my-1 px-2 py-0" style={{ borderLeft: "solid 2px #ddd", display: `${!isNone(customs?.duty) ? 'block' : 'none'}` }}>

            <SelectField label="paid by" value={customs?.duty?.paid_by} name="paid_by" className="is-small is-fullwidth" fieldClass="column is-5 mb-0 px-1 py-2" required={!isNone(customs?.duty)}
              onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, paid_by: e.target.value, account_number: (e.target.value == PaidByEnum.third_party) ? customs?.duty?.account_number : undefined } })}>
              {PAYOR_OPTIONS.map(unit => <option key={unit} value={unit}>{formatRef(unit)}</option>)}
            </SelectField>

            {customs?.duty?.paid_by === PaidByEnum.third_party &&
              <InputField label="account number" value={customs?.duty?.account_number} name="account_number" className="is-small" fieldClass="column mb-0 is-5 px-1 py-2"
                onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, account_number: e.target.value } })} />}

            <SelectField label="prefered currency" name="currency" className="is-small is-fullwidth" fieldClass="column is-5 mb-0 px-1 py-2"
              onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, currency: e.target.value } })} value={customs?.duty?.currency}>
              {CURRENCY_OPTIONS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
            </SelectField>

            <InputField label="Declared value" name="declared_value" type="number" min={0} step="any" className="is-small" fieldClass="column mb-0 is-5 px-1 py-2"
              onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, declared_value: e.target.value } })} value={customs?.duty?.declared_value} />

          </div>

        </div>

        {/* Commodities */}
        {!isTemplate && <div className="columns p-2 my-2 is-relative">
          <CommodityCollectionEditor
            defaultValue={customs.commodities}
            onRemove={removeCustomsCommodity}
            onUpdate={updateCustomsCommodity}
            onChange={commodities => setCommodities(commodities)}
            className="is-white column is-12 p-0"
            style={{ border: "1px #ddd solid" }}
          >
            <CommodityCollectionEditorContext.Consumer>{({ commodities }) => (
              <>
                <p className="panel-heading is-clickable select is-small is-fullwidth p-0 pt-1">
                  <span className="is-size-6">{commodities.length == 0 ? 'No' : commodities.length} customs commodity(s) declared</span>
                </p>

                <input
                  required
                  name="commodities"
                  style={{ position: 'absolute', top: 40, left: 60, zIndex: -10 }}
                  onChange={validityCheck(() => { })}
                  onInvalid={validityCheck(validationMessage('Please add at least one commodity'))}
                  value={(commodities || []).length === 0 ? "" : "specified"}
                />
              </>
            )}</CommodityCollectionEditorContext.Consumer>
          </CommodityCollectionEditor>
        </div>}

        {/* Customs Options */}
        <div className="columns p-2 my-2">
          <article className="panel is-white is-shadowless column is-12 p-0" style={{ border: "1px #ddd solid" }}>
            <div className="p-2 is-clickable">
              <p className="panel-heading select is-small is-fullwidth p-0 pt-1" onClick={() => setOptionsExpanded(!optionsExpanded)}>
                <span className="is-size-6">Customs identifications</span>
              </p>
            </div>

            <div className="columns column is-multiline mb-0 ml-6 my-2 px-2 py-2" style={{ borderLeft: "solid 2px #ddd", display: `${optionsExpanded ? 'block' : 'none'}` }}>

              <InputField label="AES" value={customs?.options?.aes} name="aes" className="is-small" fieldClass="column mb-0 is-5 px-2 py-1"
                onChange={e => dispatch({ name: 'options', value: { ...(customs.options || {}), aes: e.target.value } })} />

              <InputField label="EEL / PFC" value={customs?.options?.eel_pfc} name="eel_pfc" className="is-small" fieldClass="column mb-0 is-5 px-2 py-1"
                onChange={e => dispatch({ name: 'options', value: { ...(customs.options || {}), eel_pfc: e.target.value } })} />

              <InputField label="certificate number" value={customs?.options?.certificate_number} name="certificate_number" className="is-small" fieldClass="column mb-0 is-5 px-2 py-1"
                onChange={e => dispatch({ name: 'options', value: { ...(customs.options || {}), certificate_number: e.target.value } })} />

              <InputField label="license number" value={customs?.options?.license_number} name="license_number" className="is-small" fieldClass="column mb-0 is-5 px-2 py-1"
                onChange={e => dispatch({ name: 'options', value: { ...(customs.options || {}), license_number: e.target.value } })} />

              <InputField label="VAT registration number" value={customs?.options?.vat_registration_number} name="vat_registration_number" className="is-small" fieldClass="column mb-0 is-5 px-2 py-1"
                onChange={e => dispatch({ name: 'options', value: { ...(customs.options || {}), vat_registration_number: e.target.value } })} />

              <InputField label="nip_number" value={customs?.options?.nip_number} name="nip_number" className="is-small" fieldClass="column mb-0 is-5 px-2 py-1"
                onChange={e => dispatch({ name: 'options', value: { ...(customs.options || {}), nip_number: e.target.value } })} />

              <InputField label="eori_number" value={customs?.options?.eori_number} name="eori_number" className="is-small" fieldClass="column mb-0 is-5 px-2 py-1"
                onChange={e => dispatch({ name: 'options', value: { ...(customs.options || {}), eori_number: e.target.value } })} />

            </div>
          </article>
        </div>

        {/* Customs Summary and signature */}
        <div className="columns is-multiline mb-6 pt-2">

          <TextAreaField label="content description"
            value={customs?.content_description}
            onChange={handleChange} name="content_description"
            className="is-small"
            fieldClass="column mb-0 is-12 px-2 py-2"
            placeholder="Content type description"
            rows={2} />

          <InputField label="Signed By"
            value={(customs?.signer || user?.full_name) as string}
            onChange={handleChange}
            name="signer"
            className="is-small"
            fieldClass="column mb-0 is-12 px-2 py-2"
            required={!isTemplate} />

          <CheckBoxField defaultChecked={customs?.certify} onChange={handleChange} name="certify" fieldClass="column mb-0 is-12 px-2 pt-2 pb-4">
            <span>I certify this customs declaration.</span>
          </CheckBoxField>

        </div>

        <ButtonField type="submit"
          className={`is-primary ${loading ? 'is-loading' : ''} m-0`}
          fieldClass="form-floating-footer p-2"
          controlClass="has-text-centered"
          disabled={computeDisableState(customs, commodities)}>
          <span>{isTemplate || !isNone(shipment?.id) ? 'Save' : 'Next'}</span>
        </ButtonField>

      </form>}
    </>
  )
};

export default CustomsInfoForm;
