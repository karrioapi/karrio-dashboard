import React, { useState, useRef, useContext } from 'react';
import { DocumentTemplateType, ShipmentType } from '@/lib/types';
import { ShipmentsContext } from '@/context/shipments-provider';
import { isNone } from '@/lib/helper';
import { AppMode } from '@/context/data/mode-context';
import { useRouter } from 'next/dist/client/router';
import { ShipmentMutationContext } from '@/context/shipment-mutation';
import { ShipmentStatusEnum } from 'karrio/graphql';
import { KARRIO_API } from '@/client/context';
import { ConfirmModalContext } from '@/components/confirm-modal';


interface ShipmentMenuComponent extends React.InputHTMLAttributes<HTMLDivElement> {
  shipment: ShipmentType;
  templates?: DocumentTemplateType[];
  isViewing?: boolean;
}


const ShipmentMenu: React.FC<ShipmentMenuComponent> = ({ shipment, templates, isViewing }) => {
  const router = useRouter();
  const { basePath } = useContext(AppMode);
  const { voidLabel } = useContext(ShipmentMutationContext);
  const { confirm: confirmCancellation } = useContext(ConfirmModalContext);
  const shipments = useContext(ShipmentsContext);
  const trigger = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const handleOnClick = (e: React.MouseEvent) => {
    setIsActive(!isActive);
    if (!isActive) { document.addEventListener('click', onBodyClick); }
    else { document.removeEventListener('click', onBodyClick); }
  };
  const onBodyClick = (e: MouseEvent) => {
    if (!trigger.current?.contains(e.target as Node)) {
      setIsActive(false);
      document.removeEventListener('click', onBodyClick);
    }
  };
  const createLabel = (_: React.MouseEvent) => {
    router.push(basePath + '/create_label?shipment_id=' + shipment.id);
  };
  const displayDetails = (_: React.MouseEvent) => {
    router.push(basePath + '/shipments/' + shipment.id);
  };
  const cancelShipment = (shipment: ShipmentType) => async () => {
    await voidLabel(shipment);
    shipments.loadMore();
  };

  return (
    <div className={`dropdown is-right ${isActive ? 'is-active' : ''}`} key={`menu-${shipment.id}`}>

      <div className="dropdown-trigger" onClick={handleOnClick} ref={trigger}>
        <a className="button is-white is-small p-3">
          <i className={`fas fa-ellipsis-h`} aria-hidden="true"></i>
        </a>
      </div>

      <div className="dropdown-menu" id={`shipment-menu-${shipment.id}`} role="menu">
        <div className="dropdown-content">
          {isNone(shipment.label_url) && shipment.status === ShipmentStatusEnum.draft &&
            <a className="dropdown-item" onClick={createLabel}>
              <span>Buy Label</span>
            </a>}

          {!isNone(shipment.label_url) &&
            <a className="dropdown-item" href={`${KARRIO_API}${shipment?.label_url}`}
              target="_blank" rel="noreferrer">
              <span>Print Label</span>
            </a>}

          {!isViewing &&
            <a className="dropdown-item" onClick={displayDetails}>View Shipment</a>}

          {![ShipmentStatusEnum.cancelled, ShipmentStatusEnum.delivered].includes(shipment.status as any) &&
            <a className="dropdown-item" onClick={() => confirmCancellation({
              identifier: shipment.id as string,
              label: `Cancel Shipment`,
              action: 'Submit',
              onConfirm: cancelShipment(shipment),
            })}>Cancel Shipment</a>}

          {!isNone(shipment.invoice_url) &&
            <a className="dropdown-item" href={`${KARRIO_API}${shipment.invoice_url}`}
              target="_blank" rel="noreferrer">Print Invoice</a>}

          {templates && templates.length > 0 &&
            <hr className="my-1" style={{ height: '1px' }} />}

          {(templates || []).map(template =>
            <a href={`${KARRIO_API}/documents/${template.id}.${template.slug}?shipments=${shipment.id}`}
              className="dropdown-item" target="_blank" rel="noreferrer" key={template.id}>
              Download {template.name}
            </a>
          )}
        </div>
      </div>

    </div>
  );
};

export default ShipmentMenu;
