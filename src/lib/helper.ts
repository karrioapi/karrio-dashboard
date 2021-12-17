import { Shipment } from "@/purplship/rest/index";
import { BASE_PATH } from "@/client/context";
import { AddressType, CommodityType, CustomsType, ParcelType, PresetCollection, RequestError, ShipmentType } from "@/lib/types";


const DATE_FORMAT = new Intl.DateTimeFormat("default", { month: 'short', day: '2-digit' });
const DATE_TIME_FORMAT = new Intl.DateTimeFormat("default", { month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit" });
const DATE_TIME_FORMAT_LONG = new Intl.DateTimeFormat("default", { month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit", second: "2-digit" });


export function formatRef(s?: string): string {
  return (s || "").replaceAll('_', ' ').toLocaleUpperCase();
}

export function formatDate(date_string: string): string {
  return DATE_FORMAT.format(new Date(date_string));
}

export function formatDateTime(date_string: string): string {
  return DATE_TIME_FORMAT.format(new Date(date_string));
}

export function formatDateTimeLong(date_string: string): string {
  return DATE_TIME_FORMAT_LONG.format(new Date(date_string));
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

export function formatAddressName(address: AddressType): string {
  return [
    address.person_name,
    address.company_name
  ].filter(a => !isNone(a) && a !== "").join(' - ');
}

export function formatCustomsLabel(customs: CustomsType): string {
  return [
    customs.content_type,
    customs.incoterm
  ]
    .filter(c => !isNone(c))
    .map(c => formatRef('' + c)).join(' - ');
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

export function formatDimension(parcel?: Partial<ParcelType>): string {
  if (parcel !== undefined && parcel !== null) {

    const { dimension_unit, height, length, width } = parcel;
    let formatted = formatValues(' x ', width, height, length);

    return `Dimensions: ${formatted} ${dimension_unit}`;
  }
  return 'Dimensions: None specified...';
}

export function formatWeight(parcel?: Partial<ParcelType> | Partial<CommodityType>): string {
  if (parcel !== undefined && parcel !== null) {

    const { weight, weight_unit } = parcel;

    return `Weight: ${weight} ${weight_unit}`;
  }
  return 'Weight: None specified...';
}

export function isNone(value: any): boolean {
  return value === null || value === undefined;
}

export function isNoneOrEmpty(value: any): boolean {
  return isNone(value) || value === "" || value === [];
}

export function deepEqual(value1?: object | null, value2?: object | null): boolean {
  const clean_value1 = Object.entries(value1 || {}).reduce((p, [k, v]) => ({ ...p, [k]: v === null ? undefined : v }), {});
  const clean_value2 = Object.entries(value2 || {}).reduce((p, [k, v]) => ({ ...p, [k]: v === null ? undefined : v }), {});


  return (
    JSON.stringify(clean_value1, Object.keys(clean_value1 || {}).sort()) ===
    JSON.stringify(clean_value2, Object.keys(clean_value2 || {}).sort())
  );
}

// Remove undefined values from objects
export function cleanDict<T = object>(value: object): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function formatParcelLabel(parcel?: ParcelType): string {
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

export async function handleFailure<T>(request: Promise<T>): Promise<T> {
  try {
    const response = await request;
    return response
  } catch (err: any) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Oups! Looks like you are offline');
    } else if (err instanceof Response) {
      throw new RequestError(await err.json());
    }
    throw err
  }
}

export enum ServerErrorCode {
  API_CONNECTION_ERROR
}

export type ServerError = { code?: ServerErrorCode; message?: string; };

export function createServerError(error: ServerError) {
  return error;
}

export function getCursorPagination(cursor?: string | null): { limit?: number; offset?: number; } {
  const [_, queryString] = (cursor || '').split('?');
  const params = (queryString || '').split('&');

  const [_limit, limit] = (params.find(p => p.includes('limit')) || '').split('=');
  const [_offset, offset] = (params.find(p => p.includes('offset')) || '').split('=');

  return {
    ...(limit === undefined ? {} : { limit: parseInt(limit) }),
    ...(offset === undefined ? {} : { offset: parseInt(offset) })
  };
}

export function shipmentCarrier(shipment: ShipmentType) {
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
    .replaceAll('///', '/')
    .replaceAll('//', '/');
}

export function getURLSearchParams() {
  const query = new URLSearchParams(location.search);
  return [...query.keys() as any].reduce(
    (acc, key) => ({ ...acc, [key]: query.get(key) }),
    {}
  );
}

export function insertUrlParam(params: {} | any) {
  if (window.history.pushState) {
    let searchParams = new URLSearchParams(params);
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    if (newurl.endsWith('?')) {
      newurl = newurl.substring(0, newurl.length - 1);
    }
    window.history.pushState({ path: newurl }, '', newurl);
  }
}

export function jsonify(value: any): string {
  return JSON.stringify(typeof value == 'string' ? JSON.parse(value) : value, null, 2);
}
