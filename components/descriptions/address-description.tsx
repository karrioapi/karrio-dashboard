import React, { useContext } from 'react';
import { formatAddressName, formatFullAddress } from '@/library/helper';
import { APIReference } from '@/context/references-query';
import { AddressType, Collection } from '@/library/types';

interface AddressDescriptionComponent {
    address: AddressType;
}

const AddressDescription: React.FC<AddressDescriptionComponent> = ({ address }) => {
    const { countries } = useContext(APIReference);
    return (
        <>

            <p className="is-size-7 my-1 has-text-weight-semibold">{formatAddressName(address)}</p>
            <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">{formatFullAddress(address, countries as Collection)}</p>
            <p className="is-size-7 my-1 has-text-weight-semibold has-text-info">{address.email}</p>
            <p className="is-size-7 my-1 has-text-weight-semibold has-text-info">{address.phone_number}</p>

        </>
    );
};

export default AddressDescription;
