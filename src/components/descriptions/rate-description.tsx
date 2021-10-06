import React from 'react';
import { Rate } from '@/api/index';
import { formatRef, isNone } from '@/lib/helper';

interface RateDescriptionComponent {
  rate: Rate;
}

const RateDescription: React.FC<RateDescriptionComponent> = ({ rate }) => {
  return (
    <div className="column px-1 py-0 is-size-7 has-text-weight-semibold">
      <h6 className="has-text-weight-bold">
        {((rate.meta as any)?.rate_provider !== rate.carrier_name) && <span>{formatRef(rate.carrier_name)} </span>}
        {formatRef(((rate.meta as any)?.service_name || rate.service) as string)}
      </h6>
      <span>{rate.total_charge} {rate.currency}</span>
      {!isNone(rate.transit_days) && <span> - {rate.transit_days} Transit days</span>}
    </div>
  );
};

export default RateDescription;
