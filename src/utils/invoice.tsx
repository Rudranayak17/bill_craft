// Function to generate PDF content
export const generatePDFContent = (invoiceData) => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const discountAmount = (subtotal * (invoiceData.discount || 0)) / 100;
    const total = subtotal - discountAmount;
  
    return `
  INVOICE #${invoiceData.invoiceNumber}
  
  BILLED TO:
  ${invoiceData.billedTo}
  
  PAY TO:
  ${invoiceData.payTo.name}
  ${invoiceData.payTo.address}
  ${invoiceData.payTo.phone}
  
  BANK DETAILS:
  Bank: ${invoiceData.bankDetails.bank}
  Account Name: ${invoiceData.bankDetails.accountName}
  BSB: ${invoiceData.bankDetails.bsb}
  Account Number: ${invoiceData.bankDetails.accountNumber}
  
  ITEMS:
  ${invoiceData.items.map(item => 
    `${item.description}
     Rate: $${item.rate}/hr
     Hours: ${item.hours}
     Amount: $${item.amount.toFixed(2)}
  `).join('\n')}
  
  Sub Total: $${subtotal.toFixed(2)}
  Discount (${invoiceData.discount || 0}%): $${discountAmount.toFixed(2)}
  TOTAL: $${total.toFixed(2)}
  
  Payment is required within 14 business days of invoice date.
  Please send remittance to ${invoiceData.email}
  
  Thank you for your business.
  `;
  };
  
  // Function to download text as file
  export const downloadTxtFile = (content, filename) => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  export const CHAT_STEPS = [
    { question: "What's the invoice number?", field: 'invoiceNumber' },
    { question: "What's the client company name (Billed To)?", field: 'billedTo' },
    { question: "What's your full name (Pay To)?", field: 'payTo.name' },
    { question: "What's your address?", field: 'payTo.address' },
    { question: "What's your phone number?", field: 'payTo.phone' },
    { question: "What's your bank name?", field: 'bankDetails.bank' },
    { question: "What's your bank account name?", field: 'bankDetails.accountName' },
    { question: "What's your BSB?", field: 'bankDetails.bsb' },
    { question: "What's your account number?", field: 'bankDetails.accountNumber' },
    { question: "Let's add items. What's the service description?", field: 'items' },
    { question: "What's your email for remittance?", field: 'email' },
  ];