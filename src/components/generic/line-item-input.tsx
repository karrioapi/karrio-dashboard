import React, { useContext, useEffect, useState } from 'react';
import DropdownInput, { DropdownInputComponent } from '@/components/generic/dropdown-input';
import { formatWeight, isNone, isNoneOrEmpty } from '@/lib/helper';
import { OrdersContext } from '@/context/orders-provider';
import { CommodityType, OrderType } from '@/lib/types';

interface LineItemInputComponent extends Omit<DropdownInputComponent, 'items' | 'onChange' | 'onValueChange'> {
  onChange?: (value?: CommodityType) => void;
}

const LineItemInput: React.FC<LineItemInputComponent> = ({ onChange, ...props }) => {
  const { orders, loading, called, loadMore, load } = useContext(OrdersContext);
  const [lineItems, setLineItems] = useState<CommodityType[]>([]);
  const [items, setItems] = useState<[string, string][]>([]);

  const summary = (order: OrderType, item: CommodityType, index: number) => {
    const identifier = item.sku || item.description;
    const info = isNoneOrEmpty(identifier) ? `${order.order_id} - item ${index}` : `${order.order_id} - ${identifier!.slice(0, 45)}...`;
    return `${info} (${item.quantity} x ${formatWeight(item)})`;
  };
  const handleChange = (key?: string | null) => {
    const item = lineItems.find(item => item.id === key);
    onChange && onChange(item);
  };

  useEffect(() => {
    if (!isNone(orders)) {
      const allItems = orders.map(order => order.line_items).flat();
      const dropdownItems = orders
        .map((order) => order.line_items.map(
          (item, index) => [item.id, summary(order, item as any, index)]
        ))
        .reduce((acc, value) => acc.concat(value), []);

      setLineItems(allItems);
      setItems(dropdownItems as any);
    }
  }, [orders]);
  useEffect(() => {
    (!loading && load) && (called ? loadMore : load)({
      first: 100,
      status: ['created', 'partially_fulfilled']
    });
  }, []);

  return (
    <DropdownInput
      items={items}
      onValueChange={handleChange}
      {...props}
    />
  )
};

export default LineItemInput;
