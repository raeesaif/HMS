import { patientProfile } from '@/data/patient';

export function buildInvoiceText(invoice) {
  const lines = [
    'MediCore Hospital',
    '--------------------------------',
    `Invoice ID: ${invoice.id}`,
    `Date: ${invoice.date}`,
    `Patient: ${patientProfile.name} (${patientProfile.id})`,
    '',
    'Services:',
    ...invoice.services.map((service) => `  ${service.name}: PKR ${service.amount.toLocaleString()}`),
    '',
    `Subtotal: PKR ${invoice.subtotal.toLocaleString()}`,
    invoice.discount > 0 ? `Discount: -PKR ${invoice.discount.toLocaleString()}` : null,
    invoice.tax > 0 ? `Tax: PKR ${invoice.tax.toLocaleString()}` : null,
    `Total: PKR ${invoice.total.toLocaleString()}`,
    `Paid: PKR ${invoice.paid.toLocaleString()}`,
    `Remaining: PKR ${invoice.remaining.toLocaleString()}`,
    `Status: ${invoice.status}`,
  ].filter((line) => line !== null);

  return lines.join('\n');
}

export function downloadInvoice(invoice) {
  const text = buildInvoiceText(invoice);
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${invoice.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
