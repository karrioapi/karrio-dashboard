import { CARRIER_IMAGES } from '@/lib/types';
import { p } from '@/lib/helper';
import Image from "next/image";
import React from 'react';


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
