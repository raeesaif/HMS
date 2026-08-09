import { CheckCircle2, MoreVertical, PhoneCall, SkipForward, Stethoscope, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function QueueActionsMenu({ entry, onAction }) {
  const isActive = entry.status === 'Waiting' || entry.status === 'Called' || entry.status === 'With Doctor';

  if (!isActive) {
    return (
      <Button variant="ghost" size="icon-sm" disabled aria-label="No actions available">
        <MoreVertical className="size-4 opacity-40" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Queue actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {entry.status === 'Waiting' && (
          <DropdownMenuItem onClick={() => onAction('call', entry)}>
            <PhoneCall /> Call Patient
          </DropdownMenuItem>
        )}
        {(entry.status === 'Waiting' || entry.status === 'Called') && (
          <DropdownMenuItem onClick={() => onAction('with-doctor', entry)}>
            <Stethoscope /> Mark With Doctor
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onAction('complete', entry)}>
          <CheckCircle2 /> Complete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAction('skip', entry)}>
          <SkipForward /> Skip
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={() => onAction('remove', entry)}>
          <XCircle /> Remove From Queue
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
