/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2022.8.9
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Message } from './Message';
import {
    MessageFromJSON,
    MessageFromJSONTyped,
    MessageToJSON,
} from './Message';
import type { Parcel } from './Parcel';
import {
    ParcelFromJSON,
    ParcelFromJSONTyped,
    ParcelToJSON,
} from './Parcel';
import type { Rate } from './Rate';
import {
    RateFromJSON,
    RateFromJSONTyped,
    RateToJSON,
} from './Rate';
import type { ShipmentCustoms } from './ShipmentCustoms';
import {
    ShipmentCustomsFromJSON,
    ShipmentCustomsFromJSONTyped,
    ShipmentCustomsToJSON,
} from './ShipmentCustoms';
import type { ShipmentLabelType } from './ShipmentLabelType';
import {
    ShipmentLabelTypeFromJSON,
    ShipmentLabelTypeFromJSONTyped,
    ShipmentLabelTypeToJSON,
} from './ShipmentLabelType';
import type { ShipmentPayment } from './ShipmentPayment';
import {
    ShipmentPaymentFromJSON,
    ShipmentPaymentFromJSONTyped,
    ShipmentPaymentToJSON,
} from './ShipmentPayment';
import type { ShipmentSelectedRate } from './ShipmentSelectedRate';
import {
    ShipmentSelectedRateFromJSON,
    ShipmentSelectedRateFromJSONTyped,
    ShipmentSelectedRateToJSON,
} from './ShipmentSelectedRate';
import type { ShipmentShipper } from './ShipmentShipper';
import {
    ShipmentShipperFromJSON,
    ShipmentShipperFromJSONTyped,
    ShipmentShipperToJSON,
} from './ShipmentShipper';
import type { ShipmentStatus } from './ShipmentStatus';
import {
    ShipmentStatusFromJSON,
    ShipmentStatusFromJSONTyped,
    ShipmentStatusToJSON,
} from './ShipmentStatus';
import type { ShippingResponseDocs } from './ShippingResponseDocs';
import {
    ShippingResponseDocsFromJSON,
    ShippingResponseDocsFromJSONTyped,
    ShippingResponseDocsToJSON,
} from './ShippingResponseDocs';

/**
 * 
 * @export
 * @interface ShippingResponse
 */
export interface ShippingResponse {
    /**
     * A unique identifier
     * @type {string}
     * @memberof ShippingResponse
     */
    id?: string;
    /**
     * Specifies the object type
     * @type {string}
     * @memberof ShippingResponse
     */
    object_type?: string;
    /**
     * The shipment tracking url
     * @type {string}
     * @memberof ShippingResponse
     */
    tracking_url?: string | null;
    /**
     * 
     * @type {ShipmentShipper}
     * @memberof ShippingResponse
     */
    shipper: ShipmentShipper;
    /**
     * 
     * @type {ShipmentShipper}
     * @memberof ShippingResponse
     */
    recipient: ShipmentShipper;
    /**
     * The shipment's parcels
     * @type {Array<Parcel>}
     * @memberof ShippingResponse
     */
    parcels: Array<Parcel>;
    /**
     * The carriers services requested for the shipment.<br/>
     *         Please consult the reference for specific carriers services.<br/>
     *         **Note that this is a list because on a Multi-carrier rate request you could specify a service per carrier.**
     *         
     * @type {Array<string>}
     * @memberof ShippingResponse
     */
    services?: Array<string> | null;
    /**
     * <details>
     *         <summary>The options available for the shipment.</summary>
     * 
     *         {
     *             "currency": "USD",
     *             "insurance": 100.00,
     *             "cash_on_delivery": 30.00,
     *             "shipment_date": "2020-01-01",
     *             "dangerous_good": true,
     *             "declared_value": 150.00,
     *             "email_notification": true,
     *             "email_notification_to": "shipper@mail.com",
     *             "signature_confirmation": true,
     *         }
     *         
     * @type {{ [key: string]: any; }}
     * @memberof ShippingResponse
     */
    options?: { [key: string]: any; };
    /**
     * 
     * @type {ShipmentPayment}
     * @memberof ShippingResponse
     */
    payment?: ShipmentPayment;
    /**
     * 
     * @type {ShipmentCustoms}
     * @memberof ShippingResponse
     */
    customs?: ShipmentCustoms | null;
    /**
     * The list for shipment rates fetched previously
     * @type {Array<Rate>}
     * @memberof ShippingResponse
     */
    rates?: Array<Rate>;
    /**
     * The shipment reference
     * @type {string}
     * @memberof ShippingResponse
     */
    reference?: string | null;
    /**
     * 
     * @type {ShipmentLabelType}
     * @memberof ShippingResponse
     */
    label_type?: ShipmentLabelType | null;
    /**
     * The list of configured carriers you wish to get rates from.<br/>
     *         **Note that the request will be sent to all carriers in nothing is specified**
     *         
     * @type {Array<string>}
     * @memberof ShippingResponse
     */
    carrier_ids?: Array<string> | null;
    /**
     * The attached tracker id
     * @type {string}
     * @memberof ShippingResponse
     */
    tracker_id?: string | null;
    /**
     * The shipment creation datetime.<br/>
     *         Date Format: `YYYY-MM-DD HH:MM:SS.mmmmmmz`
     *         
     * @type {string}
     * @memberof ShippingResponse
     */
    created_at: string;
    /**
     * User metadata for the shipment
     * @type {{ [key: string]: any; }}
     * @memberof ShippingResponse
     */
    metadata?: { [key: string]: any; };
    /**
     * The list of note or warning messages
     * @type {Array<Message>}
     * @memberof ShippingResponse
     */
    messages?: Array<Message>;
    /**
     * The current Shipment status
     * @type {ShipmentStatus}
     * @memberof ShippingResponse
     */
    status?: ShipmentStatus;
    /**
     * The shipment carrier
     * @type {string}
     * @memberof ShippingResponse
     */
    carrier_name?: string | null;
    /**
     * The shipment carrier configured identifier
     * @type {string}
     * @memberof ShippingResponse
     */
    carrier_id?: string | null;
    /**
     * The shipment tracking number
     * @type {string}
     * @memberof ShippingResponse
     */
    tracking_number?: string | null;
    /**
     * The shipment carrier system identifier
     * @type {string}
     * @memberof ShippingResponse
     */
    shipment_identifier?: string | null;
    /**
     * 
     * @type {ShipmentSelectedRate}
     * @memberof ShippingResponse
     */
    selected_rate?: ShipmentSelectedRate | null;
    /**
     * 
     * @type {ShippingResponseDocs}
     * @memberof ShippingResponse
     */
    docs?: ShippingResponseDocs | null;
    /**
     * provider specific metadata
     * @type {{ [key: string]: any; }}
     * @memberof ShippingResponse
     */
    meta?: { [key: string]: any; } | null;
    /**
     * The selected service
     * @type {string}
     * @memberof ShippingResponse
     */
    service?: string | null;
    /**
     * The shipment selected rate.
     * @type {string}
     * @memberof ShippingResponse
     */
    selected_rate_id?: string | null;
    /**
     * Specified whether it was created with a carrier in test mode
     * @type {boolean}
     * @memberof ShippingResponse
     */
    test_mode: boolean;
}

/**
 * Check if a given object implements the ShippingResponse interface.
 */
export function instanceOfShippingResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "shipper" in value;
    isInstance = isInstance && "recipient" in value;
    isInstance = isInstance && "parcels" in value;
    isInstance = isInstance && "created_at" in value;
    isInstance = isInstance && "test_mode" in value;

    return isInstance;
}

export function ShippingResponseFromJSON(json: any): ShippingResponse {
    return ShippingResponseFromJSONTyped(json, false);
}

export function ShippingResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShippingResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'object_type': !exists(json, 'object_type') ? undefined : json['object_type'],
        'tracking_url': !exists(json, 'tracking_url') ? undefined : json['tracking_url'],
        'shipper': ShipmentShipperFromJSON(json['shipper']),
        'recipient': ShipmentShipperFromJSON(json['recipient']),
        'parcels': ((json['parcels'] as Array<any>).map(ParcelFromJSON)),
        'services': !exists(json, 'services') ? undefined : json['services'],
        'options': !exists(json, 'options') ? undefined : json['options'],
        'payment': !exists(json, 'payment') ? undefined : ShipmentPaymentFromJSON(json['payment']),
        'customs': !exists(json, 'customs') ? undefined : ShipmentCustomsFromJSON(json['customs']),
        'rates': !exists(json, 'rates') ? undefined : ((json['rates'] as Array<any>).map(RateFromJSON)),
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'label_type': !exists(json, 'label_type') ? undefined : ShipmentLabelTypeFromJSON(json['label_type']),
        'carrier_ids': !exists(json, 'carrier_ids') ? undefined : json['carrier_ids'],
        'tracker_id': !exists(json, 'tracker_id') ? undefined : json['tracker_id'],
        'created_at': json['created_at'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'messages': !exists(json, 'messages') ? undefined : ((json['messages'] as Array<any>).map(MessageFromJSON)),
        'status': !exists(json, 'status') ? undefined : ShipmentStatusFromJSON(json['status']),
        'carrier_name': !exists(json, 'carrier_name') ? undefined : json['carrier_name'],
        'carrier_id': !exists(json, 'carrier_id') ? undefined : json['carrier_id'],
        'tracking_number': !exists(json, 'tracking_number') ? undefined : json['tracking_number'],
        'shipment_identifier': !exists(json, 'shipment_identifier') ? undefined : json['shipment_identifier'],
        'selected_rate': !exists(json, 'selected_rate') ? undefined : ShipmentSelectedRateFromJSON(json['selected_rate']),
        'docs': !exists(json, 'docs') ? undefined : ShippingResponseDocsFromJSON(json['docs']),
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
        'service': !exists(json, 'service') ? undefined : json['service'],
        'selected_rate_id': !exists(json, 'selected_rate_id') ? undefined : json['selected_rate_id'],
        'test_mode': json['test_mode'],
    };
}

export function ShippingResponseToJSON(value?: ShippingResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'object_type': value.object_type,
        'tracking_url': value.tracking_url,
        'shipper': ShipmentShipperToJSON(value.shipper),
        'recipient': ShipmentShipperToJSON(value.recipient),
        'parcels': ((value.parcels as Array<any>).map(ParcelToJSON)),
        'services': value.services,
        'options': value.options,
        'payment': ShipmentPaymentToJSON(value.payment),
        'customs': ShipmentCustomsToJSON(value.customs),
        'rates': value.rates === undefined ? undefined : ((value.rates as Array<any>).map(RateToJSON)),
        'reference': value.reference,
        'label_type': ShipmentLabelTypeToJSON(value.label_type),
        'carrier_ids': value.carrier_ids,
        'tracker_id': value.tracker_id,
        'created_at': value.created_at,
        'metadata': value.metadata,
        'messages': value.messages === undefined ? undefined : ((value.messages as Array<any>).map(MessageToJSON)),
        'status': ShipmentStatusToJSON(value.status),
        'carrier_name': value.carrier_name,
        'carrier_id': value.carrier_id,
        'tracking_number': value.tracking_number,
        'shipment_identifier': value.shipment_identifier,
        'selected_rate': ShipmentSelectedRateToJSON(value.selected_rate),
        'docs': ShippingResponseDocsToJSON(value.docs),
        'meta': value.meta,
        'service': value.service,
        'selected_rate_id': value.selected_rate_id,
        'test_mode': value.test_mode,
    };
}

