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

import {
    BlankEnum,
    instanceOfBlankEnum,
    BlankEnumFromJSON,
    BlankEnumFromJSONTyped,
    BlankEnumToJSON,
} from './BlankEnum';
import {
    NullEnum,
    instanceOfNullEnum,
    NullEnumFromJSON,
    NullEnumFromJSONTyped,
    NullEnumToJSON,
} from './NullEnum';
import {
    PaidByEnum,
    instanceOfPaidByEnum,
    PaidByEnumFromJSON,
    PaidByEnumFromJSONTyped,
    PaidByEnumToJSON,
} from './PaidByEnum';

/**
 * @type DutyPaidBy
 * The duty payer
 * @export
 */
export type DutyPaidBy = BlankEnum | NullEnum | PaidByEnum;

export function DutyPaidByFromJSON(json: any): DutyPaidBy {
    return DutyPaidByFromJSONTyped(json, false);
}

export function DutyPaidByFromJSONTyped(json: any, ignoreDiscriminator: boolean): DutyPaidBy {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...BlankEnumFromJSONTyped(json, true), ...NullEnumFromJSONTyped(json, true), ...PaidByEnumFromJSONTyped(json, true) };
}

export function DutyPaidByToJSON(value?: DutyPaidBy | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfBlankEnum(value)) {
        return BlankEnumToJSON(value as BlankEnum);
    }
    if (instanceOfNullEnum(value)) {
        return NullEnumToJSON(value as NullEnum);
    }
    if (instanceOfPaidByEnum(value)) {
        return PaidByEnumToJSON(value as PaidByEnum);
    }

    return {};
}

