import { CalendarDays, ClipboardCheck, MoreVertical, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function CheckInsActionsMenu({ checkIn, onAction }) {
  const isPending = checkIn.status === 'Waiting';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Check-in actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isPending && (
          <DropdownMenuItem onClick={() => onAction('check-in', checkIn)}>
            <ClipboardCheck /> Check In
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onAction('view-appointment', checkIn)}>
          <CalendarDays /> View Appointment
        </DropdownMenuItem>
        {isPending && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onAction('no-show', checkIn)}>
              <UserX /> Mark No Show
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
