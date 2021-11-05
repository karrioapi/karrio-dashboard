import React, { useContext } from 'react';
import { APIReference } from '@/context/references-provider';
import Script from 'next/script';


const GoogleGeocodingScript: React.FC = () => {
  const { address_auto_complete } = useContext(APIReference) as { address_auto_complete: any };

  return (
    <>
      {(address_auto_complete?.provider === 'google') &&
        <Script src={`https://maps.googleapis.com/maps/api/js?key=${address_auto_complete.key}&libraries=places`}></Script>
      }
    </>
  )
};

export default GoogleGeocodingScript;
