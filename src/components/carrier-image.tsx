import { CarrierSettingsCarrierNameEnum } from 'karrio/rest/index';
import { CARRIER_IMAGES, CARRIER_THEMES } from '@/lib/types';
import { formatCarrierSlug, isNone, p } from '@/lib/helper';
import Image from "next/image";
import React from 'react';


interface CarrierImageComponent extends React.AllHTMLAttributes<HTMLDivElement> {
  carrier?: CarrierSettingsCarrierNameEnum | string;
  custom_name?: string;
  width?: number;
  height?: number;
}

const CarrierImage: React.FC<CarrierImageComponent> = ({ carrier, custom_name, className, width, height, ...props }) => {
  const carrierImage = CARRIER_IMAGES[carrier || 'generic'];

  return (
    <div className='m-1'>
      <Image
        src={p`/carriers/${CARRIER_IMAGES[carrierImage || custom_name || carrier as string]}_icon.svg`}
        width={width || 60} height={height || 60} alt={carrier}
      />
    </div>
  );
};

export default CarrierImage;
