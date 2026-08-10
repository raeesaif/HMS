import { CreditCard, Eye, MoreVertical, ShieldCheck, ShieldOff, SquarePen, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function HospitalsActionsMenu({ hospital, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Hospital actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view', hospital)}>
          <Eye /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('edit', hospital)}>
          <SquarePen /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-users', hospital)}>
          <Users /> View Users
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('change-plan', hospital)}>
          <CreditCard /> Change Subscription
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {hospital.status === 'Suspended' ? (
          <DropdownMenuItem onClick={() => onAction('activate', hospital)}>
            <ShieldCheck /> Activate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onAction('suspend', hospital)}>
            <ShieldOff /> Suspend
          </DropdownMenuItem>
        )}
        <DropdownMenuItem variant="destructive" onClick={() => onAction('delete', hospital)}>
          <Trash2 /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
