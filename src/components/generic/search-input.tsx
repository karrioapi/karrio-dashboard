import React, { ChangeEvent } from 'react';
import InputField, { InputFieldComponent } from '@/components/generic/input-field';

interface SearchInputComponent extends InputFieldComponent {
  onValueChange?: (value: any) => void;
}

const SearchInput: React.FC<SearchInputComponent> = ({ onValueChange, ...props }) => {
  const collection: any[] = [];

  const onInput = (e: ChangeEvent<any>) => {
    e.preventDefault();
    const value = null;

    onValueChange && onValueChange(value);
  };

  return (
    <InputField onInput={onInput} list="search-input" {...props}>
      <datalist id="search-input">
        {collection
          .map(item => (
            <option key={item.id} value={item}>

            </option>
          ))
        }
      </datalist>
    </InputField>
  )
};

export default SearchInput;
