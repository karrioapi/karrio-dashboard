import { Operation, TrackingStatus } from '@/api/index';
import { handleFailure } from '@/lib/helper';
import { RestContext } from '@/client/context';
import React, { useContext } from 'react';


type TrackerMutator<T> = T & {
  createTracker: (tracking_number: string, carrier_name: string, test: boolean) => Promise<TrackingStatus>;
  removeTracker: (id: string) => Promise<Operation>;
}

const TrackerMutation = <T extends {}>(Component: React.FC<TrackerMutator<T>>) => (
  function TrackerMutationWrapper({ children, ...props }: any) {
    const purplship = useContext(RestContext);

    const createTracker = async (tracking_number: string, carrier_name: string, test: boolean) => handleFailure(
      purplship!.trackers.create({ carrierName: carrier_name, trackingNumber: tracking_number, test })
    );
    const removeTracker = async (idOrTrackingNumber: string) => handleFailure(
      purplship!.trackers.remove({ idOrTrackingNumber })
    );

    return (
      <Component {...props}
        createTracker={createTracker}
        removeTracker={removeTracker}
      >
        {children}
      </Component>
    );
  }
);

export default TrackerMutation;
