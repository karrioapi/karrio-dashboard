import EventsProvider from '@/context/events-provider';
import LogsProvider from '@/context/logs-provider';
import MetadataMutationProvider from '@/context/metadata-mutation';
import ShipmentProvider from '@/context/shipment-provider';
import { useLocation } from '@/lib/helper';
import { ShipmentComponent } from '@/views/shipment';
import React, { useState } from 'react';
import ConfirmModal from '@/components/confirm-modal';

type ShipmentPreviewContextType = {
  previewShipment: (shipmentId: string) => void,
};

interface ShipmentPreviewComponent { }

export const ShipmentPreviewContext = React.createContext<ShipmentPreviewContextType>({} as ShipmentPreviewContextType);

const ShipmentPreview: React.FC<ShipmentPreviewComponent> = ({ children }) => {
  const { addUrlParam, removeUrlParam } = useLocation();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`shipment-${Date.now()}`);
  const [shipmentId, setShipmentId] = useState<string>();

  const previewShipment = (shipmentId: string) => {
    setShipmentId(shipmentId);
    setIsActive(true);
    setKey(`shipment-${Date.now()}`);
    addUrlParam('modal', shipmentId);
  };
  const dismiss = (_?: any) => {
    setShipmentId(undefined);
    setIsActive(false);
    setKey(`shipment-${Date.now()}`);
    removeUrlParam('modal');
  };

  return (
    <>
      <ShipmentPreviewContext.Provider value={{ previewShipment }}>
        {children}
      </ShipmentPreviewContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background" onClick={dismiss}></div>

        {(isActive && shipmentId) && <div className="modal-card is-medium-modal">
          <section className="modal-card-body px-5 pt-0 pb-6">
            <ShipmentProvider>
              <EventsProvider setVariablesToURL={false}>
                <LogsProvider setVariablesToURL={false}>
                  <MetadataMutationProvider>
                    <ConfirmModal>

                      <ShipmentComponent shipmentId={shipmentId} />

                    </ConfirmModal>
                  </MetadataMutationProvider>
                </LogsProvider>
              </EventsProvider>
            </ShipmentProvider>
          </section>
        </div>}

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={dismiss}></button>

      </div>
    </>
  )
};

export default ShipmentPreview;
