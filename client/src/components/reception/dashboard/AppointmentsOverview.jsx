import { CalendarX2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { PatientAvatar } from '@/components/reception/PatientAvatar';
import { TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { appointmentStatusMap } from '@/components/reception/statusMaps';

export function AppointmentsOverview({ appointments = [], isLoading = false, onViewAll }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold">Today&apos;s Appointments</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">{appointments.length} appointments scheduled today</p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>

      {isLoading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : appointments.length === 0 ? (
        <EmptyState icon={CalendarX2} title="No appointments today" description="You're all caught up." />
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[720px]">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                {['Patient', 'Doctor', 'Time', 'Type', 'Status'].map((label) => (
                  <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appt, index) => (
                <TableRow key={appt.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                  <TableCell className="px-4 py-3 pl-5">
                    <div className="flex items-center gap-2.5">
                      <PatientAvatar name={appt.patientName} size="size-8" />
                      <span className="text-sm font-medium text-slate-900">{appt.patientName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-600">{appt.doctorName}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-600">{appt.time}</TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{appt.type}</TableCell>
                  <TableCell className="px-4 py-3">
                    <StatusBadge status={appt.status} map={appointmentStatusMap} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
