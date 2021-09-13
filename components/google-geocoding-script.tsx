import React, { useContext } from 'react';
import Image from 'next/image';
import { APIReference } from '@/context/references-provider';
import Head from 'next/head';


const GoogleGeocodingScript: React.FC = () => {
  const { address_auto_complete } = useContext(APIReference);

  return (
    <>
        {(address_auto_complete?.provider  === 'google') && <Head>
            <script src={`https://maps.googleapis.com/maps/api/js?key=${ address_auto_complete.key }&libraries=places`}></script>
        </Head>}
    </>
  )
};

export default GoogleGeocodingScript;
