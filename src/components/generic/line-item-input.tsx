import React, { useContext, useEffect, useState } from 'react';
import DropdownInput, { DropdownInputComponent } from '@/components/generic/dropdown-input';
import { formatOrderLineItem, isNone } from '@/lib/helper';
import { OrdersContext } from '@/context/orders-provider';
import { CommodityType } from '@/lib/types';

interface LineItemInputComponent extends Omit<DropdownInputComponent, 'items' | 'onChange' | 'onValueChange'> {
  onChange?: (value?: CommodityType) => void;
}

const LineItemInput: React.FC<LineItemInputComponent> = ({ onChange, ...props }) => {
  const { orders, loading, called, loadMore, load } = useContext(OrdersContext);
  const [lineItems, setLineItems] = useState<CommodityType[]>([]);
  const [items, setItems] = useState<[string, string][]>([]);

  const handleChange = (key?: string | null) => {
    const item = lineItems.find(item => item.id === key);
    onChange && onChange(item);
  };

  useEffect(() => {
    if (!isNone(orders)) {
      const allItems = orders.map(order => order.line_items).flat();
      const dropdownItems = orders
        .map((order) => order.line_items.map(
          (item, index) => [item.id, formatOrderLineItem(order, item as any, index)] as [string, string]
        )).flat();

      setLineItems(allItems);
      setItems(dropdownItems);
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
