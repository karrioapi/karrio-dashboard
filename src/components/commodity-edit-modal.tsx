import React, { useContext, useReducer, useState } from 'react';
import { deepEqual, isNone } from '@/lib/helper';
import { CommodityType, CURRENCY_OPTIONS, WEIGHT_UNITS } from '@/lib/types';
import { CurrencyCodeEnum, MetadataObjectType, WeightUnitEnum } from '@purplship/graphql';
import Notifier from '@/components/notifier';
import { Loading } from '@/components/loader';
import ButtonField from '@/components/generic/button-field';
import InputField from '@/components/generic/input-field';
import CountryInput from '@/components/generic/country-input';
import TextAreaField from '@/components/generic/textarea-field';
import MetadataEditor, { MetadataEditorContext } from '@/components/metadata-editor';
import { APIReference } from '@/context/references-provider';
import LineItemInput from './generic/line-item-input';
import OrdersProvider from '@/context/orders-provider';

export const DEFAULT_COMMODITY_CONTENT: Partial<CommodityType> = {
  weight: 0,
  quantity: 1,
  weight_unit: WeightUnitEnum.KG,
};

type OperationType = {
  commodity?: CommodityType;
  onChange: (commodity: CommodityType) => Promise<any>;
};
type CommodityStateContextType = {
  editCommodity: (operation: OperationType) => void,
};
type stateValue = string | boolean | Partial<CommodityType> | undefined | null;

export const CommodityStateContext = React.createContext<CommodityStateContextType>({} as CommodityStateContextType);

interface CommodityEditModalComponent { }

function reducer(state: any, { name, value }: { name: string, value: stateValue }) {
  switch (name) {
    case 'partial':
      return isNone(value) ? undefined : { ...(value as CommodityType) };
    case 'value_amount':
      const value_currency = isNone(value) ? state.value_currency : CurrencyCodeEnum.USD;
      return { ...state, [name]: value, value_currency };
    default:
      return { ...state, [name]: value }
  }
}

const CommodityEditModalProvider: React.FC<CommodityEditModalComponent> = ({ children }) => {
  const { orders_management } = useContext(APIReference);
  const { loading, setLoading } = useContext(Loading);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`commodity-${Date.now()}`);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [commodity, dispatch] = useReducer(reducer, undefined, () => DEFAULT_COMMODITY_CONTENT);
  const [operation, setOperation] = useState<OperationType | undefined>();

  const editCommodity = (operation: OperationType) => {
    const commodity = (operation.commodity || DEFAULT_COMMODITY_CONTENT as CommodityType);

    setIsActive(true);
    setOperation(operation);
    setIsNew(isNone(operation.commodity));
    dispatch({ name: 'partial', value: commodity });
    setKey(`commodity-${Date.now()}`);
  };
  const close = (_?: React.MouseEvent) => {
    setIsActive(false);
    setOperation(undefined);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | any>) => {
    event.preventDefault();
    const target = event.target;
    let name: string = target.name;
    let value: stateValue = target.type === 'checkbox' ? target.checked : target.value;

    dispatch({ name, value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    operation?.onChange && await operation?.onChange(commodity as CommodityType);
    setTimeout(() => { setLoading(false); close(); }, 1000);
  };
  const loadLineItem = (item?: CommodityType) => {
    const { id, ...content } = item || { id: null };
    dispatch({ name: 'partial', value: { ...content, parent_id: id } });
  };

  return (
    <Notifier>
      <CommodityStateContext.Provider value={{ editCommodity }}>
        {children}
      </CommodityStateContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card max-modal-height">

          <section className="modal-card-body">
            <div className="form-floating-header p-4">
              <span className="has-text-weight-bold is-size-6">{isNew ? 'Add' : 'Update'} commodity</span>
            </div>
            <div className="p-3 my-4"></div>

            {commodity !== undefined && <>
              <div className="px-0 py-4" key={key}>

                {orders_management && <div className="columns is-multiline mb-4 px-1">

                  <OrdersProvider>
                    <LineItemInput
                      name="parent_id"
                      label="Order Line Item"
                      value={commodity?.parent_id}
                      onChange={loadLineItem}
                      dropdownClass="is-small"
                      className="is-small is-fullwidth"
                      fieldClass="column is-11 mb-0 pl-2 pr-0 py-1"
                      placeholder="Link an order line item"
                    />
                  </OrdersProvider>

                  <div className="column m-0 px-0 py-1 is-flex is-align-items-flex-end">
                    <button
                      type="button"
                      className="button is-white is-small"
                      disabled={isNone(commodity?.parent_id)}
                      title="unlink from order item"
                      onClick={() => dispatch({ name: 'parent_id', value: null })}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-unlink"></i>
                      </span>
                    </button>
                  </div>

                </div>}

                <div className="columns is-multiline mb-4 px-1">

                  <InputField
                    name="sku"
                    label="SKU"
                    value={commodity?.sku}
                    onChange={handleChange}
                    className="is-small is-fullwidth"
                    fieldClass="column is-7 mb-0 px-2 py-1"
                    placeholder="0000001"
                    disabled={!isNone(commodity?.parent_id)}
                  />

                  <CountryInput
                    label="Origin Country"
                    className="is-small"
                    dropdownClass="is-small"
                    fieldClass="column mb-0 is-5 px-2 py-1"
                    value={commodity.origin_country}
                    onValueChange={value => dispatch({ name: "origin_country", value: value as string })}
                    disabled={!isNone(commodity?.parent_id)}
                  />

                </div>

                <div className="columns is-multiline mb-4 px-1">

                  <InputField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    step="1" min="1"
                    className="is-small"
                    fieldClass="column mb-0 is-3 px-2 py-1"
                    onChange={handleChange}
                    value={commodity?.quantity}
                    required
                  />

                  <div className="column is-4 mb-0 px-2 py-1">
                    <label className="label is-capitalized" style={{ fontSize: ".8em" }}>
                      Weight
                      <span className="icon is-small has-text-danger small-icon">
                        <i className="fas fa-asterisk" style={{ fontSize: ".7em" }}></i>
                      </span>
                    </label>
                    <div className="field has-addons">
                      <p className="control is-expanded">
                        <input
                          min="0"
                          step="any"
                          name="weight"
                          type="number"
                          className="input is-small"
                          onChange={handleChange}
                          value={commodity.weight}
                          disabled={!isNone(commodity?.parent_id)}
                          required
                        />
                      </p>
                      <p className="control">
                        <span className="select is-small">
                          <select
                            name="weight_unit"
                            onChange={handleChange}
                            value={commodity.weight_unit || WeightUnitEnum.KG}
                            disabled={!isNone(commodity?.parent_id)}>
                            {WEIGHT_UNITS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                          </select>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="column is-5 mb-0 px-2 py-1">
                    <label className="label is-capitalized" style={{ fontSize: ".8em" }}>Value Amount</label>
                    <div className="field has-addons">
                      <p className="control is-expanded">
                        <input
                          min="0"
                          step="any"
                          type="number"
                          name="value_amount"
                          className="input is-small"
                          onChange={handleChange}
                          value={commodity.value_amount || ""}
                          disabled={!isNone(commodity?.parent_id)}
                        />
                      </p>
                      <p className="control">
                        <span className="select is-small">
                          <select
                            name="value_currency"
                            onChange={handleChange}
                            value={commodity.value_currency || CurrencyCodeEnum.USD}
                            required={!isNone(commodity?.value_amount)}
                            disabled={!isNone(commodity?.parent_id)}>
                            {CURRENCY_OPTIONS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                          </select>
                        </span>
                      </p>
                    </div>
                  </div>

                </div>

                <div className="columns is-multiline mb-0 px-1">
                  <TextAreaField
                    name="description"
                    label="description"
                    className="is-small"
                    fieldClass="column mb-0 is-12 px-2 py-1"
                    placeholder="item description"
                    rows={2}
                    onChange={handleChange}
                    value={commodity?.description}
                    disabled={!isNone(commodity?.parent_id)}
                  />
                </div>

                <hr className="mt-1 my-3" style={{ height: '1px' }} />

                <MetadataEditor
                  id={commodity.id}
                  object_type={MetadataObjectType.commodity}
                  metadata={commodity.metadata}
                  onChange={(value) => dispatch({ name: "metadata", value })}
                >
                  <MetadataEditorContext.Consumer>{({ isEditing, editMetadata }) => (<>

                    <div className="is-flex is-justify-content-space-between">
                      <h2 className="title is-6 my-3">Metadata</h2>

                      <button
                        type="button"
                        className="button is-default is-small is-align-self-center"
                        disabled={isEditing}
                        onClick={() => editMetadata()}>
                        <span className="icon is-small">
                          <i className="fas fa-pen"></i>
                        </span>
                        <span>Edit metadata</span>
                      </button>
                    </div>

                    <hr className="mt-1 my-1" style={{ height: '1px' }} />

                  </>)}</MetadataEditorContext.Consumer>
                </MetadataEditor>

              </div>

              <div className="p-3 my-5"></div>
              <ButtonField
                type="button"
                className="is-primary m-0"
                fieldClass="form-floating-footer p-3"
                controlClass="has-text-centered"
                disabled={loading || deepEqual(operation?.commodity, commodity)}
                onClick={handleSubmit}>
                <span>{isNew ? 'Add' : 'Save'}</span>
              </ButtonField>
            </>}
          </section>

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </Notifier>
  )
};

export default CommodityEditModalProvider;
