import DropdownInput, { DropdownInputComponent } from '@/components/generic/dropdown-input';
import { useAPIReference } from '@/context/reference';
import React, { useEffect, useState } from 'react';
import { Collection } from '@/lib/types';
import { isNone } from '@/lib/helper';

interface CountryInputComponent extends Omit<DropdownInputComponent, 'items'> { }

const CountryInput: React.FC<CountryInputComponent> = ({ name, ...props }) => {
  const { countries } = useAPIReference();
  const [items, setItems] = useState<[string, string][]>();

  useEffect(() => {
    if (!isNone(countries)) {
      setItems(Object.entries(countries as Collection).map((value) => value));
    }
  }, [countries]);

  return (
    <DropdownInput name={name || 'country'} items={items} {...props} />
  )
};

export default CountryInput;
