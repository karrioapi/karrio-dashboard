import { CarrierSettingsCarrierNameEnum } from 'karrio/rest/index';
import { CARRIER_IMAGES } from '@/lib/types';
import Image from "next/legacy/image";
import { p } from '@/lib/helper';
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
        src={p`/carriers/${carrierImage || custom_name || carrier as string}_icon.svg`}
        width={width || 60} height={height || 60} alt={carrier}
      />
    </div>
  );
};

export default CarrierImage;
