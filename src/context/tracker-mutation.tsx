import { TrackingStatus } from 'karrio/rest/index';
import { handleFailure } from '@/lib/helper';
import { RestContext } from '@/client/context';
import React, { useContext } from 'react';
import { CreateCarrierNameEnum } from 'karrio/rest/generated/apis/TrackersApi';


type TrackerMutator = {
  createTracker: (tracking_number: string, carrier_name: string) => Promise<TrackingStatus>;
  removeTracker: (idOrTrackingNumber: string) => Promise<TrackingStatus>;
};

export const TrackerMutationContext = React.createContext<TrackerMutator>({} as TrackerMutator);

const TrackerMutationProvider: React.FC = ({ children }) => {
  const karrio = useContext(RestContext);

  const createTracker = async (tracking_number: string, carrier_name: string) => handleFailure(
    karrio!.trackers.create({ carrierName: carrier_name as CreateCarrierNameEnum, trackingNumber: tracking_number })
  );
  const removeTracker = async (idOrTrackingNumber: string) => handleFailure(
    karrio!.trackers.remove({ idOrTrackingNumber })
  );

  return (
    <TrackerMutationContext.Provider value={{ createTracker, removeTracker }}>
      {children}
    </TrackerMutationContext.Provider>
  )
};

export default TrackerMutationProvider;
