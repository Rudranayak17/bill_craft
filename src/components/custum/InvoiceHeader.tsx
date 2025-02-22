import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const InvoiceHeader = ({ formData, handleInputChange, handleLogoUpload }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Invoice Number</Label>
        <Input 
          value={formData.invoiceNumber}
          onChange={(e) => handleInputChange(e, null, 'invoiceNumber')}
          placeholder="INV-12345"
        />
      </div>
      <div>
        <Label>Company Logo</Label>
        <Input 
          type="file"
          onChange={handleLogoUpload}
          accept="image/*"
        />
      </div>
    </div>
  );
};