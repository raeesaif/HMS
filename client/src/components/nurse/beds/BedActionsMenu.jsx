import { ArrowLeftRight, Eye, Flag, MoreVertical, RefreshCcw, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function BedActionsMenu({ bed, onAction }) {
  const hasPatient = Boolean(bed.patient);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view-bed-details', bed)}>
          <Eye /> View Bed Details
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!hasPatient} onClick={() => onAction('view-patient', bed)}>
          <UserRound /> View Patient
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!hasPatient} onClick={() => onAction('transfer-patient', bed)}>
          <ArrowLeftRight /> Transfer Patient
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAction('update-status', bed)}>
          <RefreshCcw /> Update Bed Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('report-issue', bed)}>
          <Flag /> Report Issue
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
