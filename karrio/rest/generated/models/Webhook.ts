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
import type { EnabledEventsEnum } from './EnabledEventsEnum';
import {
    EnabledEventsEnumFromJSON,
    EnabledEventsEnumFromJSONTyped,
    EnabledEventsEnumToJSON,
} from './EnabledEventsEnum';

/**
 * 
 * @export
 * @interface Webhook
 */
export interface Webhook {
    /**
     * A unique identifier
     * @type {string}
     * @memberof Webhook
     */
    id?: string;
    /**
     * The URL of the webhook endpoint.
     * @type {string}
     * @memberof Webhook
     */
    url: string;
    /**
     * An optional description of what the webhook is used for.
     * @type {string}
     * @memberof Webhook
     */
    description?: string | null;
    /**
     * The list of events to enable for this endpoint.
     * @type {Array<EnabledEventsEnum>}
     * @memberof Webhook
     */
    enabled_events: Array<EnabledEventsEnum>;
    /**
     * Indicates that the webhook is disabled
     * @type {boolean}
     * @memberof Webhook
     */
    disabled?: boolean | null;
    /**
     * Specifies the object type
     * @type {string}
     * @memberof Webhook
     */
    object_type?: string;
    /**
     * The datetime of the last event sent.
     * @type {Date}
     * @memberof Webhook
     */
    last_event_at?: Date | null;
    /**
     * Header signature secret
     * @type {string}
     * @memberof Webhook
     */
    secret: string;
    /**
     * Specified whether it was created with a carrier in test mode
     * @type {boolean}
     * @memberof Webhook
     */
    test_mode: boolean;
}

/**
 * Check if a given object implements the Webhook interface.
 */
export function instanceOfWebhook(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "enabled_events" in value;
    isInstance = isInstance && "secret" in value;
    isInstance = isInstance && "test_mode" in value;

    return isInstance;
}

export function WebhookFromJSON(json: any): Webhook {
    return WebhookFromJSONTyped(json, false);
}

export function WebhookFromJSONTyped(json: any, ignoreDiscriminator: boolean): Webhook {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'url': json['url'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'enabled_events': ((json['enabled_events'] as Array<any>).map(EnabledEventsEnumFromJSON)),
        'disabled': !exists(json, 'disabled') ? undefined : json['disabled'],
        'object_type': !exists(json, 'object_type') ? undefined : json['object_type'],
        'last_event_at': !exists(json, 'last_event_at') ? undefined : (json['last_event_at'] === null ? null : new Date(json['last_event_at'])),
        'secret': json['secret'],
        'test_mode': json['test_mode'],
    };
}

export function WebhookToJSON(value?: Webhook | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'url': value.url,
        'description': value.description,
        'enabled_events': ((value.enabled_events as Array<any>).map(EnabledEventsEnumToJSON)),
        'disabled': value.disabled,
        'object_type': value.object_type,
        'last_event_at': value.last_event_at === undefined ? undefined : (value.last_event_at === null ? null : value.last_event_at.toISOString()),
        'secret': value.secret,
        'test_mode': value.test_mode,
    };
}

