import React from 'react';
import { Card } from '@/components/ui/card';

const InvoiceTemplate = ({ invoiceData }) => {
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  const discountAmount = (subtotal * (invoiceData.discount || 0)) / 100;
  const total = subtotal - discountAmount;

  return (
    <Card className="max-w-3xl mx-auto p-8 bg-white">
      <div className="flex justify-between items-start mb-12">
        <div className="text-4xl font-light tracking-wider">INVOICE</div>
        <div className="text-right">#{invoiceData.invoiceNumber}</div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <div className="mb-6">
            <div className="font-medium mb-2">BILLED TO:</div>
            <div>{invoiceData.billedTo}</div>
          </div>
          
          <div>
            <div className="font-medium mb-2">PAY TO:</div>
            <div>{invoiceData.payTo.name}</div>
            <div>{invoiceData.payTo.address}</div>
            <div>{invoiceData.payTo.phone}</div>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <span className="font-medium">Bank:</span> {invoiceData.bankDetails.bank}
          </div>
          <div className="mb-2">
            <span className="font-medium">Account Name:</span> {invoiceData.bankDetails.accountName}
          </div>
          <div className="mb-2">
            <span className="font-medium">BSB:</span> {invoiceData.bankDetails.bsb}
          </div>
          <div className="mb-2">
            <span className="font-medium">Account Number:</span> {invoiceData.bankDetails.accountNumber}
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2 font-medium">DESCRIPTION</th>
            <th className="text-left py-2 font-medium">RATE</th>
            <th className="text-left py-2 font-medium">HOURS</th>
            <th className="text-right py-2 font-medium">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3">{item.description}</td>
              <td className="py-3">${item.rate}/hr</td>
              <td className="py-3">{item.hours}</td>
              <td className="py-3 text-right">${item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-b border-gray-300 pb-4 mb-4">
        <div className="flex justify-between mb-2">
          <div>Sub Total</div>
          <div>₹{subtotal.toFixed(2)}</div>
        </div>
        <div className="flex justify-between">
          <div>Package Discount ({invoiceData.discount || 0}%)</div>
          <div>₹{discountAmount.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex justify-between font-medium mb-12">
        <div>TOTAL</div>
        <div>₹{total.toFixed(2)}</div>
      </div>

      <div className="text-sm space-y-4">
        <p>Payment is required within 14 business days of invoice date. Please send remittance to {invoiceData.email}.</p>
        <p>Thank you for your business.</p>
      </div>
    </Card>
  );
};

export default InvoiceTemplate;