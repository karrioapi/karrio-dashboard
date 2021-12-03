import { Parcel, ParcelDimensionUnitEnum, ParcelWeightUnitEnum, Shipment } from '@/api/index';
import React, { FormEvent, useContext, useEffect, useReducer, useRef, useState } from 'react';
import InputField from '@/components/generic/input-field';
import SelectField from '@/components/generic/select-field';
import ButtonField from '@/components/generic/button-field';
import CheckBoxField from '@/components/generic/checkbox-field';
import { deepEqual, findPreset, formatDimension, formatRef, isNone } from '@/lib/helper';
import { DIMENSION_UNITS, NotificationType, PresetCollection, WEIGHT_UNITS } from '@/lib/types';
import { APIReference } from '@/context/references-provider';
import { ParcelTemplates } from '@/context/parcel-templates-provider';
import { DefaultTemplatesData } from '@/context/default-templates-provider';
import { ShipmentMutationContext } from '@/context/shipment-mutation';
import { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';

type stateValue = string | boolean | Partial<Parcel>;
export const DEFAULT_PARCEL_CONTENT: Partial<Parcel> = {
  packaging_type: "envelope",
  is_document: false,
  weight_unit: ParcelWeightUnitEnum.Kg,
  dimension_unit: ParcelDimensionUnitEnum.Cm,
};

interface ParcelFormComponent {
  value?: Parcel;
  shipment?: Shipment;
  update: (data: { changes?: Partial<Shipment>, refresh?: boolean }) => void;
}

function reducer(state: any, { name, value }: { name: string, value: stateValue }) {
  switch (name) {
    case 'parcel_type':
    case 'package_preset':
      const { width, height, length, dimension_unit, packaging_type, package_preset } = value as Parcel;
      return {
        ...state,
        width: width || null,
        height: height || null,
        length: length || null,
        dimension_unit: dimension_unit || null,
        packaging_type: packaging_type || null,
        package_preset: package_preset || null
      };
    case 'template':
      return { ...(value as Parcel) };
    default:
      return { ...state, [name]: value }
  }
}

const ParcelForm: React.FC<ParcelFormComponent> = ({ value, shipment, update, children }) => {
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useContext(Loading);
  const { updateParcel } = useContext(ShipmentMutationContext);
  const { packaging_types, package_presets } = useContext(APIReference);
  const { templates, load, ...state } = useContext(ParcelTemplates);
  const form = useRef<HTMLFormElement>(null);
  const [key] = useState<string>(`parcel-${Date.now()}`);
  const [parcel, dispatch] = useReducer(reducer, value, () => value || DEFAULT_PARCEL_CONTENT);
  const [parcel_type, setParcelType] = useState<string>(isNone(value?.package_preset) ? 'custom' : 'preset');
  const [dimension, setDimension] = useState<string | undefined>(formatDimension(isNone(value?.package_preset) ? undefined : value));
  const nextTab = shipment?.shipper.country_code === shipment?.recipient.country_code ? 'options' : 'customs info';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    let name: string = target.name;
    let value: stateValue = target.type === 'checkbox' ? target.checked : target.value;

    if (name === 'parcel_type') {
      const template = (templates || []).find(p => p.id === value)?.parcel;
      const preset = { ...parcel, package_preset: undefined } as Partial<Parcel>;

      setParcelType(value as string);
      setDimension(formatDimension(value === 'custom' ? undefined : template || preset));
      value = { ...(template || preset as any), id: parcel.id };
      name = isNone(template) ? name : 'template';
    }
    else if (name === 'package_preset') {
      const preset = findPreset(package_presets as PresetCollection, value as string) || parcel;
      setDimension(formatDimension(preset));
      value = preset;
    }

    dispatch({ name, value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (parcel.id !== undefined) {
        setLoading(true);
        await updateParcel(parcel as Parcel);
        notify({ type: NotificationType.success, message: 'Parcel successfully updated!' });
        update({ refresh: true });
        setLoading(false);
      } else {
        update({ changes: { parcels: [parcel] } });
        form.current?.dispatchEvent(
          new CustomEvent('label-select-tab', { bubbles: true, detail: { nextTab } })
        );
      }
    } catch (err: any) {
      notify({ type: NotificationType.error, message: err });
    }
  };
  const isDimensionRequired = (parcel: Parcel) => {
    return !(
      isNone(parcel.width) &&
      isNone(parcel.height) &&
      isNone(parcel.length)
    );
  };
  const shouldShowDimension = (parcel_type: string) => {
    if (parcel_type === 'custom') return false;
    if (parcel_type !== 'preset') return true;
    if ((parcel.package_preset || "") !== "") return true;
    return false
  };

  useEffect(() => { (!state.called && !state.loading && load) && load(); }, [state, load]);



  return (
    <form className="px-1 py-2" onSubmit={handleSubmit} key={key} ref={form}>

      {React.Children.map(children, (child: any) => React.cloneElement(child, { ...child.props, parcel, onChange: handleChange }))}

      <div className="columns mb-0 px-2">

        <CheckBoxField name="is_document" onChange={handleChange} defaultChecked={parcel.is_document} fieldClass="column mb-0 is-12 px-2 py-2">
          <span>Document Only</span>
        </CheckBoxField>

      </div>

      <SelectField name="parcel_type" onChange={handleChange} value={parcel_type} className="is-fullwidth" required>
        <optgroup label="New">
          <option value='custom'>Custom Measurements</option>
          <option value='preset'>Carrier Parcel Presets</option>
        </optgroup>
        {(!isNone(shipment) && (templates || []).length > 0) &&
          <optgroup label="Load your custom parcel template">
            {(templates || []).map(template => <option key={template.id} value={template.id}>{template.label}</option>)}
          </optgroup>}
      </SelectField>

      {(parcel_type === 'preset') && <>

        <SelectField name="package_preset" onChange={handleChange} value={parcel.package_preset} className="is-fullwidth is-capitalized" required>
          <option value="">Select a Carrier Provided Parcel</option>

          {Object
            .entries(package_presets || {})
            .map(([key, value]) => (
              <optgroup key={key} label={formatRef(key)}>
                {Object.keys(value as object).map((preset) => (
                  <option key={preset} value={preset}>{formatRef(preset)}</option>
                ))}
              </optgroup>
            ))
          }
        </SelectField>

      </>}

      {shouldShowDimension(parcel_type) && <div className="is-size-7 mt-1 mb-2 has-text-grey">{dimension || ""}</div>}

      <div style={{ display: `${parcel_type === 'custom' ? 'block' : 'none'}` }}>
        <h6 className="is-size-7 my-2 has-text-weight-semibold">Dimensions</h6>

        <div className="columns mb-0 px-2">

          <SelectField name="packaging_type" onChange={handleChange} value={parcel.packaging_type} className="is-small is-fullwidth" fieldClass="column is-4 mb-0 px-1 py-2" required>
            {packaging_types && Object
              .entries(packaging_types)
              .map(([key, value]) => (
                <optgroup key={key} label={formatRef(key)}>
                  {Object.keys(value as object).map((type) => (
                    <option key={type} value={type}>{formatRef(type)}</option>
                  ))}
                </optgroup>
              ))
            }
          </SelectField>

          <span className="is-size-7 my-3">W:</span>
          <InputField type="number" step="any" min="0" name="width" onChange={handleChange} value={parcel.width} className="is-small" fieldClass="column mb-0 px-1 py-2" required={isDimensionRequired(parcel)} />

          <span className="is-size-7 my-3">H:</span>
          <InputField type="number" step="any" min="0" name="height" onChange={handleChange} value={parcel.height} className="is-small" fieldClass="column mb-0 px-1 py-2" required={isDimensionRequired(parcel)} />

          <span className="is-size-7 my-3">L:</span>
          <InputField type="number" step="any" min="0" name="length" onChange={handleChange} value={parcel.length} className="is-small" fieldClass="column mb-0 px-1 py-2" required={isDimensionRequired(parcel)} />

          <SelectField name="dimension_unit" onChange={handleChange} value={parcel.dimension_unit} className="is-small is-fullwidth" fieldClass="column mb-0 px-1 py-2" required={isDimensionRequired(parcel)}>
            {DIMENSION_UNITS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </SelectField>

        </div>

      </div>

      <h6 className="is-size-7 my-2 has-text-weight-semibold">Weight</h6>

      <div className="columns mb-4 px-2">

        <InputField type="number" step="any" min="0" name="weight" onChange={handleChange} value={parcel.weight || ""} className="is-small" fieldClass="column is-2 mb-0 px-1 py-2" required />

        <SelectField name="weight_unit" onChange={handleChange} value={parcel.weight_unit || ParcelWeightUnitEnum.Kg} className="is-small is-fullwidth" fieldClass="column is-2 mb-0 px-1 py-2" required>
          {WEIGHT_UNITS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
        </SelectField>

      </div>

      <div className="p-3 my-5"></div>
      <ButtonField type="submit"
        className={`is-primary ${loading ? 'is-loading' : ''} m-0`}
        fieldClass="form-floating-footer p-3"
        controlClass="has-text-centered"
        disabled={deepEqual(value || DEFAULT_PARCEL_CONTENT, parcel)}>
        <span>Save</span>
      </ButtonField>

    </form>
  )
};

export default ParcelForm;
