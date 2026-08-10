export const paymentMethodOptions = ['Card', 'Bank Transfer', 'Other'];

export const invoices = [
  {
    id: 'INV-8001',
    date: '09 Aug 2026',
    description: 'Cardiology Consultation + ECG',
    services: [
      { name: 'Cardiology Consultation', amount: 5500 },
      { name: 'ECG', amount: 2200 },
    ],
    subtotal: 7700,
    discount: 0,
    tax: 0,
    total: 7700,
    paid: 0,
    remaining: 7700,
    status: 'Pending',
    paymentHistory: [],
  },
  {
    id: 'INV-7990',
    date: '20 Jul 2026',
    description: 'Follow-up Consultation',
    services: [{ name: 'Follow-up Consultation', amount: 3500 }],
    subtotal: 3500,
    discount: 0,
    tax: 0,
    total: 3500,
    paid: 3500,
    remaining: 0,
    status: 'Paid',
    paymentHistory: [{ id: 'PMT-1', amount: 3500, method: 'Card', reference: 'TXN-88112', date: '20 Jul 2026' }],
  },
  {
    id: 'INV-7900',
    date: '01 Aug 2026',
    description: 'Dermatology Consultation',
    services: [{ name: 'Dermatology Consultation', amount: 3500 }],
    subtotal: 3500,
    discount: 500,
    tax: 0,
    total: 3000,
    paid: 1500,
    remaining: 1500,
    status: 'Partially Paid',
    paymentHistory: [{ id: 'PMT-2', amount: 1500, method: 'Card', reference: 'TXN-88190', date: '01 Aug 2026' }],
  },
  {
    id: 'INV-7500',
    date: '05 Jun 2026',
    description: 'CBC + HbA1c Lab Tests',
    services: [
      { name: 'Complete Blood Count', amount: 1500 },
      { name: 'HbA1c', amount: 1800 },
    ],
    subtotal: 3300,
    discount: 0,
    tax: 0,
    total: 3300,
    paid: 0,
    remaining: 3300,
    status: 'Overdue',
    paymentHistory: [],
  },
  {
    id: 'INV-7100',
    date: '10 Apr 2026',
    description: 'Follow-up Consultation',
    services: [{ name: 'Follow-up Consultation', amount: 3000 }],
    subtotal: 3000,
    discount: 0,
    tax: 0,
    total: 3000,
    paid: 3000,
    remaining: 0,
    status: 'Paid',
    paymentHistory: [{ id: 'PMT-3', amount: 3000, method: 'Bank Transfer', reference: 'TRX-441209', date: '10 Apr 2026' }],
  },
];

export function getBillingStats(list) {
  const totalOutstanding = list.reduce((sum, invoice) => sum + invoice.remaining, 0);
  const totalPaid = list.reduce((sum, invoice) => sum + invoice.paid, 0);
  const pendingInvoices = list.filter((invoice) => invoice.status === 'Pending' || invoice.status === 'Overdue' || invoice.status === 'Partially Paid').length;
  const lastPayment = list
    .flatMap((invoice) => invoice.paymentHistory)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  return { totalOutstanding, totalPaid, pendingInvoices, lastPayment };
}
