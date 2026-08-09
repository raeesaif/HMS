import { Eye, FileCheck2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LabStatusBadge } from './StatusBadge';

export function LabReportCard({ report, onViewReport, onReviewResult }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-900">{report.patientName}</p>
        <p className="text-xs text-slate-500">
          {report.testName} · Requested {report.requestedDate}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <LabStatusBadge status={report.status} />
        <Button
          variant="ghost"
          size="icon-sm"
          title="View Report"
          aria-label="View Report"
          onClick={() => onViewReport?.(report)}
        >
          <Eye className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          title="Review Result"
          aria-label="Review Result"
          onClick={() => onReviewResult?.(report)}
        >
          <FileCheck2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
