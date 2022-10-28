/* tslint:disable */
/* eslint-disable */
/**
 * Karrio API
 *  ## API Reference  Karrio is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Karrio API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Karrio API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.8.6`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Environments  The Karrio API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Karrio utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"count\": 100,     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [         { ... },     ] } ```  ## Metadata  Updateable Karrio objects—including Shipment and Order—have a metadata parameter. You can use this parameter to attach key-value data to these Karrio objects.  Metadata is useful for storing additional, structured information on an object. As an example, you could store your user\'s full name and corresponding unique identifier from your system on a Karrio Order object.  Do not store any sensitive information as metadata.  ## Authentication  API keys are used to authenticate requests. You can view and manage your API keys in the Dashboard.  Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.  Authentication to the API is performed via HTTP Basic Auth. Provide your API token as the basic auth username value. You do not need to provide a password.  ```shell $ curl https://instance.api.com/v1/shipments \\     -u key_xxxxxx: # The colon prevents curl from asking for a password. ```  If you need to authenticate via bearer auth (e.g., for a cross-origin request), use `-H \"Authorization: Token key_xxxxxx\"` instead of `-u key_xxxxxx`.  All API requests must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure). API requests without authentication will also fail.  
 *
 * The version of the OpenAPI document: 2022.8.6
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ErrorMessages,
    ErrorMessagesFromJSON,
    ErrorMessagesToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    OperationResponse,
    OperationResponseFromJSON,
    OperationResponseToJSON,
    PickupCancelRequest,
    PickupCancelRequestFromJSON,
    PickupCancelRequestToJSON,
    PickupRequest,
    PickupRequestFromJSON,
    PickupRequestToJSON,
    PickupResponse,
    PickupResponseFromJSON,
    PickupResponseToJSON,
    PickupUpdateRequest,
    PickupUpdateRequestFromJSON,
    PickupUpdateRequestToJSON,
    RateRequest,
    RateRequestFromJSON,
    RateRequestToJSON,
    RateResponse,
    RateResponseFromJSON,
    RateResponseToJSON,
    ShipmentCancelRequest,
    ShipmentCancelRequestFromJSON,
    ShipmentCancelRequestToJSON,
    ShippingRequest,
    ShippingRequestFromJSON,
    ShippingRequestToJSON,
    ShippingResponse,
    ShippingResponseFromJSON,
    ShippingResponseToJSON,
    TrackingResponse,
    TrackingResponseFromJSON,
    TrackingResponseToJSON,
} from '../models';

export interface BuyLabelRequest {
    data: ShippingRequest;
}

export interface CancelPickupRequest {
    carrierName: CancelPickupCarrierNameEnum;
    data: PickupCancelRequest;
}

export interface FetchRatesRequest {
    data: RateRequest;
}

export interface SchedulePickupRequest {
    carrierName: SchedulePickupCarrierNameEnum;
    data: PickupRequest;
}

export interface TrackShipmentRequest {
    trackingNumber: string;
    carrierName: TrackShipmentCarrierNameEnum;
    hub?: string;
}

export interface UpdatePickupRequest {
    carrierName: UpdatePickupCarrierNameEnum;
    data: PickupUpdateRequest;
}

export interface VoidLabelRequest {
    carrierName: VoidLabelCarrierNameEnum;
    data: ShipmentCancelRequest;
}

/**
 * 
 */
export class ProxyApi extends runtime.BaseAPI {

    /**
     * Once the shipping rates are retrieved, provide the required info to submit the shipment by specifying your preferred rate.
     * Buy a shipment label
     */
    async buyLabelRaw(requestParameters: BuyLabelRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ShippingResponse>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling buyLabel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/shipping`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShippingRequestToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShippingResponseFromJSON(jsonValue));
    }

    /**
     * Once the shipping rates are retrieved, provide the required info to submit the shipment by specifying your preferred rate.
     * Buy a shipment label
     */
    async buyLabel(requestParameters: BuyLabelRequest, initOverrides?: RequestInit): Promise<ShippingResponse> {
        const response = await this.buyLabelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Cancel a pickup previously scheduled
     * Cancel a pickup
     */
    async cancelPickupRaw(requestParameters: CancelPickupRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<OperationResponse>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling cancelPickup.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling cancelPickup.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/pickups/{carrier_name}/cancel`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PickupCancelRequestToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationResponseFromJSON(jsonValue));
    }

    /**
     * Cancel a pickup previously scheduled
     * Cancel a pickup
     */
    async cancelPickup(requestParameters: CancelPickupRequest, initOverrides?: RequestInit): Promise<OperationResponse> {
        const response = await this.cancelPickupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     *  The Shipping process begins by fetching rates for your shipment. Use this service to fetch a shipping rates available. 
     * Fetch shipment rates
     */
    async fetchRatesRaw(requestParameters: FetchRatesRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<RateResponse>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling fetchRates.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/rates`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RateRequestToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RateResponseFromJSON(jsonValue));
    }

    /**
     *  The Shipping process begins by fetching rates for your shipment. Use this service to fetch a shipping rates available. 
     * Fetch shipment rates
     */
    async fetchRates(requestParameters: FetchRatesRequest, initOverrides?: RequestInit): Promise<RateResponse> {
        const response = await this.fetchRatesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Schedule one or many parcels pickup
     * Schedule a pickup
     */
    async schedulePickupRaw(requestParameters: SchedulePickupRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<PickupResponse>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling schedulePickup.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling schedulePickup.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/pickups/{carrier_name}`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PickupRequestToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PickupResponseFromJSON(jsonValue));
    }

    /**
     * Schedule one or many parcels pickup
     * Schedule a pickup
     */
    async schedulePickup(requestParameters: SchedulePickupRequest, initOverrides?: RequestInit): Promise<PickupResponse> {
        const response = await this.schedulePickupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * You can track a shipment by specifying the carrier and the shipment tracking number.
     * Track a shipment
     */
    async trackShipmentRaw(requestParameters: TrackShipmentRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<TrackingResponse>> {
        if (requestParameters.trackingNumber === null || requestParameters.trackingNumber === undefined) {
            throw new runtime.RequiredError('trackingNumber','Required parameter requestParameters.trackingNumber was null or undefined when calling trackShipment.');
        }

        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling trackShipment.');
        }

        const queryParameters: any = {};

        if (requestParameters.hub !== undefined) {
            queryParameters['hub'] = requestParameters.hub;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/tracking/{carrier_name}/{tracking_number}`.replace(`{${"tracking_number"}}`, encodeURIComponent(String(requestParameters.trackingNumber))).replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackingResponseFromJSON(jsonValue));
    }

    /**
     * You can track a shipment by specifying the carrier and the shipment tracking number.
     * Track a shipment
     */
    async trackShipment(requestParameters: TrackShipmentRequest, initOverrides?: RequestInit): Promise<TrackingResponse> {
        const response = await this.trackShipmentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Modify a scheduled pickup
     * Update a pickup
     */
    async updatePickupRaw(requestParameters: UpdatePickupRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<PickupResponse>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling updatePickup.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling updatePickup.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/pickups/{carrier_name}/update`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PickupUpdateRequestToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PickupResponseFromJSON(jsonValue));
    }

    /**
     * Modify a scheduled pickup
     * Update a pickup
     */
    async updatePickup(requestParameters: UpdatePickupRequest, initOverrides?: RequestInit): Promise<PickupResponse> {
        const response = await this.updatePickupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Cancel a shipment and the label previously created
     * Void a shipment label
     */
    async voidLabelRaw(requestParameters: VoidLabelRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<OperationResponse>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling voidLabel.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling voidLabel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/shipping/{carrier_name}/cancel`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShipmentCancelRequestToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationResponseFromJSON(jsonValue));
    }

    /**
     * Cancel a shipment and the label previously created
     * Void a shipment label
     */
    async voidLabel(requestParameters: VoidLabelRequest, initOverrides?: RequestInit): Promise<OperationResponse> {
        const response = await this.voidLabelRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum CancelPickupCarrierNameEnum {
    AmazonMws = 'amazon_mws',
    Aramex = 'aramex',
    Australiapost = 'australiapost',
    Canadapost = 'canadapost',
    Canpar = 'canpar',
    Chronopost = 'chronopost',
    DhlExpress = 'dhl_express',
    DhlPoland = 'dhl_poland',
    DhlUniversal = 'dhl_universal',
    Dicom = 'dicom',
    Dpdhl = 'dpdhl',
    Easypost = 'easypost',
    Eshipper = 'eshipper',
    Fedex = 'fedex',
    Freightcom = 'freightcom',
    Generic = 'generic',
    Purolator = 'purolator',
    Royalmail = 'royalmail',
    Sendle = 'sendle',
    SfExpress = 'sf_express',
    Tnt = 'tnt',
    Ups = 'ups',
    UpsFreight = 'ups_freight',
    Usps = 'usps',
    UspsInternational = 'usps_international',
    Yanwen = 'yanwen',
    Yunexpress = 'yunexpress'
}
/**
    * @export
    * @enum {string}
    */
export enum SchedulePickupCarrierNameEnum {
    AmazonMws = 'amazon_mws',
    Aramex = 'aramex',
    Australiapost = 'australiapost',
    Canadapost = 'canadapost',
    Canpar = 'canpar',
    Chronopost = 'chronopost',
    DhlExpress = 'dhl_express',
    DhlPoland = 'dhl_poland',
    DhlUniversal = 'dhl_universal',
    Dicom = 'dicom',
    Dpdhl = 'dpdhl',
    Easypost = 'easypost',
    Eshipper = 'eshipper',
    Fedex = 'fedex',
    Freightcom = 'freightcom',
    Generic = 'generic',
    Purolator = 'purolator',
    Royalmail = 'royalmail',
    Sendle = 'sendle',
    SfExpress = 'sf_express',
    Tnt = 'tnt',
    Ups = 'ups',
    UpsFreight = 'ups_freight',
    Usps = 'usps',
    UspsInternational = 'usps_international',
    Yanwen = 'yanwen',
    Yunexpress = 'yunexpress'
}
/**
    * @export
    * @enum {string}
    */
export enum TrackShipmentCarrierNameEnum {
    AmazonMws = 'amazon_mws',
    Aramex = 'aramex',
    Australiapost = 'australiapost',
    Canadapost = 'canadapost',
    Canpar = 'canpar',
    Chronopost = 'chronopost',
    DhlExpress = 'dhl_express',
    DhlPoland = 'dhl_poland',
    DhlUniversal = 'dhl_universal',
    Dicom = 'dicom',
    Dpdhl = 'dpdhl',
    Fedex = 'fedex',
    Generic = 'generic',
    Purolator = 'purolator',
    Royalmail = 'royalmail',
    Sendle = 'sendle',
    SfExpress = 'sf_express',
    Tnt = 'tnt',
    Ups = 'ups',
    UpsFreight = 'ups_freight',
    Usps = 'usps',
    UspsInternational = 'usps_international',
    Yanwen = 'yanwen',
    Yunexpress = 'yunexpress'
}
/**
    * @export
    * @enum {string}
    */
export enum UpdatePickupCarrierNameEnum {
    AmazonMws = 'amazon_mws',
    Aramex = 'aramex',
    Australiapost = 'australiapost',
    Canadapost = 'canadapost',
    Canpar = 'canpar',
    Chronopost = 'chronopost',
    DhlExpress = 'dhl_express',
    DhlPoland = 'dhl_poland',
    DhlUniversal = 'dhl_universal',
    Dicom = 'dicom',
    Dpdhl = 'dpdhl',
    Easypost = 'easypost',
    Eshipper = 'eshipper',
    Fedex = 'fedex',
    Freightcom = 'freightcom',
    Generic = 'generic',
    Purolator = 'purolator',
    Royalmail = 'royalmail',
    Sendle = 'sendle',
    SfExpress = 'sf_express',
    Tnt = 'tnt',
    Ups = 'ups',
    UpsFreight = 'ups_freight',
    Usps = 'usps',
    UspsInternational = 'usps_international',
    Yanwen = 'yanwen',
    Yunexpress = 'yunexpress'
}
/**
    * @export
    * @enum {string}
    */
export enum VoidLabelCarrierNameEnum {
    AmazonMws = 'amazon_mws',
    Aramex = 'aramex',
    Australiapost = 'australiapost',
    Canadapost = 'canadapost',
    Canpar = 'canpar',
    Chronopost = 'chronopost',
    DhlExpress = 'dhl_express',
    DhlPoland = 'dhl_poland',
    DhlUniversal = 'dhl_universal',
    Dicom = 'dicom',
    Dpdhl = 'dpdhl',
    Easypost = 'easypost',
    Eshipper = 'eshipper',
    Fedex = 'fedex',
    Freightcom = 'freightcom',
    Generic = 'generic',
    Purolator = 'purolator',
    Royalmail = 'royalmail',
    Sendle = 'sendle',
    SfExpress = 'sf_express',
    Tnt = 'tnt',
    Ups = 'ups',
    UpsFreight = 'ups_freight',
    Usps = 'usps',
    UspsInternational = 'usps_international',
    Yanwen = 'yanwen',
    Yunexpress = 'yunexpress'
}
