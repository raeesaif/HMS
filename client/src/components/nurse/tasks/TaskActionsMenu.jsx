import { CheckCircle2, Eye, Flag, MoreVertical, NotebookPen, PlayCircle, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TaskActionsMenu({ task, onAction }) {
  const canStart = task.status === 'pending' || task.status === 'overdue';
  const canComplete = task.status !== 'completed';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view-details', task)}>
          <Eye /> View Task Details
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!canStart} onClick={() => onAction('start-task', task)}>
          <PlayCircle /> Start Task
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!canComplete} onClick={() => onAction('complete-task', task)}>
          <CheckCircle2 /> Mark as Completed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('add-notes', task)}>
          <NotebookPen /> Add Nursing Notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAction('request-doctor-review', task)}>
          <Stethoscope /> Request Doctor Review
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('report-issue', task)}>
          <Flag /> Report Issue
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
