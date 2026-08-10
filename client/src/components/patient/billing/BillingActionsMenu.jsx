import { CreditCard, Download, Eye, History, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function BillingActionsMenu({ invoice, onAction }) {
  const canPay = invoice.status === 'Pending' || invoice.status === 'Partially Paid' || invoice.status === 'Overdue';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Invoice actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view', invoice)}>
          <Eye /> View Invoice
        </DropdownMenuItem>
        {canPay && (
          <DropdownMenuItem onClick={() => onAction('pay', invoice)}>
            <CreditCard /> Pay Now
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onAction('download', invoice)}>
          <Download /> Download Invoice
        </DropdownMenuItem>
        {invoice.paymentHistory.length > 0 && (
          <DropdownMenuItem onClick={() => onAction('history', invoice)}>
            <History /> View Payment History
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
