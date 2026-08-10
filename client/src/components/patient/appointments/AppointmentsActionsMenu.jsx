import { CalendarClock, Eye, MoreVertical, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const modifiableStatuses = ['Scheduled', 'Confirmed'];

export function AppointmentsActionsMenu({ appointment, onAction }) {
  const canModify = modifiableStatuses.includes(appointment.status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Appointment actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view', appointment)}>
          <Eye /> View Details
        </DropdownMenuItem>
        {canModify && (
          <>
            <DropdownMenuItem onClick={() => onAction('reschedule', appointment)}>
              <CalendarClock /> Reschedule
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onAction('cancel', appointment)}>
              <XCircle /> Cancel
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
