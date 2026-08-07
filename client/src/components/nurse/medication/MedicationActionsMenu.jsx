import { Eye, History, MoreVertical, NotebookPen, Stethoscope, Syringe, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function MedicationActionsMenu({ medication, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view-details', medication)}>
          <Eye /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('administer', medication)}>
          <Syringe /> Administer Medication
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-history', medication)}>
          <History /> Medication History
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('add-notes', medication)}>
          <NotebookPen /> Add Administration Notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAction('report-side-effect', medication)}>
          <TriangleAlert /> Report Side Effects
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('notify-doctor', medication)}>
          <Stethoscope /> Notify Doctor
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
