import React from 'react';
import { formatWeight, isNoneOrEmpty } from '@/lib/helper';
import { CommodityType } from '@/lib/types';

interface CommodityDescriptionComponent {
  commodity: CommodityType;
  suffix?: string;
}

const CommodityDescription: React.FC<CommodityDescriptionComponent> = ({ commodity, suffix }) => {
  return (
    <div className="columns is-multiline m-0">
      <div className="column is-8 p-0">
        <p className="is-size-7 my-1 has-text-weight-semibold">
          {isNoneOrEmpty(commodity.description) ? 'Item' : commodity.description} {suffix}
        </p>
        <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
          {isNoneOrEmpty(commodity.sku) ? ' SKU: 0000000' : ` SKU: ${commodity.sku}`}
          {!isNoneOrEmpty(commodity.metadata?.ship_qty) && ` | SHIP QTY: ${commodity.metadata?.ship_qty}`}
        </p>
      </div>

      <div className="column is-4 p-0">
        <span className="is-size-7 my-1 has-text-weight-semibold">
          {commodity.quantity}{' x '}{formatWeight(commodity)}
        </span>
      </div>
    </div>
  );
};

export default CommodityDescription;
