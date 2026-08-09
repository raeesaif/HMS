import { CalendarSearch } from 'lucide-react';
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
import { AppointmentStatusBadge } from './AppointmentStatusBadge';
import { AppointmentTypeBadge } from './AppointmentTypeBadge';
import { AppointmentActionsMenu } from './AppointmentActionsMenu';
import { AppointmentCard } from './AppointmentCard';
import { TableSkeleton } from './LoadingSkeleton';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const columnLabels = [
  'Appointment ID',
  'Patient',
  'Patient ID',
  'Age / Gender',
  'Time',
  'Type',
  'Department',
  'Status',
  'Actions',
];

export function AppointmentTable({ appointments, isLoading = false, onAction, onClearFilters }) {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (appointments.length === 0) {
    return (
      <EmptyState
        icon={CalendarSearch}
        title="No appointments found."
        description="There are no appointments matching your selected filters."
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
            {appointments.map((appt, index) => (
              <TableRow
                key={appt.id}
                className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
              >
                <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{appt.id}</TableCell>
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-sky-100 text-sky-600">
                        {getInitials(appt.patientName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">{appt.patientName}</p>
                      <p className="font-mono text-[11px] text-slate-400">{appt.patientId}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{appt.patientId}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">
                  {appt.age} / {appt.gender}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{appt.time}</TableCell>
                <TableCell className="px-4 py-3.5">
                  <AppointmentTypeBadge type={appt.type} />
                </TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{appt.department}</TableCell>
                <TableCell className="px-4 py-3.5">
                  <AppointmentStatusBadge status={appt.status} />
                </TableCell>
                <TableCell className="px-4 py-3.5 pr-5 text-right">
                  <AppointmentActionsMenu appointment={appt} onAction={onAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} onAction={onAction} />
        ))}
      </div>
    </>
  );
}
