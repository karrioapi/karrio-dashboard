import React from 'react';
import { formatParcelLabel, formatDimension, formatWeight } from '@/lib/helper';
import { ParcelType } from '@/lib/types';

interface ParcelDescriptionComponent {
  parcel?: ParcelType;
}

const ParcelDescription: React.FC<ParcelDescriptionComponent> = ({ parcel }) => {
  return (
    <>
      <p className="is-size-7 my-1 has-text-weight-semibold">{formatParcelLabel(parcel)}</p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">{formatDimension(parcel)}</p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">{formatWeight(parcel)}</p>
    </>
  );
};

export default ParcelDescription;
