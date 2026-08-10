import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function RefundForm({ transaction, onOpenChange, onSubmit }) {
  const [amount, setAmount] = useState(String(transaction.amount));
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});

  const amountNumber = Number(amount) || 0;

  const handleSubmit = () => {
    const nextErrors = {};
    if (!amount || amountNumber <= 0) nextErrors.amount = 'Enter a valid refund amount';
    else if (amountNumber > transaction.amount) nextErrors.amount = 'Refund amount cannot exceed the original amount';
    if (!reason.trim()) nextErrors.reason = 'A reason is required for the refund';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit(transaction.id, { amount: amountNumber, reason: reason.trim() });
    onOpenChange(false);
    toast.info('Refund request submitted for payment provider processing.');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="font-medium text-slate-900">{transaction.hospitalName}</p>
          <p className="text-xs text-slate-500">
            {transaction.id} · Original amount: {transaction.currency} {transaction.amount.toLocaleString()}
          </p>
        </div>

        <div className="space-y-1">
          <FieldLabel>Refund Amount *</FieldLabel>
          <Input type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} aria-invalid={!!errors.amount} />
          {errors.amount && <FieldError>{errors.amount}</FieldError>}
        </div>

        <div className="space-y-1">
          <FieldLabel>Reason *</FieldLabel>
          <Textarea value={reason} onChange={(event) => setReason(event.target.value)} className="min-h-20 resize-none" aria-invalid={!!errors.reason} />
          {errors.reason && <FieldError>{errors.reason}</FieldError>}
        </div>

        <p className="text-xs text-slate-400">
          This does not immediately mark the payment as refunded. The refund request will be sent to the payment provider for processing.
        </p>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button variant="destructive" onClick={handleSubmit}>
          Submit Refund Request
        </Button>
      </DialogFooter>
    </>
  );
}

export function RefundDialog({ transaction, open, onOpenChange, onSubmit }) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Issue Refund</DialogTitle>
          <DialogDescription>Request a refund for transaction {transaction.id}.</DialogDescription>
        </DialogHeader>

        <RefundForm key={transaction.id} transaction={transaction} onOpenChange={onOpenChange} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
