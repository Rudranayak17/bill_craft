import React from 'react';
import { Download, Mail, Phone, Building, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoiceTemplate = ({ invoiceData }) => {
  const invoiceRef = React.useRef(null);

  const handleDownload = async () => {
    if (!invoiceRef.current) return;

    try {
      // Create canvas from the invoice element
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'inr',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateDiscount = () => {
    return (calculateSubtotal() * (invoiceData.discount || 0)) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative">
      <Button
        onClick={handleDownload}
        className="absolute top-4 right-4 z-10"
        variant="outline"
      >
        <Download className="h-4 w-4 mr-2" />
        Download PDF
      </Button>

      <Card className="w-full max-w-4xl mx-auto bg-white" ref={invoiceRef}>
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-light tracking-wider text-gray-800">INVOICE</h1>
              <p className="text-gray-500 mt-2">#{invoiceData.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Issue Date</p>
              <p className="text-gray-600">{formatDate(invoiceData.issueDate)}</p>
              <p className="font-medium mt-2">Due Date</p>
              <p className="text-gray-600">{formatDate(invoiceData.dueDate)}</p>
            </div>
          </div>

          {/* Business Details Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h2 className="font-medium text-gray-800 mb-3 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  FROM
                </h2>
                <div className="text-gray-600">
                  <p className="font-medium">{invoiceData.payTo.name}</p>
                  <p>{invoiceData.payTo.address}</p>
                  <div className="flex items-center mt-2">
                    <Phone className="h-4 w-4 mr-2" />
                    <p>{invoiceData.payTo.phone}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <p>{invoiceData.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium text-gray-800 mb-3">BILLED TO</h2>
                <div className="text-gray-600">
                  <p>{invoiceData.billedTo}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-medium text-gray-800 mb-3 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                PAYMENT DETAILS
              </h2>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Bank:</span> {invoiceData.bankDetails.bank}</p>
                <p><span className="font-medium">Account Name:</span> {invoiceData.bankDetails.accountName}</p>
                <p><span className="font-medium">BSB:</span> {invoiceData.bankDetails.bsb}</p>
                <p><span className="font-medium">Account Number:</span> {invoiceData.bankDetails.accountNumber}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">DESCRIPTION</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">RATE</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">HOURS</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="text-gray-600">
                    <td className="py-4 px-4">{item.description}</td>
                    <td className="py-4 px-4">{formatCurrency(item.rate)}/hr</td>
                    <td className="py-4 px-4">{item.hours}</td>
                    <td className="py-4 px-4 text-right">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="border-t border-gray-200 pt-4 mb-8">
            <div className="flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount ({invoiceData.discount || 0}%)</span>
                  <span>-{formatCurrency(calculateDiscount())}</span>
                </div>
                <div className="flex justify-between font-medium text-lg border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t border-gray-200 pt-8 text-gray-600">
            <div className="space-y-2">
              <p>Payment Terms:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Payment is required within 14 business days of invoice date</li>
                <li>Please include invoice number in payment reference</li>
                <li>Send remittance advice to {invoiceData.email}</li>
              </ul>
            </div>
            <p className="mt-6 text-center font-medium">Thank you for your business!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceTemplate;