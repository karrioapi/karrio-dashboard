import {
  APIApi,
  AddressesApi,
  CarriersApi,
  CustomsApi,
  ParcelsApi,
  PickupsApi,
  ProxyApi,
  ShipmentsApi,
  TrackersApi,
  WebhooksApi,
} from './generated/api';
import { Configuration, ConfigurationParameters } from './generated/configuration';

export * from "./generated";

export interface PurplshipClientInterface {
  API: APIApi;
  addresses: AddressesApi;
  carriers: CarriersApi;
  customs: CustomsApi;
  parcels: ParcelsApi;
  pickups: PickupsApi;
  proxy: ProxyApi;
  shipments: ShipmentsApi;
  trackers: TrackersApi;
  webhooks: WebhooksApi;
  config: Configuration;
}

export class PurplshipClient implements PurplshipClientInterface {
  API: APIApi;
  addresses: AddressesApi;
  carriers: CarriersApi;
  customs: CustomsApi;
  parcels: ParcelsApi;
  pickups: PickupsApi;
  proxy: ProxyApi;
  shipments: ShipmentsApi;
  trackers: TrackersApi;
  webhooks: WebhooksApi;
  config: Configuration;

  constructor(clientConfig: ConfigurationParameters) {
    const config = new Configuration(clientConfig);

    this.config = config;
    this.API = new APIApi(config);
    this.addresses = new AddressesApi(config);
    this.carriers = new CarriersApi(config);
    this.customs = new CustomsApi(config);
    this.parcels = new ParcelsApi(config);
    this.pickups = new PickupsApi(config);
    this.proxy = new ProxyApi(config);
    this.shipments = new ShipmentsApi(config);
    this.trackers = new TrackersApi(config);
    this.webhooks = new WebhooksApi(config);
  }
}
