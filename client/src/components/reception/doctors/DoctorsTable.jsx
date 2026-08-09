import { Stethoscope } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { doctorStatusMap } from '@/components/reception/statusMaps';

const columns = ['Doctor', 'Department', 'Specialization', 'Shift', 'Status', 'Patients', 'Next Slot', ''];

export function DoctorsTable({ doctors, onViewSchedule, onViewAppointments, onClearFilters }) {
  if (doctors.length === 0) {
    return (
      <EmptyState
        icon={Stethoscope}
        title="No doctors currently on duty"
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
      <Table className="min-w-[960px]">
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
          {doctors.map((doctor, index) => (
            <TableRow key={doctor.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 text-sm font-medium text-slate-900">{doctor.name}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{doctor.department}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{doctor.specialization}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{doctor.shift}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={doctor.status} map={doctorStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{doctor.currentPatients}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{doctor.nextAvailableSlot}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end gap-1.5">
                  <Button variant="ghost" size="sm" onClick={() => onViewSchedule(doctor)}>
                    Schedule
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onViewAppointments(doctor)}>
                    Appointments
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
