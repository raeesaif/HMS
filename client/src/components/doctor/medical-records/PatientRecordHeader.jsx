import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PatientStatusBadge } from '@/components/doctor/patients/PatientStatusBadge';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function PatientRecordHeader({ patient }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="px-5 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-sky-100 text-base text-sky-600">{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold text-slate-900">{patient.name}</p>
              <p className="text-xs text-slate-500">
                {patient.id} · {patient.age} yrs · {patient.gender} · {patient.bloodGroup}
              </p>
            </div>
          </div>
          <PatientStatusBadge status={patient.status} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-100 pt-4 sm:grid-cols-3 lg:grid-cols-4">
          <InfoField label="Phone Number" value={patient.phone} />
          <InfoField label="Assigned Doctor" value={patient.assignedDoctor} />
          <InfoField label="Department" value={patient.department} />
          <InfoField label="Ward" value={patient.ward} />
          <InfoField label="Last Visit" value={patient.lastVisit} />
          <InfoField label="Next Appointment" value={patient.nextAppointment} />
        </div>
      </CardContent>
    </Card>
  );
}
