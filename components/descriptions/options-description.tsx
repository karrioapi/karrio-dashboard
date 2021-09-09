import { formatDate, isNone } from '@/lib/helper';
import React from 'react';

interface OptionsDescriptionComponent {
  options: any;
}

const OptionsDescription: React.FC<OptionsDescriptionComponent> = ({ options }) => {
  return (
    <>
      <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(options.shipment_date) ? '' : <span>Shipment Date: <strong>{` ${formatDate(options.shipment_date)}`}</strong></span>}
      </p>
      <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(options.currency) ? '' : <span>Preferred Currency: <strong>{` ${options.currency}`}</strong></span>}
      </p>
      <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(options.signature_confirmation) ? '' : <span>Signature Confirmation <strong>Required</strong></span>}
      </p>
      <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(options.insurance) ? '' : <>
          <span>Insurance (Coverage Amount <strong>{options.insurance} {options.currency}</strong>)</span>
        </>}
      </p>
      <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(options.declared_value) ? '' : <span>Declared Value: <strong>{` ${options.declared_value} ${options.currency}`}</strong></span>}
      </p>
      <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(options.cash_on_delivery) ? '' : <>
          <span>Amount To Collect <strong>{options.cash_on_delivery}{options.currency}</strong></span>
        </>}
      </p>
    </>
  );
};

export default OptionsDescription;
