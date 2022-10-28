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
 * @type CommodityValueCurrency
 * The currency of the commodity value amount
 * @export
 */
export type CommodityValueCurrency = CurrencyEnum | NullEnum;

export function CommodityValueCurrencyFromJSON(json: any): CommodityValueCurrency {
    return CommodityValueCurrencyFromJSONTyped(json, false);
}

export function CommodityValueCurrencyFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommodityValueCurrency {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...CurrencyEnumFromJSONTyped(json, true), ...NullEnumFromJSONTyped(json, true) };
}

export function CommodityValueCurrencyToJSON(value?: CommodityValueCurrency | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfCurrencyEnum(value)) {
        return CurrencyEnumToJSON(value as CurrencyEnum);
    }
    if (instanceOfNullEnum(value)) {
        return NullEnumToJSON(value as NullEnum);
    }

    return {};
}

