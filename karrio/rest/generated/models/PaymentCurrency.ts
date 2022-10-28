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
    CurrencyEnum,
    instanceOfCurrencyEnum,
    CurrencyEnumFromJSON,
    CurrencyEnumFromJSONTyped,
    CurrencyEnumToJSON,
} from './CurrencyEnum';
import {
    NullEnum,
    instanceOfNullEnum,
    NullEnumFromJSON,
    NullEnumFromJSONTyped,
    NullEnumToJSON,
} from './NullEnum';

/**
 * @type PaymentCurrency
 * The payment amount currency
 * @export
 */
export type PaymentCurrency = BlankEnum | CurrencyEnum | NullEnum;

export function PaymentCurrencyFromJSON(json: any): PaymentCurrency {
    return PaymentCurrencyFromJSONTyped(json, false);
}

export function PaymentCurrencyFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentCurrency {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...BlankEnumFromJSONTyped(json, true), ...CurrencyEnumFromJSONTyped(json, true), ...NullEnumFromJSONTyped(json, true) };
}

export function PaymentCurrencyToJSON(value?: PaymentCurrency | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfBlankEnum(value)) {
        return BlankEnumToJSON(value as BlankEnum);
    }
    if (instanceOfCurrencyEnum(value)) {
        return CurrencyEnumToJSON(value as CurrencyEnum);
    }
    if (instanceOfNullEnum(value)) {
        return NullEnumToJSON(value as NullEnum);
    }

    return {};
}

