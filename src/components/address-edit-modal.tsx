import React, { EventHandler, useContext, useState } from 'react';
import { Shipment } from '@purplship/rest/index';
import AddressForm from '@/components/form-parts/address-form';
import { isNone } from '@/lib/helper';
import InputField from '@/components/generic/input-field';
import CheckBoxField from './generic/checkbox-field';
import { AddressTemplate, NotificationType } from '@/lib/types';
import { AddressMutationContext } from '@/context/address-template-mutation';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';

const DEFAULT_TEMPLATE_CONTENT = {
  address: {
    residential: false,
    country_code: 'CA',
    state_code: 'QC'
  }
} as AddressTemplate;

type OperationType = {
  addressTemplate?: AddressTemplate;
  onConfirm: () => Promise<any>;
};
type AddressEditContextType = {
  editAddress: (operation: OperationType) => void,
};
type ExtendedAddress = AddressTemplate['address'] & { label: string; is_default?: boolean; };
type ExtendedShipment = Shipment & { template: ExtendedAddress; };

export const AddressEditContext = React.createContext<AddressEditContextType>({} as AddressEditContextType);

interface AddressEditModalComponent { }

const AddressEditModal: React.FC<AddressEditModalComponent> = ({ children }) => {
  const { notify } = useContext(Notify);
  const { setLoading } = useContext(Loading);
  const { createAddressTemplate, updateAddressTemplate } = useContext(AddressMutationContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`address-${Date.now()}`);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [payload, setPayload] = useState<ExtendedAddress | undefined>();
  const [operation, setOperation] = useState<OperationType | undefined>();

  const editAddress = (operation: OperationType) => {
    const { label, is_default, address } = operation.addressTemplate || DEFAULT_TEMPLATE_CONTENT;

    setIsActive(true);
    setOperation(operation);
    setIsNew(isNone(operation.addressTemplate));
    setPayload({ ...address, label, is_default } as ExtendedAddress);
    setKey(`address-${Date.now()}`);
  };
  const close = (_?: React.MouseEvent, changed?: boolean) => {
    if (isNew) setPayload(undefined);
    if (changed && operation?.onConfirm !== undefined) operation?.onConfirm();
    setIsActive(false);
    setOperation(undefined);
    setKey(`address-${Date.now()}`);
  };
  const onChange = async (changes: any) => {
    setLoading(true);
    const { label, is_default, ...address } = (changes as ExtendedShipment).template;
    if (isNew) {
      await createAddressTemplate({ label, is_default, address: address as any });
      notify({ type: NotificationType.success, message: 'Address successfully added!' });
    }
    else {
      await updateAddressTemplate({ label, is_default, address: address as any, id: operation?.addressTemplate?.id as string });
      notify({ type: NotificationType.success, message: 'Address successfully updated!' });
    }

    setTimeout(() => close(undefined, true), 2000);
    setLoading(false);
  };
  const Extension: React.FC<{ onChange?: EventHandler<any>; address?: ExtendedAddress }> = ({ onChange, address }) => (
    <>
      <div className="columns mb-0">
        <InputField
          label="label"
          name="label"
          onChange={onChange}
          defaultValue={address?.label}
          className="is-small"
          fieldClass="column mb-0 px-2 py-2"
          required />
      </div>
      <div className="columns mb-1">
        <CheckBoxField name="is_default" onChange={onChange} defaultChecked={address?.is_default} fieldClass="column mb-0 px-2 pt-3 pb-2">
          <span>Set as default address</span>
        </CheckBoxField>
      </div>
    </>
  );

  return (
    <Notifier>
      <AddressEditContext.Provider value={{ editAddress }}>
        {children}
      </AddressEditContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card">

          <section className="modal-card-body">
            <div className="form-floating-header p-4">
              <h3 className="subtitle is-3">{isNew ? 'New' : 'Update'} Address</h3>
            </div>
            <div className="p-3 my-5"></div>

            {payload !== undefined && <AddressForm value={payload as any} name="template" onChange={onChange}>

              <Extension />

            </AddressForm>}
          </section>

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </Notifier>
  )
};

export default AddressEditModal;
