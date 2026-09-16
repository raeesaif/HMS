import { CalendarClock, ClipboardCheck, Eye, MoreVertical, Trash2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function AppointmentsActionsMenu({ appointment, onAction }) {
  const isFinal = ['Completed', 'Cancelled', 'Rejected'].includes(appointment.status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Appointment actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view', appointment)}>
          <Eye /> View
        </DropdownMenuItem>
        {!isFinal && (
          <>
            <DropdownMenuItem onClick={() => onAction('check-in', appointment)}>
              <ClipboardCheck /> Check In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('reschedule', appointment)}>
              <CalendarClock /> Reschedule
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onAction('cancel', appointment)}>
              <XCircle /> Cancel
            </DropdownMenuItem>
          </>
        )}
        {isFinal && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onAction('delete', appointment)}>
              <Trash2 /> Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
