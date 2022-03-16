import { KARRIO_API } from '@/client/context';
import { ShipmentType } from '@/lib/types';
import React, { useState } from 'react';


type CustomInvoicePrinterContextType = {
  printInvoice: (shipment: ShipmentType) => void,
};

export const CustomInvoicePrinterContext = React.createContext<CustomInvoicePrinterContextType>({} as CustomInvoicePrinterContextType);

interface CustomInvoicePrinterComponent extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const CustomInvoicePrinter: React.FC<CustomInvoicePrinterComponent> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [shipment, setShipment] = useState<ShipmentType>();

  const printInvoice = (shipment: ShipmentType) => {
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
      <CustomInvoicePrinterContext.Provider value={{ printInvoice }}>
        {children}
      </CustomInvoicePrinterContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={close}></div>
        <div className="label-container">

          {isActive && <iframe
            width="100%"
            height="100%"
            src={`${KARRIO_API}${shipment?.invoice_url}`}
          >
          </iframe>}

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </>
  )
};

export default CustomInvoicePrinter;
