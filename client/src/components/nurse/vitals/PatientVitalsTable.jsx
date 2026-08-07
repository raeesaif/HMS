import { TriangleAlert, UsersRound } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { VitalStatusBadge } from './VitalStatusBadge';
import { VitalsActionsMenu } from './VitalsActionsMenu';
import { getVitalAlerts } from './vitalsAlerts';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const columnLabels = [
  'Patient ID',
  'Patient Name',
  'Assigned Doctor',
  'Ward',
  'Bed Number',
  'Last Updated',
  'Blood Pressure',
  'Heart Rate',
  'Temperature',
  'Respiratory Rate',
  'SpO₂',
  'Condition',
  'Actions',
];

export function PatientVitalsTable({
  patients,
  onAction,
  emptyTitle = 'No patients require vitals monitoring.',
  emptyDescription = 'Adjust your search or filters to see more results.',
}) {
  if (patients.length === 0) {
    return <EmptyState icon={UsersRound} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-x-auto">
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
          {patients.map((patient, index) => {
            const hasAlerts = getVitalAlerts(patient.vitals).length > 0;
            return (
              <TableRow
                key={patient.id}
                className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
              >
                <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{patient.id}</TableCell>
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(patient.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-slate-900">{patient.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.doctor}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.ward}</TableCell>
                <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{patient.bed}</TableCell>
                <TableCell className="px-4 py-3.5 text-xs text-slate-500">{patient.lastUpdated}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.vitals.bp}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.vitals.hr}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.vitals.temp}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.vitals.rr}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.vitals.spo2}</TableCell>
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <VitalStatusBadge condition={patient.condition} />
                    {hasAlerts && <TriangleAlert className="size-3.5 text-amber-500" aria-label="Abnormal reading" />}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 pr-5 text-right">
                  <VitalsActionsMenu patient={patient} onAction={onAction} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
