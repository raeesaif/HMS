import { BedSingle, Eye, MoreVertical, UserPlus, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function BedsActionsMenu({ bed, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Bed actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view', bed)}>
          <Eye /> View Bed
        </DropdownMenuItem>
        {bed.status === 'Available' && (
          <>
            <DropdownMenuItem onClick={() => onAction('assign', bed)}>
              <UserPlus /> Assign Bed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('reserve', bed)}>
              <BedSingle /> Reserve Bed
            </DropdownMenuItem>
          </>
        )}
        {(bed.status === 'Occupied' || bed.status === 'Reserved') && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onAction('release', bed)}>
              <UserX /> Release Bed
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
