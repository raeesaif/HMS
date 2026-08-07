import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ConditionBadge } from '@/shared/NurseDashboardComponents';
import { conditionStyles } from '@/data/nursePatients';

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

function Section({ title, children }) {
  return (
    <div className="border-t border-slate-200 px-5 py-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function PatientDetailsDrawer({ patient, open, onOpenChange }) {
  if (!patient) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{patient.name}</SheetTitle>
              <SheetDescription>{patient.id} · {patient.ward} · Bed {patient.bed}</SheetDescription>
            </div>
          </div>
          <ConditionBadge condition={patient.condition} style={conditionStyles[patient.condition]} className="mt-2 w-fit" />
        </SheetHeader>

        <Section title="Patient information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Age" value={patient.age} />
            <InfoField label="Gender" value={patient.gender} />
            <InfoField label="Blood group" value={patient.bloodGroup} />
            <InfoField label="Phone number" value={patient.phone} />
            <InfoField label="Emergency contact" value={patient.emergencyContact} />
            <InfoField label="Assigned doctor" value={patient.doctor} />
            <InfoField label="Ward" value={patient.ward} />
            <InfoField label="Bed number" value={patient.bed} />
            <InfoField label="Admission date" value={patient.admissionDate} />
          </div>
        </Section>

        <Section title="Diagnosis & allergies">
          <InfoField label="Diagnosis" value={patient.diagnosis} />
          <div className="mt-3">
            <p className="text-xs text-slate-500">Allergies</p>
            {patient.allergies.length > 0 ? (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {patient.allergies.map((allergy) => (
                  <span key={allergy} className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
                    {allergy}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-0.5 text-sm font-medium text-slate-900">No known allergies</p>
            )}
          </div>
        </Section>

        <Section title="Current medications">
          {patient.medications.length > 0 ? (
            <ul className="space-y-2">
              {patient.medications.map((med) => (
                <li
                  key={med.name}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-900">{med.name}</p>
                    <p className="text-xs text-slate-500">{med.dosage} · {med.time}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      med.status === 'administered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {med.status === 'administered' ? 'Administered' : 'Pending'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No active medications.</p>
          )}
        </Section>

        <Section title="Recent vitals">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Blood pressure" value={patient.vitals.bp} />
            <InfoField label="Heart rate" value={patient.vitals.hr} />
            <InfoField label="Temperature" value={patient.vitals.temp} />
            <InfoField label="Respiratory rate" value={patient.vitals.rr} />
            <InfoField label="SpO2" value={patient.vitals.spo2} />
            <InfoField label="Pain level" value={patient.vitals.painLevel} />
          </div>
          <p className="mt-3 text-xs text-slate-400">Recorded {patient.vitals.recordedAt}</p>
        </Section>

        <Section title="Recent nursing notes">
          {patient.nursingNotes.length > 0 ? (
            <ul className="space-y-3">
              {patient.nursingNotes.map((note) => (
                <li key={note.timestamp} className="rounded-lg border border-slate-200 p-3 text-sm">
                  <p className="text-xs font-medium text-slate-500">{note.author} · {note.timestamp}</p>
                  <p className="mt-1 leading-5 text-slate-800">{note.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No nursing notes recorded yet.</p>
          )}
        </Section>
      </SheetContent>
    </Sheet>
  );
}
