import { Download, Eye, MoreVertical, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function LabReportsActionsMenu({ report, onAction }) {
  const isReady = report.status === 'Completed';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Lab report actions" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view', report)}>
          <Eye /> View Report
        </DropdownMenuItem>
        {isReady && (
          <>
            <DropdownMenuItem onClick={() => onAction('download', report)}>
              <Download /> Download Report
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('print', report)}>
              <Printer /> Print Report
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
