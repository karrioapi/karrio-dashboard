import React, { useContext, useEffect, useState } from 'react';
import InputField from '@/components/generic/input-field';
import { NotificationType } from '@/lib/types';
import SelectField from '@/components/generic/select-field';
import { APIReference } from '@/context/references-provider';
import { UserConnections, UserConnectionType } from '@/context/user-connections-provider';
import { SystemConnections, SystemConnectionType } from '@/context/system-connections-provider';
import { TrackerMutationContext } from '@/context/tracker-mutation';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';
import { AppMode } from '@/context/app-mode-provider';
import { removeUrlParam } from '@/lib/helper';

type Connection = UserConnectionType | SystemConnectionType;
type OperationType = {
  onChange?: () => void;
};
interface TrackerModalInterface {
  addTracker: (operation?: OperationType) => void;
}

export const TrackerModalContext = React.createContext<TrackerModalInterface>({} as TrackerModalInterface);

const TrackerModalProvider: React.FC<{}> = ({ children }) => {
  const { notify } = useContext(Notify);
  const { carriers } = useContext(APIReference);
  const { loading, setLoading } = useContext(Loading);
  const { testMode } = useContext(AppMode);
  const { createTracker } = useContext(TrackerMutationContext);
  const { user_connections, ...user } = useContext(UserConnections);
  const { system_connections, ...system } = useContext(SystemConnections);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`tracker-${Date.now()}`);
  const [carrier, setCarrier] = useState<Connection>();
  const [trackingNumber, setTrackingNumber] = useState<string>();
  const [operation, setOperation] = useState<OperationType>({} as OperationType);
  const [carrierList, setCarrierList] = useState<Connection[]>([]);

  const addTracker = (operation?: OperationType) => {
    if (!user.loading && user.load) user.load();
    if (!system.loading && system.load) system.load();
    operation && setOperation(operation);
    setIsActive(true);
  };
  const close = ({ updated }: any | { updated?: boolean }) => {
    setIsActive(false);
    setCarrier(undefined);
    setTrackingNumber(undefined);
    setKey(`tracker-${Date.now()}`);
    (updated && operation?.onChange) && operation.onChange();
    removeUrlParam('modal');
  };
  const create = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await createTracker(trackingNumber as string, carrier?.carrier_name as string);
      notify({ type: NotificationType.success, message: 'Tracker successfully added!' });
      close({ updated: true });
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
    setLoading(false);
  };
  const updateCarrier = (carrierId: string) => {
    const carrier = carrierList.find(carrier => carrier?.carrier_id === carrierId);
    setCarrier(carrier);
  };

  useEffect(() => {
    setCarrierList(
      [...(user_connections || []), ...(system_connections || [])]
        .filter(c => (
          c.active &&
          c.test_mode === testMode &&
          c.carrier_name in carriers &&
          c.capabilities.includes('tracking')
        ))
    );
  }, [user_connections, system_connections, testMode]);

  return (
    <>
      <TrackerModalContext.Provider value={{ addTracker }}>
        {children}
      </TrackerModalContext.Provider>

      <Notifier>
        <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
          <div className="modal-background" onClick={close}></div>
          {isActive && <form className="modal-card" onSubmit={create}>
            <section className="modal-card-body modal-form">
              <div className="form-floating-header p-4">
                <span className="has-text-weight-bold is-size-6">Track package</span>
              </div>
              <div className="p-3 my-4"></div>

              <InputField label="Tracking Number" defaultValue="" onChange={e => setTrackingNumber(e.target.value)} fieldClass="mt-6" required />

              {carrierList.length > 0 &&
                <SelectField label="Carrier" onChange={e => updateCarrier(e.target.value)} className="is-fullwidth" required>
                  <option value="">Select a carrier</option>

                  {carrierList
                    .map((carrier, index) => (
                      <option key={index} value={carrier.carrier_id}>
                        {`${(carriers as any)[carrier.carrier_name]} ${carrier.test_mode ? '(Sandbox)' : ''}`}
                      </option>
                    ))}
                </SelectField>}

              {(!user.loading && !system.loading && carrierList.length === 0) && <div className="notification is-warning">
                No {testMode ? 'carrier (Sandbox)' : 'carrier'} connections available to process tracking requests.
              </div>}

              <div className="p-3 my-5"></div>
              <div className="form-floating-footer has-text-centered p-1">
                <button className="button is-default m-1 is-small" onClick={close} disabled={loading}>
                  <span>Cancel</span>
                </button>
                <button className={`button is-primary ${loading ? 'is-loading' : ''} m-1 is-small`}
                  disabled={loading} type="submit">
                  <span>Submit</span>
                </button>
              </div>

            </section>
          </form>}

          <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
        </div>
      </Notifier>
    </>
  )
};

export default TrackerModalProvider;
