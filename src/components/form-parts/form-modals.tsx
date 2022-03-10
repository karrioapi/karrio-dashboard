import React, { FormEvent, useEffect } from 'react';
import ButtonField from '@/components/generic/button-field';
import ParcelForm, { DEFAULT_PARCEL_CONTENT } from '@/components/form-parts/parcel-form';
import AddressForm from '@/components/form-parts/address-form';
import { ModalFormProps, useModal } from '@/components/generic/modal';
import { AddressType, CustomsType, NotificationType, ParcelType, ShipmentType } from '@/lib/types';
import { useNotifier } from '@/components/notifier';
import { useLoader } from '@/components/loader';
import { deepEqual } from '@/lib/helper';
import CustomsInfoForm from './customs-info-form';


type AddressModalEditorProps = {
  header?: string;
  shipment?: ShipmentType;
  address: ShipmentType['recipient'] | ShipmentType['shipper'];
  onSubmit: (address: AddressType) => Promise<any>;
};

export const AddressModalEditor: React.FC<ModalFormProps<AddressModalEditorProps>> = ({ trigger, ...args }) => {
  const modal = useModal();

  const FormComponent: React.FC<AddressModalEditorProps> = props => {
    const { address, shipment, header, onSubmit } = props;
    const { close } = useModal();

    return (
      <section className="modal-card-body modal-form">
        <div className="form-floating-header p-4">
          <span className="has-text-weight-bold is-size-6">{header || `Edit address`}</span>
        </div>
        <div className="p-3 my-4"></div>

        <AddressForm
          name="template"
          value={address}
          shipment={shipment}
          onSubmit={async (data) => { await onSubmit(data); close(); }}
        />
      </section>
    )
  };

  return React.cloneElement(trigger, {
    onClick: () => modal.open(<FormComponent {...args} />)
  });
};

type ParcelModalEditorProps = {
  header?: string;
  parcel?: ParcelType;
  onSubmit: (parcel: ParcelType) => Promise<any>;
};

export const ParcelModalEditor: React.FC<ModalFormProps<ParcelModalEditorProps>> = ({ trigger, ...args }) => {
  const modal = useModal();

  const FormComponent: React.FC<ParcelModalEditorProps> = props => {
    const { parcel: value, header, onSubmit } = props;
    const { close } = useModal();
    const notifier = useNotifier();
    const loader = useLoader();
    const [parcel, setParcel] = React.useState(value || DEFAULT_PARCEL_CONTENT);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      try {
        parcel.id && loader.setLoading(true);

        await onSubmit(parcel as ParcelType);

        parcel.id && notifier.notify({
          type: NotificationType.success,
          message: 'Parcel successfully updated!'
        });
        close();
      } catch (err: any) {
        notifier.notify({ type: NotificationType.error, message: err });
      }
      loader.setLoading(false);
    };

    useEffect(() => { setParcel(value || DEFAULT_PARCEL_CONTENT); }, [value]);

    return (
      <section className="modal-card-body modal-form">
        <div className="form-floating-header p-4">
          <span className="has-text-weight-bold is-size-6">{header || `Edit parcel`}</span>
        </div>
        <div className="p-3 my-4"></div>

        <form onSubmit={handleSubmit}>
          <ParcelForm value={parcel as ParcelType} onChange={(parcel) => setParcel(parcel)}>
            <div className="p-3 my-5"></div>
            <ButtonField type="submit"
              className="is-primary m-0"
              fieldClass="form-floating-footer p-3"
              controlClass="has-text-centered"
              disabled={deepEqual(value, parcel)}
            >
              <span>Save</span>
            </ButtonField>
          </ParcelForm>
        </form>
      </section>
    )
  };

  return React.cloneElement(trigger, {
    onClick: () => modal.open(<FormComponent {...args} />)
  });
};

type CustomsModalEditorProps = {
  header?: string;
  customs?: CustomsType;
  shipment?: ShipmentType;
  onSubmit: (customs: CustomsType | null) => Promise<any>;
};

export const CustomsModalEditor: React.FC<ModalFormProps<CustomsModalEditorProps>> = ({ trigger, ...args }) => {
  const modal = useModal();

  const FormComponent: React.FC<CustomsModalEditorProps> = props => {
    const { customs, shipment, header, onSubmit } = props;
    const { close } = useModal();

    return (
      <section className="modal-card-body modal-form">
        <div className="form-floating-header p-4">
          <span className="has-text-weight-bold is-size-6">{header || `Edit customs info`}</span>
        </div>
        <div className="p-3 my-4"></div>

        <CustomsInfoForm
          value={customs}
          shipment={shipment}
          onSubmit={async (data) => { await onSubmit(data); close(); }}
        />
      </section>
    )
  };

  return React.cloneElement(trigger, {
    onClick: () => modal.open(<FormComponent {...args} />)
  });
};
