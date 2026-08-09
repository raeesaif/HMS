import { Activity, CalendarDays, Eye, FileText, MoreVertical, NotebookPen, Pill, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function PatientActionsMenu({ patient, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Patient actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view-patient', patient)}>
          <Eye /> View Patient
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-medical-records', patient)}>
          <FileText /> View Medical Records
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-appointments', patient)}>
          <CalendarDays /> View Appointments
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-prescriptions', patient)}>
          <Pill /> View Prescriptions
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-lab-reports', patient)}>
          <TestTube /> View Lab Reports
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-vitals', patient)}>
          <Activity /> View Vitals
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAction('add-clinical-note', patient)}>
          <NotebookPen /> Add Clinical Note
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
