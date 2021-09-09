import { isNone } from '@/lib/helper';
import { Collection } from '@/lib/types';
import React, { ChangeEvent, useContext, useEffect, useRef } from 'react';
import { APIReference } from '@/context/references-provider';
import InputField, { InputFieldComponent } from '@/components/generic/input-field';

interface StateInputComponent extends InputFieldComponent {
  onValueChange: (value: string | null) => void;
  value?: string;
  country_code?: string;
}

const StateInput: React.FC<StateInputComponent> = ({ name, onValueChange, value, country_code, ...props }) => {
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => e.currentTarget.select();
  const input = useRef<HTMLInputElement>(null);
  const { states } = useContext(APIReference);
  const fname = (code_or_name?: string) => {
    const [_, name] = find(states as Collection<Collection<string>>, code_or_name, country_code);
    return name;
  };
  const onChange = (e: ChangeEvent<any>) => {
    e.preventDefault();
    let [code, name] = find(states as Collection<Collection<string>>, e.target.value, country_code);
    onValueChange(code || null);

    if (!isNone(code) && e.target.value === code) e.currentTarget.value = name;
  };

  useEffect(() => { }, [states]);

  return (
    <InputField onChange={onChange} onClick={onClick} value={fname(value)} list="state_or_provinces" {...props} ref={input}>
      <datalist id="state_or_provinces">
        {Object
          .entries(states || {})
          .map(([country, data], index) => (
            <optgroup key={index} label={country}>
              {Object.entries(data as object).map(([state, name]) => (
                <option key={state} value={name}>{state}</option>
              ))}
            </optgroup>
          ))
        }
      </datalist>
    </InputField>
  )
};

function find(states?: Collection<Collection<string>>, code_or_name?: string, current_country?: string): [string, string] | [] {
  const country_code: string = (
    Object
      .keys(states || {})
      .filter(country => !isNone(current_country) && current_country === country)
      .find(country => (
        Object.keys(states ? states[country] : {}).includes(code_or_name as string)
        || Object.values(states ? states[country] : {}).includes(code_or_name as string)
      )) || ''
  );

  return (Object
    .entries(states ? states[country_code] || {} : {})
    .find(([code, name]) => code === code_or_name || name === code_or_name) || []
  );
}

export default StateInput;
