import React from 'react';
import { formatWeight, isNoneOrEmpty } from '@/lib/helper';
import { CommodityType } from '@/lib/types';

interface CommodityDescriptionComponent {
  commodity: CommodityType;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const CommodityDescription: React.FC<CommodityDescriptionComponent> = ({ commodity, prefix, suffix, className }) => {
  return (
    <div className={`is-flex ${className || ''}`}>
      <div className="is-flex-grow-3 p-0">
        <p className="is-size-7 my-1 has-text-weight-semibold">
          {prefix} {isNoneOrEmpty(commodity.description) ? 'Item' : commodity.description} {suffix}
        </p>
        <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
          {isNoneOrEmpty(commodity.sku) ? ' SKU: 0000000' : ` SKU: ${commodity.sku}`}
          {!isNoneOrEmpty(commodity.metadata?.ship_qty) && ` | SHIP QTY: ${commodity.metadata?.ship_qty}`}
        </p>
      </div>

      <div className="is-flex-grow-1 p-0 has-text-right" style={{ minWidth: '90px' }}>
        <span className="is-size-7 my-1 has-text-weight-semibold">
          {commodity.quantity}{' x '}{formatWeight(commodity)}
        </span>
      </div>
    </div>
  );
};

export default CommodityDescription;
