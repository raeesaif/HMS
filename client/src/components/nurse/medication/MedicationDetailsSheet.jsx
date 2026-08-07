import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MedicationStatusBadge } from './MedicationStatusBadge';
import { MedicationAlerts } from './MedicationAlerts';

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

export function MedicationDetailsSheet({ medication, open, onOpenChange }) {
  if (!medication) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-sky-100 text-sky-600">
                {getInitials(medication.patientName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{medication.patientName}</SheetTitle>
              <SheetDescription>
                {medication.patientId} · {medication.ward} · Bed {medication.bed}
              </SheetDescription>
            </div>
          </div>
          <MedicationStatusBadge status={medication.status} className="mt-2 w-fit" />
        </SheetHeader>

        <Section title="Patient information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Age" value={medication.age} />
            <InfoField label="Gender" value={medication.gender} />
            <InfoField label="Ward" value={medication.ward} />
            <InfoField label="Bed number" value={medication.bed} />
            <InfoField label="Assigned doctor" value={medication.doctor} />
            <InfoField label="Current diagnosis" value={medication.diagnosis} />
          </div>
        </Section>

        <Section title="Medicine information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Medicine name" value={medication.medicineName} />
            <InfoField label="Generic name" value={medication.genericName} />
            <InfoField label="Dosage" value={medication.dosage} />
            <InfoField label="Frequency" value={medication.frequency} />
            <InfoField label="Route" value={medication.route} />
            <InfoField label="Start date" value={medication.startDate} />
            <InfoField label="End date" value={medication.endDate} />
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-500">Special instructions</p>
            <p className="mt-0.5 text-sm font-medium text-slate-900">{medication.specialInstructions || '—'}</p>
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-500">Allergies</p>
            {medication.allergies.length > 0 ? (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {medication.allergies.map((allergy) => (
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

        <Section title="Alerts">
          <MedicationAlerts medication={medication} />
        </Section>
      </SheetContent>
    </Sheet>
  );
}
