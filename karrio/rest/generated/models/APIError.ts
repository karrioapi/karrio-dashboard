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
 * @interface APIError
 */
export interface APIError {
    /**
     * The error or warning message
     * @type {string}
     * @memberof APIError
     */
    message?: string;
    /**
     * The message code
     * @type {string}
     * @memberof APIError
     */
    code?: string;
    /**
     * any additional details
     * @type {{ [key: string]: any; }}
     * @memberof APIError
     */
    details?: { [key: string]: any; };
}

/**
 * Check if a given object implements the APIError interface.
 */
export function instanceOfAPIError(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function APIErrorFromJSON(json: any): APIError {
    return APIErrorFromJSONTyped(json, false);
}

export function APIErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): APIError {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': !exists(json, 'message') ? undefined : json['message'],
        'code': !exists(json, 'code') ? undefined : json['code'],
        'details': !exists(json, 'details') ? undefined : json['details'],
    };
}

export function APIErrorToJSON(value?: APIError | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
        'code': value.code,
        'details': value.details,
    };
}

