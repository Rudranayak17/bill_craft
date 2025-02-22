import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ItemsTable = ({ items, handleItemChange, addItem }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Items</h3>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-2 mb-2">
          <Input 
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
          />
          <Input 
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
          />
          <Input 
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
          />
        </div>
      ))}
      <Button onClick={addItem} variant="outline" className="mt-2">Add Item</Button>
    </div>
  );
};