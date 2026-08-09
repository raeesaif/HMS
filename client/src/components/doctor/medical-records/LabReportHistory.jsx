import { AlertTriangle, Eye, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { LabResultBadge } from './RecordBadges';
import { TableSkeleton } from './LoadingSkeleton';

export function LabReportHistory({ labReports, isLoading = false, onViewReport }) {
  if (isLoading) {
    return <TableSkeleton cols={7} />;
  }

  if (labReports.length === 0) {
    return (
      <EmptyState icon={FlaskConical} title="No lab reports found" description="This patient has no recorded lab reports yet." />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {['Test Name', 'Test Date', 'Result', 'Reference Range', 'Status', 'Doctor', 'Actions'].map((label) => (
              <TableHead
                key={label}
                className={`h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5 ${
                  label === 'Actions' ? 'text-right' : ''
                }`}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {labReports.map((lab, index) => (
            <TableRow key={lab.id} className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 font-medium text-slate-900">{lab.testName}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{lab.testDate}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  {lab.isAbnormal && <AlertTriangle className="size-3.5 text-rose-500" />}
                  {lab.result}
                </span>
              </TableCell>
              <TableCell className="px-4 py-3.5 text-slate-500">{lab.referenceRange}</TableCell>
              <TableCell className="px-4 py-3.5">
                <LabResultBadge status={lab.status} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{lab.doctor}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5 text-right">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  title="View Report"
                  aria-label="View Report"
                  onClick={() => onViewReport(lab)}
                >
                  <Eye className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
