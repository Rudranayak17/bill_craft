import React from 'react';

export const InvoicePreview = ({ formData, calculateTotal }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg" id="invoice-preview">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">INVOICE</h1>
          <p className="text-gray-600">No: {formData.invoiceNumber}</p>
        </div>
        {formData.companyLogo && (
          <img src={formData.companyLogo} alt="Company Logo" className="h-16 object-contain" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-semibold mb-2">Bill To:</h2>
          <p>{formData.billTo.name}</p>
          <p>{formData.billTo.phone}</p>
          <p>{formData.billTo.address}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">From:</h2>
          <p>{formData.from.name}</p>
          <p>{formData.from.phone}</p>
          <p>{formData.from.address}</p>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.description}</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">${item.price}</td>
                <td className="p-2 text-right">${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between p-2 bg-blue-900 text-white">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Notes:</h2>
        <p>{formData.notes}</p>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Payment Information:</h2>
        <p>Bank: {formData.bankDetails.bankName}</p>
        <p>Account: {formData.bankDetails.accountNumber}</p>
        <p>Email: {formData.bankDetails.email}</p>
      </div>
    </div>
  );
};