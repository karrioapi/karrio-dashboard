import React, { useContext, useEffect, useRef } from 'react';
import { NotificationType, ParcelType, ShipmentType } from '@/lib/types';
import { deepEqual, formatDimension, isNone, isNoneOrEmpty } from '@/lib/helper';
import ParcelForm, { DEFAULT_PARCEL_CONTENT } from '@/components/form-parts/parcel-form';
import { DefaultTemplatesData } from '@/context/default-templates-provider';
import ButtonField from '@/components/generic/button-field';
import { Loading } from '@/components/loader';
import { Notify } from '@/components/notifier';
import CommodityCollectionEditor, { CommodityCollectionEditorContext } from '@/components/commodity-list-editor';
import { ShipmentMutationContext } from '@/context/shipment-mutation';

type ParcelCollection = Record<string, ParcelType>;
interface ShipmentParcelsEditorProps {
  defaultValue: ParcelType[];
  shipment?: ShipmentType;
  onSubmit: (parcels: ParcelType[]) => Promise<any>;
}


const ShipmentParcelsEditor: React.FC<ShipmentParcelsEditorProps> = ({ defaultValue, shipment, onSubmit }) => {
  const form = useRef<HTMLFormElement>(null);
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useContext(Loading);
  const { default_parcel, called } = useContext(DefaultTemplatesData);
  const { discardCommodity, discardParcel } = useContext(ShipmentMutationContext);
  const [parcels, setParcels] = React.useState<ParcelCollection>(toParcelCollection(defaultValue));
  const [isExpanded, setIsExpanded] = React.useState<{ [key: string]: boolean }>({});
  const [hasErrors, setHasErrors] = React.useState<{ [key: string]: boolean }>({});
  const [isValid, setIsValid] = React.useState<boolean>(true);

  const updateParcel = (uid: string, data: ParcelType) => {
    const newSate = { ...parcels, [uid]: data };
    setParcels(newSate);
  };
  const removeParcel = async (uid: string) => {
    const { id } = parcels[uid];
    if (isNoneOrEmpty(id)) {
      const newState = Object
        .entries(parcels)
        .reduce((acc, [key, parcel]) => (key === uid ? acc : { ...acc, [key]: parcel }), {});

      setParcels(newState);
    } else {
      await discardParcel(id as string);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit(Object.values(parcels));
      if (shipment?.id) {
        if (Object.values(parcels).some(({ id }) => id === undefined)) {
          notify({ type: NotificationType.success, message: 'Parcels added successfully' });
        } else {
          notify({ type: NotificationType.success, message: 'Parcels updated successfully' });
        }
      }
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
    setLoading(false);
  };

  useEffect(() => {
    form.current && setIsValid(form.current!.checkValidity());
    if (Object.keys(parcels).length === 0 && called) {
      const key = `parcel-${Date.now()}`;
      setParcels({ [key]: (default_parcel || DEFAULT_PARCEL_CONTENT) as ParcelType });
      setIsExpanded({ ...isExpanded, [key]: true });
    }
  }, [parcels]);

  return (
    <form onSubmit={handleSubmit} onChange={e => setIsValid((e.target as any).checkValidity())}>
      {Object.entries(parcels).map(([uid, parcel], index) => (
        <React.Fragment key={uid}>
          <article className="panel is-white is-shadowless my-2 px-1 is-relative">
            {index > 0 && <hr className="my-1" style={{ height: '1px' }} />}

            {!isExpanded[uid] && <a>
              <p className="panel-heading is-fullwidth px-0 pt-3" onClick={() => setIsExpanded({ ...isExpanded, [uid]: true })}>
                <span className="is-size-6 my-1 has-text-weight-semibold has-text-grey">{formatDimension(parcel)}</span>
                {hasErrors[uid] && <span className="has-text-danger is-size-7" style={{ position: 'absolute', zIndex: 1, left: 4, bottom: -1 }}>
                  Please correct parcel details errors
                </span>}
                <span className="is-pulled-right">
                  {Object.keys(parcels).length > 1 && <button className="button is-white is-small mx-2"
                    disabled={loading}
                    onClick={e => { e.stopPropagation(); removeParcel(uid); }}>
                    <span className="icon is-small">
                      <i className="fas fa-trash is-size-6"></i>
                    </span>
                  </button>}
                  <span className="icon is-small">
                    <i className="fas fa-chevron-down is-size-6"></i>
                  </span>
                </span>
              </p>
            </a>}

            <div style={(isExpanded[uid] ? {} : { position: 'absolute', top: 0, bottom: 10, zIndex: -1 })}
              onChange={(e: any) => {
                setHasErrors({ ...isExpanded, [uid]: e.currentTarget.querySelectorAll('.is-danger').length > 0 });
              }}>
              <a>
                <p className="panel-heading is-fullwidth px-0 pt-3" onClick={() => setIsExpanded({ ...isExpanded, [uid]: false })}>
                  <span className="is-size-6 my-2 has-text-weight-semibold">Parcel details</span>
                  <span className="is-pulled-right">
                    {Object.keys(parcels).length > 1 && <button className="button is-white is-small mx-2"
                      disabled={loading}
                      onClick={e => { e.stopPropagation(); removeParcel(uid); }}>
                      <span className="icon is-small">
                        <i className="fas fa-trash is-size-6"></i>
                      </span>
                    </button>}
                    <span className="icon is-small">
                      <i className="fas fa-chevron-up is-size-6"></i>
                    </span>
                  </span>
                </p>
              </a>

              <ParcelForm value={parcel} onChange={change => updateParcel(uid, change)} />
              <CommodityCollectionEditor
                defaultValue={parcel.items}
                onRemove={discardCommodity}
                onChange={(items) => updateParcel(uid, { ...parcel, items })}
              >
                <CommodityCollectionEditorContext.Consumer>{({ commodities, isExpanded }) => (<>
                  <a className="is-size-7 has-text-info has-text-weight-semibold">
                    {commodities.length == 0 ? 'No' : commodities.length} item(s) declared
                    <span className="icon is-small pl-2">
                      <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
                    </span>
                  </a>
                </>)}</CommodityCollectionEditorContext.Consumer>
              </CommodityCollectionEditor>

            </div>
          </article>
        </React.Fragment>
      ))}

      <hr className="mt-1 mb-4" style={{ height: '1px' }} />

      <button
        type='button'
        className="button is-default is-small"
        onClick={() => updateParcel(`parcel-${Date.now()}`, (default_parcel || DEFAULT_PARCEL_CONTENT) as ParcelType)}>
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Add another parcel</span>
      </button>

      <div className="p-3 my-5"></div>
      <ButtonField type="submit"
        className={`is-primary ${loading ? 'is-loading' : ''} m-0`}
        fieldClass="form-floating-footer p-3"
        controlClass="has-text-centered"
        disabled={!isValid || deepEqual(Object.values(parcels), defaultValue)}>
        <span>{isNone(shipment) ? 'Next' : 'Save'}</span>
      </ButtonField>
    </form>
  );
};

function toParcelCollection(parcels: ParcelType[]): ParcelCollection {
  return parcels.reduce((acc, parcel) => {
    return { ...acc, [`parcel-${Date.now()}`]: parcel };
  }, {});
}

export default ShipmentParcelsEditor;
