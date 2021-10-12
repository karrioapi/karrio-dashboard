import { isNone } from '@/lib/helper';
import React, { RefObject } from 'react';

export interface InputFieldComponent extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fieldClass?: string;
  controlClass?: string;
  ref?: RefObject<HTMLInputElement>;
}

const InputField: React.FC<InputFieldComponent> = ({ label, required, className, fieldClass, controlClass, children, ref, value, ...props }) => {
  const Ref = isNone(ref) ? { ref } : {};
  const Props = {
    required,
    ...props
  };

  return (
    <div className={`field ${fieldClass}`}>
      {label !== undefined && <label className="label is-capitalized" style={{ fontSize: ".8em" }}>
        {label}
        {required && <span className="icon is-small has-text-danger small-icon"><i className="fas fa-asterisk"></i></span>}
      </label>}
      <div className={`control ${controlClass}`}>
        <input type="text" value={value || ''} className={`input ${className}`} {...Props} {...Ref} />
        {children}
      </div>
    </div>
  )
};

export default InputField;
