/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.11rc5`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=25\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.11rc5
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    Operation,
    OperationFromJSON,
    OperationToJSON,
    Webhook,
    WebhookFromJSON,
    WebhookToJSON,
    WebhookData,
    WebhookDataFromJSON,
    WebhookDataToJSON,
    WebhookList,
    WebhookListFromJSON,
    WebhookListToJSON,
    WebhookTestRequest,
    WebhookTestRequestFromJSON,
    WebhookTestRequestToJSON,
} from '../models';

export interface CreateRequest {
    data: WebhookData;
}

export interface ListRequest {
    limit?: number;
    offset?: number;
    testMode?: boolean | null;
}

export interface RemoveRequest {
    id: string;
}

export interface RetrieveRequest {
    id: string;
}

export interface TestRequest {
    id: string;
    data: WebhookTestRequest;
}

export interface UpdateRequest {
    id: string;
    data: WebhookData;
}

/**
 * 
 */
export class WebhooksApi extends runtime.BaseAPI {

    /**
     * Create a new webhook.
     * Create a webhook
     */
    async createRaw(requestParameters: CreateRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Webhook>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling create.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/webhooks`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: WebhookDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WebhookFromJSON(jsonValue));
    }

    /**
     * Create a new webhook.
     * Create a webhook
     */
    async create(requestParameters: CreateRequest, initOverrides?: RequestInit): Promise<Webhook> {
        const response = await this.createRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve all webhooks.
     * List all webhooks
     */
    async listRaw(requestParameters: ListRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<WebhookList>> {
        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.testMode !== undefined) {
            queryParameters['test_mode'] = requestParameters.testMode;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/webhooks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WebhookListFromJSON(jsonValue));
    }

    /**
     * Retrieve all webhooks.
     * List all webhooks
     */
    async list(requestParameters: ListRequest, initOverrides?: RequestInit): Promise<WebhookList> {
        const response = await this.listRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Remove a webhook.
     * Remove a webhook
     */
    async removeRaw(requestParameters: RemoveRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Operation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling remove.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/webhooks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationFromJSON(jsonValue));
    }

    /**
     * Remove a webhook.
     * Remove a webhook
     */
    async remove(requestParameters: RemoveRequest, initOverrides?: RequestInit): Promise<Operation> {
        const response = await this.removeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve a webhook.
     * Retrieve a webhook
     */
    async retrieveRaw(requestParameters: RetrieveRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Webhook>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/webhooks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WebhookFromJSON(jsonValue));
    }

    /**
     * Retrieve a webhook.
     * Retrieve a webhook
     */
    async retrieve(requestParameters: RetrieveRequest, initOverrides?: RequestInit): Promise<Webhook> {
        const response = await this.retrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * test a webhook.
     * Test a webhook
     */
    async testRaw(requestParameters: TestRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Operation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling test.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling test.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/webhooks/{id}/test`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: WebhookTestRequestToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationFromJSON(jsonValue));
    }

    /**
     * test a webhook.
     * Test a webhook
     */
    async test(requestParameters: TestRequest, initOverrides?: RequestInit): Promise<Operation> {
        const response = await this.testRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update a webhook.
     * Update a webhook
     */
    async updateRaw(requestParameters: UpdateRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Webhook>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling update.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling update.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/webhooks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: WebhookDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WebhookFromJSON(jsonValue));
    }

    /**
     * update a webhook.
     * Update a webhook
     */
    async update(requestParameters: UpdateRequest, initOverrides?: RequestInit): Promise<Webhook> {
        const response = await this.updateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
