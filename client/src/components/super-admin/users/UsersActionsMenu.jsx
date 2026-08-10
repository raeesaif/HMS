import { Activity, Eye, KeyRound, MoreVertical, ShieldCheck, ShieldOff, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function UsersActionsMenu({ user, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="User actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view', user)}>
          <Eye /> View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('edit', user)}>
          <SquarePen /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('reset-password', user)}>
          <KeyRound /> Reset Password
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-activity', user)}>
          <Activity /> View Activity
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.status === 'Suspended' ? (
          <DropdownMenuItem onClick={() => onAction('activate', user)}>
            <ShieldCheck /> Activate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem variant="destructive" onClick={() => onAction('suspend', user)}>
            <ShieldOff /> Suspend
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
