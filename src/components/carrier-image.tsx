import Image from "next/image";
import { CARRIER_IMAGES, CARRIER_THEMES } from '@/lib/types';
import { CarrierSettingsCarrierNameEnum } from 'karrio/rest/index';
import React from 'react';
import { formatRef, isNone, p } from '@/lib/helper';


interface CarrierImageComponent extends React.AllHTMLAttributes<HTMLDivElement> {
  carrier?: CarrierSettingsCarrierNameEnum | string;
  custom_name?: string;
  width?: number;
  height?: number;
}

const CarrierImage: React.FC<CarrierImageComponent> = ({ carrier, custom_name, className, width, height, ...props }) => {
  const carrierImage = CARRIER_IMAGES[carrier || 'generic'];

  const hasImage = !isNone(carrierImage) && carrierImage !== 'generic';
  const useCustom = !hasImage || carrier === 'generic';

  return (
    <>
      {hasImage &&
        <div className='mt-1'>
          <Image
            src={p`/carriers/${CARRIER_IMAGES[carrier || 'generic']}_icon.svg`}
            width={width || 60} height={height || 60} alt={carrier}
          />
        </div>}

      {useCustom &&
        <div
          className={`${className || 'tag has-text-weight-bold p-2'} ${CARRIER_THEMES[carrierImage] || 'is-light'}`}
          {...{ style: { width: width || 60, height: height || 60 }, ...props }}
        >
          {custom_name ? custom_name : formatRef(carrier)}
        </div>}
    </>
  );
};

export default CarrierImage;
