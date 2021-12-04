import { Shipment, ShipmentLabelTypeEnum } from '@/purplship/rest/index';
import React, { useState } from 'react';


type LabelPrinterContextType = {
  printLabel: (shipment: Shipment) => void,
};

export const LabelPrinterContext = React.createContext<LabelPrinterContextType>({} as LabelPrinterContextType);

interface LabelPrinterComponent extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const LabelPrinter: React.FC<LabelPrinterComponent> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [shipment, setShipment] = useState<Shipment>();

  const printLabel = (shipment: Shipment) => {
    setIsActive(true);
    setShipment(shipment);
  };
  const close = (evt?: React.MouseEvent) => {
    evt?.preventDefault();
    setIsActive(false);
    setShipment(undefined);
  };
  const conputeSource = (shipment: Shipment) => {
    const label_type = shipment?.label_type || ShipmentLabelTypeEnum.Pdf;
    const format = {
      [ShipmentLabelTypeEnum.Pdf]: 'application/pdf',
      [ShipmentLabelTypeEnum.Zpl]: 'application/zpl'
    }[label_type];

    return `data:${format};base64, ${encodeURI(shipment.label as string)}`;
  };

  return (
    <>
      <LabelPrinterContext.Provider value={{ printLabel }}>
        {children}
      </LabelPrinterContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={close}></div>
        <div className="label-container">

          {isActive && <iframe src={conputeSource(shipment as Shipment)} height="100%" width="100%"></iframe>}

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </>
  )
};

export default LabelPrinter;
