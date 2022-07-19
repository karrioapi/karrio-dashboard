/* tslint:disable */
/* eslint-disable */
/**
 * Karrio API
 *  ## API Reference  Karrio is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Karrio API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Karrio API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.4.6`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Environments  The Karrio API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Karrio utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"count\": 100,     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [         { ... },     ] } ```  ## Metadata  Updateable Karrio objects—including Shipment and Order—have a metadata parameter. You can use this parameter to attach key-value data to these Karrio objects.  Metadata is useful for storing additional, structured information on an object. As an example, you could store your user\'s full name and corresponding unique identifier from your system on a Karrio Order object.  Do not store any sensitive information as metadata.  
 *
 * The version of the OpenAPI document: 2022.4.6
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    BatchObject,
    BatchObjectFromJSON,
    BatchObjectFromJSONTyped,
    BatchObjectToJSON,
} from './BatchObject';

/**
 * 
 * @export
 * @interface BatchOperation
 */
export interface BatchOperation {
    /**
     * A unique identifier
     * @type {string}
     * @memberof BatchOperation
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof BatchOperation
     */
    status: BatchOperationStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof BatchOperation
     */
    resource_type: BatchOperationResourceTypeEnum;
    /**
     * 
     * @type {Array<BatchObject>}
     * @memberof BatchOperation
     */
    resources: Array<BatchObject>;
    /**
     * 
     * @type {Date}
     * @memberof BatchOperation
     */
    created_at: Date;
    /**
     * 
     * @type {Date}
     * @memberof BatchOperation
     */
    updated_at: Date;
    /**
     * 
     * @type {boolean}
     * @memberof BatchOperation
     */
    test_mode: boolean;
}

/**
* @export
* @enum {string}
*/
export enum BatchOperationStatusEnum {
    Queued = 'queued',
    Running = 'running',
    Completed = 'completed',
    Failed = 'failed'
}/**
* @export
* @enum {string}
*/
export enum BatchOperationResourceTypeEnum {
    Order = 'order',
    Shipment = 'shipment',
    Tracking = 'tracking',
    Billing = 'billing'
}

export function BatchOperationFromJSON(json: any): BatchOperation {
    return BatchOperationFromJSONTyped(json, false);
}

export function BatchOperationFromJSONTyped(json: any, ignoreDiscriminator: boolean): BatchOperation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'status': json['status'],
        'resource_type': json['resource_type'],
        'resources': ((json['resources'] as Array<any>).map(BatchObjectFromJSON)),
        'created_at': (new Date(json['created_at'])),
        'updated_at': (new Date(json['updated_at'])),
        'test_mode': json['test_mode'],
    };
}

export function BatchOperationToJSON(value?: BatchOperation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'status': value.status,
        'resource_type': value.resource_type,
        'resources': ((value.resources as Array<any>).map(BatchObjectToJSON)),
        'created_at': (value.created_at.toISOString()),
        'updated_at': (value.updated_at.toISOString()),
        'test_mode': value.test_mode,
    };
}
