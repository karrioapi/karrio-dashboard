import React, { useContext } from 'react';
import { APIReference } from '@/context/references-provider';
import Script from 'next/script';


const GoogleGeocodingScript: React.FC = () => {
  const { ADDRESS_AUTO_COMPLETE } = useContext(APIReference) as { ADDRESS_AUTO_COMPLETE: any };

  return (
    <>
      {(ADDRESS_AUTO_COMPLETE?.provider === 'google') &&
        <Script src={`https://maps.googleapis.com/maps/api/js?key=${ADDRESS_AUTO_COMPLETE.key}&libraries=places`}></Script>
      }
    </>
  )
};

export default GoogleGeocodingScript;
