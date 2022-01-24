import React from 'react';
import { formatCommodity } from '@/lib/helper';
import { CommodityType } from '@/lib/types';

interface CommodityDescriptionComponent {
  commodity: CommodityType;
}

const CommodityDescription: React.FC<CommodityDescriptionComponent> = ({ commodity }) => {
  return (
    <>
      <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {formatCommodity(commodity)}
      </p>
    </>
  );
};

export default CommodityDescription;
