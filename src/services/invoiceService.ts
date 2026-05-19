import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InvoiceData {
  id: string;
  customerName: string;
  device: string;
  price: string;
  date: string;
  time: string;
}

export const generateInvoice = (data: InvoiceData) => {
  const doc = new jsPDF() as any;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Background
  doc.setFillColor(15, 23, 42); // slate-950
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Logo/Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('UNLOCK PRO', 20, 25);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Advanced Device Solutions', 20, 32);

  // Invoice Title
  doc.setFontSize(18);
  doc.text('INVOICE', pageWidth - 50, 25);

  // Company Details
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(0, 40, pageWidth, 10, 'F');

  // Dates and Info
  doc.setTextColor(51, 65, 85); // slate-700
  doc.setFontSize(10);
  doc.text(`Invoice ID: #INV-${data.id}`, 20, 60);
  doc.text(`Date: ${data.date}`, 20, 65);
  doc.text(`Time: ${data.time}`, 20, 70);

  // Customer Details
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 20, 85);
  doc.setFont('helvetica', 'normal');
  doc.text(data.customerName, 20, 92);
  doc.text('Verified Customer', 20, 97);

  // Table
  const tableData = [
    ['Description', 'Quantity', 'Unit Price', 'Total'],
    [`Professional Unlocking Service - ${data.device}`, '1', `INR ${data.price}`, `INR ${data.price}`]
  ];

  autoTable(doc, {
    startY: 110,
    head: [tableData[0]],
    body: [tableData[1]],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' }, // blue-600
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' }
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // Summary
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', pageWidth - 80, finalY + 10);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', pageWidth - 80, finalY + 20);
  doc.text(`INR ${data.price}.00`, pageWidth - 20, finalY + 20, { align: 'right' });
  doc.text('Tax (0%):', pageWidth - 80, finalY + 27);
  doc.text('INR 0.00', pageWidth - 20, finalY + 27, { align: 'right' });
  
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 85, finalY + 32, pageWidth - 15, finalY + 32);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Total:', pageWidth - 80, finalY + 40);
  doc.text(`INR ${data.price}.00`, pageWidth - 20, finalY + 40, { align: 'right' });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  const footerText = 'Thank you for choosing Unlock Pro. This is a computer-generated invoice and does not require a signature.';
  doc.text(footerText, pageWidth / 2, 280, { align: 'center' });
  doc.text('Premium Services', pageWidth / 2, 285, { align: 'center' });

  doc.save(`Invoice_${data.id}.pdf`);
};
