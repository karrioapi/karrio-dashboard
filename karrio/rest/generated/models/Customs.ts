/* tslint:disable */
/* eslint-disable */
/**
 * Karrio API
 *  ## API Reference  Karrio is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Karrio API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Karrio API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.8.7`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Environments  The Karrio API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Karrio utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"count\": 100,     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [         { ... },     ] } ```  ## Metadata  Updateable Karrio objects—including Shipment and Order—have a metadata parameter. You can use this parameter to attach key-value data to these Karrio objects.  Metadata is useful for storing additional, structured information on an object. As an example, you could store your user\'s full name and corresponding unique identifier from your system on a Karrio Order object.  Do not store any sensitive information as metadata.  ## Authentication  API keys are used to authenticate requests. You can view and manage your API keys in the Dashboard.  Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.  Authentication to the API is performed via HTTP Basic Auth. Provide your API token as the basic auth username value. You do not need to provide a password.  ```shell $ curl https://instance.api.com/v1/shipments \\     -u key_xxxxxx: # The colon prevents curl from asking for a password. ```  If you need to authenticate via bearer auth (e.g., for a cross-origin request), use `-H \"Authorization: Token key_xxxxxx\"` instead of `-u key_xxxxxx`.  All API requests must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure). API requests without authentication will also fail.  
 *
 * The version of the OpenAPI document: 2022.8.7
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Commodity } from './Commodity';
import {
    CommodityFromJSON,
    CommodityFromJSONTyped,
    CommodityToJSON,
} from './Commodity';
import type { Duty } from './Duty';
import {
    DutyFromJSON,
    DutyFromJSONTyped,
    DutyToJSON,
} from './Duty';

/**
 * 
 * @export
 * @interface Customs
 */
export interface Customs {
    /**
     * A unique identifier
     * @type {string}
     * @memberof Customs
     */
    id?: string;
    /**
     * The parcel content items
     * @type {Array<Commodity>}
     * @memberof Customs
     */
    commodities?: Array<Commodity>;
    /**
     * 
     * @type {Duty}
     * @memberof Customs
     */
    duty?: Duty | null;
    /**
     * 
     * @type {string}
     * @memberof Customs
     */
    content_type?: CustomsContentTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Customs
     */
    content_description?: string | null;
    /**
     * The customs 'term of trade' also known as 'incoterm'
     * @type {string}
     * @memberof Customs
     */
    incoterm?: CustomsIncotermEnum;
    /**
     * The invoice reference number
     * @type {string}
     * @memberof Customs
     */
    invoice?: string | null;
    /**
     * The invoice date
     * @type {string}
     * @memberof Customs
     */
    invoice_date?: string | null;
    /**
     * Indicates if the shipment is commercial
     * @type {boolean}
     * @memberof Customs
     */
    commercial_invoice?: boolean | null;
    /**
     * Indicate that signer certified confirmed all
     * @type {boolean}
     * @memberof Customs
     */
    certify?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof Customs
     */
    signer?: string | null;
    /**
     * 
     * <details>
     * <summary>Customs identification options.</summary>
     * 
     * ```
     * {
     *     "aes": "5218487281",
     *     "eel_pfc": "5218487281",
     *     "license_number": "5218487281",
     *     "certificate_number": "5218487281",
     *     "nip_number": "5218487281",
     *     "eori_number": "5218487281",
     *     "vat_registration_number": "5218487281",
     * }
     * ```
     * 
     * Please check the docs for carrier specific options.
     * </details>
     * @type {object}
     * @memberof Customs
     */
    options?: object;
    /**
     * Specifies the object type
     * @type {string}
     * @memberof Customs
     */
    object_type?: string;
}


/**
 * @export
 */
export const CustomsContentTypeEnum = {
    Documents: 'documents',
    Gift: 'gift',
    Sample: 'sample',
    Merchandise: 'merchandise',
    ReturnMerchandise: 'return_merchandise',
    Other: 'other'
} as const;
export type CustomsContentTypeEnum = typeof CustomsContentTypeEnum[keyof typeof CustomsContentTypeEnum];

/**
 * @export
 */
export const CustomsIncotermEnum = {
    Cfr: 'CFR',
    Cif: 'CIF',
    Cip: 'CIP',
    Cpt: 'CPT',
    Daf: 'DAF',
    Ddp: 'DDP',
    Ddu: 'DDU',
    Deq: 'DEQ',
    Des: 'DES',
    Exw: 'EXW',
    Fas: 'FAS',
    Fca: 'FCA',
    Fob: 'FOB'
} as const;
export type CustomsIncotermEnum = typeof CustomsIncotermEnum[keyof typeof CustomsIncotermEnum];


/**
 * Check if a given object implements the Customs interface.
 */
export function instanceOfCustoms(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CustomsFromJSON(json: any): Customs {
    return CustomsFromJSONTyped(json, false);
}

export function CustomsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Customs {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'commodities': !exists(json, 'commodities') ? undefined : ((json['commodities'] as Array<any>).map(CommodityFromJSON)),
        'duty': !exists(json, 'duty') ? undefined : DutyFromJSON(json['duty']),
        'content_type': !exists(json, 'content_type') ? undefined : json['content_type'],
        'content_description': !exists(json, 'content_description') ? undefined : json['content_description'],
        'incoterm': !exists(json, 'incoterm') ? undefined : json['incoterm'],
        'invoice': !exists(json, 'invoice') ? undefined : json['invoice'],
        'invoice_date': !exists(json, 'invoice_date') ? undefined : json['invoice_date'],
        'commercial_invoice': !exists(json, 'commercial_invoice') ? undefined : json['commercial_invoice'],
        'certify': !exists(json, 'certify') ? undefined : json['certify'],
        'signer': !exists(json, 'signer') ? undefined : json['signer'],
        'options': !exists(json, 'options') ? undefined : json['options'],
        'object_type': !exists(json, 'object_type') ? undefined : json['object_type'],
    };
}

export function CustomsToJSON(value?: Customs | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'commodities': value.commodities === undefined ? undefined : ((value.commodities as Array<any>).map(CommodityToJSON)),
        'duty': DutyToJSON(value.duty),
        'content_type': value.content_type,
        'content_description': value.content_description,
        'incoterm': value.incoterm,
        'invoice': value.invoice,
        'invoice_date': value.invoice_date,
        'commercial_invoice': value.commercial_invoice,
        'certify': value.certify,
        'signer': value.signer,
        'options': value.options,
        'object_type': value.object_type,
    };
}

