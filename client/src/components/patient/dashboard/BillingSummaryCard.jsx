import { Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function BillingSummaryCard({ summary, onViewBilling }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-base font-semibold">Billing Summary</CardTitle>
        <Button variant="outline" size="sm" onClick={onViewBilling}>
          <Receipt /> View Billing
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 pt-3 sm:grid-cols-4">
        <div>
          <p className="text-xs text-slate-500">Total Outstanding</p>
          <p className="mt-0.5 text-lg font-semibold text-rose-600">PKR {summary.totalOutstanding.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Last Invoice</p>
          <p className="mt-0.5 text-sm font-medium text-slate-900">{summary.lastPayment?.date ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Last Payment</p>
          <p className="mt-0.5 text-sm font-medium text-slate-900">
            {summary.lastPayment ? `PKR ${summary.lastPayment.amount.toLocaleString()}` : '—'}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Payment Status</p>
          <p className="mt-0.5 text-sm font-medium text-slate-900">{summary.totalOutstanding > 0 ? 'Outstanding balance due' : 'Up to date'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
