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
import type { CommodityData } from './CommodityData';
import {
    CommodityDataFromJSON,
    CommodityDataFromJSONTyped,
    CommodityDataToJSON,
} from './CommodityData';
import type { CustomsContentType } from './CustomsContentType';
import {
    CustomsContentTypeFromJSON,
    CustomsContentTypeFromJSONTyped,
    CustomsContentTypeToJSON,
} from './CustomsContentType';
import type { CustomsDuty } from './CustomsDuty';
import {
    CustomsDutyFromJSON,
    CustomsDutyFromJSONTyped,
    CustomsDutyToJSON,
} from './CustomsDuty';
import type { CustomsIncoterm } from './CustomsIncoterm';
import {
    CustomsIncotermFromJSON,
    CustomsIncotermFromJSONTyped,
    CustomsIncotermToJSON,
} from './CustomsIncoterm';

/**
 * 
 * @export
 * @interface CustomsData
 */
export interface CustomsData {
    /**
     * The parcel content items
     * @type {Array<CommodityData>}
     * @memberof CustomsData
     */
    commodities: Array<CommodityData>;
    /**
     * 
     * @type {CustomsDuty}
     * @memberof CustomsData
     */
    duty?: CustomsDuty | null;
    /**
     * 
     * @type {CustomsContentType}
     * @memberof CustomsData
     */
    content_type?: CustomsContentType | null;
    /**
     * 
     * @type {string}
     * @memberof CustomsData
     */
    content_description?: string | null;
    /**
     * 
     * @type {CustomsIncoterm}
     * @memberof CustomsData
     */
    incoterm?: CustomsIncoterm | null;
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
     * <details>
     *         <summary>Customs identification options.</summary>
     * 
     *         {
     *             "aes": "5218487281",
     *             "eel_pfc": "5218487281",
     *             "license_number": "5218487281",
     *             "certificate_number": "5218487281",
     *             "nip_number": "5218487281",
     *             "eori_number": "5218487281",
     *             "vat_registration_number": "5218487281",
     *         }
     *         
     * @type {{ [key: string]: any; }}
     * @memberof CustomsData
     */
    options?: { [key: string]: any; };
}

/**
 * Check if a given object implements the CustomsData interface.
 */
export function instanceOfCustomsData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "commodities" in value;

    return isInstance;
}

export function CustomsDataFromJSON(json: any): CustomsData {
    return CustomsDataFromJSONTyped(json, false);
}

export function CustomsDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomsData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'commodities': ((json['commodities'] as Array<any>).map(CommodityDataFromJSON)),
        'duty': !exists(json, 'duty') ? undefined : CustomsDutyFromJSON(json['duty']),
        'content_type': !exists(json, 'content_type') ? undefined : CustomsContentTypeFromJSON(json['content_type']),
        'content_description': !exists(json, 'content_description') ? undefined : json['content_description'],
        'incoterm': !exists(json, 'incoterm') ? undefined : CustomsIncotermFromJSON(json['incoterm']),
        'invoice': !exists(json, 'invoice') ? undefined : json['invoice'],
        'invoice_date': !exists(json, 'invoice_date') ? undefined : json['invoice_date'],
        'commercial_invoice': !exists(json, 'commercial_invoice') ? undefined : json['commercial_invoice'],
        'certify': !exists(json, 'certify') ? undefined : json['certify'],
        'signer': !exists(json, 'signer') ? undefined : json['signer'],
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
        
        'commodities': ((value.commodities as Array<any>).map(CommodityDataToJSON)),
        'duty': CustomsDutyToJSON(value.duty),
        'content_type': CustomsContentTypeToJSON(value.content_type),
        'content_description': value.content_description,
        'incoterm': CustomsIncotermToJSON(value.incoterm),
        'invoice': value.invoice,
        'invoice_date': value.invoice_date,
        'commercial_invoice': value.commercial_invoice,
        'certify': value.certify,
        'signer': value.signer,
        'options': value.options,
    };
}

