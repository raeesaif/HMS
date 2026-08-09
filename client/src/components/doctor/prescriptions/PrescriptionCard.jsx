import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { getPatientById } from '@/data/doctorPatients';
import { PrescriptionStatusBadge } from './PrescriptionStatusBadge';
import { PrescriptionActionsMenu } from './PrescriptionActionsMenu';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function PrescriptionCard({ prescription, onAction }) {
  const patient = getPatientById(prescription.patientId);

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="space-y-3 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Avatar size="sm">
              <AvatarFallback className="bg-sky-100 text-sky-600">
                {getInitials(patient?.name ?? '—')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-slate-900">{patient?.name ?? 'Unknown patient'}</p>
              <p className="text-xs text-slate-500">
                {prescription.id} · {prescription.date}
              </p>
            </div>
          </div>
          <PrescriptionActionsMenu prescription={prescription} onAction={onAction} />
        </div>

        <p className="max-w-full truncate text-xs text-slate-500" title={prescription.diagnosis}>
          {prescription.diagnosis}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <span>{prescription.medicines.length} medicine(s)</span>
          {prescription.followUpDate && (
            <>
              <span aria-hidden>·</span>
              <span>Follow-up {prescription.followUpDate}</span>
            </>
          )}
        </div>

        <PrescriptionStatusBadge status={prescription.status} />
      </CardContent>
    </Card>
  );
}
