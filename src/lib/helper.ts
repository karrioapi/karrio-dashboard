import { AddressType, Collection, CommodityType, CustomsType, ErrorType, OrderType, ParcelType, PresetCollection, RequestError, SessionType, ShipmentType } from "@/lib/types";
import { DocumentNode, FetchResult, MutationFunctionOptions } from "@apollo/client";
import { BASE_PATH, KARRIO_API } from "@/client/context";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import moment from "moment";
import React from "react";
import axios from "axios";

export const isEqual = require('lodash.isequal');
export const snakeCase = require('lodash.snakecase');
export const groupBy = require('lodash.groupby');

export function formatRef(s?: string): string {
  return (s || "").split('_').join(' ').toLocaleUpperCase();
}

export function formatDate(date_string: string): string {
  return moment(date_string).format('ll');
}

export function formatDateTime(date_string: string): string {
  return moment(date_string).format('MMM D, hh:mm A');
}

export function formatDateTimeLong(date_string: string): string {
  return moment(date_string).format('llll');
}

export function formatDayDate(date_string: string): string {
  return new Date(date_string).toUTCString().split(' ').slice(0, 4).join(' ')
}

export function notEmptyJSON(value?: string | null): boolean {
  return !isNone(value) && value !== JSON.stringify({});
}

export function formatAddress(address: AddressType): string {
  return [
    address.person_name || address.company_name,
    address.city,
    address.country_code
  ].filter(a => !isNone(a) && a !== "").join(', ');
}

export function formatAddressShort(address: AddressType): string {
  return [
    address.person_name || address.company_name,
    address.city,
  ].filter(a => !isNone(a) && a !== "").join(', ');
}

export function formatFullAddress(address: AddressType, countries?: { [country_code: string]: string }): string {
  const country = countries === undefined ? address.country_code : countries[address.country_code];
  return [
    address.address_line1,
    address.address_line2,
    address.city,
    address.state_code,
    address.postal_code,
    country
  ].filter(a => !isNone(a) && a !== "").join(', ');
}

export function formatAddressLocation(address: AddressType, countries?: { [country_code: string]: string }): string {
  const country = countries === undefined ? address.country_code : countries[address.country_code];
  return [
    address.city,
    address.state_code,
    address.postal_code,
    country
  ].filter(a => !isNone(a) && a !== "").join(', ');
}

export function formatAddressLocationShort(address: AddressType, countries?: { [country_code: string]: string }): string {
  const country = countries === undefined ? address.country_code : countries[address.country_code];
  return [
    address.state_code,
    address.postal_code,
    country
  ].filter(a => !isNone(a) && a !== "").join(', ');
}

export function formatAddressName(address: AddressType): string {
  return [
    address.person_name,
    address.company_name
  ].filter(a => !isNone(a) && a !== "").join(' - ');
}

export function formatAddressRegion(address: AddressType): string {
  return [
    address.city,
    address.country_code
  ].filter(a => !isNone(a) && a !== "").join(', ');
}

export function formatCustomsLabel(customs: CustomsType): string {
  return [
    customs.content_type,
    customs.incoterm
  ]
    .filter(c => !isNone(c))
    .map(c => formatRef('' + c)).join(' - ');
}

export function formatCommodity(item: CommodityType, index?: number): string {
  const identifier = item.sku || item.description;
  const info = isNoneOrEmpty(identifier) ? `${index || 'item'} - ` : `${identifier!.slice(0, 45)}...`;
  return `${info} | ${item.quantity} x ${formatWeight(item)}`;
}

export function formatOrderLineItem(order: OrderType, item: CommodityType, index?: number) {
  const identifier = item.sku || item.description;
  const info = isNoneOrEmpty(identifier) ? `${order.order_id} - item ${index || ''}` : `${order.order_id} - ${identifier!.slice(0, 45)}...`;
  return `${info} (${item.quantity} x ${formatWeight(item)})`;
}

export function findPreset(presets: PresetCollection, package_preset?: string): Partial<ParcelType> | undefined {
  const carrier = Object.values(presets).find((carrier) => {
    return Object.keys(carrier).includes(package_preset as string);
  });

  if (carrier === undefined) return undefined;

  return { ...carrier[package_preset as string], package_preset };
}

export function formatValues(separator: string, ...args: any[]): string {
  return args.filter(d => d !== undefined).join(separator);
}

export function formatDimension(parcel?: Partial<ParcelType> | null): string {
  if (parcel !== undefined && parcel !== null) {

    const { dimension_unit, height, length, width } = parcel;
    let formatted = formatValues(' x ', length, width, height);

    return `${formatted} ${dimension_unit}`;
  }
  return '';
}

export function formatWeight(data?: { weight: number, weight_unit: string } | any): string {
  if (data !== undefined && data !== null) {

    const { weight, weight_unit } = data;

    return `${weight} ${weight_unit}`;
  }
  return '';
}

export function formatCarrierSlug(name?: string) {
  const raw_name = (name || "").replace(/:-:/, ' ').replace(/:_:/, ' ').split(' ')[0];
  const count = raw_name.length > 10 ? 9 : 10;
  const short_name = raw_name.slice(0, count) + (count === 9 ? "." : "");
  return short_name.toUpperCase();
}

export function getInitials(text: string) {
  return text
    .split("-").join(" ")
    .split("_").join(" ")
    .split(" ")
    .map((n) => n[0])
    .join("")
}

export function isNone(value: any): boolean {
  return value === null || value === undefined;
}

export function isNoneOrEmpty(value: any): boolean {
  return isNone(value) || value === "" || isEqual(value, []);
}

export function deepEqual(value1?: object | null, value2?: object | null): boolean {
  const clean_value1 = Object.entries(value1 || {})
    .reduce((p, [k, v]) => ({ ...p, [k]: v === null ? undefined : v }), {});
  const clean_value2 = Object.entries(value2 || {})
    .reduce((p, [k, v]) => ({ ...p, [k]: v === null ? undefined : v }), {});

  return (
    JSON.stringify(clean_value1, Object.keys(clean_value1 || {}).sort()) ===
    JSON.stringify(clean_value2, Object.keys(clean_value2 || {}).sort())
  );
}

// Remove undefined values from objects
export function cleanDict<T = object>(value: object): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function formatParcelLabel(parcel?: ParcelType | null): string {
  if (isNone(parcel) || (parcel && isNone(parcel?.package_preset) && isNone(parcel?.packaging_type))) {
    return '';
  }
  if (!isNone(parcel?.package_preset)) {
    return formatRef(parcel?.package_preset as string);
  }
  else if (!isNone(parcel?.packaging_type)) {
    return formatRef(parcel?.packaging_type as string);
  }
  return '';
}

export const COUNTRY_WITH_POSTAL_CODE = [
  'CA', 'US', 'UK', 'FR', //TODO:: Add more countries with postal code here.
];

export function getCookie(name: string): string {
  var cookieValue = "";
  if (document?.cookie && document?.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function setCookie(cname: string, cvalue: any, exdays: number = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export async function handleFailure<T>(request: Promise<T>): Promise<T> {
  try {
    const response = await request;
    return response
  } catch (err: any) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Oups! Looks like you are offline');
    } else if (
      ['404', '405', '500', '402'].includes(`${err.response?.status}`)
      && typeof err.response?.data === "string"
    ) {
      throw err;
    } else if (err instanceof Response) {
      throw new RequestError(await err.json());
    } else if (err.response) {
      throw new RequestError(err.response?.data || err.response);
    }
    throw err;
  }
}

export enum ServerErrorCode {
  API_CONNECTION_ERROR,
  API_AUTH_ERROR,
}

export type ServerError = { code?: ServerErrorCode; message?: string; };

export function createServerError(error: ServerError) {
  return error;
}

export function shipmentCarrier(shipment: ShipmentType) {
  if ((shipment.meta as any)?.rate_provider === 'generic') {
    return shipment.carrier_name;
  }
  return (shipment.meta as any)?.rate_provider || shipment.carrier_name;
}

export const parseJwt = (token: string): any => {
  try {
    const content = Buffer.from(token.split('.')[1], 'base64').toString();
    return JSON.parse(content);
  } catch (e) {
    return {};
  }
};

export function p(strings: TemplateStringsArray, ...keys: any[]) {
  const base = (keys || []).reduce((acc, key, i) => acc + strings[i] + key, '');
  const template = `${base}${strings[strings.length - 1]}`;

  return `${BASE_PATH}/${template}`
    .replace('///', '/')
    .replace('//', '/');
}

export function gqlstr(node: DocumentNode): string {
  return (node.loc && node.loc.source.body) || "";
}

export function useLocation() {
  const router = useRouter();

  const updateUrlParam = (param: string, value: string) => {
    router.push({
      pathname: location.pathname,
      query: { ...router.query, [param]: value },
    }, undefined, { shallow: true })
  };

  return {
    ...router,
    addUrlParam,
    updateUrlParam,
    insertUrlParam,
    removeUrlParam,
  };
};

export function getURLSearchParams() {
  const query = new URLSearchParams(location.search);
  return [...query.keys() as any].reduce(
    (acc, key) => ({ ...acc, [key]: query.get(key) }),
    {}
  );
};

export function insertUrlParam(params: {} | any) {
  if (window.history.pushState) {
    params = Object.keys(params).reduce((acc, key) => (
      key === 'test_mode' ? acc : { ...acc, [key]: params[key] }
    ), {});
    let searchParams = new URLSearchParams(params);
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    if (newurl.endsWith('?')) {
      newurl = newurl.substring(0, newurl.length - 1);
    }
    window.history.pushState({ path: newurl }, '', newurl);
  }
}

export function addUrlParam(key: string, value: string) {
  insertUrlParam({ ...getURLSearchParams(), [key]: value });
}

export function removeUrlParam(param: string) {
  const params = getURLSearchParams();
  delete params[param];
  insertUrlParam(params);
}

export function jsonify(value: any): string {
  return JSON.stringify(typeof value == 'string' ? JSON.parse(value) : value, null, 2);
}

export function validationMessage(message: string) {
  return (e: React.FormEvent | any) => {
    e.target.validity.valid && e.target.setCustomValidity(message);
  }
}

export function validityCheck(nested?: (e: React.FormEvent | any) => void) {
  return (e: React.FormEvent | any) => {
    if (e.target.validity.valid) {
      e.target.setCustomValidity('');
      e.target.classList.remove('is-danger');
    } else {
      e.target.classList.add('is-danger');
    }

    return nested && nested(e);
  }
}

export function failsafe(fn: () => any, defaultValue: any = null) {
  try {
    return fn();
  } catch (e) {
    return defaultValue;
  }
}

export function handleGraphQLRequest<T, R, S>(operation: keyof T, request: (options?: MutationFunctionOptions<R, S>) => Promise<FetchResult<T>>) {
  return (options?: MutationFunctionOptions<R, S>) => new Promise<T[typeof operation]>(async (resolve, reject) => {
    const { data, errors }: any = await request({
      errorPolicy: "all", ...options,
      onError: (error) => error
    });

    if (data && (data[operation] as any)?.errors) {
      const errors = (data[operation] as any).errors
        .map((error: { field: string, messages: string[] }) => (
          new ErrorType(error.field, error.messages)
        ));
      reject(errors);
      return
    }

    if (errors?.graphQLErrors) {
      reject(errors.graphQLErrors);
      return
    }

    if (errors?.networkError) {
      const _errors = (errors?.networkError?.result?.errors || []).map(
        ({ message }: any) => new ErrorType("validation", [message])
      );
      reject(_errors);
      return
    }

    resolve((data ? data[operation] : null) as T[typeof operation]);
  });
}

export function debounce(func: (...args: any[]) => any, timeout: number = 300) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(null, args); }, timeout);
  };
};

export function isListEqual<T>(list1: T[], list2: T[]) {
  return list1.length === list2.length && list1.every((item, index) => item === list2[index]);
}

export function toSingleItem(collection: CommodityType[]) {
  return collection
    .reduce((acc, item) => {
      const clones = Array(item.quantity || 1)
        .fill(item)
        .map(clone => ([{ ...clone, quantity: 1 }]));

      return acc.concat(clones);
    }, [] as typeof collection[]);
}

export function getShipmentCommodities(shipment: ShipmentType): CommodityType[] {
  return Object.values(
    shipment?.parcels
      .map(parcel => parcel.items || [])
      .flat()
      .reduce((acc, item, _index) => {
        const index: string = item.parent_id || item.id || item.sku || item.hs_code || `${_index}`;
        acc[index] = { ...item, quantity: (acc[index]?.quantity || 0) + (item.quantity || 0) };
        return acc;
      }, {} as Collection<CommodityType>)
  );
}

export function forceSignOut() {
  signOut({ callbackUrl: '/login?next=' + window.location.pathname + window.location.search });
}

export function getSessionHeader(session: SessionType | Session | any) {
  const orgHeader = session?.orgId ? { 'x-org-id': session?.orgId } : {};
  const testHeader = session?.testMode ? { 'x-test-mode': session?.testMode } : {};
  const authHeader = session?.accessToken ? { 'Authorization': `Bearer ${session?.accessToken}` } : {};

  return { ...orgHeader, ...testHeader, ...authHeader };
}

export function useSessionHeader() {
  const { data } = useSession();
  return () => ({ headers: getSessionHeader(data) })
}

export type dataT<T> = { data?: T }
type requestArgs = {
  variables?: Record<string, any>;
  data?: Record<string, any>;
  operationName?: string;
  url?: string;
} & Record<string, any>;

export async function request<T>(query: string, args?: requestArgs): Promise<T> {
  const { url, data, variables: reqVariables, operationName, ...config } = args || {};
  try {
    const variables = data ? { data } : reqVariables;
    const { data: response } = await axios.post<{ data?: T, errors?: any }>(
      url || `${KARRIO_API || ''}/graphql`, { query, operationName, variables }, config,
    );

    if (response.errors) {
      throw new RequestError({ errors: response.errors });
    }

    return response.data || (response as T);
  } catch (error: any) {
    throw new RequestError(error.response?.data || error.data || error);
  }
}

export function errorToMessages(error: ErrorType | Error | any) {
  const data = error.data?.message || error.message;

  return (
    error.data?.errors ||
    error.data?.messages ||
    (data ? [data] : [error])
  );
}

export function onError(error: any) {
  const response = error.response?.data || error.data || error;

  const authExpiredError = (response.errors || []).find(
    (err: any) => (err.code === "authentication_required" || err.status_code === 401)
  );

  if (authExpiredError) { window.location.pathname = window.location.pathname; }
}
