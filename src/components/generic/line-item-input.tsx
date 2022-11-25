import React, { useContext, useEffect, useState } from 'react';
import DropdownInput, { DropdownInputComponent } from '@/components/generic/dropdown-input';
import { formatOrderLineItem, isNone } from '@/lib/helper';
import { CommodityType } from '@/lib/types';
import { useOrders } from '@/context/order';

interface LineItemInputComponent extends Omit<DropdownInputComponent, 'items' | 'onChange' | 'onValueChange'> {
  onChange?: (value?: CommodityType) => void;
}

const LineItemInput: React.FC<LineItemInputComponent> = ({ onChange, ...props }) => {
  const { query } = useOrders();
  const [lineItems, setLineItems] = useState<CommodityType[]>();
  const [items, setItems] = useState<[string, string][]>([]);

  const handleChange = (key?: string | null) => {
    const item = (lineItems || []).find(item => item.id === key);
    onChange && onChange(item);
  };

  useEffect(() => {
    if (query.isFetched && !isNone(query.data?.orders)) {
      const allItems = (query.data?.orders.edges || []).map(({ node: order }) => order.line_items).flat();
      const dropdownItems = (query.data?.orders.edges || [])
        .map(({ node: order }) => order.line_items.map(
          (item, index) => [item.id, formatOrderLineItem(order as any, item as any, index)] as [string, string]
        )).flat();

      setLineItems(allItems);
      setItems(dropdownItems);
    }
  }, [query.isFetched]);

  return (
    <DropdownInput
      items={items}
      onValueChange={handleChange}
      {...props}
    />
  )
};

export default LineItemInput;
