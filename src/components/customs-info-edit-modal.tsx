import React, { EventHandler, useContext, useState } from 'react';
import { isNone } from '@/lib/helper';
import CustomsInfoForm from '@/components/form-parts/customs-info-form';
import InputField from '@/components/generic/input-field';
import { CustomsTemplateType, CustomsType, NotificationType } from '@/lib/types';
import CheckBoxField from '@/components/generic/checkbox-field';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';
import { CustomsMutationContext } from '@/context/customs-template-mutation';

const DEFAULT_TEMPLATE_CONTENT = {
  customs: {
    certify: true,
    incoterm: 'DDU',
    content_type: 'merchandise',
  }
} as CustomsTemplateType;


type OperationType = {
  customsTemplate?: CustomsTemplateType;
  onConfirm: () => Promise<any>;
};
type CustomsInfoEditContextType = {
  editCustomsInfo: (operation: OperationType) => void,
};
type ExtendedCustoms = CustomsType & { label: string; is_default?: boolean; };

export const CustomsInfoEditContext = React.createContext<CustomsInfoEditContextType>({} as CustomsInfoEditContextType);

interface CustomsInfoEditModalComponent { }

const CustomsInfoEditModal: React.FC<CustomsInfoEditModalComponent> = ({ children }) => {
  const { notify } = useContext(Notify);
  const { setLoading } = useContext(Loading);
  const { createCustomsTemplate, updateCustomsTemplate, deleteCommodity } = useContext(CustomsMutationContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`customs-${Date.now()}`);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [payload, setPayload] = useState<CustomsType | undefined>();
  const [operation, setOperation] = useState<OperationType | undefined>();

  const editCustomsInfo = (operation: OperationType) => {
    const { label, is_default, customs } = operation.customsTemplate || DEFAULT_TEMPLATE_CONTENT;

    setIsActive(true);
    setOperation(operation);
    setIsNew(isNone(operation.customsTemplate));
    setPayload({ ...customs, label, is_default } as CustomsType);
    setKey(`address-${Date.now()}`);
  };
  const close = (_?: React.MouseEvent, changed?: boolean) => {
    if (isNew) setPayload(undefined);
    if (changed && operation?.onConfirm !== undefined) operation?.onConfirm();
    setIsActive(false);
    setKey(`customs-${Date.now()}`);
  };
  const update = async ({ changes }: any) => {
    setLoading(true);
    const { label, is_default, duty, ...data } = (changes as { customs: ExtendedCustoms }).customs;
    const payload = { ...data };
    if (isNew) {
      await createCustomsTemplate({ label, is_default, customs: payload as any });
      notify({ type: NotificationType.success, message: 'Customs info successfully added!' });
    }
    else {
      await updateCustomsTemplate({ label, is_default, customs: payload as any, id: operation?.customsTemplate?.id as string });
      notify({ type: NotificationType.success, message: 'Customs info successfully updated!' });
    }

    setTimeout(() => close(undefined, true), 2000);
    setLoading(false);
  };
  const Extension: React.FC<{ onChange?: EventHandler<any>; customs?: ExtendedCustoms }> = ({ onChange, customs }) => (
    <>
      <div className="columns mb-2">
        <InputField label="label" name="label" onChange={onChange} defaultValue={customs?.label} className="is-small" fieldClass="column mb-0 px-2 py-2" required />
      </div>

      <div className="columns mb-1">
        <CheckBoxField name="is_default" onChange={onChange} defaultChecked={customs?.is_default} fieldClass="column mb-0 px-2 pt-3 pb-2">
          <span>Set as default customs info</span>
        </CheckBoxField>
      </div>
    </>
  );

  return (
    <Notifier>
      <CustomsInfoEditContext.Provider value={{ editCustomsInfo }}>
        {children}
      </CustomsInfoEditContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card">

          <section className="modal-card-body">
            <div className="form-floating-header p-4">
              <h3 className="subtitle is-3">{isNew ? 'New' : 'Update'} Customs Info</h3>
            </div>
            <div className="p-3 my-5"></div>

            {payload !== undefined && <CustomsInfoForm value={payload as any} update={update} cannotOptOut={true} commodityDiscarded={deleteCommodity}>
              <Extension />
            </CustomsInfoForm>}
          </section>

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </Notifier>
  )
};

export default CustomsInfoEditModal;
