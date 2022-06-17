import { ApolloError } from '@apollo/client';
import { CurrencyCodeEnum, CustomsContentTypeEnum, DimensionUnitEnum, GetUser_user, get_address_templates_address_templates_edges_node, get_customs_info_templates_customs_templates_edges_node, get_document_template_document_template, get_events_events_edges_node, get_logs_logs_edges_node, get_order_order, get_order_order_line_items, get_organizations_organizations, get_parcel_templates_parcel_templates_edges_node, get_shipment_shipment, get_shipment_shipment_customs, get_shipment_shipment_customs_commodities, get_shipment_shipment_customs_duty, get_shipment_shipment_parcels, get_shipment_shipment_parcels_items, get_shipment_shipment_payment, get_shipment_shipment_rates, get_shipment_shipment_selected_rate_extra_charges, get_shipment_shipment_shipper, get_tracker_tracker, get_tracker_tracker_events, get_tracker_tracker_messages, OrderStatus, PaidByEnum, PartialServiceLevel, ShipmentStatusEnum, TemplateRelatedObject, TrackerStatusEnum, WeightUnitEnum } from 'karrio/graphql';
import { CarrierSettingsCarrierNameEnum, CustomsIncotermEnum, WebhookEnabledEventsEnum } from 'karrio/rest/index';
import { Session } from 'next-auth';


export type MessageType = get_tracker_tracker_messages;
export type LogType = get_logs_logs_edges_node;
export type EventType = get_events_events_edges_node;
export type AddressType = get_shipment_shipment_shipper;
export type CommodityType = (
  get_order_order_line_items |
  get_shipment_shipment_customs_commodities |
  get_shipment_shipment_parcels_items
) & {
  unfilled_quantity?: number;
};
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
  payment?: PaymentType;
};
export type OrderType = get_order_order & {
  line_items: get_order_order_line_items[];
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

export type DocumentTemplateType = get_document_template_document_template;

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
  message: string | Error | RequestError | ApolloError | ErrorType[] | RequestError[];
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
    .values(ShipmentStatusEnum)
));

export const ORDER_STATUSES: string[] = Array.from(new Set(
  Object
    .values(OrderStatus)
));

export const TRACKER_STATUSES: string[] = Array.from(new Set(
  Object
    .values(TrackerStatusEnum)
));

export const CARRIER_NAMES: string[] = Array.from(new Set(
  Object
    .values(CarrierSettingsCarrierNameEnum)
));

export const INCOTERMS: string[] = Array.from(new Set(
  Object
    .values(CustomsIncotermEnum)
));

export const CUSTOMS_CONTENT_TYPES: string[] = Array.from(new Set(
  Object
    .values(CustomsContentTypeEnum)
));

export const DOCUMENT_RELATED_OBJECTS: string[] = Array.from(new Set(
  Object
    .values(TemplateRelatedObject)
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

export class ErrorType {
  constructor(
    public field: string,
    public messages: string[]
  ) { }
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

export enum NoneEnum { none = "none" };

export type SessionType = Session & { accessToken: string, org_id?: string };
export type ContextDataType = {
  data: {
    user: GetUser_user,
    organizations?: get_organizations_organizations[]
  }
};

export interface Metadata {
  VERSION: string;
  APP_NAME: string;
  APP_WEBSITE?: string;
  MULTI_ORGANIZATIONS: boolean;
  ORDERS_MANAGEMENT: boolean;
  APPS_MANAGEMENT: boolean;
  DOCUMENTS_MANAGEMENT: boolean;
  ALLOW_SIGNUP: boolean;
  ADMIN: string;
  OPENAPI: string;
  GRAPHQL: string;
};

export interface References {
  VERSION: string;
  APP_NAME: string;
  APP_WEBSITE: string;
  MULTI_ORGANIZATIONS: boolean;
  ORDERS_MANAGEMENT: boolean;
  APPS_MANAGEMENT: boolean;
  DOCUMENTS_MANAGEMENT: boolean;
  ALLOW_SIGNUP: boolean;
  ADMIN: string;
  OPENAPI: string;
  GRAPHQL: string;
  ADDRESS_AUTO_COMPLETE: object;
  countries: object;
  currencies: object;
  carriers: object;
  customs_content_type: object;
  incoterms: object;
  states: object;
  services: object;
  service_names: object;
  options: object;
  option_names: object;
  package_presets: object;
  packaging_types: object;
  payment_types: object;
  carrier_capabilities: object;
  service_levels: object;
}

export const CARRIER_THEMES: Collection = {
  'aramex': 'is-aramex',
  'australiapost': 'is-australiapost',
  'boxknight': 'is-boxknight',
  'canadapost': 'is-canadapost',
  'canpar': 'is-canpar',
  'dicom': 'is-dicom',
  'dhl_express': 'is-dhl',
  'dhl_poland': 'is-dhl',
  'dhl_universal': 'is-dhl',
  'eshipper': 'is-eshipper',
  'easypost': 'is-easypost',
  'fedex': 'is-fedex',
  'freightcom': 'is-freightcom',
  'generic': 'is-generic',
  'purolator': 'is-purolator',
  'royalmail': 'is-royalmail',
  'sendle': 'is-sendle',
  'sf_express': 'is-sf_express',
  'tnt': 'is-tnt',
  'ups': 'is-ups',
  'usps': 'is-usps',
  'usps_international': 'is-usps',
  'yanwen': 'is-yanwen',
  'yunexpress': 'is-yunexpress',
};

export const CARRIER_IMAGES: Collection = {
  'amazon_mws': 'amazon_mws',
  'apc': 'generic',
  'asendia': 'generic',
  'asendia_us': 'generic',
  'aramex': 'aramex',
  'australiapost': 'australiapost',
  'axlehire': 'generic',
  'better_trucks': 'generic',
  'bond': 'generic',
  'canadapost': 'canadapost',
  'canpar': 'canpar',
  'cdl': 'generic',
  'chronopost': 'generic',
  'cloudsort': 'generic',
  'courier_express': 'generic',
  'courierplease': 'generic',
  'daipost': 'generic',
  'deutschepost': 'generic',
  'deutschepost_uk': 'generic',
  'dicom': 'dicom',
  'dhl_ecom_asia': 'dhl_express',
  'dhl_ecom': 'dhl_express',
  'dhl_express': 'dhl_express',
  'dhl_poland': 'dhl_express',
  'dhl_universal': 'dhl_universal',
  'dpd': 'generic',
  'dpd_uk': 'generic',
  'epost': 'generic',
  'estafeta': 'generic',
  'fastway': 'generic',
  'fedex': 'fedex',
  'fedex_mail': 'fedex',
  'fedex_sameday_city': 'fedex',
  'fedex_smartpost': 'fedex',
  'firstmile': 'generic',
  'globegistics': 'generic',
  'gso': 'generic',
  'hermes': 'generic',
  'interlink': 'generic',
  'jppost': 'generic',
  'kuroneko_yamato': 'generic',
  'laposte': 'generic',
  'lasership': 'generic',
  'loomis': 'generic',
  'lso': 'generic',
  'newgistics': 'generic',
  'ontrac': 'generic',
  'osm': 'generic',
  'parcelforce': 'generic',
  'parcll': 'generic',
  'passport': 'generic',
  'postnl': 'generic',
  'purolator': 'purolator',
  'royalmail': 'royalmail',
  'seko': 'generic',
  'sendle': 'sendle',
  'sfexpress': 'sfexpress',
  'speedee': 'generic',
  'startrack': 'generic',
  'tforce': 'generic',
  'uds': 'generic',
  'ups': 'ups',
  'ups_iparcel': 'ups',
  'ups_mail_innovations': 'ups',
  'usps': 'usps',
  'veho': 'generic',
  'yanwen': 'yanwen',
  'boxknight': 'generic',
  'eshipper': 'eshipper',
  'easypost': 'easypost',
  'freightcom': 'freightcom',
  'generic': 'generic',
  'sf_express': 'sf_express',
  'tnt': 'tnt',
  'usps_international': 'usps',
  'yunexpress': 'yunexpress',
}
