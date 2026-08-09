import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { AppointmentStatusBadge } from './AppointmentStatusBadge';
import { AppointmentTypeBadge } from './AppointmentTypeBadge';
import { AppointmentActionsMenu } from './AppointmentActionsMenu';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function AppointmentCard({ appointment, onAction }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="space-y-3 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Avatar size="sm">
              <AvatarFallback className="bg-sky-100 text-sky-600">
                {getInitials(appointment.patientName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-slate-900">{appointment.patientName}</p>
              <p className="text-xs text-slate-500">
                {appointment.patientId} · {appointment.age} / {appointment.gender[0]}
              </p>
            </div>
          </div>
          <AppointmentActionsMenu appointment={appointment} onAction={onAction} />
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <span className="font-mono text-slate-400">{appointment.id}</span>
          <span aria-hidden>·</span>
          <span>{appointment.time}</span>
          <span aria-hidden>·</span>
          <span>{appointment.department}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <AppointmentTypeBadge type={appointment.type} />
          <AppointmentStatusBadge status={appointment.status} />
        </div>
      </CardContent>
    </Card>
  );
}
