import { Eye, Receipt, RotateCcw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { transactionStatusMap } from '@/components/super-admin/statusMaps';

const columns = ['Transaction ID', 'Hospital', 'Plan', 'Amount', 'Method', 'Date', 'Status', ''];

export function TransactionsTable({ transactions, onAction, onClearFilters }) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="No transactions found"
        description="Try adjusting your filters."
        action={
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[960px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {columns.map((label) => (
              <TableHead key={label || 'actions'} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={transaction.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{transaction.id}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm font-medium text-slate-900">{transaction.hospitalName}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{transaction.plan}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{transaction.currency} {transaction.amount.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{transaction.method}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{transaction.date}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={transaction.status} map={transactionStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon-sm" title="View Details" aria-label="View Details" onClick={() => onAction('view', transaction)}>
                    <Eye className="size-4" />
                  </Button>
                  {transaction.status === 'Paid' && (
                    <Button variant="ghost" size="icon-sm" title="Issue Refund" aria-label="Issue Refund" onClick={() => onAction('refund', transaction)}>
                      <RotateCcw className="size-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
