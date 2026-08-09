import { Receipt } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { invoiceStatusMap } from '@/components/reception/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function InvoiceDetailsDialog({ invoice, open, onOpenChange }) {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <StatusBadge status={invoice.status} map={invoiceStatusMap} />
          <DialogTitle>{invoice.id}</DialogTitle>
          <DialogDescription>{invoice.patientName} · {invoice.service}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Date" value={invoice.date} />
          <InfoField label="Total Amount" value={`PKR ${invoice.total.toLocaleString()}`} />
          <InfoField label="Paid Amount" value={`PKR ${invoice.paid.toLocaleString()}`} />
          <InfoField label="Remaining Balance" value={`PKR ${invoice.remaining.toLocaleString()}`} />
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-slate-500">Payment History</p>
          {invoice.paymentHistory.length === 0 ? (
            <EmptyState icon={Receipt} title="No payments recorded" description="No payments have been collected for this invoice yet." />
          ) : (
            <div className="space-y-2">
              {invoice.paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">PKR {payment.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">{payment.method} · {payment.date} · Ref: {payment.reference}</p>
                  </div>
                  <p className="text-xs text-slate-500">{payment.collectedBy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
