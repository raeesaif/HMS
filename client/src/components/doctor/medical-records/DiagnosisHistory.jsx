import { ClipboardList } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { DiagnosisStatusBadge } from './RecordBadges';
import { TableSkeleton } from './LoadingSkeleton';

export function DiagnosisHistory({ diagnoses, isLoading = false }) {
  if (isLoading) {
    return <TableSkeleton cols={6} />;
  }

  if (diagnoses.length === 0) {
    return (
      <EmptyState icon={ClipboardList} title="No diagnoses recorded" description="No diagnosis history found for this patient." />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {['Diagnosis', 'Type', 'Date Diagnosed', 'Doctor', 'Status', 'Notes'].map((label) => (
              <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {diagnoses.map((diagnosis, index) => (
            <TableRow
              key={diagnosis.id}
              className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
            >
              <TableCell className="px-4 py-3.5 pl-5 font-medium text-slate-900">{diagnosis.diagnosis}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{diagnosis.type}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{diagnosis.dateDiagnosed}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{diagnosis.doctor}</TableCell>
              <TableCell className="px-4 py-3.5">
                <DiagnosisStatusBadge status={diagnosis.status} />
              </TableCell>
              <TableCell className="max-w-[220px] truncate px-4 py-3.5 pr-5 text-slate-600" title={diagnosis.notes}>
                {diagnosis.notes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
