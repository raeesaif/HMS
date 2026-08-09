import { CalendarX2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { PatientAvatar } from '@/components/reception/PatientAvatar';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { PriorityBadge } from '@/components/reception/PriorityBadge';
import { appointmentStatusMap } from '@/components/reception/statusMaps';
import { AppointmentsActionsMenu } from './AppointmentsActionsMenu';

const columns = ['Appointment ID', 'Patient', 'Doctor', 'Department', 'Date', 'Time', 'Type', 'Priority', 'Status', ''];

export function AppointmentsTable({ appointments, onAction, onClearFilters }) {
  if (appointments.length === 0) {
    return (
      <EmptyState
        icon={CalendarX2}
        title="No appointments found"
        description="Try adjusting your search or filters."
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
      <Table className="min-w-[1080px]">
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
          {appointments.map((appointment, index) => (
            <TableRow key={appointment.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{appointment.id}</TableCell>
              <TableCell className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <PatientAvatar name={appointment.patientName} size="size-8" />
                  <span className="text-sm font-medium text-slate-900">{appointment.patientName}</span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{appointment.doctorName}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{appointment.department}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{appointment.date}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{appointment.time}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{appointment.type}</TableCell>
              <TableCell className="px-4 py-3.5">
                <PriorityBadge priority={appointment.priority} />
              </TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={appointment.status} map={appointmentStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <AppointmentsActionsMenu appointment={appointment} onAction={onAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
