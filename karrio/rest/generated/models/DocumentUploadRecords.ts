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
import type { DocumentUploadRecord } from './DocumentUploadRecord';
import {
    DocumentUploadRecordFromJSON,
    DocumentUploadRecordFromJSONTyped,
    DocumentUploadRecordToJSON,
} from './DocumentUploadRecord';

/**
 * 
 * @export
 * @interface DocumentUploadRecords
 */
export interface DocumentUploadRecords {
    /**
     * 
     * @type {number}
     * @memberof DocumentUploadRecords
     */
    count?: number | null;
    /**
     * 
     * @type {string}
     * @memberof DocumentUploadRecords
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DocumentUploadRecords
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<DocumentUploadRecord>}
     * @memberof DocumentUploadRecords
     */
    results: Array<DocumentUploadRecord>;
}

/**
 * Check if a given object implements the DocumentUploadRecords interface.
 */
export function instanceOfDocumentUploadRecords(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "results" in value;

    return isInstance;
}

export function DocumentUploadRecordsFromJSON(json: any): DocumentUploadRecords {
    return DocumentUploadRecordsFromJSONTyped(json, false);
}

export function DocumentUploadRecordsFromJSONTyped(json: any, ignoreDiscriminator: boolean): DocumentUploadRecords {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': ((json['results'] as Array<any>).map(DocumentUploadRecordFromJSON)),
    };
}

export function DocumentUploadRecordsToJSON(value?: DocumentUploadRecords | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'next': value.next,
        'previous': value.previous,
        'results': ((value.results as Array<any>).map(DocumentUploadRecordToJSON)),
    };
}

