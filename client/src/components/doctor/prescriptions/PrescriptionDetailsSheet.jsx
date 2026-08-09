import { Download, HeartPulse, Printer } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { getPatientById } from '@/data/doctorPatients';
import { doctorProfile } from '@/data/doctor';
import { PrescriptionStatusBadge } from './PrescriptionStatusBadge';
import { MedicineRow } from './MedicineRow';
import { PrescriptionHistory } from './PrescriptionHistory';

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

export function PrescriptionDetailsSheet({
  prescription,
  history = [],
  open,
  onOpenChange,
  onAction,
  onSelectHistory,
}) {
  if (!prescription) return null;

  const patient = getPatientById(prescription.patientId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-600">
              <HeartPulse className="size-5" />
              <span className="text-sm font-semibold">MediCore Hospital</span>
            </div>
            <PrescriptionStatusBadge status={prescription.status} />
          </div>
          <SheetTitle className="mt-1">{prescription.id}</SheetTitle>
          <SheetDescription>{prescription.date}</SheetDescription>
        </SheetHeader>

        <Section title="Doctor information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Doctor name" value={prescription.finalizedBy || prescription.createdBy} />
            <InfoField label="Department" value={doctorProfile.department} />
          </div>
        </Section>

        <Section title="Patient information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Patient name" value={patient?.name} />
            <InfoField label="Patient ID" value={prescription.patientId} />
            <InfoField label="Age" value={patient?.age} />
            <InfoField label="Gender" value={patient?.gender} />
          </div>
          <div className="mt-3">
            <InfoField label="Diagnosis" value={prescription.diagnosis} />
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-500">Allergies</p>
            {patient?.allergies?.length > 0 ? (
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

        <Section title="Medication list">
          {prescription.medicines.length > 0 ? (
            <div className="space-y-2">
              {prescription.medicines.map((medicine, index) => (
                <MedicineRow key={medicine.id ?? index} medicine={medicine} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No medicines recorded.</p>
          )}
        </Section>

        <Section title="Doctor notes">
          <InfoField label="Clinical notes" value={prescription.clinicalNotes} />
          <div className="mt-3">
            <InfoField label="Treatment plan" value={prescription.treatmentPlan} />
          </div>
        </Section>

        <Section title="Follow-up">
          {prescription.followUpRequired ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <InfoField label="Follow-up date" value={prescription.followUpDate} />
              <InfoField label="Instructions" value={prescription.followUpInstructions} />
            </div>
          ) : (
            <p className="text-sm text-slate-500">No follow-up required.</p>
          )}
        </Section>

        <Section title="Audit information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Created by" value={prescription.createdBy} />
            <InfoField label="Created at" value={prescription.createdAt} />
            <InfoField label="Last updated" value={prescription.lastUpdated} />
            <InfoField label="Finalized at" value={prescription.finalizedAt} />
            <InfoField label="Finalized by" value={prescription.finalizedBy} />
          </div>
        </Section>

        <div className="px-5 py-4">
          <PrescriptionHistory prescriptions={history} onSelect={onSelectHistory} />
        </div>

        <SheetFooter className="flex-row justify-end gap-2 border-t border-slate-200">
          <Button variant="outline" onClick={() => onAction('print-prescription', prescription)}>
            <Printer /> Print
          </Button>
          <Button variant="outline" onClick={() => onAction('download-prescription', prescription)}>
            <Download /> Download
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
