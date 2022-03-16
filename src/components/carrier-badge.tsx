import { Collection } from '@/lib/types';
import { CarrierSettingsCarrierNameEnum } from 'karrio/rest/index';
import React, { useContext } from 'react';
import { APIReference } from '@/context/references-provider';
import { formatCarrierSlug } from '@/lib/helper';

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

interface CarrierBadgeComponent extends React.AllHTMLAttributes<HTMLDivElement> {
  carrier?: CarrierSettingsCarrierNameEnum | string;
  custom_name?: string;
  short?: boolean;
}

const CarrierBadge: React.FC<CarrierBadgeComponent> = ({ carrier, custom_name, short, className, ...props }) => {
  const { carriers } = useContext(APIReference);
  const name = carrier || '';

  return (
    <div className={`${className} ${THEME[name] || 'is-light'}`} {...props}>
      {custom_name
        ? (short ? formatCarrierSlug(custom_name) : custom_name)
        : (carriers as Collection)[name] || "Not Selected"}
    </div>
  );
};

export default CarrierBadge;
