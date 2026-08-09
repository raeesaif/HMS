import { invoices, getBillingStats } from '@/data/receptionistBilling';
import { simulateRequest } from '@/services/apiClient';

export function fetchInvoices() {
  return simulateRequest({ invoices, stats: getBillingStats(invoices) });
}

export function collectPayment(invoiceId, payload) {
  return simulateRequest({ id: invoiceId, ...payload });
}
