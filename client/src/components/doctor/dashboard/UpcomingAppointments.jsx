import { CalendarClock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';
import { CardListSkeleton } from './LoadingSkeleton';

function UpcomingAppointmentRow({ appointment }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
          <CalendarClock className="size-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{appointment.patientName}</p>
          <p className="text-xs text-slate-500">
            {appointment.type} · {appointment.department}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-slate-900">{appointment.time}</p>
        <Badge variant="outline" className="mt-1 border-transparent bg-sky-50 text-sky-600">
          {appointment.status}
        </Badge>
      </div>
    </div>
  );
}

export function UpcomingAppointments({ appointments = [], isLoading = false }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Upcoming Appointments</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Next scheduled visits</p>
      </CardHeader>
      <CardContent className="space-y-2.5 px-5 py-5">
        {isLoading ? (
          <CardListSkeleton count={3} />
        ) : appointments.length === 0 ? (
          <EmptyState
            icon={CalendarClock}
            title="No upcoming appointments"
            description="Nothing scheduled beyond today yet."
          />
        ) : (
          appointments.map((appointment) => (
            <UpcomingAppointmentRow key={appointment.id} appointment={appointment} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
