import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ChatInterface from './ChatInterface';
import InvoiceTemplate from './InvoiceTemplete';
import { generatePDFContent, downloadTxtFile, CHAT_STEPS } from '../utils/invoice';

const InvoiceChatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'll help you create a professional invoice. Let's start with the invoice number." }
  ]);
  const [input, setInput] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    billedTo: '',
    payTo: {
      name: '',
      address: '',
      phone: ''
    },
    bankDetails: {
      bank: '',
      accountName: '',
      bsb: '',
      accountNumber: ''
    },
    items: [],
    discount: 0,
    email: ''
  });
  const [currentItem, setCurrentItem] = useState({
    description: '',
    rate: 0,
    hours: 0,
    amount: 0
  });

  const handleDownload = () => {
    const content = generatePDFContent(invoiceData);
    downloadTxtFile(content, `invoice-${invoiceData.invoiceNumber}.txt`);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];

    if (input.toLowerCase() === 'done' && invoiceData.items.length > 0) {
      setShowInvoice(true);
      newMessages.push({
        role: 'bot',
        content: "Great! Here's your invoice. You can review it below and download it."
      });
    } else if (currentStep < 9) {
      const field = CHAT_STEPS[currentStep].field;
      setInvoiceData(prev => {
        const newData = { ...prev };
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          newData[parent] = { ...newData[parent], [child]: input };
        } else {
          newData[field] = input;
        }
        return newData;
      });
      setCurrentStep(prev => prev + 1);
      newMessages.push({
        role: 'bot',
        content: CHAT_STEPS[currentStep + 1].question
      });
    } else if (currentStep === 9) {
      setCurrentItem(prev => ({ ...prev, description: input }));
      newMessages.push({
        role: 'bot',
        content: "What's the hourly rate for this service?"
      });
      setCurrentStep(10);
    } else if (currentStep === 10) {
      setCurrentItem(prev => ({ ...prev, rate: parseFloat(input) }));
      newMessages.push({
        role: 'bot',
        content: "How many hours?"
      });
      setCurrentStep(11);
    } else if (currentStep === 11) {
      const hours = parseFloat(input);
      const amount = hours * currentItem.rate;
      const newItem = { ...currentItem, hours, amount };
      setInvoiceData(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));
      setCurrentItem({ description: '', rate: 0, hours: 0, amount: 0 });
      setCurrentStep(9);
      newMessages.push({
        role: 'bot',
        content: "Item added! Add another service or type 'done' to finalize the invoice."
      });
    }

    setMessages(newMessages);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Invoice Generator
            {showInvoice && (
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <ChatInterface
          messages={messages}
          input={input}
          onInputChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
        />
      </Card>

      {showInvoice && (
        <InvoiceTemplate invoiceData={invoiceData} />
      )}
    </div>
  );
};

export default InvoiceChatbot;