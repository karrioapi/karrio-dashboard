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


/**
 * 
 * @export
 */
export const TrackingStatusStatusEnum = {
    Pending: 'pending',
    InTransit: 'in_transit',
    Incident: 'incident',
    Delivered: 'delivered',
    Unknown: 'unknown'
} as const;
export type TrackingStatusStatusEnum = typeof TrackingStatusStatusEnum[keyof typeof TrackingStatusStatusEnum];


export function TrackingStatusStatusEnumFromJSON(json: any): TrackingStatusStatusEnum {
    return TrackingStatusStatusEnumFromJSONTyped(json, false);
}

export function TrackingStatusStatusEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackingStatusStatusEnum {
    return json as TrackingStatusStatusEnum;
}

export function TrackingStatusStatusEnumToJSON(value?: TrackingStatusStatusEnum | null): any {
    return value as any;
}

