import { Eye, Pill } from 'lucide-react';
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
import { PrescriptionStatusBadge } from '@/components/doctor/prescriptions/PrescriptionStatusBadge';
import { TableSkeleton } from './LoadingSkeleton';

export function PrescriptionHistory({ prescriptions, isLoading = false, onViewPrescription }) {
  if (isLoading) {
    return <TableSkeleton cols={7} />;
  }

  if (prescriptions.length === 0) {
    return (
      <EmptyState icon={Pill} title="No prescriptions found" description="This patient has no recorded prescriptions yet." />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[850px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {['Prescription ID', 'Date', 'Doctor', 'Medicine Count', 'Status', 'Follow-up Date', 'Actions'].map((label) => (
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
          {prescriptions.map((rx, index) => (
            <TableRow key={rx.id} className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{rx.id}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{rx.date}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{rx.finalizedBy || rx.createdBy}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{rx.medicines.length}</TableCell>
              <TableCell className="px-4 py-3.5">
                <PrescriptionStatusBadge status={rx.status} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{rx.followUpDate || '—'}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5 text-right">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  title="View Prescription"
                  aria-label="View Prescription"
                  onClick={() => onViewPrescription(rx)}
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
