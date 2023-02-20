import { formatAddressName, formatFullAddress } from '@/lib/helper';
import { useAPIReference } from '@/context/api-metadata';
import { AddressType, Collection } from '@/lib/types';
import React from 'react';

interface AddressDescriptionComponent {
  address: AddressType;
}

const AddressDescription: React.FC<AddressDescriptionComponent> = ({ address }) => {
  const { countries } = useAPIReference();
  return (
    <>

      <p className="is-size-7 my-1 has-text-weight-semibold">{formatAddressName(address)}</p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">{formatFullAddress(address, countries as Collection)}</p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">{address.email}</p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">{address.phone_number}</p>

    </>
  );
};

export default AddressDescription;
