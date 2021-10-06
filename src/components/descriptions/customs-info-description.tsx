import React from 'react';
import { formatCustomsLabel, formatRef, isNone } from '@/lib/helper';
import { CustomsType } from '@/lib/types';

interface CustomsInfoDescriptionComponent {
  customs: CustomsType;
}

const CustomsInfoDescription: React.FC<CustomsInfoDescriptionComponent> = ({ customs }) => {
  return (
    <>

      <p className="is-size-7 my-1 has-text-weight-semibold">{formatCustomsLabel(customs)}</p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(customs?.aes) ? '' : <span>AES: <strong>{customs.aes}</strong></span>}
      </p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(customs?.eel_pfc) ? '' : <span>EEL / PFC: <strong>{customs.eel_pfc}</strong></span>}
      </p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(customs?.invoice) ? '' : <span>Invoice Number: <strong>{customs.invoice}</strong></span>}
      </p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(customs?.invoice_date) ? '' : <span>Invoice Date: <strong>{customs.invoice_date}</strong></span>}
      </p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(customs?.certificate_number) ? '' : <span>Certificate Number: <strong>{customs.certificate_number}</strong></span>}
      </p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(customs.duty) ? '' : <span>Duties paid by <strong>{formatRef('' + customs.duty?.paid_by)}</strong></span>}
      </p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {!customs?.certify ? '' : <span>Certified and Signed By <strong>{customs.signer}</strong></span>}
      </p>
      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">
        {isNone(customs?.content_description) ? '' : <span><strong>Content:</strong> {customs.content_description}</span>}
      </p>

    </>
  );
};

export default CustomsInfoDescription;
