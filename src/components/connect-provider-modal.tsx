import { CarrierSettingsCarrierNameEnum } from '@purplship/rest/index';
import React, { useContext, useState } from 'react';
import InputField from '@/components/generic/input-field';
import CheckBoxField from '@/components/generic/checkbox-field';
import ButtonField from '@/components/generic/button-field';
import SelectField from '@/components/generic/select-field';
import { Collection, NotificationType, References, ServiceLevelType } from '@/lib/types';
import { APIReference } from '@/context/references-provider';
import { ConnectionMutationContext } from '@/context/connection-mutation';
import { UserConnectionType } from '@/context/user-connections-provider';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';
import { deepEqual, isNone, useLocation, validationMessage, validityCheck } from '@/lib/helper';
import { AppMode } from '@/context/app-mode-provider';
import CountryInput from '@/components/generic/country-input';
import CarrierServiceEditor from '@/components/carrier-services-editor';
import MetadataEditor, { MetadataEditorContext } from '@/components/metadata-editor';
import { MetadataObjectType } from '@purplship/graphql';

type OperationType = {
  connection?: UserConnectionType;
  onConfirm?: () => Promise<any>;
};
type ConnectProviderModalContextType = {
  editConnection: (operation: OperationType) => void,
};

export const ConnectProviderModalContext = React.createContext<ConnectProviderModalContextType>({} as ConnectProviderModalContextType);

interface ConnectProviderModalComponent {
  connection?: UserConnectionType;
}

const ConnectProviderModal: React.FC<ConnectProviderModalComponent> = ({ children }) => {
  const { carriers, service_levels } = useContext(APIReference) as References & { service_levels: Record<string, ServiceLevelType[]> };
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useContext(Loading);
  const { testMode } = useContext(AppMode);
  const { addUrlParam, removeUrlParam } = useLocation();
  const { updateConnection, createConnection } = useContext(ConnectionMutationContext);
  const DEFAULT_STATE = (): Partial<UserConnectionType> => ({ carrier_name: 'none', test: testMode });
  const [key, setKey] = useState<string>(`connection-${Date.now()}`);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [payload, setPayload] = useState<Partial<UserConnectionType | any>>(DEFAULT_STATE());
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [operation, setOperation] = useState<OperationType>({} as OperationType);

  const editConnection = (operation: OperationType): void => {
    const connection = operation.connection || DEFAULT_STATE();

    setIsActive(true);
    setIsDisabled(true);
    setPayload(connection);
    setIsNew(isNone(operation.connection));
    setOperation(operation);
    setKey(`connection-${Date.now()}`);
    addUrlParam('modal', connection.id || 'new');
  };
  const close = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (isNew) setPayload(DEFAULT_STATE());
    setKey(`connection-${Date.now()}`);
    setIsDisabled(true);
    setIsActive(false);
    removeUrlParam('modal');
  };

  const handleOnChange = (property: string) => (e: React.ChangeEvent<any>) => {
    let new_state = { ...payload, [property]: e.target.value || null };
    if (property === 'carrier_name') {
      setKey(`connection-${Date.now()}`);
      new_state = { carrier_name: e.target.value, test: testMode };
    } else if (property == 'test') {
      new_state = { ...payload, test: e.target.checked };
    }
    setPayload(new_state);
    setIsDisabled(deepEqual((operation.connection || DEFAULT_STATE), new_state));
  };
  const directChange = (property: string) => (value: any) => {
    const new_state = { ...payload, [property]: value };
    setPayload(new_state);
    setIsDisabled(JSON.stringify(operation.connection || DEFAULT_STATE) === JSON.stringify(new_state));
  };
  const has = (property: string) => {
    return hasProperty(payload.carrier_name as CarrierSettingsCarrierNameEnum, property);
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const { carrier_name, __typename, id, ...content } = payload;
      const settingsName = `${carrier_name}settings`.replace('_', '');
      const data = { [settingsName]: content };
      if (isNew) {
        await createConnection(data);
      } else {
        await updateConnection({ id, ...data });
        setPayload(payload);
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
        <div className="modal-background" onClick={close}></div>
        <form className="modal-card" onSubmit={handleSubmit}>
          <section className="modal-card-body modal-form" onChange={(e: any) => {
            setIsInvalid(e.currentTarget.querySelectorAll('.is-danger').length > 0);
          }}>
            <div className="form-floating-header p-4">
              <span className="has-text-weight-bold is-size-6">Edit carrier account</span>
            </div>
            <div className="p-3 my-4"></div>

            <SelectField value={payload.carrier_name} onChange={handleOnChange("carrier_name")} disabled={!isNew} key={`select-${key}`} className="is-fullwidth" required>
              <option value='none'>Select Carrier</option>

              {carriers && Object.keys(carriers).map(carrier => (
                <option key={carrier} value={carrier}>{(carriers as Collection)[carrier]}</option>
              ))}

            </SelectField>

            {(payload.carrier_name !== 'none' && has("carrier_id")) &&
              <>
                <hr />

                {has("display_name") &&
                  <InputField label="Display Name" defaultValue={payload.display_name}
                    onChange={handleOnChange("display_name")}
                    className="is-small"
                    required
                  />}

                {has("custom_carrier_name") &&
                  <InputField label="Slug" defaultValue={payload.custom_carrier_name}
                    onInvalid={validityCheck(validationMessage('Please enter a valid slug'))}
                    onChange={handleOnChange("custom_carrier_name")}
                    className="is-small"
                    pattern="^[a-z0-9_]+$"
                    required
                  />}

                <InputField label="Carrier Id" defaultValue={payload.carrier_id}
                  onChange={handleOnChange("carrier_id")}
                  className="is-small"
                  required
                />

                {/* Carrier specific fields BEGING */}

                {has("site_id") && <InputField label="Site Id" defaultValue={payload.site_id} onChange={handleOnChange("site_id")} className="is-small" required />}

                {has("sendle_id") && <InputField label="Sendle ID" defaultValue={payload.sendle_id} onChange={handleOnChange("sendle_id")} className="is-small" required />}

                {has("api_key") && <InputField label="API Key" defaultValue={payload.api_key} onChange={handleOnChange("api_key")} className="is-small" required />}

                {has("client_id") && <InputField label="Client ID" defaultValue={payload.client_id} onChange={handleOnChange("client_id")} className="is-small" required />}

                {has("partner_id") && <InputField label="Partner ID" defaultValue={payload.partner_id} onChange={handleOnChange("partner_id")} className="is-small" required />}

                {has("check_word") && <InputField label="Check Word" defaultValue={payload.check_word} onChange={handleOnChange("check_word")} className="is-small" required />}

                {has("username") && <InputField label="Username" defaultValue={payload.username} onChange={handleOnChange("username")} className="is-small" required />}

                {has("password") && <InputField label="Password" defaultValue={payload.password} onChange={handleOnChange("password")} className="is-small" required />}

                {has("client_secret") && <InputField label="Client Secret" defaultValue={payload.client_secret} onChange={handleOnChange("client_secret")} className="is-small" required />}

                {has("customer_number") && <InputField label="Customer Number" defaultValue={payload.customer_number} onChange={handleOnChange("customer_number")} className="is-small" required />}

                {has("license_key") && <InputField label="License Key" defaultValue={payload.license_key} onChange={handleOnChange("license_key")} className="is-small" />}

                {has("consumer_key") && <InputField label="Consumer Key" defaultValue={payload.consumer_key} onChange={handleOnChange("consumer_key")} className="is-small" required />}

                {has("consumer_secret") && <InputField label="Consumer Secret" defaultValue={payload.consumer_secret} onChange={handleOnChange("consumer_secret")} className="is-small" required />}

                {has("contract_id") && <InputField label="Contract Id" defaultValue={payload.contract_id} onChange={handleOnChange("contract_id")} className="is-small" required />}

                {has("api_secret") && <InputField label="API Secret" defaultValue={payload.api_secret} onChange={handleOnChange("api_secret")} className="is-small" required />}

                {has("account_number") && <InputField label="Account Number" defaultValue={payload.account_number} onChange={handleOnChange("account_number")} className="is-small" />}

                {has("billing_account") && <InputField label="Billing Account" defaultValue={payload.billing_account} onChange={handleOnChange("billing_account")} className="is-small" />}

                {has("meter_number") && <InputField label="Meter Number" defaultValue={payload.meter_number} onChange={handleOnChange("meter_number")} className="is-small" required />}

                {has("user_key") && <InputField label="User Key" defaultValue={payload.user_key} onChange={handleOnChange("user_key")} className="is-small" />}

                {has("user_token") && <InputField label="User Token" defaultValue={payload.user_token} onChange={handleOnChange("user_token")} className="is-small" />}

                {has("access_license_number") && <InputField label="Access License Number" defaultValue={payload.access_license_number} onChange={handleOnChange("access_license_number")} className="is-small" required />}

                {has("account_pin") && <InputField label="Account Pin" defaultValue={payload.account_pin} onChange={handleOnChange("account_pin")} className="is-small" required />}

                {has("account_entity") && <InputField label="Account Entity" defaultValue={payload.account_entity} onChange={handleOnChange("account_entity")} className="is-small" required />}

                {has("account_country_code") &&
                  <CountryInput
                    label="Account Country Code"
                    onValueChange={directChange("account_country_code")}
                    value={payload.account_country_code}
                    className="is-small"
                    dropdownClass="is-small"
                    required
                  />}

                {has("mailer_id") && <InputField label="Mailer ID" defaultValue={payload.mailer_id} onChange={handleOnChange("mailer_id")} className="is-small" />}

                {has("customer_registration_id") && <InputField label="Customer Registration ID" defaultValue={payload.customer_registration_id} onChange={handleOnChange("customer_registration_id")} className="is-small" />}

                {has("logistics_manager_mailer_id") && <InputField label="Logistics Manager Mailer ID" defaultValue={payload.logistics_manager_mailer_id} onChange={handleOnChange("logistics_manager_mailer_id")} className="is-small" />}

                {has("services") && <CarrierServiceEditor defaultValue={payload.services || service_levels[payload.carrier_name]} onChange={directChange("services")} />}

                {/* Carrier specific fields END */}

                <CheckBoxField defaultChecked={payload.test} onChange={handleOnChange("test")}>Test Mode</CheckBoxField>


                {has("metadata") && <>

                  <hr className="mt-1 my-3" style={{ height: '1px' }} />

                  <MetadataEditor
                    object_type={MetadataObjectType.carrier}
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

                </>}


                <div className="p-3 my-5"></div>
                <ButtonField type="submit"
                  className={`is-primary ${loading ? 'is-loading' : ''} m-0`}
                  fieldClass="form-floating-footer p-3"
                  controlClass="has-text-centered"
                  disabled={isInvalid || isDisabled}>
                  <span>Submit</span>
                </ButtonField>
              </>
            }
          </section>
        </form>
        <button className="modal-close is-large has-background-dark" aria-label="" onClick={close}></button>
      </div>
    </Notifier>
  )
}

function hasProperty(carrier_name: CarrierSettingsCarrierNameEnum, property: string): boolean {
  // TODO: Use carriers settings types when available for automatic validation
  return ({
    [CarrierSettingsCarrierNameEnum.Aramex]: ["carrier_id", "test", "username", "password", "account_pin", "account_entity", "account_number", "account_country_code"],
    [CarrierSettingsCarrierNameEnum.Australiapost]: ["carrier_id", "test", "api_key", "password", "account_number"],
    [CarrierSettingsCarrierNameEnum.Canadapost]: ["carrier_id", "test", "username", "password", "customer_number", "contract_id"],
    [CarrierSettingsCarrierNameEnum.Canpar]: ["carrier_id", "test", "username", "password"],
    [CarrierSettingsCarrierNameEnum.Dicom]: ["carrier_id", "test", "username", "password", "billing_account"],
    [CarrierSettingsCarrierNameEnum.DhlExpress]: ["carrier_id", "test", "site_id", "password", "account_number", "account_country_code"],
    [CarrierSettingsCarrierNameEnum.DhlPoland]: ["carrier_id", "test", "username", "password", "account_number", "services"],
    [CarrierSettingsCarrierNameEnum.DhlUniversal]: ["carrier_id", "test", "consumer_key", "consumer_secret"],
    [CarrierSettingsCarrierNameEnum.Eshipper]: ["carrier_id", "test", "username", "password"],
    [CarrierSettingsCarrierNameEnum.Freightcom]: ["carrier_id", "test", "username", "password"],
    [CarrierSettingsCarrierNameEnum.Generic]: ["display_name", "custom_carrier_name", "carrier_id", "test", "account_number", "account_country_code", "label_template", "services", "metadata"],
    [CarrierSettingsCarrierNameEnum.Fedex]: ["carrier_id", "test", "user_key", "password", "meter_number", "account_number", "account_country_code"],
    [CarrierSettingsCarrierNameEnum.Purolator]: ["carrier_id", "test", "username", "password", "account_number", "user_token"],
    [CarrierSettingsCarrierNameEnum.Royalmail]: ["carrier_id", "test", "client_id", "client_secret"],
    [CarrierSettingsCarrierNameEnum.Sendle]: ["carrier_id", "test", "sendle_id", "api_key"],
    [CarrierSettingsCarrierNameEnum.SfExpress]: ["carrier_id", "test", "partner_id", "check_word"],
    [CarrierSettingsCarrierNameEnum.Tnt]: ["carrier_id", "test", "username", "password", "account_country_code", "account_number"],
    [CarrierSettingsCarrierNameEnum.Ups]: ["carrier_id", "test", "username", "password", "access_license_number", "account_number", "account_country_code"],
    [CarrierSettingsCarrierNameEnum.Usps]: ["carrier_id", "test", "username", "password", "mailer_id", "customer_registration_id", "logistics_manager_mailer_id"],
    [CarrierSettingsCarrierNameEnum.UspsInternational]: ["carrier_id", "test", "username", "password", "mailer_id", "customer_registration_id", "logistics_manager_mailer_id"],
    [CarrierSettingsCarrierNameEnum.Yanwen]: ["carrier_id", "test", "customer_number", "license_key"],
    [CarrierSettingsCarrierNameEnum.Yunexpress]: ["carrier_id", "test", "customer_number", "api_secret"]
  }[carrier_name] || []).includes(property)
}

export default ConnectProviderModal;
