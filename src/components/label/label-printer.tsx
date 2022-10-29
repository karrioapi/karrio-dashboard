import { KARRIO_API } from '@/client/context';
import { ShipmentType } from '@/lib/types';
import React, { useState } from 'react';


type LabelPrinterContextType = {
  printLabel: (shipment: ShipmentType) => void,
};

export const LabelPrinterContext = React.createContext<LabelPrinterContextType>({} as LabelPrinterContextType);

interface LabelPrinterComponent extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const LabelPrinter: React.FC<LabelPrinterComponent> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [shipment, setShipment] = useState<ShipmentType>();

  const printLabel = (shipment: ShipmentType) => {
    setIsActive(true);
    setShipment(shipment);
  };
  const close = (evt?: React.MouseEvent) => {
    evt?.preventDefault();
    setIsActive(false);
    setShipment(undefined);
  };

  return (
    <>
      <LabelPrinterContext.Provider value={{ printLabel }}>
        {children}
      </LabelPrinterContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={close}></div>
        <div className="label-container">

          {isActive && <iframe
            width="100%"
            height="100%"
            src={`${KARRIO_API}${shipment?.label_url}`}
          >
          </iframe>}

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </>
  )
};

export default LabelPrinter;
