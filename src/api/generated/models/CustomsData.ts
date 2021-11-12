/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.11`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=25\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.11
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Commodity,
    CommodityFromJSON,
    CommodityFromJSONTyped,
    CommodityToJSON,
    Duty,
    DutyFromJSON,
    DutyFromJSONTyped,
    DutyToJSON,
} from './';

/**
 * 
 * @export
 * @interface CustomsData
 */
export interface CustomsData {
    /**
     * 
     * @type {string}
     * @memberof CustomsData
     */
    aes?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomsData
     */
    eel_pfc?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomsData
     */
    content_type?: CustomsDataContentTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof CustomsData
     */
    content_description?: string | null;
    /**
     * The customs 'term of trade' also known as 'incoterm'
     * @type {string}
     * @memberof CustomsData
     */
    incoterm?: CustomsDataIncotermEnum;
    /**
     * The parcel content items
     * @type {Array<Commodity>}
     * @memberof CustomsData
     */
    commodities?: Array<Commodity> | null;
    /**
     * 
     * @type {Duty}
     * @memberof CustomsData
     */
    duty?: Duty | null;
    /**
     * The invoice reference number
     * @type {string}
     * @memberof CustomsData
     */
    invoice?: string | null;
    /**
     * The invoice date
     * @type {string}
     * @memberof CustomsData
     */
    invoice_date?: string | null;
    /**
     * Indicates if the shipment is commercial
     * @type {boolean}
     * @memberof CustomsData
     */
    commercial_invoice?: boolean | null;
    /**
     * Indicate that signer certified confirmed all
     * @type {boolean}
     * @memberof CustomsData
     */
    certify?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof CustomsData
     */
    signer?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomsData
     */
    certificate_number?: string | null;
    /**
     * 
     * @type {object}
     * @memberof CustomsData
     */
    options?: object | null;
}

/**
* @export
* @enum {string}
*/
export enum CustomsDataContentTypeEnum {
    Documents = 'documents',
    Gift = 'gift',
    Sample = 'sample',
    Merchandise = 'merchandise',
    ReturnMerchandise = 'return_merchandise',
    Other = 'other'
}/**
* @export
* @enum {string}
*/
export enum CustomsDataIncotermEnum {
    Cfr = 'CFR',
    Cif = 'CIF',
    Cip = 'CIP',
    Cpt = 'CPT',
    Daf = 'DAF',
    Ddp = 'DDP',
    Ddu = 'DDU',
    Deq = 'DEQ',
    Des = 'DES',
    Exw = 'EXW',
    Fas = 'FAS',
    Fca = 'FCA',
    Fob = 'FOB'
}

export function CustomsDataFromJSON(json: any): CustomsData {
    return CustomsDataFromJSONTyped(json, false);
}

export function CustomsDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomsData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'aes': !exists(json, 'aes') ? undefined : json['aes'],
        'eel_pfc': !exists(json, 'eel_pfc') ? undefined : json['eel_pfc'],
        'content_type': !exists(json, 'content_type') ? undefined : json['content_type'],
        'content_description': !exists(json, 'content_description') ? undefined : json['content_description'],
        'incoterm': !exists(json, 'incoterm') ? undefined : json['incoterm'],
        'commodities': !exists(json, 'commodities') ? undefined : (json['commodities'] === null ? null : (json['commodities'] as Array<any>).map(CommodityFromJSON)),
        'duty': !exists(json, 'duty') ? undefined : DutyFromJSON(json['duty']),
        'invoice': !exists(json, 'invoice') ? undefined : json['invoice'],
        'invoice_date': !exists(json, 'invoice_date') ? undefined : json['invoice_date'],
        'commercial_invoice': !exists(json, 'commercial_invoice') ? undefined : json['commercial_invoice'],
        'certify': !exists(json, 'certify') ? undefined : json['certify'],
        'signer': !exists(json, 'signer') ? undefined : json['signer'],
        'certificate_number': !exists(json, 'certificate_number') ? undefined : json['certificate_number'],
        'options': !exists(json, 'options') ? undefined : json['options'],
    };
}

export function CustomsDataToJSON(value?: CustomsData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'aes': value.aes,
        'eel_pfc': value.eel_pfc,
        'content_type': value.content_type,
        'content_description': value.content_description,
        'incoterm': value.incoterm,
        'commodities': value.commodities === undefined ? undefined : (value.commodities === null ? null : (value.commodities as Array<any>).map(CommodityToJSON)),
        'duty': DutyToJSON(value.duty),
        'invoice': value.invoice,
        'invoice_date': value.invoice_date,
        'commercial_invoice': value.commercial_invoice,
        'certify': value.certify,
        'signer': value.signer,
        'certificate_number': value.certificate_number,
        'options': value.options,
    };
}

