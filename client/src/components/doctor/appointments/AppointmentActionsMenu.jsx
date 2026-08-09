import { Eye, FileText, MoreVertical, NotebookPen, Pill, Play, UserRound, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const CLOSED_STATUSES = ['Completed', 'Cancelled', 'No Show'];

export function AppointmentActionsMenu({ appointment, onAction }) {
  const isClosed = CLOSED_STATUSES.includes(appointment.status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Appointment actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view-appointment', appointment)}>
          <Eye /> View Appointment
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-patient', appointment)}>
          <UserRound /> View Patient
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isClosed} onClick={() => onAction('start-consultation', appointment)}>
          <Play /> Start Consultation
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-medical-records', appointment)}>
          <FileText /> View Medical Records
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-prescriptions', appointment)}>
          <Pill /> View Prescription History
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('add-notes', appointment)}>
          <NotebookPen /> Add Consultation Notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={isClosed}
          onClick={() => onAction('mark-no-show', appointment)}
        >
          <UserX /> Mark as No Show
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
