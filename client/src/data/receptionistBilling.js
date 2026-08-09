export const invoiceStatusOptions = ['Paid', 'Partially Paid', 'Pending', 'Cancelled'];
export const paymentMethodOptions = ['Cash', 'Card', 'Bank Transfer', 'Other'];

export const invoices = [
  {
    id: 'INV-7001',
    patientId: 'PT-1042',
    patientName: 'Ali Ahmed',
    service: 'Cardiology Consultation',
    date: '09 Aug 2026',
    total: 5500,
    paid: 5500,
    remaining: 0,
    status: 'Paid',
    paymentHistory: [{ id: 'PMT-1', amount: 5500, method: 'Card', reference: 'TXN-88213', date: '09 Aug 2026', collectedBy: 'Neha Kapoor' }],
  },
  {
    id: 'INV-7002',
    patientId: 'PT-1088',
    patientName: 'Fatima Noor',
    service: 'Consultation + ECG',
    date: '09 Aug 2026',
    total: 8200,
    paid: 4000,
    remaining: 4200,
    status: 'Partially Paid',
    paymentHistory: [{ id: 'PMT-2', amount: 4000, method: 'Cash', reference: '—', date: '09 Aug 2026', collectedBy: 'Neha Kapoor' }],
  },
  {
    id: 'INV-7003',
    patientId: 'PT-1121',
    patientName: 'Bilal Khan',
    service: 'Cardiac Check-up',
    date: '09 Aug 2026',
    total: 4500,
    paid: 0,
    remaining: 4500,
    status: 'Pending',
    paymentHistory: [],
  },
  {
    id: 'INV-7004',
    patientId: 'PT-0921',
    patientName: 'Kamran Ali',
    service: 'Emergency Admission — ICU',
    date: '04 Aug 2026',
    total: 65000,
    paid: 40000,
    remaining: 25000,
    status: 'Partially Paid',
    paymentHistory: [{ id: 'PMT-3', amount: 40000, method: 'Bank Transfer', reference: 'TRX-556231', date: '05 Aug 2026', collectedBy: 'Neha Kapoor' }],
  },
  {
    id: 'INV-7005',
    patientId: 'PT-1203',
    patientName: 'Hina Farooq',
    service: 'Gynecology Consultation',
    date: '01 Aug 2026',
    total: 3500,
    paid: 3500,
    remaining: 0,
    status: 'Paid',
    paymentHistory: [{ id: 'PMT-4', amount: 3500, method: 'Card', reference: 'TXN-88190', date: '01 Aug 2026', collectedBy: 'Neha Kapoor' }],
  },
  {
    id: 'INV-7006',
    patientId: 'PT-1177',
    patientName: 'Usman Tariq',
    service: 'Orthopedic Follow-up',
    date: '04 Aug 2026',
    total: 3000,
    paid: 3000,
    remaining: 0,
    status: 'Cancelled',
    paymentHistory: [],
  },
];

export function getBillingStats(list) {
  const todaysRevenue = list
    .filter((invoice) => invoice.date === '09 Aug 2026')
    .reduce((sum, invoice) => sum + invoice.paid, 0);
  const pendingBills = list.filter((invoice) => invoice.status === 'Pending' || invoice.status === 'Partially Paid').length;
  const paidBills = list.filter((invoice) => invoice.status === 'Paid').length;
  const outstandingAmount = list.reduce((sum, invoice) => sum + invoice.remaining, 0);
  return { todaysRevenue, pendingBills, paidBills, outstandingAmount };
}
