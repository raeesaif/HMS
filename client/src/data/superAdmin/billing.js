export const transactionStatusOptions = ['Paid', 'Pending', 'Failed', 'Refunded'];
export const paymentMethodOptions = ['Card', 'Bank Transfer', 'PayPal', 'Other'];

export const transactions = [
  { id: 'TXN-90001', hospitalId: 'HOSP-1001', hospitalName: 'MediCore General Hospital', plan: 'Enterprise', amount: 399, currency: 'USD', method: 'Card', date: '01 Aug 2026', status: 'Paid', invoiceNumber: 'INV-2026-0801' },
  { id: 'TXN-90002', hospitalId: 'HOSP-1002', hospitalName: 'Riverside Community Clinic', plan: 'Basic', amount: 49, currency: 'USD', method: 'Card', date: '02 Aug 2026', status: 'Paid', invoiceNumber: 'INV-2026-0802' },
  { id: 'TXN-90003', hospitalId: 'HOSP-1004', hospitalName: 'Lakeside Orthopedic Hospital', plan: 'Professional', amount: 149, currency: 'USD', method: 'Bank Transfer', date: '03 Aug 2026', status: 'Paid', invoiceNumber: 'INV-2026-0803' },
  { id: 'TXN-90004', hospitalId: 'HOSP-1005', hospitalName: 'Green Valley Health Center', plan: 'Basic', amount: 49, currency: 'USD', method: 'Card', date: '05 Aug 2026', status: 'Failed', invoiceNumber: 'INV-2026-0804' },
  { id: 'TXN-90005', hospitalId: 'HOSP-1006', hospitalName: 'Harborview Maternity Hospital', plan: 'Enterprise', amount: 399, currency: 'USD', method: 'Card', date: '05 Aug 2026', status: 'Paid', invoiceNumber: 'INV-2026-0805' },
  { id: 'TXN-90006', hospitalId: 'HOSP-1008', hospitalName: 'Eastwood Family Practice', plan: 'Basic', amount: 49, currency: 'USD', method: 'Card', date: '30 Apr 2026', status: 'Failed', invoiceNumber: 'INV-2026-0430' },
  { id: 'TXN-90007', hospitalId: 'HOSP-1001', hospitalName: 'MediCore General Hospital', plan: 'Enterprise', amount: 399, currency: 'USD', method: 'Card', date: '01 Jul 2026', status: 'Paid', invoiceNumber: 'INV-2026-0701' },
  { id: 'TXN-90008', hospitalId: 'HOSP-1004', hospitalName: 'Lakeside Orthopedic Hospital', plan: 'Professional', amount: 149, currency: 'USD', method: 'Bank Transfer', date: '01 Jul 2026', status: 'Refunded', invoiceNumber: 'INV-2026-0702' },
  { id: 'TXN-90009', hospitalId: 'HOSP-1002', hospitalName: 'Riverside Community Clinic', plan: 'Basic', amount: 49, currency: 'USD', method: 'PayPal', date: '09 Aug 2026', status: 'Pending', invoiceNumber: 'INV-2026-0809' },
  { id: 'TXN-90010', hospitalId: 'HOSP-1006', hospitalName: 'Harborview Maternity Hospital', plan: 'Enterprise', amount: 399, currency: 'USD', method: 'Card', date: '01 Jun 2026', status: 'Paid', invoiceNumber: 'INV-2026-0601' },
];

export function getBillingStats(list) {
  const totalRevenue = list.filter((t) => t.status === 'Paid').reduce((sum, t) => sum + t.amount, 0);
  const monthlyRevenue = list.filter((t) => t.status === 'Paid' && t.date.includes('Aug 2026')).reduce((sum, t) => sum + t.amount, 0);
  const yearlyRevenue = list.filter((t) => t.status === 'Paid' && t.date.includes('2026')).reduce((sum, t) => sum + t.amount, 0);
  const pendingPayments = list.filter((t) => t.status === 'Pending').length;
  const failedPayments = list.filter((t) => t.status === 'Failed').length;
  const refunds = list.filter((t) => t.status === 'Refunded').length;
  return { totalRevenue, monthlyRevenue, yearlyRevenue, pendingPayments, failedPayments, refunds };
}
