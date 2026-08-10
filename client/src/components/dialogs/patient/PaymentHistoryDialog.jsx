import { Receipt } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EmptyState } from '@/shared/EmptyState';

export function PaymentHistoryDialog({ invoice, open, onOpenChange }) {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment History</DialogTitle>
          <DialogDescription>All payments recorded against invoice {invoice.id}.</DialogDescription>
        </DialogHeader>

        {invoice.paymentHistory.length === 0 ? (
          <EmptyState icon={Receipt} title="No payments recorded" description="No payments have been made on this invoice yet." />
        ) : (
          <div className="space-y-2">
            {invoice.paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">PKR {payment.amount.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{payment.method} · {payment.date} · Ref: {payment.reference}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
