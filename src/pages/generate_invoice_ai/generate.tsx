import InvoiceChatbot from '@/components/InvoiceChatbot';
import React from 'react';


const InvoicePage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Invoice Generator Chatbot</h1>
      <InvoiceChatbot />
    </div>
  );
};

export default InvoicePage;