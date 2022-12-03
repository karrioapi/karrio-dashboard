import Image from "next/image";
import { CARRIER_IMAGES, CARRIER_THEMES } from '@/lib/types';
import { CarrierSettingsCarrierNameEnum } from 'karrio/rest/index';
import React, { useContext } from 'react';
import { APIReference } from '@/context/references-provider';
import { formatCarrierSlug, isNone, p } from '@/lib/helper';


interface CarrierBadgeComponent extends React.AllHTMLAttributes<HTMLDivElement> {
  carrier?: CarrierSettingsCarrierNameEnum | string;
  custom_name?: string;
  short?: boolean;
  textOnly?: boolean;
}

const CarrierBadge: React.FC<CarrierBadgeComponent> = ({ carrier, custom_name, textOnly, short, className, ...props }) => {
  const { carriers } = useContext(APIReference) as any;
  const name = CARRIER_IMAGES[carrier || 'generic'];
  const carrier_name = carriers[carrier as string];

  const hasImage = !textOnly && (!isNone(name) && name !== 'generic');
  const useText = (!hasImage && textOnly) || (!hasImage && (!isNone(carrier_name) || carrier_name === 'Generic')) || !hasImage;

  return (
    <>
      {hasImage &&
        <div className='mt-1'>
          <Image src={p`/carriers/${name || custom_name || carrier}_logo.svg`} height="25" width="100" alt="carrier logo" />
        </div>}

      {useText &&
        <div className={`${className} ${CARRIER_THEMES[name] || 'is-generic'}`} {...props}>
          {custom_name
            ? (short ? formatCarrierSlug(custom_name) : custom_name)
            : carrier_name || carrier}
        </div>}
    </>
  );
};

export default CarrierBadge;
