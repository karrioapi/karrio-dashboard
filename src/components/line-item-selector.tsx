import React, { useContext, useEffect, useState } from 'react';
import { OrdersContext } from '@/context/orders-provider';
import ButtonField from '@/components/generic/button-field';
import { CommodityType } from '@/lib/types';
import { formatOrderLineItem, isNone } from '@/lib/helper';

interface LineItemSelectorComponent {
  onChange?: (value: Partial<CommodityType>[]) => void;
}

const LineItemSelector: React.FC<LineItemSelectorComponent> = ({ onChange, ...props }) => {
  const { orders, loading, called } = useContext(OrdersContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selection, setSelection] = useState<string[]>([]);
  const [lineItems, setLineItems] = useState<CommodityType[]>([]);
  const [search, setSearch] = useState<string>("");

  const selectItems = (_: React.MouseEvent) => {
    setIsActive(true);
    setSelection([]);
  };
  const close = (_?: React.MouseEvent) => {
    setIsActive(false);
    setSelection([]);
  };

  const onSearch = (e: React.ChangeEvent<any>) => {
    setSearch(e.target.value as string);
  };
  const handleChange = (key: string) => (_: React.ChangeEvent) => {
    const selected = selection.includes(key);
    setSelection(selected ? selection.filter(item => item !== key) : [...selection, key]);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const commodities = lineItems
      .filter(item => selection.includes(item.id))
      .map(({ id, ...item }) => ({ ...item, parent_id: id }));
    onChange && onChange(commodities);
    close();
  };

  useEffect(() => {
    if (called && !isNone(orders)) {
      const allItems = orders.map(order => order.line_items).flat();
      setLineItems(allItems);
    }
  }, [called, orders]);

  return (
    <>
      <button type="button" className="button is-primary is-small is-outlined" onClick={selectItems}>
        <span className="icon is-small">
          <i className="fas fa-tasks"></i>
        </span>
        <span>Add line items</span>
      </button>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card max-modal-height">

          <section className="modal-card-body modal-form p-2">
            <div className="form-floating-header p-4">
              <span className="has-text-weight-bold is-size-6">Select line items</span>
            </div>
            <div className="p-3 my-4"></div>

            <div className="panel-block px-1 pt-0 pb-3">
              <p className="control has-icons-left">
                <input type="text" className={"input"} defaultValue={search || ''} onInput={onSearch} />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true"></i>
                </span>
              </p>
            </div>

            <nav className="panel is-shadowless" style={{ minHeight: '30vh', maxHeight: '60vh', overflowY: 'auto' }}>
              {orders
                ?.map((order) => order.line_items.map(
                  (item, index) => [item.id, formatOrderLineItem(order, item as any, index)] as [string, string]
                ))
                .flat()
                .filter(([_, val]) => search === "" || val.toLowerCase().includes(search.toLowerCase()))
                .map(([id, summary]) => (
                  <label className="panel-block" key={`line-${id}`}>
                    <input
                      type="checkbox"
                      name={id}
                      checked={selection.includes(id)}
                      onChange={handleChange(id)}
                    />
                    {summary}
                  </label>
                ))}
            </nav>

            <div className="p-3 my-5"></div>
            <ButtonField
              type="button"
              className="is-primary m-0"
              fieldClass="form-floating-footer p-3"
              controlClass="has-text-centered"
              disabled={loading || selection.length === 0}
              onClick={handleSubmit}>
              <span>Add selection</span>
            </ButtonField>
          </section>

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </>
  )
};

export default LineItemSelector;
