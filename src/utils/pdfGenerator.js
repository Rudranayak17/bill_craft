// utils/pdfGenerator.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async () => {
  const element = document.getElementById('invoice-preview');
  const canvas = await html2canvas(element);
  const data = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });

  pdf.addImage(data, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('invoice.pdf');
};
