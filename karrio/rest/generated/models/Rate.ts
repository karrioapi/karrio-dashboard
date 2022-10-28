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
import type { Charge } from './Charge';
import {
    ChargeFromJSON,
    ChargeFromJSONTyped,
    ChargeToJSON,
} from './Charge';

/**
 * 
 * @export
 * @interface Rate
 */
export interface Rate {
    /**
     * A unique identifier
     * @type {string}
     * @memberof Rate
     */
    id?: string;
    /**
     * Specifies the object type
     * @type {string}
     * @memberof Rate
     */
    object_type?: string;
    /**
     * The rate's carrier
     * @type {string}
     * @memberof Rate
     */
    carrier_name: string;
    /**
     * The targeted carrier's name (unique identifier)
     * @type {string}
     * @memberof Rate
     */
    carrier_id: string;
    /**
     * The rate monetary values currency code
     * @type {string}
     * @memberof Rate
     */
    currency: string;
    /**
     * The carrier's rate (quote) service
     * @type {string}
     * @memberof Rate
     */
    service?: string | null;
    /**
     * The rate's monetary amount of the total charge.<br/>
     *         This is the gross amount of the rate after adding the additional charges
     *         
     * @type {number}
     * @memberof Rate
     */
    total_charge?: number;
    /**
     * The estimated delivery transit days
     * @type {number}
     * @memberof Rate
     */
    transit_days?: number | null;
    /**
     * list of the rate's additional charges
     * @type {Array<Charge>}
     * @memberof Rate
     */
    extra_charges?: Array<Charge>;
    /**
     * provider specific metadata
     * @type {{ [key: string]: any; }}
     * @memberof Rate
     */
    meta?: { [key: string]: any; } | null;
    /**
     * Specified whether it was created with a carrier in test mode
     * @type {boolean}
     * @memberof Rate
     */
    test_mode: boolean;
}

/**
 * Check if a given object implements the Rate interface.
 */
export function instanceOfRate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "carrier_name" in value;
    isInstance = isInstance && "carrier_id" in value;
    isInstance = isInstance && "currency" in value;
    isInstance = isInstance && "test_mode" in value;

    return isInstance;
}

export function RateFromJSON(json: any): Rate {
    return RateFromJSONTyped(json, false);
}

export function RateFromJSONTyped(json: any, ignoreDiscriminator: boolean): Rate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'object_type': !exists(json, 'object_type') ? undefined : json['object_type'],
        'carrier_name': json['carrier_name'],
        'carrier_id': json['carrier_id'],
        'currency': json['currency'],
        'service': !exists(json, 'service') ? undefined : json['service'],
        'total_charge': !exists(json, 'total_charge') ? undefined : json['total_charge'],
        'transit_days': !exists(json, 'transit_days') ? undefined : json['transit_days'],
        'extra_charges': !exists(json, 'extra_charges') ? undefined : ((json['extra_charges'] as Array<any>).map(ChargeFromJSON)),
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
        'test_mode': json['test_mode'],
    };
}

export function RateToJSON(value?: Rate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'object_type': value.object_type,
        'carrier_name': value.carrier_name,
        'carrier_id': value.carrier_id,
        'currency': value.currency,
        'service': value.service,
        'total_charge': value.total_charge,
        'transit_days': value.transit_days,
        'extra_charges': value.extra_charges === undefined ? undefined : ((value.extra_charges as Array<any>).map(ChargeToJSON)),
        'meta': value.meta,
        'test_mode': value.test_mode,
    };
}

