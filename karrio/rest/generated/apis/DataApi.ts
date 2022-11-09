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


import * as runtime from '../runtime';
import type {
  BatchOperation,
  ErrorResponse,
} from '../models';
import {
    BatchOperationFromJSON,
    BatchOperationToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
} from '../models';

export interface ImportFileRequest {
    resourceType?: ImportFileResourceTypeEnum;
    dataTemplate?: string;
    dataFile?: Blob;
}

/**
 * 
 */
export class DataApi extends runtime.BaseAPI {

    /**
     * Import csv, xls and xlsx data files for: - tracking data - orders data - shipments data - billing data (soon)  **This operation will return a batch operation that you can poll to follow the import progression.**
     * Import data files
     */
    async importFileRaw(requestParameters: ImportFileRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BatchOperation>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
            { contentType: 'application/x-www-form-urlencoded' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.resourceType !== undefined) {
            formParams.append('resource_type', requestParameters.resourceType as any);
        }

        if (requestParameters.dataTemplate !== undefined) {
            formParams.append('data_template', requestParameters.dataTemplate as any);
        }

        if (requestParameters.dataFile !== undefined) {
            formParams.append('data_file', requestParameters.dataFile as any);
        }

        const response = await this.request({
            path: `/v1/data/import`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BatchOperationFromJSON(jsonValue));
    }

    /**
     * Import csv, xls and xlsx data files for: - tracking data - orders data - shipments data - billing data (soon)  **This operation will return a batch operation that you can poll to follow the import progression.**
     * Import data files
     */
    async importFile(requestParameters: ImportFileRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BatchOperation> {
        const response = await this.importFileRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const ImportFileResourceTypeEnum = {
    Order: 'order',
    Shipment: 'shipment',
    Tracking: 'tracking',
    Billing: 'billing'
} as const;
export type ImportFileResourceTypeEnum = typeof ImportFileResourceTypeEnum[keyof typeof ImportFileResourceTypeEnum];
