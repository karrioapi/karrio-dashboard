import Image from "next/image";
import { CARRIER_IMAGES, CARRIER_THEMES } from '@/lib/types';
import { CarrierNameEnum } from 'karrio/rest/index';
import React, { useContext } from 'react';
import { APIReference } from '@/context/references-provider';
import { formatCarrierSlug, isNone, p } from '@/lib/helper';


interface CarrierBadgeComponent extends React.AllHTMLAttributes<HTMLDivElement> {
  carrier?: CarrierNameEnum | string;
  custom_name?: string;
  short?: boolean;
  textOnly?: boolean;
}

const CarrierBadge: React.FC<CarrierBadgeComponent> = ({ carrier, custom_name, textOnly, short, className, ...props }) => {
  const name = CARRIER_IMAGES[carrier || 'generic'];

  return (
    <div className='mt-1'>
      <Image src={p`/carriers/${name || custom_name || carrier}_logo.svg`} height="25" width="100" alt="carrier logo" />
    </div>
  );
};

export default CarrierBadge;
