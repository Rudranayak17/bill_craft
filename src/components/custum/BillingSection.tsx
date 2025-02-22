import React from 'react';
import { Input } from '@/components/ui/input';

export const BillingSection = ({ title, data, onChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="grid gap-2">
        <Input 
          placeholder="Name"
          value={data.name}
          onChange={(e) => onChange(e, title.toLowerCase(), 'name')}
        />
        <Input 
          placeholder="Phone"
          value={data.phone}
          onChange={(e) => onChange(e, title.toLowerCase(), 'phone')}
        />
        <Input 
          placeholder="Address"
          value={data.address}
          onChange={(e) => onChange(e, title.toLowerCase(), 'address')}
        />
      </div>
    </div>
  );
};
