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
/**
 * 
 * @export
 * @interface ShipmentRateData
 */
export interface ShipmentRateData {
    /**
     * The requested carrier service for the shipment.<br/>
     *         Please consult [the reference](#operation/references) for specific carriers services.<br/>
     *         **Note that this is a list because on a Multi-carrier rate request you could
     *         specify a service per carrier.**
     *         
     * @type {Array<string>}
     * @memberof ShipmentRateData
     */
    services?: Array<string> | null;
    /**
     * The list of configured carriers you wish to get rates from.<br/>
     *         **Note that the request will be sent to all carriers in nothing is specified**
     *         
     * @type {Array<string>}
     * @memberof ShipmentRateData
     */
    carrier_ids?: Array<string> | null;
    /**
     * The shipment reference
     * @type {string}
     * @memberof ShipmentRateData
     */
    reference?: string | null;
    /**
     * User metadata for the shipment
     * @type {{ [key: string]: any; }}
     * @memberof ShipmentRateData
     */
    metadata?: { [key: string]: any; };
}

/**
 * Check if a given object implements the ShipmentRateData interface.
 */
export function instanceOfShipmentRateData(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ShipmentRateDataFromJSON(json: any): ShipmentRateData {
    return ShipmentRateDataFromJSONTyped(json, false);
}

export function ShipmentRateDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShipmentRateData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'services': !exists(json, 'services') ? undefined : json['services'],
        'carrier_ids': !exists(json, 'carrier_ids') ? undefined : json['carrier_ids'],
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
    };
}

export function ShipmentRateDataToJSON(value?: ShipmentRateData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'services': value.services,
        'carrier_ids': value.carrier_ids,
        'reference': value.reference,
        'metadata': value.metadata,
    };
}

