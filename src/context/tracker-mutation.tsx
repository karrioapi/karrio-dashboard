import { CarrierNameEnum, TrackingStatus } from 'karrio/rest/index';
import { handleFailure } from '@/lib/helper';
import { RestContext } from '@/client/context';
import React, { useContext } from 'react';


type TrackerMutator = {
  createTracker: (tracking_number: string, carrier_name: string) => Promise<AxiosResponse<TrackingStatus, any>>;
  removeTracker: (idOrTrackingNumber: string) => Promise<AxiosResponse<TrackingStatus, any>>;
};

export const TrackerMutationContext = React.createContext<TrackerMutator>({} as TrackerMutator);

const TrackerMutationProvider: React.FC = ({ children }) => {
  const karrio = useContext(RestContext);

  const createTracker = async (tracking_number: string, carrier_name: string) => handleFailure(
    karrio!.trackers
      .create({ carrierName: carrier_name as any, trackingNumber: tracking_number })
      .then(({ data }) => data)
  );
  const removeTracker = async (idOrTrackingNumber: string) => handleFailure(
    karrio!.trackers.remove({ idOrTrackingNumber }).then(({ data }) => data)
  );

  return (
    <TrackerMutationContext.Provider value={{ createTracker, removeTracker }}>
      {children}
    </TrackerMutationContext.Provider>
  )
};

export default TrackerMutationProvider;
