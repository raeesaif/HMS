import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PatientStatusBadge } from './PatientStatusBadge';
import { PatientActionsMenu } from './PatientActionsMenu';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function PatientCard({ patient, onAction }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="space-y-3 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Avatar size="sm">
              <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-slate-900">{patient.name}</p>
              <p className="text-xs text-slate-500">
                {patient.id} · {patient.age} / {patient.gender[0]}
              </p>
            </div>
          </div>
          <PatientActionsMenu patient={patient} onAction={onAction} />
        </div>

        <p className="max-w-full truncate text-xs text-slate-500" title={patient.condition}>
          {patient.condition}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <span>{patient.phone}</span>
          <span aria-hidden>·</span>
          <span>Last visit {patient.lastVisit}</span>
        </div>

        <PatientStatusBadge status={patient.status} />
      </CardContent>
    </Card>
  );
}
