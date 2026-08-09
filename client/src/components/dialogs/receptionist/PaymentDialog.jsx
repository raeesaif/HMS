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
import { ReceptionDatePicker } from '@/components/reception/ReceptionDatePicker';
import { paymentMethodOptions } from '@/data/receptionistBilling';

function PaymentForm({ invoice, onOpenChange, onConfirm }) {
  const [paymentAmount, setPaymentAmount] = useState(String(invoice.remaining));
  const [paymentMethod, setPaymentMethod] = useState('');
  const [reference, setReference] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString());
  const [errors, setErrors] = useState({});

  const amountNumber = Number(paymentAmount) || 0;

  const handleConfirm = () => {
    const nextErrors = {};
    if (!paymentAmount || amountNumber <= 0) nextErrors.paymentAmount = 'Enter a valid payment amount';
    else if (amountNumber > invoice.remaining) nextErrors.paymentAmount = 'Amount cannot exceed the remaining balance';
    if (!paymentMethod) nextErrors.paymentMethod = 'Select a payment method';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const newPaid = invoice.paid + amountNumber;
    onConfirm(invoice.id, {
      paid: newPaid,
      remaining: invoice.total - newPaid,
      status: newPaid >= invoice.total ? 'Paid' : 'Partially Paid',
      payment: { amount: amountNumber, method: paymentMethod, reference: reference.trim() || '—', date: paymentDate },
    });
    onOpenChange(false);
    toast.success('Payment collected');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">Invoice</p>
            <p className="font-medium text-slate-900">{invoice.id}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Patient</p>
            <p className="font-medium text-slate-900">{invoice.patientName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total</p>
            <p className="font-medium text-slate-900">PKR {invoice.total.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Remaining</p>
            <p className="font-semibold text-rose-600">PKR {invoice.remaining.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Payment Amount *</FieldLabel>
            <Input type="number" min="0" value={paymentAmount} onChange={(event) => setPaymentAmount(event.target.value)} aria-invalid={!!errors.paymentAmount} />
            {errors.paymentAmount && <FieldError>{errors.paymentAmount}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Payment Method *</FieldLabel>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.paymentMethod}>
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
            {errors.paymentMethod && <FieldError>{errors.paymentMethod}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Payment Reference</FieldLabel>
            <Input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="Transaction / receipt no." />
          </div>
          <div className="space-y-1">
            <FieldLabel>Payment Date</FieldLabel>
            <ReceptionDatePicker date={paymentDate} onSelect={setPaymentDate} />
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleConfirm}>Collect Payment</Button>
      </DialogFooter>
    </>
  );
}

export function PaymentDialog({ invoice, open, onOpenChange, onConfirm }) {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Collect Payment</DialogTitle>
          <DialogDescription>Record a payment against invoice {invoice.id}.</DialogDescription>
        </DialogHeader>

        <PaymentForm key={invoice.id} invoice={invoice} onOpenChange={onOpenChange} onConfirm={onConfirm} />
      </DialogContent>
    </Dialog>
  );
}
