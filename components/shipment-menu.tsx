import React, { useState, useRef, useContext } from 'react';
import { Shipment, ShipmentStatusEnum } from '@/api/index';
import { LabelPrinterContext } from '@/components/label/label-printer';
import { NotificationType } from '@/lib/types';
import ShipmentMutation from '@/context/shipment-mutation';
import { Notify } from '@/components/notifier';
import { Shipments } from '@/context/shipments-provider';
import { isNone } from '@/lib/helper';
import { AppMode } from '@/context/app-mode-provider';
import { CustomInvoicePrinterContext } from './descriptions/custom-invoice-printer';
import { useRouter } from 'next/dist/client/router';


interface ShipmentMenuComponent extends React.InputHTMLAttributes<HTMLDivElement> {
  shipment: Shipment;
}


const ShipmentMenu: React.FC<ShipmentMenuComponent> = ShipmentMutation<ShipmentMenuComponent>(({ shipment, voidLabel, className }) => {
  const router = useRouter();
  const { notify } = useContext(Notify);
  const { basePath } = useContext(AppMode);
  const { printLabel } = useContext(LabelPrinterContext);
  const { printInvoice } = useContext(CustomInvoicePrinterContext);
  const shipments = useContext(Shipments);
  const btn = useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = useState(false);

  const handleOnClick = (e: React.MouseEvent) => {
    if (!isActive) {
      setIsActive(true);
      document.addEventListener('click', onBodyClick);
    }
    e.preventDefault();
    e.stopPropagation();
  };
  const onBodyClick = (e: MouseEvent) => {
    if (e.target !== btn.current) {
      setIsActive(false);
      document.removeEventListener('click', onBodyClick);
    }
  };
  const createLabel = (_: React.MouseEvent) => {
    router.push(basePath + '/buy_label/' + shipment.id);
  };
  const displayDetails = (_: React.MouseEvent) => {
    router.push(basePath + '/shipments/' + shipment.id);
  };
  const cancelShipment = (shipment: Shipment) => async (e: React.MouseEvent) => {
    try {
      await voidLabel(shipment);
      notify({ type: NotificationType.success, message: 'Shipment successfully cancelled!' });
      shipments.refetch();
    } catch (err: any) {
      notify({ type: NotificationType.error, message: err });
    }
  };

  return (
    <div className={`buttons has-addons ${className}`}>

      {!isNone(shipment.label) && <>
        <a className="button is-small" onClick={() => printLabel(shipment)} style={{ width: '70%' }}>
          <span>Print Label</span>
        </a>
      </>}
      {isNone(shipment.label) && shipment.status === ShipmentStatusEnum.Created && <>
        <a className="button is-small" onClick={createLabel} style={{ width: '70%' }}>
          <span>Buy Label</span>
        </a>
      </>}
      {isNone(shipment.label) && shipment.status === ShipmentStatusEnum.Cancelled && <>
        <a className="button is-small" onClick={displayDetails} style={{ width: '70%' }}>
          <span>View Shipment</span>
        </a>
      </>}

      <div className={`dropdown is-right ${isActive ? 'is-active' : ''}`} key={`menu-${shipment.id}`}>
        <div className="dropdown-trigger">
          <button
            id={shipment.id}
            className="button is-small"
            aria-haspopup="true"
            aria-controls={`shipment-menu-${shipment.id}`}
            onClick={handleOnClick}
            ref={btn}>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>

        <div className="dropdown-menu" id={`shipment-menu-${shipment.id}`} role="menu">
          <div className="dropdown-content">
            <a className="dropdown-item" onClick={displayDetails}>View Shipment</a>
            {shipment.status !== ShipmentStatusEnum.Cancelled &&
              <a className="dropdown-item" onClick={cancelShipment(shipment)}>Cancel Shipment</a>}
            {!isNone((shipment?.meta as any).custom_invoice) &&
              <a className="dropdown-item" onClick={() => printInvoice(shipment)}>Print Invoice</a>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ShipmentMenu;
