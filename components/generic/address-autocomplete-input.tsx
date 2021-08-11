import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import InputField, { InputFieldComponent } from '@/components/generic/input-field';
import { Address } from '@/api/index';
import { isNone } from '@/lib/helper';
import { initDebouncedPrediction, QueryAutocompletePrediction } from '@/lib/autocomplete';
import { Collection } from '@/lib/types';
import { APIReference } from '@/context/references-provider';
import { FeatureFlags } from '@/context/feature-flags';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

interface AddressAutocompleteInputComponent extends InputFieldComponent {
  onValueChange: (value: Partial<Address>) => void;
  defaultValue?: string;
  disableSuggestion?: boolean;
  country_code?: string;
  dropdownClass?: string;
}

const AddressAutocompleteInput: React.FC<AddressAutocompleteInputComponent> = ({ onValueChange, country_code, label, required, dropdownClass, className, fieldClass, controlClass, children, ...props }) => {
  const ref = React.useRef<HTMLInputElement | null>(null);
  const container = React.useRef<HTMLDivElement | null>(null);
  const { countries } = useContext(APIReference);
  const { ADDRESS_AUTO_COMPLETE } = useContext(FeatureFlags);
  const [key] = useState<string>(`predictions_${Date.now()}`);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<QueryAutocompletePrediction[]>([]);
  const [predictor, initPredictor] = useState<ReturnType<typeof initDebouncedPrediction> | undefined>();

  const updater: Subject<Partial<Address>> = new Subject();
  updater.subscribe((data) => onValueChange(data));

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => e.currentTarget.select();
  const onInput = (e: ChangeEvent<any>) => {
    e.preventDefault();
    const value: string = e.target.value;

    if (predictor !== undefined) {
      let prediction = predictions.find(p => p.description.toLowerCase() === value.toLowerCase());
      let address = (
        isNone(prediction)
          ? { address_line1: value }
          : predictor?.formatPrediction(prediction as QueryAutocompletePrediction, countries as Collection)
      ) as Partial<Address>;

      updater.next(address);
      setIsActive(predictions.length > 0);
      if (isNone(prediction) && (value || "").length > 3) {
        predictor.getPlacePredictions({ input: value }, (newPredictions) => {
          setPredictions(newPredictions)
          setIsActive(newPredictions.length > 0);
        });
        e.target.value = address.address_line1;
      }
    } else {
      updater.next({ address_line1: value });
    }
  };
  const onSelect = (prediction: QueryAutocompletePrediction) => (e: React.MouseEvent) => {
    let address = predictor?.formatPrediction(prediction as QueryAutocompletePrediction, countries as Collection);
    setIsActive(false);
    if (ref.current !== null) ref.current.value = prediction.description;
    updater.next(address as Partial<Address>);
  };
  const onBodyClick = (e: MouseEvent) => {
    if (container.current !== null && !container.current.contains(e.target as Element)) {
      setIsActive(false);
      document.removeEventListener('click', onBodyClick);
    }
  };

  useEffect(() => {
    initPredictor(initDebouncedPrediction(ADDRESS_AUTO_COMPLETE));
  }, [ADDRESS_AUTO_COMPLETE]);
  useEffect(() => {
    if (isActive) document.addEventListener('click', onBodyClick);
  }, [isActive]);

  const content = (_: any) => (
    <div className={`field ${fieldClass}`} key={key} ref={container}>
      {label !== undefined && <label className="label is-capitalized" style={{ fontSize: ".8em" }}>
        {label}
        {required && <span className="icon is-small has-text-danger small-icon"><i className="fas fa-asterisk"></i></span>}
      </label>}
      <div className={`control ${controlClass}`}>
        <div className={`dropdown input is-fullwidth p-0 ${isActive ? 'is-active' : ''} ${dropdownClass}`}
          style={{ border: 'none' }}
          key={`dropdown-input-${key}`}>
          <input onInput={onInput} onClick={onClick} autoComplete={ADDRESS_AUTO_COMPLETE?.is_enabled ? key : "on"} className="input is-fullwidth" required={required} ref={ref} {...props} />

          <div className="dropdown-menu py-0" id={`dropdown-input-${key}`} role="menu" style={{ right: 0, left: 0 }}>
            <div className="dropdown-content py-0">
              <nav className="panel dropped-panel">
                {(predictions || [])
                  .map((prediction) => (
                    <a key={`${prediction.id}-${Date.now()}`}
                      onClick={onSelect(prediction)}
                      className={`panel-block`}>
                      <span>{`${prediction.description} ${prediction.location}`}</span>
                    </a>
                  ))
                }
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{content(predictions)}</>;
};

export default AddressAutocompleteInput;
