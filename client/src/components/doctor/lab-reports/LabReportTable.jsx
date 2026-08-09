import { FlaskConical } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { getPatientById } from '@/data/doctorPatients';
import { LabReportStatusBadge } from './LabReportStatusBadge';
import { LabResultStatusBadge } from './LabResultStatusBadge';
import { LabReportActionsMenu } from './LabReportActionsMenu';
import { LabReportCard } from './LabReportCard';
import { TableSkeleton } from './LoadingSkeleton';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const columnLabels = [
  'Report ID',
  'Patient',
  'Patient ID',
  'Test Name',
  'Requested Date',
  'Sample Date',
  'Report Date',
  'Result Status',
  'Report Status',
  'Actions',
];

export function LabReportTable({ reports, isLoading = false, onAction, onClearFilters }) {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (reports.length === 0) {
    return (
      <EmptyState
        icon={FlaskConical}
        title="No laboratory reports found."
        description="No laboratory reports match your current filters."
        action={
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <Table className="min-w-[1250px]">
          <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
            <TableRow className="hover:bg-transparent">
              {columnLabels.map((label) => (
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
            {reports.map((report, index) => {
              const patient = getPatientById(report.patientId);
              return (
                <TableRow
                  key={report.id}
                  className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
                >
                  <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{report.id}</TableCell>
                  <TableCell className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarFallback className="bg-sky-100 text-sky-600">
                          {getInitials(patient?.name ?? '—')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">{patient?.name ?? 'Unknown patient'}</p>
                        <p className="font-mono text-[11px] text-slate-400">{report.patientId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{report.patientId}</TableCell>
                  <TableCell className="px-4 py-3.5 text-slate-600">{report.testName}</TableCell>
                  <TableCell className="px-4 py-3.5 text-slate-600">{report.requestedDate}</TableCell>
                  <TableCell className="px-4 py-3.5 text-slate-600">{report.sampleDate || '—'}</TableCell>
                  <TableCell className="px-4 py-3.5 text-slate-600">{report.reportDate || '—'}</TableCell>
                  <TableCell className="px-4 py-3.5">
                    <LabResultStatusBadge status={report.resultStatus} />
                  </TableCell>
                  <TableCell className="px-4 py-3.5">
                    <LabReportStatusBadge status={report.reportStatus} />
                  </TableCell>
                  <TableCell className="px-4 py-3.5 pr-5 text-right">
                    <LabReportActionsMenu report={report} onAction={onAction} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {reports.map((report) => (
          <LabReportCard key={report.id} report={report} onAction={onAction} />
        ))}
      </div>
    </>
  );
}
