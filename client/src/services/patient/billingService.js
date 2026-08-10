import { invoices, getBillingStats } from '@/data/patientBilling';
import { simulateRequest } from '@/services/apiClient';

export function fetchInvoices() {
  return simulateRequest({ invoices, stats: getBillingStats(invoices) });
}

// Submits a payment request for backend/payment-gateway processing. This
// intentionally does NOT resolve with a finalized "Paid" invoice — the real
// payment outcome must come from the backend/payment provider webhook.
export function submitPayment(invoiceId, payload) {
  return simulateRequest({ invoiceId, ...payload, status: 'Processing' });
}
