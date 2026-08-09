import { CalendarPlus, ClipboardCheck, Eye, MoreVertical, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function PatientsActionsMenu({ patient, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Patient actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view', patient)}>
          <Eye /> View Patient
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('edit', patient)}>
          <SquarePen /> Edit Patient
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('appointment', patient)}>
          <CalendarPlus /> Create Appointment
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('check-in', patient)}>
          <ClipboardCheck /> Check In
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
