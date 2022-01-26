import { Collection } from '@/lib/types';
import { CarrierSettingsCarrierNameEnum } from '@purplship/rest/index';
import React, { useContext } from 'react';
import { APIReference } from '@/context/references-provider';

const THEME: Collection = {
  'aramex': 'is-aramex',
  'australiapost': 'is-australiapost',
  'boxknight': 'is-boxknight',
  'canadapost': 'is-canadapost',
  'canpar': 'is-canpar',
  'dicom': 'is-dicom',
  'dhl_express': 'is-dhl',
  'dhl_poland': 'is-dhl',
  'dhl_universal': 'is-dhl',
  'eshipper': 'is-eshipper',
  'fedex': 'is-fedex',
  'freightcom': 'is-freightcom',
  'generic': 'is-generic',
  'purolator': 'is-purolator',
  'royalmail': 'is-royalmail',
  'sendle': 'is-sendle',
  'sf_express': 'is-sf_express',
  'tnt': 'is-tnt',
  'ups': 'is-ups',
  'usps': 'is-usps',
  'usps_international': 'is-usps',
  'yanwen': 'is-yanwen',
  'yunexpress': 'is-yunexpress',
};

interface CarrierBadgeComponent extends React.AllHTMLAttributes<HTMLSpanElement> {
  carrier?: CarrierSettingsCarrierNameEnum | string;
  custom_name?: string;
}

const CarrierBadge: React.FC<CarrierBadgeComponent> = ({ carrier, custom_name, className, ...props }) => {
  const { carriers } = useContext(APIReference);
  const name = carrier || '';

  return (
    <>
      {carriers && (
        <strong className={`${className} ${THEME[name] || 'is-light'}`} {...props}>
          {custom_name || (carriers as Collection)[name] || "Not Selected"}
        </strong>
      )}
    </>
  );
};

export default CarrierBadge;
