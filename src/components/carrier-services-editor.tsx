import { CURRENCY_OPTIONS, ServiceLevelType } from '@/lib/types';
import SelectField from '@/components/generic/select-field';
import { CurrencyCodeEnum } from '@karrio/graphql';
import { isNone, snakeCase } from '@/lib/helper';
import React, { useEffect } from 'react';

interface CarrierServiceEditorProps {
  carrierName: string;
  defaultValue: ServiceLevelType[];
  onChange: (services: ServiceLevelType[]) => void;
}

function computeDefaultCurrency(defaultValue: ServiceLevelType[]): CurrencyCodeEnum {
  const svc = (defaultValue || []).find(svc => !isNone(svc.currency))
  return (svc?.currency || CurrencyCodeEnum.USD) as CurrencyCodeEnum
}


const CarrierServiceEditor: React.FC<CarrierServiceEditorProps> = ({ carrierName, defaultValue, onChange }) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  const [services, setServices] = React.useState<ServiceLevelType[]>(defaultValue);
  const [currency, setCurrency] = React.useState<CurrencyCodeEnum>(computeDefaultCurrency(defaultValue));

  const updateService = (index: number, data: any) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], ...data, currency };
    setServices(newServices);
    onChange(newServices);
  };
  const updateCurrency = (currency: CurrencyCodeEnum) => {
    const newServices = services.map(service => ({ ...service, currency }));
    setServices(newServices);
    setCurrency(currency);
    onChange(newServices);
  };

  useEffect(() => { setCurrency(computeDefaultCurrency(defaultValue)); }, [defaultValue]);

  return (
    <article className="panel is-white is-shadowless mt-5" style={{ border: "1px #ddd solid" }}>
      <p className="panel-heading select is-fullwidth px-2 pt-3" onClick={() => setExpand(!expand)}>
        <span className="is-size-6">Carrier Service Level Configuration</span>
      </p>

      <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey px-2">
        Please adjust the cost of each service level negotiated with your carrier.
      </p>

      {expand && <>

        <div className="panel-block is-justify-content-right">
          <SelectField
            onChange={e => updateCurrency(e.target.value as CurrencyCodeEnum)}
            value={currency}
            name="currency"
            className="is-small is-fullwidth">
            {CURRENCY_OPTIONS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </SelectField>
        </div>

        {(defaultValue || []).map((service_level: ServiceLevelType, index) => (
          <div key={index} className="panel-block is-justify-content-space-between">
            <div className="field my-1" style={{ width: '60%' }}>
              <p className="control">
                <input
                  type='text'
                  className="input is-small"
                  defaultValue={service_level.service_name || 'Standard Service'}
                  onChange={e => updateService(index, {
                    currency,
                    service_name: e.target.value,
                    service_code: snakeCase(`${carrierName} ${e.target.value}`),
                  })}
                />
              </p>
            </div>

            <div className="field has-addons has-addons-right">
              <p className="control">
                <input
                  type="number" step="any" min="0"
                  className="input is-small"
                  defaultValue={service_level.cost || 0.0}
                  onChange={e => updateService(index, { cost: Number.parseFloat(e.target.value || "0.0") })}
                />
              </p>
              <p className="control">
                <a className="button is-small is-static">{currency}</a>
              </p>
            </div>
          </div>
        ))}

        <div className="is-flex is-justify-content-space-between mt-2 p-2">
          <button type="button" className="button is-small is-info is-inverted p-2"
            onClick={() => updateService(services.length, {
              currency,
              cost: 0.0,
              service_name: `Standard Service ${services.length}`,
              service_code: snakeCase(`${carrierName} Standard Service ${services.length}`)
            })}>
            <span className="icon is-small">
              <i className="fas fa-plus"></i>
            </span>
            <span>Add service</span>
          </button>
        </div>

      </>}
    </article>
  );
};

export default CarrierServiceEditor;
