import React from 'react';
import { formatWeight, isNone } from '@/library/helper';
import { CommodityType } from '@/library/types';

interface CommodityDescriptionComponent {
    commodity?: CommodityType;
}

const CommodityDescription: React.FC<CommodityDescriptionComponent> = ({ commodity }) => {
    return (
        <>
            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold">SKU: {commodity?.sku}</p>
            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                {isNone(commodity?.value_amount) ? '' : <>
                    <span>Value (
                        {commodity?.quantity} x <strong>{commodity?.value_amount} {commodity?.value_currency}</strong>
                    ) | </span>
                </>}
                {formatWeight(commodity)}
            </p>
        </>
    );
};

export default CommodityDescription;
