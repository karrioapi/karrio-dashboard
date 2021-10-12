import { isNone } from '@/lib/helper';
import React, { useState, useRef, ChangeEvent, useEffect, useCallback } from 'react';


export interface DropdownInputComponent extends React.AllHTMLAttributes<HTMLInputElement> {
  label?: string;
  fieldClass?: string;
  controlClass?: string;
  dropdownClass?: string;
  items?: [string, string][];
  onValueChange: (value?: string | null) => void;
}


const DropdownInput: React.FC<DropdownInputComponent> = ({ label, name, items, value, fieldClass, controlClass, dropdownClass, required, onValueChange, ...props }) => {
  const btn = useRef<any>(null);
  const control = useRef<any>(null);
  const [key, setKey] = useState<string>(`dropdown-${Date.now()}`);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [country, setValue] = useState<string>();

  const find = useCallback((country: string) => {
    return items?.find(([key, val]) => key.toLowerCase() == country.toLowerCase() || val.toLowerCase() == country.toLowerCase())
  }, [items]);
  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isActive) {
      setIsActive(true);
      document.addEventListener('click', onBodyClick);
    }
    setTimeout(() => {
      control.current.focus();
      control.current.select();
    });
  };
  const onBodyClick = (e: MouseEvent) => {
    if (e.target !== btn.current && e.target !== control.current) {
      setIsActive(false);
      setSearch("");
      setKey(`dropdown-${Date.now()}`);
      document.removeEventListener('click', onBodyClick);
    }
  };
  const onSearch = (e: ChangeEvent<any>) => {
    setSearch(e.target.value as string);
  };
  const onRefChange = (e: ChangeEvent<any>) => {
    e.preventDefault();
    const [key, country] = find(e.target.value) || [];
    setValue(country || "");
    onValueChange(key as string);
  };
  const onSelect = (key: string) => (_: React.MouseEvent) => {
    setValue(key);
    onValueChange(key);
  };

  useEffect(() => {
    if (!isNone(items) && !isNone(value)) {
      const [_, country] = find(value as string) || [];
      setValue(country);
    }
  }, [items, value, find]);

  return (
    <div className={`field ${fieldClass}`} key={key}>
      {label !== undefined && <label className="label is-capitalized" style={{ fontSize: ".8em" }}>
        {label}
        {required && <span className="icon is-small has-text-danger small-icon"><i className="fas fa-asterisk"></i></span>}
      </label>}
      <div className={`control ${controlClass}`}>
        <div className={`dropdown select is-fullwidth ${isActive ? 'is-active' : ''} ${dropdownClass}`} key={`dropdown-input-${key}`}>
          <input name={name} onChange={onRefChange} value={country || ''} className="input is-fullwidth" style={{ position: 'absolute', zIndex: -1 }} required={required} />
          <a onClick={handleOnClick} aria-haspopup="true" className="dropdown-trigger input is-fullwidth px-2" style={{ justifyContent: 'left' }} aria-controls={`dropdown-input-`} ref={btn}>
            <span>{country}</span>
          </a>

          <div className="dropdown-menu py-0" id={`dropdown-input-${key}`} role="menu" style={{ right: 0, left: 0 }}>
            <div className="dropdown-content py-0">

              <div className="panel-block px-1 py-1">
                <p className="control">
                  <input className="input" type="text" defaultValue={search || ''} onInput={onSearch} ref={control} />
                </p>
              </div>
              <nav className="panel dropped-panel">
                {(items || [])
                  .filter(([_, val]) => search === "" || val.toLowerCase().includes(search.toLowerCase()))
                  .map(([key, val], index) => (
                    <a key={`${key}-${Date.now()}`}
                      tabIndex={index}
                      onClick={onSelect(key)}
                      className={`panel-block  ${key === country ? 'is-active' : ''}`}>
                      <span>{val}</span>
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
};

export default DropdownInput;
