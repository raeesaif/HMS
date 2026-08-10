import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { transactionStatusMap } from '@/components/super-admin/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value ?? '—'}</p>
    </div>
  );
}

export function TransactionDetailsDialog({ transaction, open, onOpenChange }) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <StatusBadge status={transaction.status} map={transactionStatusMap} />
          <DialogTitle>{transaction.id}</DialogTitle>
          <DialogDescription>{transaction.hospitalName} · {transaction.invoiceNumber}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Subscription Plan" value={transaction.plan} />
          <InfoField label="Amount" value={`${transaction.currency} ${transaction.amount.toLocaleString()}`} />
          <InfoField label="Payment Method" value={transaction.method} />
          <InfoField label="Payment Date" value={transaction.date} />
          <InfoField label="Invoice" value={transaction.invoiceNumber} />
          <InfoField label="Status" value={transaction.status} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
