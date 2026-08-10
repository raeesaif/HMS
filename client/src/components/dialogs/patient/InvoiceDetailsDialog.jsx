import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { invoiceStatusMap } from '@/components/patient/statusMaps';
import { patientProfile } from '@/data/patient';

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
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <StatusBadge status={invoice.status} map={invoiceStatusMap} />
          <DialogTitle>Invoice {invoice.id}</DialogTitle>
          <DialogDescription>MediCore Hospital · {invoice.date}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Patient" value={patientProfile.name} />
          <InfoField label="Invoice Date" value={invoice.date} />
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium text-slate-500">Services</p>
          <div className="space-y-1.5">
            {invoice.services.map((service) => (
              <div key={service.name} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <span className="text-slate-700">{service.name}</span>
                <span className="font-medium text-slate-900">PKR {service.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 border-t border-slate-100 pt-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>PKR {invoice.subtotal.toLocaleString()}</span>
          </div>
          {invoice.discount > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Discount</span>
              <span>- PKR {invoice.discount.toLocaleString()}</span>
            </div>
          )}
          {invoice.tax > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Tax</span>
              <span>PKR {invoice.tax.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>PKR {invoice.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Paid</span>
            <span>PKR {invoice.paid.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-medium text-rose-600">
            <span>Remaining</span>
            <span>PKR {invoice.remaining.toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
