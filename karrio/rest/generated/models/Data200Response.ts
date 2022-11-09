/* tslint:disable */
/* eslint-disable */
/**
 * Karrio API
 *  ## API Reference  Karrio is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Karrio API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Karrio API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.8.7`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Environments  The Karrio API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Karrio utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"count\": 100,     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [         { ... },     ] } ```  ## Metadata  Updateable Karrio objects—including Shipment and Order—have a metadata parameter. You can use this parameter to attach key-value data to these Karrio objects.  Metadata is useful for storing additional, structured information on an object. As an example, you could store your user\'s full name and corresponding unique identifier from your system on a Karrio Order object.  Do not store any sensitive information as metadata.  ## Authentication  API keys are used to authenticate requests. You can view and manage your API keys in the Dashboard.  Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.  Authentication to the API is performed via HTTP Basic Auth. Provide your API token as the basic auth username value. You do not need to provide a password.  ```shell $ curl https://instance.api.com/v1/shipments \\     -u key_xxxxxx: # The colon prevents curl from asking for a password. ```  If you need to authenticate via bearer auth (e.g., for a cross-origin request), use `-H \"Authorization: Token key_xxxxxx\"` instead of `-u key_xxxxxx`.  All API requests must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure). API requests without authentication will also fail.  
 *
 * The version of the OpenAPI document: 2022.8.7
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Data200Response
 */
export interface Data200Response {
    /**
     * 
     * @type {string}
     * @memberof Data200Response
     */
    version?: string;
    /**
     * 
     * @type {string}
     * @memberof Data200Response
     */
    app_name?: string;
    /**
     * 
     * @type {string}
     * @memberof Data200Response
     */
    app_website?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    audit_logging?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    allow_signup?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    allow_admin_approved_signup?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    allow_multi_account?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    multi_organizations?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    orders_management?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    apps_management?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    documents_management?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    data_import_export?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    custom_carrier_definition?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Data200Response
     */
    persist_sdk_tracing?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Data200Response
     */
    admin?: string;
    /**
     * 
     * @type {string}
     * @memberof Data200Response
     */
    openapi?: string;
    /**
     * 
     * @type {string}
     * @memberof Data200Response
     */
    graphql?: string;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    address_auto_complete?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    countries?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    currencies?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    carriers?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    custom_carriers?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    customs_content_type?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    incoterms?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    states?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    services?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    service_names?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    options?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    option_names?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    package_presets?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    packaging_types?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    payment_types?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    carrier_capabilities?: object;
    /**
     * 
     * @type {object}
     * @memberof Data200Response
     */
    service_levels?: object;
}

/**
 * Check if a given object implements the Data200Response interface.
 */
export function instanceOfData200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function Data200ResponseFromJSON(json: any): Data200Response {
    return Data200ResponseFromJSONTyped(json, false);
}

export function Data200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): Data200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'VERSION') ? undefined : json['VERSION'],
        'app_name': !exists(json, 'APP_NAME') ? undefined : json['APP_NAME'],
        'app_website': !exists(json, 'APP_WEBSITE') ? undefined : json['APP_WEBSITE'],
        'audit_logging': !exists(json, 'AUDIT_LOGGING') ? undefined : json['AUDIT_LOGGING'],
        'allow_signup': !exists(json, 'ALLOW_SIGNUP') ? undefined : json['ALLOW_SIGNUP'],
        'allow_admin_approved_signup': !exists(json, 'ALLOW_ADMIN_APPROVED_SIGNUP') ? undefined : json['ALLOW_ADMIN_APPROVED_SIGNUP'],
        'allow_multi_account': !exists(json, 'ALLOW_MULTI_ACCOUNT') ? undefined : json['ALLOW_MULTI_ACCOUNT'],
        'multi_organizations': !exists(json, 'MULTI_ORGANIZATIONS') ? undefined : json['MULTI_ORGANIZATIONS'],
        'orders_management': !exists(json, 'ORDERS_MANAGEMENT') ? undefined : json['ORDERS_MANAGEMENT'],
        'apps_management': !exists(json, 'APPS_MANAGEMENT') ? undefined : json['APPS_MANAGEMENT'],
        'documents_management': !exists(json, 'DOCUMENTS_MANAGEMENT') ? undefined : json['DOCUMENTS_MANAGEMENT'],
        'data_import_export': !exists(json, 'DATA_IMPORT_EXPORT') ? undefined : json['DATA_IMPORT_EXPORT'],
        'custom_carrier_definition': !exists(json, 'CUSTOM_CARRIER_DEFINITION') ? undefined : json['CUSTOM_CARRIER_DEFINITION'],
        'persist_sdk_tracing': !exists(json, 'PERSIST_SDK_TRACING') ? undefined : json['PERSIST_SDK_TRACING'],
        'admin': !exists(json, 'ADMIN') ? undefined : json['ADMIN'],
        'openapi': !exists(json, 'OPENAPI') ? undefined : json['OPENAPI'],
        'graphql': !exists(json, 'GRAPHQL') ? undefined : json['GRAPHQL'],
        'address_auto_complete': !exists(json, 'ADDRESS_AUTO_COMPLETE') ? undefined : json['ADDRESS_AUTO_COMPLETE'],
        'countries': !exists(json, 'countries') ? undefined : json['countries'],
        'currencies': !exists(json, 'currencies') ? undefined : json['currencies'],
        'carriers': !exists(json, 'carriers') ? undefined : json['carriers'],
        'custom_carriers': !exists(json, 'custom_carriers') ? undefined : json['custom_carriers'],
        'customs_content_type': !exists(json, 'customs_content_type') ? undefined : json['customs_content_type'],
        'incoterms': !exists(json, 'incoterms') ? undefined : json['incoterms'],
        'states': !exists(json, 'states') ? undefined : json['states'],
        'services': !exists(json, 'services') ? undefined : json['services'],
        'service_names': !exists(json, 'service_names') ? undefined : json['service_names'],
        'options': !exists(json, 'options') ? undefined : json['options'],
        'option_names': !exists(json, 'option_names') ? undefined : json['option_names'],
        'package_presets': !exists(json, 'package_presets') ? undefined : json['package_presets'],
        'packaging_types': !exists(json, 'packaging_types') ? undefined : json['packaging_types'],
        'payment_types': !exists(json, 'payment_types') ? undefined : json['payment_types'],
        'carrier_capabilities': !exists(json, 'carrier_capabilities') ? undefined : json['carrier_capabilities'],
        'service_levels': !exists(json, 'service_levels') ? undefined : json['service_levels'],
    };
}

export function Data200ResponseToJSON(value?: Data200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'VERSION': value.version,
        'APP_NAME': value.app_name,
        'APP_WEBSITE': value.app_website,
        'AUDIT_LOGGING': value.audit_logging,
        'ALLOW_SIGNUP': value.allow_signup,
        'ALLOW_ADMIN_APPROVED_SIGNUP': value.allow_admin_approved_signup,
        'ALLOW_MULTI_ACCOUNT': value.allow_multi_account,
        'MULTI_ORGANIZATIONS': value.multi_organizations,
        'ORDERS_MANAGEMENT': value.orders_management,
        'APPS_MANAGEMENT': value.apps_management,
        'DOCUMENTS_MANAGEMENT': value.documents_management,
        'DATA_IMPORT_EXPORT': value.data_import_export,
        'CUSTOM_CARRIER_DEFINITION': value.custom_carrier_definition,
        'PERSIST_SDK_TRACING': value.persist_sdk_tracing,
        'ADMIN': value.admin,
        'OPENAPI': value.openapi,
        'GRAPHQL': value.graphql,
        'ADDRESS_AUTO_COMPLETE': value.address_auto_complete,
        'countries': value.countries,
        'currencies': value.currencies,
        'carriers': value.carriers,
        'custom_carriers': value.custom_carriers,
        'customs_content_type': value.customs_content_type,
        'incoterms': value.incoterms,
        'states': value.states,
        'services': value.services,
        'service_names': value.service_names,
        'options': value.options,
        'option_names': value.option_names,
        'package_presets': value.package_presets,
        'packaging_types': value.packaging_types,
        'payment_types': value.payment_types,
        'carrier_capabilities': value.carrier_capabilities,
        'service_levels': value.service_levels,
    };
}

