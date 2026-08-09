export function buildInvoiceText(invoice) {
  const lines = [
    'MediCore Hospital',
    '--------------------------------',
    `Invoice ID: ${invoice.id}`,
    `Date: ${invoice.date}`,
    '',
    `Patient: ${invoice.patientName} (${invoice.patientId})`,
    `Service: ${invoice.service}`,
    '',
    `Total Amount: PKR ${invoice.total.toLocaleString()}`,
    `Paid Amount: PKR ${invoice.paid.toLocaleString()}`,
    `Remaining Balance: PKR ${invoice.remaining.toLocaleString()}`,
    `Status: ${invoice.status}`,
    '',
    'Payment History:',
    ...(invoice.paymentHistory.length
      ? invoice.paymentHistory.map(
          (payment, index) => `  ${index + 1}. PKR ${payment.amount.toLocaleString()} — ${payment.method} — ${payment.date} (Ref: ${payment.reference})`
        )
      : ['  No payments recorded']),
  ];

  return lines.join('\n');
}

export function printInvoice(invoice) {
  const text = buildInvoiceText(invoice);
  const printWindow = window.open('', '_blank', 'width=700,height=900');
  if (!printWindow) return;
  printWindow.document.write(
    `<title>${invoice.id}</title><pre style="font-family: ui-monospace, monospace; font-size: 13px; white-space: pre-wrap; padding: 24px;">${text.replace(/</g, '&lt;')}</pre>`
  );
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
