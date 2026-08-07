import { UsersRound } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ConditionBadge } from '@/shared/NurseDashboardComponents';
import { EmptyState } from '@/shared/EmptyState';
import { conditionStyles } from '@/data/nursePatients';
import { PatientActionsMenu } from './PatientActionsMenu';

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
  'Age / Gender',
  'Ward / Bed',
  'Assigned Doctor',
  'Diagnosis',
  'Condition',
  'Last Vitals',
  'Medication Time',
  'Admission Date',
  'Actions',
];

export function AssignedPatientsTable({
  patients,
  onAction,
  emptyTitle = 'No assigned patients found',
  emptyDescription = 'No patients match your current search or filter. Try adjusting the filters above.',
}) {
  if (patients.length === 0) {
    return <EmptyState icon={UsersRound} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1100px]">
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
          {patients.map((patient, index) => (
            <TableRow
              key={patient.id}
              className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
            >
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{patient.id}</TableCell>
              <TableCell className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    <AvatarFallback className="bg-sky-100 text-sky-600">
                      {getInitials(patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-slate-900">{patient.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">
                {patient.age} / {patient.gender[0]}
              </TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">
                {patient.ward} · {patient.bed}
              </TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{patient.doctor}</TableCell>
              <TableCell className="max-w-[180px] truncate px-4 py-3.5 text-slate-600" title={patient.diagnosis}>
                {patient.diagnosis}
              </TableCell>
              <TableCell className="px-4 py-3.5">
                <ConditionBadge condition={patient.condition} style={conditionStyles[patient.condition]} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">
                <p>BP: {patient.vitals.bp}</p>
                <p>Temp: {patient.vitals.temp}</p>
              </TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{patient.medicationTime}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-500">{patient.admissionDate}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5 text-right">
                <PatientActionsMenu patient={patient} onAction={onAction} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
