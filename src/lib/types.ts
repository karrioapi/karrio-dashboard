import { CurrencyCodeEnum, DimensionUnitEnum, get_address_templates_address_templates_edges_node, get_customs_info_templates_customs_templates_edges_node, get_events_events_edges_node, get_logs_logs_edges_node, get_order_order, get_parcel_templates_parcel_templates_edges_node, get_shipment_shipment, get_shipment_shipment_customs, get_shipment_shipment_customs_commodities, get_shipment_shipment_customs_duty, get_shipment_shipment_parcels, get_shipment_shipment_payment, get_shipment_shipment_rates, get_shipment_shipment_selected_rate_extra_charges, get_shipment_shipment_shipper, get_tracker_tracker, get_tracker_tracker_events, get_tracker_tracker_messages, OrderStatus, PaidByEnum, PartialServiceLevel, ShipmentStatus, TrackerStatus, WeightUnitEnum } from '@purplship/graphql';
import { CarrierSettingsCarrierNameEnum, WebhookEnabledEventsEnum } from '@purplship/rest/index';


export type MessageType = get_tracker_tracker_messages;
export type LogType = get_logs_logs_edges_node;
export type EventType = get_events_events_edges_node;
export type AddressType = get_shipment_shipment_shipper;
export type CommodityType = get_shipment_shipment_customs_commodities;
export type DutyType = get_shipment_shipment_customs_duty;
export type CustomsType = get_shipment_shipment_customs & {
  commodities: CommodityType[];
  duty?: DutyType;
};
export type ParcelType = get_shipment_shipment_parcels & {
  items: CommodityType[];
};
export type TrackingEventType = get_tracker_tracker_events;
export type TrackerType = get_tracker_tracker & {
  events: TrackingEventType[];
  messages?: MessageType[];
};
export type ChargeType = get_shipment_shipment_selected_rate_extra_charges;
export type RateType = get_shipment_shipment_rates;
export type PaymentType = get_shipment_shipment_payment;
export type ShipmentType = get_shipment_shipment & {
  customs?: CustomsType;
  parcels: ParcelType[];
  shipper: AddressType;
  recipient: AddressType;
  rates?: RateType[];
  messages?: MessageType[];
  selected_rate?: RateType;
};
export type OrderType = get_order_order & {
  line_items: CommodityType[];
  shipments: ShipmentType[];
};

export type AddressTemplateType = get_address_templates_address_templates_edges_node & {
  address: AddressType;
};
export type CustomsTemplateType = get_customs_info_templates_customs_templates_edges_node & {
  customs: CustomsType;
};
export type ParcelTemplateType = get_parcel_templates_parcel_templates_edges_node & {
  parcel: ParcelType;
};
export type TemplateType = AddressTemplateType & ParcelTemplateType & CustomsTemplateType;

export type ServiceLevelType = PartialServiceLevel;

export interface View {
  path: string
}

export enum NotificationType {
  error = "is-danger",
  warning = "is-warning",
  info = "is-info",
  success = "is-success"
}

export interface Notification {
  type?: NotificationType;
  message: string | Error | RequestError;
}

export interface LabelData {
  shipment: ShipmentType;
}

export type Collection<T = string> = {
  [code: string]: T;
};

export type PresetCollection = {
  [carrier_name: string]: {
    [code: string]: Partial<ParcelType>
  }
};

export const PAYOR_OPTIONS = Array.from(new Set(
  Object
    .values(PaidByEnum)
    .filter(key => key.toLowerCase() === key)
));

export const CURRENCY_OPTIONS = Array.from(new Set(
  Object
    .values(CurrencyCodeEnum)
));

export const DIMENSION_UNITS = Array.from(new Set(
  Object
    .values(DimensionUnitEnum)
));

export const WEIGHT_UNITS = Array.from(new Set(
  Object
    .values(WeightUnitEnum)
));

export const EVENT_TYPES: string[] = Array.from(new Set(
  Object
    .values(WebhookEnabledEventsEnum)
));

export const SHIPMENT_STATUSES: string[] = Array.from(new Set(
  Object
    .values(ShipmentStatus)
));

export const ORDER_STATUSES: string[] = Array.from(new Set(
  Object
    .values(OrderStatus)
));

export const TRACKER_STATUSES: string[] = Array.from(new Set(
  Object
    .values(TrackerStatus)
));

export const CARRIER_NAMES: string[] = Array.from(new Set(
  Object
    .values(CarrierSettingsCarrierNameEnum)
));

export type ErrorMessage = MessageType & {
  carrier_id?: string;
  carrier_name?: string;
};

export type FieldError = {
  [key: string]: { code: string; message: string; };
};

export interface APIError {
  error: {
    code: string;
    message?: string;
    details: { messages?: ErrorMessage[]; } & FieldError;
  };
}

export class RequestError extends Error {
  constructor(public data: APIError, ...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError)
    }
  }
}

export const HTTP_STATUS_CODES = [
  200,
  201,
  204,
  207,
  400,
  401,
  403,
  404,
  409,
  500,
];

export const HTTP_METHODS = [
  "GET",
  "POST",
  "PATCH",
  "DELETE",
];
