import React from 'react';
import { Input } from '@/components/ui/input';

export const PaymentInfo = ({ bankDetails, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
      <div className="grid gap-2">
        <Input 
          placeholder="Bank Name"
          value={bankDetails.bankName}
          onChange={(e) => handleInputChange(e, 'bankDetails', 'bankName')}
        />
        <Input 
          placeholder="Account Number"
          value={bankDetails.accountNumber}
          onChange={(e) => handleInputChange(e, 'bankDetails', 'accountNumber')}
        />
        <Input 
          placeholder="Email"
          value={bankDetails.email}
          onChange={(e) => handleInputChange(e, 'bankDetails', 'email')}
        />
      </div>
    </div>
  );
};
