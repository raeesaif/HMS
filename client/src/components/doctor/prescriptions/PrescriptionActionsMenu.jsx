import { Download, Eye, FileText, MoreVertical, Pencil, Printer, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function PrescriptionActionsMenu({ prescription, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Prescription actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view-prescription', prescription)}>
          <Eye /> View Prescription
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!prescription.isDraft} onClick={() => onAction('edit-prescription', prescription)}>
          <Pencil /> Edit Prescription
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('print-prescription', prescription)}>
          <Printer /> Print Prescription
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('download-prescription', prescription)}>
          <Download /> Download Prescription
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAction('view-patient', prescription)}>
          <UserRound /> View Patient
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-medical-records', prescription)}>
          <FileText /> View Medical Records
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
