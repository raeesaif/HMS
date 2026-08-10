import { transactions, getBillingStats } from '@/data/superAdmin/billing';
import { simulateRequest } from '@/services/apiClient';

export function fetchTransactions() {
  return simulateRequest({ transactions, stats: getBillingStats(transactions) });
}

// Submits a refund request for backend/payment-provider processing. This
// intentionally does not resolve with a finalized "Refunded" status — the
// real refund outcome must come from the payment provider.
export function requestRefund(transactionId, payload) {
  return simulateRequest({ transactionId, ...payload, status: 'Processing' });
}
