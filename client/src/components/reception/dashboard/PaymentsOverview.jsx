import { Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { invoiceStatusMap } from '@/components/reception/statusMaps';

export function PaymentsOverview({ payments = [], isLoading = false, onViewAll }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold">Recent Payments</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">{payments.length} invoices today</p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View Billing
        </Button>
      </CardHeader>

      {isLoading ? (
        <TableSkeleton rows={4} cols={4} />
      ) : payments.length === 0 ? (
        <EmptyState icon={Receipt} title="No payments yet today" description="Collected payments will appear here." />
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[560px]">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                {['Patient', 'Invoice', 'Amount', 'Status'].map((label) => (
                  <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((invoice, index) => (
                <TableRow key={invoice.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                  <TableCell className="px-4 py-3 pl-5 text-sm font-medium text-slate-900">{invoice.patientName}</TableCell>
                  <TableCell className="px-4 py-3 font-mono text-xs text-slate-500">{invoice.id}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-600">PKR {invoice.total.toLocaleString()}</TableCell>
                  <TableCell className="px-4 py-3">
                    <StatusBadge status={invoice.status} map={invoiceStatusMap} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
