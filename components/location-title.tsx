import React, { useContext } from 'react';
import { APIReference } from '@/context/references-query';
import { AppMode } from '@/context/app-mode';

interface LocationTitleComponent { }

const LocationTitle: React.FC<LocationTitleComponent> = () => {
  // const References = useContext(APIReference);
  // const { basePath } = useContext(AppMode);

  return (<></>
    // <Location>
    //     {({location}) => {
    //         let title = '';

    //         if (location.pathname.includes('/api_logs')) {
    //             title = '| API Logs';
    //         } else if (location.pathname.includes('/buy_label/')) {
    //             title = '| Buy Label';
    //         } else if(location.pathname.includes('/configurations/parcels')) {
    //             title = '| Parcels';
    //         } else if(location.pathname.includes('/configurations/addresses')) {
    //             title = '| Addresses';
    //         } else if(location.pathname.includes('/configurations/carriers')) {
    //             title = '| Carrier Connections';
    //         } else if(location.pathname.includes('/configurations/customs_infos')) {
    //             title = '| Customs Info';
    //         } else if(location.pathname.includes('/settings/account')) {
    //             title = '| User Account';
    //         } else if(location.pathname.includes('/settings/api')) {
    //             title = '| API Key';
    //         }  else if(location.pathname.includes('/trackers')) {
    //             title = '| Shipment Trackers';
    //         } else if(location.pathname.includes(basePath)) {
    //             title = '| Shipments';
    //         }

    //         document.title = `${References?.app_name || ''} ${title}`;
    //         return <></>;
    //     }}
    // </Location>
  );
};

export default LocationTitle;
