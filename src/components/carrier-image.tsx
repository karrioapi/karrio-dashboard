import { CarrierNameEnum } from '@karrio/rest';
import Image from "next/legacy/image";
import { p } from '@/lib/helper';
import React from 'react';


interface CarrierImageComponent extends React.AllHTMLAttributes<HTMLImageElement> {
  carrier_name?: CarrierNameEnum | string;
}

const CarrierImage: React.FC<CarrierImageComponent> = ({ carrier_name, className, width, height, ...props }) => {
  return (
    <div className='m-1'>
      <Image
        src={p`/carriers/${carrier_name as string}_icon.svg`}
        width={width as number || 60} height={height as number || 60}
        alt={carrier_name}
      />
    </div>
  );
};

export default CarrierImage;
