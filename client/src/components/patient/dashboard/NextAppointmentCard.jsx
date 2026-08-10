import { CalendarClock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { appointmentStatusMap } from '@/components/patient/statusMaps';

export function NextAppointmentCard({ appointment, onView, onReschedule, onCancel }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-semibold">Upcoming Appointment</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {!appointment ? (
          <EmptyState icon={CalendarClock} title="No upcoming appointments" description="Book an appointment to see it here." />
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">{appointment.doctorName}</p>
                <p className="text-xs text-slate-500">{appointment.specialization} · {appointment.department}</p>
              </div>
              <StatusBadge status={appointment.status} map={appointmentStatusMap} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p className="font-medium text-slate-900">{appointment.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Time</p>
                <p className="font-medium text-slate-900">{appointment.time}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Type</p>
                <p className="font-medium text-slate-900">{appointment.type}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="size-3" /> Location
                </p>
                <p className="font-medium text-slate-900">{appointment.location}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3">
              <Button variant="outline" size="sm" onClick={() => onView(appointment)}>
                View Appointment
              </Button>
              <Button variant="outline" size="sm" onClick={() => onReschedule(appointment)}>
                Reschedule
              </Button>
              <Button variant="outline" size="sm" onClick={() => onCancel(appointment)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
