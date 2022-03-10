/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.2`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=25\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2022.2
 * 
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
    Order,
    OrderFromJSON,
    OrderToJSON,
    OrderData,
    OrderDataFromJSON,
    OrderDataToJSON,
    OrderList,
    OrderListFromJSON,
    OrderListToJSON,
    OrderUpdateData,
    OrderUpdateDataFromJSON,
    OrderUpdateDataToJSON,
} from '../models';

export interface CancelRequest {
    id: string;
}

export interface CreateRequest {
    data: OrderData;
    test?: boolean | null;
}

export interface ListRequest {
    testMode?: boolean;
    status?: ListStatusEnum;
    createdAfter?: Date;
    createdBefore?: Date;
    limit?: number;
    offset?: number;
}

export interface RetrieveRequest {
    id: string;
}

export interface UpdateRequest {
    id: string;
    data: OrderUpdateData;
}

/**
 * 
 */
export class OrdersApi extends runtime.BaseAPI {

    /**
     * Cancel an order.
     * Cancel an order
     */
    async cancelRaw(requestParameters: CancelRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Order>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling cancel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/orders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     * Cancel an order.
     * Cancel an order
     */
    async cancel(requestParameters: CancelRequest, initOverrides?: RequestInit): Promise<Order> {
        const response = await this.cancelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a new order object.
     * Create an order
     */
    async createRaw(requestParameters: CreateRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Order>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling create.');
        }

        const queryParameters: any = {};

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/orders`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OrderDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     * Create a new order object.
     * Create an order
     */
    async create(requestParameters: CreateRequest, initOverrides?: RequestInit): Promise<Order> {
        const response = await this.createRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve all orders.
     * List all orders
     */
    async listRaw(requestParameters: ListRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<OrderList>> {
        const queryParameters: any = {};

        if (requestParameters.testMode !== undefined) {
            queryParameters['test_mode'] = requestParameters.testMode;
        }

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        if (requestParameters.createdAfter !== undefined) {
            queryParameters['created_after'] = (requestParameters.createdAfter as any).toISOString();
        }

        if (requestParameters.createdBefore !== undefined) {
            queryParameters['created_before'] = (requestParameters.createdBefore as any).toISOString();
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/orders`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderListFromJSON(jsonValue));
    }

    /**
     * Retrieve all orders.
     * List all orders
     */
    async list(requestParameters: ListRequest = {}, initOverrides?: RequestInit): Promise<OrderList> {
        const response = await this.listRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve an order.
     * Retrieve an order
     */
    async retrieveRaw(requestParameters: RetrieveRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Order>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/orders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     * Retrieve an order.
     * Retrieve an order
     */
    async retrieve(requestParameters: RetrieveRequest, initOverrides?: RequestInit): Promise<Order> {
        const response = await this.retrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation allows for updating properties of an order including `options` and `metadata`. It is not for editing the line items of an order.
     * Update an order
     */
    async updateRaw(requestParameters: UpdateRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Order>> {
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
            path: `/v1/orders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: OrderUpdateDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     * This operation allows for updating properties of an order including `options` and `metadata`. It is not for editing the line items of an order.
     * Update an order
     */
    async update(requestParameters: UpdateRequest, initOverrides?: RequestInit): Promise<Order> {
        const response = await this.updateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum ListStatusEnum {
    Unfulfilled = 'unfulfilled',
    Cancelled = 'cancelled',
    Fulfilled = 'fulfilled',
    Delivered = 'delivered',
    Partial = 'partial'
}
