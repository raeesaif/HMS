import {
  Activity,
  Eye,
  FileClock,
  MoreVertical,
  NotebookPen,
  Stethoscope,
  Syringe,
} from 'lucide-react';
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
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view-details', patient)}>
          <Eye /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('update-vitals', patient)}>
          <Activity /> Update Vitals
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('administer-medication', patient)}>
          <Syringe /> Administer Medication
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('add-nursing-note', patient)}>
          <NotebookPen /> Add Nursing Notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAction('view-medical-history', patient)}>
          <FileClock /> View Medical History
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('request-doctor-review', patient)}>
          <Stethoscope /> Request Doctor Review
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
