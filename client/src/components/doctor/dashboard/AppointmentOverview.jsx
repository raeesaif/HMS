import { CalendarClock, CalendarX2, Eye, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AppointmentStatusBadge } from './StatusBadge';
import { EmptyState } from '@/shared/EmptyState';
import { TableSkeleton } from './LoadingSkeleton';

export function AppointmentOverview({
  appointments = [],
  isLoading = false,
  onViewPatient,
  onStartConsultation,
  onViewAppointment,
  onViewAll,
}) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold">Today&apos;s Appointments</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">{appointments.length} appointments scheduled today</p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All Appointments
        </Button>
      </CardHeader>

      {isLoading ? (
        <TableSkeleton rows={5} cols={7} />
      ) : appointments.length === 0 ? (
        <EmptyState
          icon={CalendarX2}
          title="No appointments today"
          description="You're all caught up — enjoy the calm."
        />
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[920px]">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-auto px-5 py-3 text-[11px] font-medium text-slate-500">TIME</TableHead>
                <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">PATIENT</TableHead>
                <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">ID</TableHead>
                <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">AGE / GENDER</TableHead>
                <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">TYPE</TableHead>
                <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">STATUS</TableHead>
                <TableHead className="h-auto px-5 py-3 text-right text-[11px] font-medium text-slate-500">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appt, index) => (
                <TableRow
                  key={appt.id}
                  className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
                >
                  <TableCell className="px-5 py-3.5 text-sm font-medium text-slate-900">{appt.time}</TableCell>
                  <TableCell className="px-4 py-3.5 text-sm text-slate-900">{appt.patientName}</TableCell>
                  <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{appt.patientId}</TableCell>
                  <TableCell className="px-4 py-3.5 text-xs text-slate-500">
                    {appt.age} / {appt.gender}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-xs text-slate-500">{appt.type}</TableCell>
                  <TableCell className="px-4 py-3.5">
                    <AppointmentStatusBadge status={appt.status} />
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="View Patient"
                        aria-label="View Patient"
                        onClick={() => onViewPatient?.(appt)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="Start Consultation"
                        aria-label="Start Consultation"
                        onClick={() => onStartConsultation?.(appt)}
                      >
                        <Play className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="View Appointment"
                        aria-label="View Appointment"
                        onClick={() => onViewAppointment?.(appt)}
                      >
                        <CalendarClock className="size-4" />
                      </Button>
                    </div>
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
