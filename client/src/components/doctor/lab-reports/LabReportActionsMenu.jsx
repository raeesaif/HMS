import { ClipboardPlus, Eye, FileText, ListChecks, TestTubes, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LabReportActionsMenu({ report, onAction }) {
  const canReview = report.reportStatus === 'Ready for Review';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Lab report actions" />}>
        <ListChecks className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAction('view-report', report)}>
          <Eye /> View Report
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!canReview} onClick={() => onAction('review-results', report)}>
          <ListChecks /> Review Results
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-patient', report)}>
          <UserRound /> View Patient
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('view-medical-records', report)}>
          <FileText /> View Medical Records
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAction('add-clinical-interpretation', report)}>
          <ClipboardPlus /> Add Clinical Interpretation
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction('request-follow-up-test', report)}>
          <TestTubes /> Request Follow-up Test
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
