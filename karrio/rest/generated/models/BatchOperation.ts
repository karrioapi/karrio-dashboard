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
import type { BatchObject } from './BatchObject';
import {
    BatchObjectFromJSON,
    BatchObjectFromJSONTyped,
    BatchObjectToJSON,
} from './BatchObject';
import type { BatchOperationStatus } from './BatchOperationStatus';
import {
    BatchOperationStatusFromJSON,
    BatchOperationStatusFromJSONTyped,
    BatchOperationStatusToJSON,
} from './BatchOperationStatus';
import type { ResourceTypeEnum } from './ResourceTypeEnum';
import {
    ResourceTypeEnumFromJSON,
    ResourceTypeEnumFromJSONTyped,
    ResourceTypeEnumToJSON,
} from './ResourceTypeEnum';

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
     * @type {BatchOperationStatus}
     * @memberof BatchOperation
     */
    status: BatchOperationStatus;
    /**
     * 
     * @type {ResourceTypeEnum}
     * @memberof BatchOperation
     */
    resource_type: ResourceTypeEnum;
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
 * Check if a given object implements the BatchOperation interface.
 */
export function instanceOfBatchOperation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "resource_type" in value;
    isInstance = isInstance && "resources" in value;
    isInstance = isInstance && "created_at" in value;
    isInstance = isInstance && "updated_at" in value;
    isInstance = isInstance && "test_mode" in value;

    return isInstance;
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
        'status': BatchOperationStatusFromJSON(json['status']),
        'resource_type': ResourceTypeEnumFromJSON(json['resource_type']),
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
        'status': BatchOperationStatusToJSON(value.status),
        'resource_type': ResourceTypeEnumToJSON(value.resource_type),
        'resources': ((value.resources as Array<any>).map(BatchObjectToJSON)),
        'created_at': (value.created_at.toISOString()),
        'updated_at': (value.updated_at.toISOString()),
        'test_mode': value.test_mode,
    };
}

