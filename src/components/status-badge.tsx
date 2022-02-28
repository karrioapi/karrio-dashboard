import { ShipmentStatusEnum } from '@purplship/rest/index';
import React from 'react';

interface StatusBadgeComponent extends React.AllHTMLAttributes<HTMLSpanElement> {
  status?: string | ShipmentStatusEnum;
}

const StatusBadge: React.FC<StatusBadgeComponent> = ({ status, className, ...props }) => {
  const color = {
    "created": "is-primary is-light",
    "cancelled": "is-light",
    "partial": "is-info is-light",
    "purchased": "is-info is-light",
    "in-transit": "is-info is-light",
    "in_transit": "is-info is-light",
    "transit": "is-info is-light",
    "pending": "is-primary is-light",
    "fulfilled": "is-success is-light",
    "delivered": "is-success is-light",
    "shipped": "is-success is-light",
    "incident": "is-error is-light",
  }[status || ""] || "is-light";

  return (
    <span className={`tag is-size-7 is-capitalized has-text-weight-semibold ${color} ${className}`} {...props}>{status}</span>
  )
};

export default StatusBadge;
