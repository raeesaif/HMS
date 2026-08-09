import { FileWarning } from 'lucide-react';
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
import { PrescriptionStatusBadge } from './PrescriptionStatusBadge';
import { PrescriptionActionsMenu } from './PrescriptionActionsMenu';
import { PrescriptionCard } from './PrescriptionCard';
import { TableSkeleton } from './LoadingSkeleton';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function getDurationSummary(medicines) {
  if (!medicines || medicines.length === 0) return '—';
  const durations = new Set(medicines.map((med) => med.duration).filter(Boolean));
  if (durations.size === 0) return '—';
  if (durations.size === 1) return [...durations][0];
  return 'Multiple';
}

const columnLabels = [
  'Prescription ID',
  'Patient',
  'Patient ID',
  'Date',
  'Medicines',
  'Duration',
  'Status',
  'Follow-up Date',
  'Actions',
];

export function PrescriptionTable({ prescriptions, isLoading = false, onAction, onClearFilters }) {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (prescriptions.length === 0) {
    return (
      <EmptyState
        icon={FileWarning}
        title="No prescriptions found."
        description="No prescriptions match your current filters."
        action={
          <Button size="sm" onClick={onClearFilters}>
            Create Prescription
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <Table className="min-w-[1150px]">
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
            {prescriptions.map((prescription, index) => {
              const patient = getPatientById(prescription.patientId);
              return (
                <TableRow
                  key={prescription.id}
                  className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
                >
                  <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">
                    {prescription.id}
                  </TableCell>
                  <TableCell className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarFallback className="bg-sky-100 text-sky-600">
                          {getInitials(patient?.name ?? '—')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">{patient?.name ?? 'Unknown patient'}</p>
                        <p className="font-mono text-[11px] text-slate-400">{prescription.patientId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">
                    {prescription.patientId}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-slate-600">{prescription.date}</TableCell>
                  <TableCell className="px-4 py-3.5 text-slate-600">{prescription.medicines.length}</TableCell>
                  <TableCell className="px-4 py-3.5 text-slate-600">
                    {getDurationSummary(prescription.medicines)}
                  </TableCell>
                  <TableCell className="px-4 py-3.5">
                    <PrescriptionStatusBadge status={prescription.status} />
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-slate-600">{prescription.followUpDate || '—'}</TableCell>
                  <TableCell className="px-4 py-3.5 pr-5 text-right">
                    <PrescriptionActionsMenu prescription={prescription} onAction={onAction} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {prescriptions.map((prescription) => (
          <PrescriptionCard key={prescription.id} prescription={prescription} onAction={onAction} />
        ))}
      </div>
    </>
  );
}
