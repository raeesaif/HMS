import { FlaskConical } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { labReportStatusMap } from '@/components/patient/statusMaps';
import { LabReportsActionsMenu } from './LabReportsActionsMenu';

const columns = ['Report ID', 'Test Name', 'Ordered By', 'Department', 'Date', 'Status', 'Result', ''];

export function LabReportsTable({ reports, onAction, onClearFilters }) {
  if (reports.length === 0) {
    return (
      <EmptyState
        icon={FlaskConical}
        title="No laboratory reports available."
        action={
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[980px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {columns.map((label) => (
              <TableHead key={label || 'actions'} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={report.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{report.id}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm font-medium text-slate-900">{report.testName}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{report.orderedBy}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{report.labDepartment}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{report.sampleDate}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={report.status} map={labReportStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{report.status === 'Completed' ? 'Available' : 'Not available'}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <LabReportsActionsMenu report={report} onAction={onAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
