import React, { EventHandler, useContext, useState } from 'react';
import ParcelForm from '@/components/form-parts/parcel-form';
import { isNone } from '@/lib/helper';
import InputField from '@/components/generic/input-field';
import CheckBoxField from '@/components/generic/checkbox-field';
import { NotificationType, ParcelTemplateType, ParcelType } from '@/lib/types';
import ParcelTemplateMutation, { ParcelMutationContext } from '@/context/parcel-template-mutation';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';

const DEFAULT_TEMPLATE_CONTENT = {
  parcel: {
    packaging_type: "envelope",
    weight_unit: 'KG',
    dimension_unit: 'CM'
  }
} as ParcelTemplateType;

type OperationType = {
  parcelTemplate?: ParcelTemplateType;
  onConfirm: () => Promise<any>;
};
type ParcelEditContextType = {
  editParcel: (operation: OperationType) => void,
};
type ExtendedParcel = ParcelType & { label?: string; is_default?: boolean; };

export const ParcelEditContext = React.createContext<ParcelEditContextType>({} as ParcelEditContextType);

interface ParcelEditModalComponent { }

const ParcelEditModal: React.FC<ParcelEditModalComponent> = ({ children }) => {
  const { notify } = useContext(Notify);
  const { setLoading } = useContext(Loading);
  const { createParcelTemplate, updateParcelTemplate } = useContext(ParcelMutationContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`parcel-${Date.now()}`);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [payload, setPayload] = useState<ParcelType | undefined>();
  const [operation, setOperation] = useState<OperationType | undefined>();

  const editParcel = (operation: OperationType) => {
    const { label, is_default, parcel } = operation.parcelTemplate || DEFAULT_TEMPLATE_CONTENT;

    setIsActive(true);
    setOperation(operation);
    setIsNew(isNone(operation.parcelTemplate));
    setPayload({ ...parcel, label, is_default } as ExtendedParcel);
    setKey(`parcel-${Date.now()}`);
  };
  const close = (_?: React.MouseEvent, changed?: boolean) => {
    if (isNew) setPayload(undefined);
    if (changed && operation?.onConfirm !== undefined) operation?.onConfirm();
    setIsActive(false);
    setOperation(undefined);
    setKey(`parcel-${Date.now()}`);
  };
  const update = async ({ changes }: any) => {
    setLoading(true);
    const { label, is_default, ...parcel } = (changes as { parcels: ExtendedParcel[] }).parcels[0];
    if (isNew) {
      await createParcelTemplate({ label: label as string, is_default, parcel: parcel as any });
      notify({ type: NotificationType.success, message: 'Parcel successfully added!' });
    }
    else {
      await updateParcelTemplate({ label, is_default, id: operation?.parcelTemplate?.id as string, parcel: parcel as any });
      notify({ type: NotificationType.success, message: 'Parcel successfully updated!' });
    }

    setTimeout(() => close(undefined, true), 2000);
    setLoading(false);
  };
  const Extension: React.FC<{ onChange?: EventHandler<any>; parcel?: ExtendedParcel }> = ({ onChange, parcel }) => (
    <>
      <div className="columns mb-0 px-2">
        <InputField label="label" name="label" onChange={onChange} defaultValue={parcel?.label} fieldClass="column mb-0 px-2 py-2" required />
      </div>
      <div className="columns mb-1 px-2">
        <CheckBoxField name="is_default" onChange={onChange} defaultChecked={parcel?.is_default} fieldClass="column mb-0 px-2 py-2">
          <span>Set as default parcel</span>
        </CheckBoxField>
      </div>
    </>
  );

  return (
    <Notifier>
      <ParcelEditContext.Provider value={{ editParcel }}>
        {children}
      </ParcelEditContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card">

          <section className="modal-card-body">
            <div className="form-floating-header p-4">
              <h3 className="subtitle is-3">{isNew ? 'New' : 'Update'} Parcel</h3>
            </div>
            <div className="p-3 my-5"></div>

            {payload !== undefined && <ParcelForm value={payload as any} update={update}>
              <Extension />
            </ParcelForm>}
          </section>

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </Notifier>
  )
};

export default ParcelEditModal;
