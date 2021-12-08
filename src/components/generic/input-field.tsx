import { isNone } from '@/lib/helper';
import React, { RefObject } from 'react';

export interface InputFieldComponent extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fieldClass?: string;
  controlClass?: string;
  addonRight?: JSX.Element;
  addonLeft?: JSX.Element;
  ref?: RefObject<HTMLInputElement>;
}

const InputField: React.FC<InputFieldComponent> = ({ label, required, className, fieldClass, controlClass, children, ref, addonLeft, addonRight, ...props }) => {
  const Ref = isNone(ref) ? { ref } : {};
  const Props = {
    required,
    ...props,
    ...(Object.keys(props).includes('value') ? { value: props.value || "" } : {}),
  };

  return (
    <div className={`field ${fieldClass}`}>
      {label !== undefined && <label className="label is-capitalized" style={{ fontSize: ".8em" }}>
        {label}
        {required && <span className="icon is-small has-text-danger small-icon"><i className="fas fa-asterisk"></i></span>}
      </label>}
      {addonLeft && addonLeft}
      <p className={`control ${controlClass}`}>
        <input type="text" className={`input ${className}`} {...Props} {...Ref} />
        {children}
      </p>
      {addonRight ? addonRight : <></>}
    </div>
  )
};

export default InputField;
