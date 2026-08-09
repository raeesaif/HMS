import { UsersRound } from 'lucide-react';
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
import { PatientStatusBadge } from './PatientStatusBadge';
import { PatientActionsMenu } from './PatientActionsMenu';
import { PatientCard } from './PatientCard';
import { TableSkeleton } from './LoadingSkeleton';

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
  'Age / Gender',
  'Phone',
  'Blood Group',
  'Last Visit',
  'Next Appointment',
  'Condition',
  'Status',
  'Actions',
];

export function PatientTable({ patients, isLoading = false, onAction, onClearFilters }) {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (patients.length === 0) {
    return (
      <EmptyState
        icon={UsersRound}
        title="No patients found."
        description="No patients match your current filters."
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
        <Table className="min-w-[1200px]">
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
                <TableCell className="px-4 py-3.5 pl-5">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-sky-100 text-sky-600">
                        {getInitials(patient.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">{patient.name}</p>
                      <p className="font-mono text-[11px] text-slate-400">{patient.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{patient.id}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">
                  {patient.age} / {patient.gender}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.phone}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.bloodGroup}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.lastVisit}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{patient.nextAppointment ?? '—'}</TableCell>
                <TableCell className="max-w-[200px] truncate px-4 py-3.5 text-slate-600" title={patient.condition}>
                  {patient.condition}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <PatientStatusBadge status={patient.status} />
                </TableCell>
                <TableCell className="px-4 py-3.5 pr-5 text-right">
                  <PatientActionsMenu patient={patient} onAction={onAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} onAction={onAction} />
        ))}
      </div>
    </>
  );
}
