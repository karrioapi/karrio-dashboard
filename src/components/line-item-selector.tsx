import { CommodityType, OrderType, ShipmentType } from '@/lib/types';
import { isNone, isNoneOrEmpty } from '@/lib/helper';
import React, { useEffect, useState } from 'react';
import { useOrders } from '@/context/order';

interface LineItemSelectorComponent {
  title?: string;
  shipment?: ShipmentType;
  onChange?: (value: Partial<CommodityType>[]) => void;
}

const LineItemSelector: React.FC<LineItemSelectorComponent> = ({ title, shipment, onChange }) => {
  const { query } = useOrders();
  const [search, setSearch] = useState<string>("");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selection, setSelection] = useState<string[]>([]);
  const [lineItems, setLineItems] = useState<CommodityType[]>([]);

  const selectItems = (_: React.MouseEvent) => {
    setIsActive(true);
    setSelection([]);
  };
  const close = (_?: React.MouseEvent) => {
    setIsActive(false);
    setSelection([]);
  };
  const getUsedQuantity = (id: string) => {
    return (shipment?.parcels || [])
      .map(({ items }) => items || []).flat()
      .filter(({ parent_id }) => parent_id === id)
      .reduce((acc, item) => acc + (item.quantity as number), 0);
  };

  const onSearch = (e: React.ChangeEvent<any>) => {
    setSearch(e.target.value as string);
  };
  const handleChange = (keys: string[]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelection([...(new Set([...selection, ...keys]) as any)]);
    } else {
      setSelection(selection.filter(item => !keys.includes(item)));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const commodities = lineItems
      .filter(item => selection.includes(item.id as string))
      .map((item) => {
        const { id: parent_id, ...content } = item;
        return { ...content, parent_id };
      });
    onChange && onChange(commodities);
    close();
  };

  useEffect(() => {
    if (query.isFetched && !isNone(query.data?.orders)) {
      const filteredOrders = (query.data?.orders.edges || [])
        .map(({ node: order }) => ({
          ...order,
          line_items: order.line_items
            .map(({ unfulfilled_quantity: quantity, ...item }) => ({
              ...item,
              quantity: (quantity || 0) - getUsedQuantity(item.id as string)
            }))
            .filter(item => item.quantity > 0)
        }))
        .filter(order => order.line_items.length > 0);

      setOrders(filteredOrders as any);
      setLineItems(filteredOrders.map(order => order.line_items).flat());
    }
  }, [query.isFetched, query.data?.orders, isActive]);

  return (
    <>
      <button type="button" className="button is-primary is-small is-outlined" onClick={selectItems}>
        <span className="icon is-small">
          <i className="fas fa-tasks"></i>
        </span>
        <span>{title || "Add line items"}</span>
      </button>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card max-modal-height">

          <section className="modal-card-body modal-form p-2">
            <div className="form-floating-header p-4">
              <span className="has-text-weight-bold is-size-6">{title || "Select line items"}</span>
            </div>
            <div className="p-3 my-4"></div>

            <div className="panel-block px-1 pt-0 pb-3">
              <p className="control has-icons-left">
                <input type="text" className={"input is-small"} defaultValue={search || ''} onInput={onSearch} />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true"></i>
                </span>
              </p>
            </div>

            {lineItems.length === 0 && <div className="notification is-warning is-light px-3 py-2 my-2">
              All items are packed.
            </div>}

            <nav className="panel is-shadowless" style={{ minHeight: '30vh', maxHeight: '60vh', overflowY: 'auto' }}>
              {orders
                .map(order => (
                  <React.Fragment key={`order-${order.id}`}>
                    <label className="panel-block has-background-grey-lighter is-size-7" key={`order-${order.id}`}>
                      <input type="checkbox"
                        name={order.id}
                        checked={(order.line_items.filter(({ id }) => selection.includes(id as string)).length === order.line_items.length)}
                        onChange={handleChange(order.line_items.map(({ id }) => id as string))}
                      />
                      <span>{order.order_id}</span>
                      <span className="has-text-grey is-size-7">{` - ORDER ID`}</span>
                    </label>

                    {order.line_items.map((item, item_index) => (
                      <label className="panel-block ml-4" key={`line-${item.id}`}>
                        <input type="checkbox"
                          name={item.id as string}
                          checked={selection.includes(item.id as string)}
                          onChange={handleChange([item.id as string])}
                        />
                        <div>
                          <p className="is-size-7 my-1 has-text-weight-semibold">
                            {item_index + 1} - {isNoneOrEmpty(item.description) ? 'Item' : item.description}
                            <span className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                              {isNoneOrEmpty(item.sku) ? ' | SKU: 0000000' : ` | SKU: ${item.sku}`}
                              {!isNoneOrEmpty(item.metadata?.ship_qty) && ` | SHIP QTY: ${item.metadata?.ship_qty}`}
                              {` | UNPACKED QTY: ${item.quantity}`}
                            </span>
                          </p>
                        </div>
                      </label>
                    ))}
                  </React.Fragment>
                ))}
            </nav>

            <div className="p-3 my-5"></div>
            <div className="form-floating-footer has-text-centered p-1">
              <button className="button is-default m-1 is-small" onClick={close} disabled={query.isFetching}>
                <span>Cancel</span>
              </button>
              <button className={`button is-primary ${query.isFetching ? 'is-loading' : ''} m-1 is-small`}
                disabled={query.isFetching || selection.length === 0} type="button" onClick={handleSubmit}>
                <span>Add selection</span>
              </button>
            </div>
          </section>

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </>
  )
};

export default LineItemSelector;
