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
export const DimensionUnitEnum = {
    Cm: 'CM',
    In: 'IN'
} as const;
export type DimensionUnitEnum = typeof DimensionUnitEnum[keyof typeof DimensionUnitEnum];


export function DimensionUnitEnumFromJSON(json: any): DimensionUnitEnum {
    return DimensionUnitEnumFromJSONTyped(json, false);
}

export function DimensionUnitEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): DimensionUnitEnum {
    return json as DimensionUnitEnum;
}

export function DimensionUnitEnumToJSON(value?: DimensionUnitEnum | null): any {
    return value as any;
}

