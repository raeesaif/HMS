import { CreditCard, Eye, MoreVertical, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function BillingActionsMenu({ invoice, onAction }) {
  const canCollect = invoice.status === 'Pending' || invoice.status === 'Partially Paid';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Invoice actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view', invoice)}>
          <Eye /> View Invoice
        </DropdownMenuItem>
        {canCollect && (
          <DropdownMenuItem onClick={() => onAction('collect', invoice)}>
            <CreditCard /> Collect Payment
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onAction('print', invoice)}>
          <Printer /> Print Invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
