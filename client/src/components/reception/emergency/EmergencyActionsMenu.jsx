import { Eye, MoreVertical, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function EmergencyActionsMenu({ entry, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Emergency patient actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view-details', entry)}>
          <Eye /> View Emergency Details
        </DropdownMenuItem>
        {entry.patientId && (
          <DropdownMenuItem onClick={() => onAction('view-patient', entry)}>
            <UserRound /> View Patient
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
