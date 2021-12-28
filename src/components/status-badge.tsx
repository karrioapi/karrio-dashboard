import { ShipmentStatusEnum } from '@purplship/rest/index';
import React from 'react';

interface StatusBadgeComponent extends React.AllHTMLAttributes<HTMLSpanElement> {
  status?: string | ShipmentStatusEnum;
}

const StatusBadge: React.FC<StatusBadgeComponent> = ({ status, className, ...props }) => {
  const color = {
    "created": "is-info is-light",
    "purchased": "is-info is-light",
    "cancelled": "is-light",
    "shipped": "is-link is-light",
    "in-transit": "is-link is-light",
    "pending": "is-info is-light",
    "delivered": "is-success is-light",
    "incident": "is-error is-light",
  }[status || ""] || "is-light";

  return (
    <span className={`tag is-size-7 is-capitalized ${color} ${className}`} {...props}>{status}</span>
  )
};

export default StatusBadge;
