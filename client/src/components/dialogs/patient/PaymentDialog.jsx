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
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { paymentMethodOptions } from '@/data/patientBilling';

function PaymentForm({ invoice, onOpenChange, onSubmit }) {
  const [amount, setAmount] = useState(String(invoice.remaining));
  const [method, setMethod] = useState('');
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState({});

  const amountNumber = Number(amount) || 0;

  const handleSubmit = () => {
    const nextErrors = {};
    if (!amount || amountNumber <= 0) nextErrors.amount = 'Enter a valid payment amount';
    else if (amountNumber > invoice.remaining) nextErrors.amount = 'Amount cannot exceed the remaining balance';
    if (!method) nextErrors.method = 'Select a payment method';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit(invoice.id, { amount: amountNumber, method, reference: reference.trim() || '—' });
    onOpenChange(false);
    toast.info('Payment submitted. It will be confirmed once processed by the payment gateway.');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="font-medium text-slate-900">Invoice {invoice.id}</p>
          <p className="text-xs text-slate-500">Remaining balance: PKR {invoice.remaining.toLocaleString()}</p>
        </div>

        <div className="space-y-1">
          <FieldLabel>Payment Amount *</FieldLabel>
          <Input type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} aria-invalid={!!errors.amount} />
          {errors.amount && <FieldError>{errors.amount}</FieldError>}
        </div>

        <div className="space-y-1">
          <FieldLabel>Payment Method *</FieldLabel>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger className="w-full" aria-invalid={!!errors.method}>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethodOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.method && <FieldError>{errors.method}</FieldError>}
        </div>

        <div className="space-y-1">
          <FieldLabel>Payment Reference</FieldLabel>
          <Input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="Transaction reference (if applicable)" />
        </div>

        <p className="text-xs text-slate-400">Your payment will be submitted for processing and confirmed once the payment gateway completes the transaction.</p>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSubmit}>Submit Payment</Button>
      </DialogFooter>
    </>
  );
}

export function PaymentDialog({ invoice, open, onOpenChange, onSubmit }) {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pay Invoice</DialogTitle>
          <DialogDescription>Make a payment towards invoice {invoice.id}.</DialogDescription>
        </DialogHeader>

        <PaymentForm key={invoice.id} invoice={invoice} onOpenChange={onOpenChange} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
