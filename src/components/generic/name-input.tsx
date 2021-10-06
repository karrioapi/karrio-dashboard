import React, { ChangeEvent, useContext, useEffect } from 'react';
import InputField, { InputFieldComponent } from '@/components/generic/input-field';
import { formatAddress, isNone } from '@/lib/helper';
import { Address } from '@/api/index';
import { AddressTemplates } from '@/context/address-templates-provider';

interface NameInputComponent extends InputFieldComponent {
  onValueChange: (value: Partial<Address>, refresh?: boolean) => void;
  defaultValue?: string;
  disableSuggestion?: boolean;
}

const NameInput: React.FC<NameInputComponent> = ({ disableSuggestion, onValueChange, ...props }) => {
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => e.currentTarget.select();
  const { templates, loading, load } = useContext(AddressTemplates);
  const onInput = (e: ChangeEvent<any>) => {
    e.preventDefault();
    const template = (templates || []).find(t => t.address?.person_name === e.target.value);
    let value = template?.address || { person_name: e.target.value };
    onValueChange(value as Partial<Address>, !isNone(template));
  };

  useEffect(() => { if (!loading && load) load(); }, [templates, load]);

  return (
    <InputField onInput={onInput} onClick={onClick} list="address_templates" {...props}>
      {!disableSuggestion && <datalist id="address_templates">
        {(templates || [])
          .map(template => (
            <option key={template.id} value={template.address?.person_name as string}>{template.label} - {formatAddress(template?.address as any)}</option>
          ))
        }
      </datalist>}
    </InputField>
  )
};

export default NameInput;
