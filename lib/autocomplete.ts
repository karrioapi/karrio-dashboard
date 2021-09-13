import { Address, AddressCountryCodeEnum } from "@/api/index";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { isNone } from "@/lib/helper";
import { Collection } from "@/lib/types";

export interface QueryAutocompletePrediction {
    description: string;
    location: string;
    id: string;
    details: any;
}

type GooglePrediction = {
    place_id: string;
    description: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
    };
    terms: {
        offset: number;
        value: string;
    }[]
}

type CanadaPostPrediction = {
    Id: string,
    Text: string,
    Highlight: string,
    Cursor: string,
    Description: string,
    Next: string,
}


export type AutocompleteConfig = {
    is_enabled: boolean;
    provider?: string;
    url?: string;
    key?: string;
};

type PredictionCallback = (predictions: QueryAutocompletePrediction[]) => void;
type PredictionInput = { input: string };

export interface AutocompleteService {
    getPlacePredictions: (params: PredictionInput, callback: PredictionCallback) => void;
    formatPrediction: (prediction: QueryAutocompletePrediction, countries: Collection) => Partial<Address>;
}

export function initDebouncedPrediction(data: AutocompleteConfig) {
    if (!data?.is_enabled) return undefined;

    const request: Subject<{ params: PredictionInput, callback: PredictionCallback }> = new Subject();
    const serviceType = {
        google: initGoogleService,
        canadapost: initCanadaPostService
    }[data.provider as string];
    const service = serviceType !== undefined ? serviceType(data) : undefined;

    request.pipe(debounceTime(500)).subscribe((data) => {
        service?.getPlacePredictions(data.params, data.callback);
    });

    return {
        getPlacePredictions: (params: PredictionInput, callback: PredictionCallback) => {
            request.next({ params, callback });
        },
        formatPrediction: (prediction: QueryAutocompletePrediction, countries: Collection) => {
            return service?.formatPrediction(prediction, countries)
        }
    };
}

function initGoogleService(): AutocompleteService {
    const service = new (window as any).google.maps.places.AutocompleteService();

    return {
        getPlacePredictions(params, callback) {
            service.getPlacePredictions(params, (result: GooglePrediction[], status: string) => {
                if (status === "OK") {
                    const predictions: QueryAutocompletePrediction[] = result.map(prediction => {
                        return {
                            id: prediction.place_id,
                            description: prediction.structured_formatting.main_text,
                            location: prediction.structured_formatting.secondary_text,
                            details: prediction
                        }
                    });
                    callback(predictions);
                } else {
                    callback([])
                }
            });
        },
        formatPrediction(prediction: QueryAutocompletePrediction, countries: Collection): Partial<Address> {
            const details: GooglePrediction = prediction.details;
            let content = details.description.split(', ');
            let address: Partial<Address> = { address_line1: content[0] };

            if (content.length >= 3) {
                const country = content[content.length - 1]
                const [country_code, _] = Object.entries(countries).find(([code, name]) => (
                    name.toLowerCase() === country || code.toLowerCase() == country.slice(0, 2).toLowerCase()
                )) || [];
                if (country_code !== undefined) address.country_code = country_code as AddressCountryCodeEnum;

                const state = content[content.length - 2];
                if (state !== undefined) address.state_code = state;

                const city = content[content.length - 3];
                if (city !== undefined) address.city = city;
            }

            return address;
        }
    };
}

function initCanadaPostService(data: AutocompleteConfig): AutocompleteService {

    return {
        getPlacePredictions(params, callback) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3.ws", true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                const queryString = new URLSearchParams({
                    key: encodeURIComponent(data.key as string),
                    SearchTerm: encodeURIComponent(params.input),
                    SearchFor: encodeURIComponent('Everything'),
                    LanguagePreference: encodeURIComponent('EN'),
                    MaxSuggestions: encodeURIComponent('7'),
                    MaxResults: encodeURIComponent('7')
                }).toString();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.Items.length == 1 && typeof (response.Items[0].Error) != "undefined") {
                            callback([]);
                        } else {
                            const predictions: QueryAutocompletePrediction[] = response.Items.map((prediction: CanadaPostPrediction) => {
                                const country = (prediction.Id || '').split('|')[0].slice(0, 2);

                                return {
                                    id: prediction.Id,
                                    description: prediction.Text,
                                    location: [prediction.Description, country].filter(a => !isNone(a) && a !== "").join(', '),
                                    details: prediction
                                }
                            });
                            callback(predictions)
                        }
                    }
                };

                xhr.send(queryString);
            } catch (e) {
                callback([]);
            }
        },
        formatPrediction(prediction: QueryAutocompletePrediction, countries: Collection): Partial<Address> {
            let details: CanadaPostPrediction = prediction.details;
            let content = details.Description.split(', ');
            let address: Partial<Address> = {
                address_line1: details.Text,
                country_code: (details.Id || '').split('|')[0].slice(0, 2) as AddressCountryCodeEnum
            };

            ((part?: string) => { if (!isNone(part) && part !== "") address.city = part })(content.slice(0, 1)[0]);
            ((part?: string) => { if (!isNone(part) && part !== "") address.state_code = part })(content.slice(1, 2)[0]);
            ((part?: string) => { if (!isNone(part) && part !== "") address.postal_code = part })(content.slice(2, 3)[0]);

            return address;
        }
    };
}
