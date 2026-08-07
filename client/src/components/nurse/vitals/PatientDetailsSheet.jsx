import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { VitalStatusBadge } from './VitalStatusBadge';
import { VitalAlerts } from './VitalAlerts';

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

export function PatientDetailsSheet({ patient, open, onOpenChange }) {
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
          <VitalStatusBadge condition={patient.condition} className="mt-2 w-fit" />
        </SheetHeader>

        <Section title="Patient information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Age" value={patient.age} />
            <InfoField label="Gender" value={patient.gender} />
            <InfoField label="Blood group" value={patient.bloodGroup} />
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
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-800">
              {patient.medications.map((medication) => (
                <li key={medication}>{medication}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No active medications.</p>
          )}
        </Section>

        <Section title="Vitals alerts">
          <VitalAlerts vitals={patient.vitals} />
        </Section>
      </SheetContent>
    </Sheet>
  );
}
