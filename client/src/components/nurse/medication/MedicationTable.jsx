import { Pill, TriangleAlert } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { MedicationStatusBadge } from './MedicationStatusBadge';
import { MedicationActionsMenu } from './MedicationActionsMenu';
import { getMedicationAlerts } from './getMedicationAlerts';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const columnLabels = [
  'Patient',
  'Patient ID',
  'Assigned Doctor',
  'Ward',
  'Medicine Name',
  'Dosage',
  'Route',
  'Scheduled Time',
  'Frequency',
  'Status',
  'Next Dose',
  'Actions',
];

export function MedicationTable({
  medications,
  onAction,
  emptyTitle = 'No medications scheduled.',
  emptyDescription = 'Adjust your search or filters to see more results.',
}) {
  if (medications.length === 0) {
    return <EmptyState icon={Pill} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1300px]">
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
          {medications.map((medication, index) => {
            const hasAlerts = getMedicationAlerts(medication).length > 0;
            return (
              <TableRow
                key={medication.id}
                className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
              >
                <TableCell className="px-4 py-3.5 pl-5">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-sky-100 text-sky-600">
                        {getInitials(medication.patientName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-slate-900">{medication.patientName}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{medication.patientId}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{medication.doctor}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{medication.ward}</TableCell>
                <TableCell className="px-4 py-3.5 font-medium text-slate-900">{medication.medicineName}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{medication.dosage}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{medication.route}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{medication.scheduledTime}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{medication.frequency}</TableCell>
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <MedicationStatusBadge status={medication.status} />
                    {hasAlerts && <TriangleAlert className="size-3.5 text-amber-500" aria-label="Needs attention" />}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-xs text-slate-500">{medication.nextDose}</TableCell>
                <TableCell className="px-4 py-3.5 pr-5 text-right">
                  <MedicationActionsMenu medication={medication} onAction={onAction} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
