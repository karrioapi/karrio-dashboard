import { deepEqual, isEqual, isNone, useLocation, validationMessage, validityCheck } from '@/lib/helper';
import { CarrierConnectionType, useCarrierConnectionMutation } from '@/context/user-connection';
import { Collection, NoneEnum, NotificationType, References, ServiceLevelType } from '@/lib/types';
import MetadataEditor, { MetadataEditorContext } from '@/components/metadata-editor';
import CarrierServiceEditor from '@/components/carrier-services-editor';
import CountryInput from '@/components/generic/country-input';
import SelectField from '@/components/generic/select-field';
import InputField from '@/components/generic/input-field';
import Notifier, { Notify } from '@/components/notifier';
import { MetadataObjectTypeEnum } from 'karrio/graphql';
import React, { useContext, useReducer, useState } from 'react';
import { CarrierSettingsCarrierNameEnum } from '@karrio/rest';
import { Loading } from '@/components/loader';
import { useAPIMetadata } from '@/context/api-metadata';
import { useAppMode } from '@/context/app-mode';

type CarrierNameType = CarrierSettingsCarrierNameEnum | NoneEnum;
type OperationType = {
  connection?: CarrierConnectionType;
  onConfirm?: () => Promise<any>;
};
type ConnectProviderModalContextType = {
  editConnection: (operation?: OperationType) => void,
};

export const ConnectProviderModalContext = React.createContext<ConnectProviderModalContextType>({} as ConnectProviderModalContextType);

interface ConnectProviderModalComponent {
  connection?: CarrierConnectionType;
}

function reducer(state: any, { name, value }: { name: string, value: string | boolean | object }) {
  switch (name) {
    case "full":
      return { ...(value as object) };
    case "partial":
      return { ...state, ...(value as object) };
    case "carrier_name":
      return { [name]: value };
    default:
      return { ...state, [name]: value };
  }
}

const ConnectProviderModal: React.FC<ConnectProviderModalComponent> = ({ children }) => {
  const { references: { carriers, service_levels } } = useAPIMetadata();
  const { testMode } = useAppMode();
  const { notify } = useContext(Notify);
  const mutation = useCarrierConnectionMutation();
  const { loading, setLoading } = useContext(Loading);
  const { addUrlParam, removeUrlParam } = useLocation();
  const DEFAULT_STATE = (): Partial<CarrierConnectionType> => ({ carrier_name: NoneEnum.none, test_mode: testMode });
  const [key, setKey] = useState<string>(`connection-${Date.now()}`);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [payload, dispatch] = useReducer(reducer, DEFAULT_STATE());
  const [carrier_name, setCarrierName] = useState<CarrierNameType>(NoneEnum.none);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [operation, setOperation] = useState<OperationType>({} as OperationType);

  const editConnection = (operation: OperationType = {}): void => {
    const connection = operation.connection || DEFAULT_STATE();
    const connection_carrier: CarrierNameType = (
      connection.carrier_name === NoneEnum.none || Object.values(CarrierSettingsCarrierNameEnum).includes(connection.carrier_name as any)
        ? connection.carrier_name as CarrierSettingsCarrierNameEnum
        : NoneEnum.none
    );
    setCarrierName(connection_carrier)
    setIsNew(isNone(operation.connection));
    setOperation(operation);
    dispatch({ name: "full", value: connection });
    setKey(`connection-${Date.now()}`);
    setIsActive(true);
    addUrlParam('modal', connection.id || 'new');
  };
  const close = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (isNew) {
      dispatch({ name: "full", value: DEFAULT_STATE() });
      setCarrierName(NoneEnum.none);
    }
    setKey(`connection-${Date.now()}`);
    setIsActive(false);
    removeUrlParam('modal');
  };
  const field = (property: string) => {
    return fieldState(carrier_name as CarrierNameType, property);
  };
  const directChange = (property: string) => (value: any) => {
    dispatch({ name: property, value });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name: string = target.name;

    dispatch({ name, value });
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const { carrier_name: _, __typename, capabilities, display_name, ...content } = payload;
      const data = { [carrier_name]: carrier_name.includes('generic') ? { ...content, display_name } : content };
      if (isNew) {
        await mutation.createCarrierConnection.mutateAsync(data);
      } else {
        await mutation.updateCarrierConnection.mutateAsync(data);
        dispatch({ name: "partial", value: payload });
      }
      notify({
        type: NotificationType.success,
        message: `carrier connection ${isNew ? 'registered' : 'updated'} successfully`
      });
      setTimeout(() => close(), 500);
      operation.onConfirm && operation.onConfirm();
    } catch (err: any) {
      notify({ type: NotificationType.error, message: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Notifier>
      <ConnectProviderModalContext.Provider value={{ editConnection }}>
        {children}
      </ConnectProviderModalContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background"></div>
        <form className="modal-card" onSubmit={handleSubmit}>
          <section className="modal-card-body modal-form" onChange={(e: any) => {
            setIsInvalid(e.currentTarget.querySelectorAll('.is-danger').length > 0);
          }}>
            <div className="form-floating-header p-4">
              <span className="has-text-weight-bold is-size-6">Edit carrier account</span>
            </div>
            <div className="p-3 my-4"></div>

            <SelectField value={carrier_name} onChange={e => setCarrierName(e.target.value)} disabled={!isNew} key={`select-${key}`} className="is-fullwidth" required>
              <option value='none'>Select Carrier</option>

              {carriers && Object.keys(carriers).map(carrier => (
                <option key={carrier} value={carrier}>{(carriers as Collection)[carrier]}</option>
              ))}

            </SelectField>

            {(carrier_name !== NoneEnum.none && field("carrier_id").exists) &&
              <>
                <hr />

                {field("display_name").exists &&
                  <InputField label="Display Name" value={payload.display_name}
                    name="display_name"
                    onChange={handleChange}
                    className="is-small"
                    required={field("display_name").required}
                  />}

                {field("custom_carrier_name").exists &&
                  <InputField label="Slug" value={payload.custom_carrier_name}
                    onInvalid={validityCheck(validationMessage('Please enter a valid slug'))}
                    name="custom_carrier_name"
                    onChange={handleChange}
                    className="is-small"
                    pattern="^[a-z0-9_]+$"
                    required={field("custom_carrier_name").required}
                  />}

                <InputField label="Carrier Id" value={payload.carrier_id}
                  name="carrier_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("carrier_id").required}
                />

                {/* Carrier specific fields BEGING */}

                {field("app_id").exists && <InputField label="App Id" value={payload.app_id}
                  name="app_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("app_id").required}
                />}

                {field("site_id").exists && <InputField label="Site Id" value={payload.site_id}
                  name="site_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("site_id").required}
                />}

                {field("sendle_id").exists && <InputField label="Sendle ID" value={payload.sendle_id}
                  name="sendle_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("sendle_id").required}
                />}

                {field("seller_id").exists && <InputField label="Seller ID" value={payload.seller_id}
                  name="seller_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("seller_id").required}
                />}

                {field("api_key").exists && <InputField label="API Key" value={payload.api_key}
                  name="api_key"
                  onChange={handleChange}
                  className="is-small"
                  required={field("api_key").required}
                />}

                {field("client_id").exists && <InputField label="Client ID" value={payload.client_id}
                  name="client_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("client_id").required}
                />}

                {field("partner_id").exists && <InputField label="Partner ID" value={payload.partner_id}
                  name="partner_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("partner_id").required}
                />}

                {field("developer_id").exists && <InputField label="Developer ID" value={payload.developer_id}
                  name="developer_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("developer_id").required}
                />}

                {field("check_word").exists && <InputField label="Check Word" value={payload.check_word}
                  type="text"
                  name="check_word"
                  onChange={handleChange}
                  className="is-small"
                  required={field("check_word").required}
                />}

                {field("signature").exists && <InputField label="Signature" value={payload.signature}
                  name="signature"
                  onChange={handleChange}
                  className="is-small"
                  required={field("signature").required}
                />}

                {field("username").exists && <InputField label="Username" value={payload.username}
                  name="username"
                  onChange={handleChange}
                  className="is-small"
                  required={field("username").required}
                />}

                {field("password").exists && <InputField label="Password" value={payload.password}
                  type="text"
                  name="password"
                  onChange={handleChange}
                  className="is-small"
                  required={field("password").required}
                />}

                {field("client_secret").exists && <InputField label="Client Secret" value={payload.client_secret}
                  type="text"
                  name="client_secret"
                  onChange={handleChange}
                  className="is-small"
                  required={field("client_secret").required}
                />}

                {field("customer_number").exists && <InputField label="Customer Number" value={payload.customer_number}
                  name="customer_number"
                  onChange={handleChange}
                  className="is-small"
                  required={field("customer_number").required}
                />}

                {field("license_key").exists && <InputField label="License Key" value={payload.license_key}
                  name="license_key"
                  onChange={handleChange}
                  className="is-small"
                  required={field("license_key").required}
                />}

                {field("consumer_key").exists && <InputField label="Consumer Key" value={payload.consumer_key}
                  name="consumer_key"
                  onChange={handleChange}
                  className="is-small"
                  required={field("consumer_key").required}
                />}

                {field("consumer_secret").exists && <InputField label="Consumer Secret" value={payload.consumer_secret}
                  type="text"
                  name="consumer_secret"
                  onChange={handleChange}
                  className="is-small"
                  required={field("consumer_secret").required}
                />}

                {field("contract_id").exists && <InputField label="Contract Id" value={payload.contract_id}
                  name="contract_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("contract_id").required}
                />}

                {field("api_secret").exists && <InputField label="API Secret" value={payload.api_secret}
                  type="text"
                  name="api_secret"
                  onChange={handleChange}
                  className="is-small"
                  required={field("api_secret").required}
                />}

                {field("account_number").exists && <InputField label="Account Number" value={payload.account_number}
                  name="account_number"
                  onChange={handleChange}
                  className="is-small"
                  required={field("account_number").required}
                />}

                {field("billing_account").exists && <InputField label="Billing Account" value={payload.billing_account}
                  name="billing_account"
                  onChange={handleChange}
                  className="is-small"
                  required={field("billing_account").required}
                />}

                {field("meter_number").exists && <InputField label="Meter Number" value={payload.meter_number}
                  name="meter_number"
                  onChange={handleChange}
                  className="is-small"
                  required={field("meter_number").required}
                />}

                {field("user_key").exists && <InputField label="User Key" value={payload.user_key}
                  name="user_key"
                  onChange={handleChange}
                  className="is-small"
                  required={field("user_key").required}
                />}

                {field("user_token").exists && <InputField label="User Token" value={payload.user_token}
                  name="user_token"
                  onChange={handleChange}
                  className="is-small"
                  required={field("user_token").required}
                />}

                {field("access_license_number").exists && <InputField label="Access License Number" value={payload.access_license_number}
                  name="access_license_number"
                  onChange={handleChange}
                  className="is-small"
                  required={field("access_license_number").required}
                />}

                {field("account_pin").exists && <InputField label="Account Pin" value={payload.account_pin}
                  name="account_pin"
                  onChange={handleChange}
                  className="is-small"
                  required={field("account_pin").required}
                />}

                {field("account_entity").exists && <InputField label="Account Entity" value={payload.account_entity}
                  name="account_entity"
                  onChange={handleChange}
                  className="is-small"
                  required={field("account_entity").required}
                />}

                {field("account_country_code").exists && <CountryInput label="Account Country Code"
                  onValueChange={directChange("account_country_code")}
                  value={payload.account_country_code}
                  className="is-small"
                  dropdownClass="is-small"
                  required={field("account_country_code").required}
                />}

                {field("mailer_id").exists && <InputField label="Mailer ID" value={payload.mailer_id}
                  name="mailer_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("mailer_id").required}
                />}

                {field("customer_registration_id").exists && <InputField label="Customer Registration ID" value={payload.customer_registration_id}
                  name="customer_registration_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("customer_registration_id").required}
                />}

                {field("logistics_manager_mailer_id").exists && <InputField label="Logistics Manager Mailer ID" value={payload.logistics_manager_mailer_id}
                  name="logistics_manager_mailer_id"
                  onChange={handleChange}
                  className="is-small"
                  required={field("logistics_manager_mailer_id").required}
                />}

                {field("access_key").exists && <InputField label="Access Key" value={payload.access_key}
                  name="access_key"
                  onChange={handleChange}
                  className="is-small"
                  required={field("access_key").required}
                />}

                {field("aws_region").exists && <InputField label="AWS Region" value={payload.aws_region}
                  name="aws_region"
                  onChange={handleChange}
                  className="is-small"
                  required={field("aws_region").required}
                />}

                {field("mws_auth_token").exists && <InputField label="MWS Auth Token" value={payload.mws_auth_token}
                  name="mws_auth_token"
                  onChange={handleChange}
                  className="is-small"
                  required={field("mws_auth_token").required}
                />}


                {field("services").exists && <CarrierServiceEditor
                  carrierName={payload.custom_carrier_name || carrier_name}
                  defaultValue={payload.services || service_levels[carrier_name] || service_levels['generic']}
                  onChange={directChange("services")}
                />}

                {/* Carrier specific fields END */}

                <hr className="mt-1 my-3" style={{ height: '1px' }} />

                <MetadataEditor
                  object_type={MetadataObjectTypeEnum.carrier}
                  metadata={payload.metadata}
                  onChange={directChange("metadata")}
                >
                  <MetadataEditorContext.Consumer>{({ isEditing, editMetadata }) => (<>

                    <div className="is-flex is-justify-content-space-between">
                      <h2 className="title is-6 my-3">Metadata</h2>

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

                    <hr className="mt-1 my-1" style={{ height: '1px' }} />

                  </>)}</MetadataEditorContext.Consumer>
                </MetadataEditor>


                <div className="p-3 my-5"></div>
                <div className="form-floating-footer has-text-centered p-1">
                  <button className="button is-default m-1 is-small" onClick={close} disabled={loading}>
                    <span>Cancel</span>
                  </button>
                  <button className={`button is-primary ${loading ? 'is-loading' : ''} m-1 is-small`}
                    disabled={isInvalid || isEqual(operation.connection || DEFAULT_STATE, payload)} type="submit">
                    <span>Submit</span>
                  </button>
                </div>
              </>
            }
          </section >
        </form >
        <button className="modal-close is-large has-background-dark" aria-label="" onClick={close}></button>
      </div >
    </Notifier >
  )
}

function fieldState(carrier_name: CarrierSettingsCarrierNameEnum | NoneEnum, property: string) {
  const field = (
    ({
      [CarrierSettingsCarrierNameEnum.AmazonMws]: [["carrier_id", true], ["seller_id", true], ["developer_id", true], ["mws_auth_token", true], ["aws_region"]],
      [CarrierSettingsCarrierNameEnum.Aramex]: [["carrier_id", true], ["username", true], ["password", true], ["account_pin", true], ["account_entity", true], ["account_number", true], ["account_country_code"]],
      [CarrierSettingsCarrierNameEnum.Australiapost]: [["carrier_id", true], ["api_key", true], ["password", true], ["account_number", true]],
      [CarrierSettingsCarrierNameEnum.Canadapost]: [["carrier_id", true], ["username", true], ["password", true], ["customer_number", true], ["contract_id"]],
      [CarrierSettingsCarrierNameEnum.Canpar]: [["carrier_id", true], ["username", true], ["password", true]],
      [CarrierSettingsCarrierNameEnum.Chronopost]: [["carrier_id", true], ["account_number", true], ["password", true], ["account_country_code"]],
      [CarrierSettingsCarrierNameEnum.Dicom]: [["carrier_id", true], ["username", true], ["password", true], ["billing_account"]],
      [CarrierSettingsCarrierNameEnum.Dpdhl]: [["carrier_id", true], ["app_id", true], ["username", true], ["password", true], ["signature", true], ["account_number"], ["services"]],
      [CarrierSettingsCarrierNameEnum.DhlExpress]: [["carrier_id", true], ["site_id", true], ["password", true], ["account_number", true], ["account_country_code"]],
      [CarrierSettingsCarrierNameEnum.DhlPoland]: [["carrier_id", true], ["username", true], ["password", true], ["account_number", true], ["services"]],
      [CarrierSettingsCarrierNameEnum.DhlUniversal]: [["carrier_id", true], ["consumer_key", true], ["consumer_secret", true]],
      [CarrierSettingsCarrierNameEnum.Eshipper]: [["carrier_id", true], ["username", true], ["password", true]],
      [CarrierSettingsCarrierNameEnum.Easypost]: [["carrier_id", true], ["api_key", true]],
      [CarrierSettingsCarrierNameEnum.Freightcom]: [["carrier_id", true], ["username", true], ["password", true]],
      [CarrierSettingsCarrierNameEnum.Generic]: [["display_name", true], ["custom_carrier_name", true], ["carrier_id", true], ["account_number"], ["account_country_code"], ["services"]],
      [CarrierSettingsCarrierNameEnum.Fedex]: [["carrier_id", true], ["user_key"], ["password", true], ["meter_number", true], ["account_number", true], ["account_country_code"]],
      [CarrierSettingsCarrierNameEnum.Purolator]: [["carrier_id", true], ["username", true], ["password", true], ["account_number", true], ["user_token"]],
      [CarrierSettingsCarrierNameEnum.Royalmail]: [["carrier_id", true], ["client_id", true], ["client_secret", true]],
      [CarrierSettingsCarrierNameEnum.Sendle]: [["carrier_id", true], ["sendle_id", true], ["api_key", true]],
      [CarrierSettingsCarrierNameEnum.SfExpress]: [["carrier_id", true], ["partner_id", true], ["check_word", true]],
      [CarrierSettingsCarrierNameEnum.Tnt]: [["carrier_id", true], ["username", true], ["password", true], ["account_number"], ["account_country_code"]],
      [CarrierSettingsCarrierNameEnum.Ups]: [["carrier_id", true], ["username", true], ["password", true], ["access_license_number", true], ["account_number", true], ["account_country_code"]],
      [CarrierSettingsCarrierNameEnum.UpsFreight]: [["carrier_id", true], ["username", true], ["password", true], ["access_license_number", true], ["account_number", true], ["account_country_code"]],
      [CarrierSettingsCarrierNameEnum.Usps]: [["carrier_id", true], ["username", true], ["password", true], ["mailer_id"], ["customer_registration_id"], ["logistics_manager_mailer_id"]],
      [CarrierSettingsCarrierNameEnum.UspsInternational]: [["carrier_id", true], ["username", true], ["password", true], ["mailer_id"], ["customer_registration_id"], ["logistics_manager_mailer_id"]],
      [CarrierSettingsCarrierNameEnum.Yanwen]: [["carrier_id", true], ["customer_number", true], ["license_key", true]],
      [CarrierSettingsCarrierNameEnum.Yunexpress]: [["carrier_id", true], ["customer_number", true], ["api_secret", true]],
      [NoneEnum.none]: [],
    }[carrier_name] || [])
      .find(([_, ...__]) => `${_}`.includes(property)) || []
  );

  return {
    get exists() { return field[0] !== undefined },
    get required() { return field[1] === true; }
  }
}

export default ConnectProviderModal;
