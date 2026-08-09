import { CalendarDays, FileText, NotebookPen, Pill, TestTube, UserRound } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PatientStatusBadge } from './PatientStatusBadge';
import { PatientMedicalSummary } from './PatientMedicalSummary';
import { PatientVitalsCard } from './PatientVitalsCard';
import { PatientTimeline } from './PatientTimeline';

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

export function PatientDetailsSheet({ patient, open, onOpenChange, onAction }) {
  if (!patient) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{patient.name}</SheetTitle>
              <SheetDescription>
                {patient.id} · {patient.age} yrs · {patient.gender} · {patient.bloodGroup}
              </SheetDescription>
            </div>
          </div>
          <PatientStatusBadge status={patient.status} className="mt-2 w-fit" />
        </SheetHeader>

        <Section title="Contact information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Phone" value={patient.phone} />
            <InfoField label="Email" value={patient.email} />
            <InfoField label="Address" value={patient.address} />
            <InfoField label="Emergency contact" value={patient.emergencyContact} />
          </div>
        </Section>

        <Section title="Doctor information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Assigned doctor" value={patient.assignedDoctor} />
            <InfoField label="Department" value={patient.department} />
            <InfoField label="First visit" value={patient.firstVisit} />
            <InfoField label="Last visit" value={patient.lastVisit} />
            <InfoField label="Next appointment" value={patient.nextAppointment} />
            <InfoField label="Ward" value={patient.ward} />
          </div>
        </Section>

        <div className="px-5 pt-4">
          <PatientMedicalSummary patient={patient} />
        </div>

        <div className="px-5 pt-4">
          <PatientVitalsCard vitals={patient.vitals} />
          <button
            type="button"
            onClick={() => onAction('view-medical-records', patient)}
            className="mt-2 text-xs font-medium text-sky-600 hover:text-sky-700 hover:underline"
          >
            View full medical history →
          </button>
        </div>

        <div className="px-5 py-4">
          <PatientTimeline items={patient.timeline} />
        </div>

        <Section title="Quick actions">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => onAction('view-medical-records', patient)}>
              <FileText /> Medical Records
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction('create-prescription', patient)}>
              <Pill /> Create Prescription
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction('request-lab-test', patient)}>
              <TestTube /> Request Lab Test
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction('view-lab-reports', patient)}>
              <TestTube /> View Lab Reports
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction('view-appointments', patient)}>
              <CalendarDays /> View Appointments
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction('schedule-follow-up', patient)}>
              <UserRound /> Schedule Follow-up
            </Button>
          </div>
        </Section>

        <SheetFooter className="border-t border-slate-200">
          <Button onClick={() => onAction('add-clinical-note', patient)}>
            <NotebookPen /> Add Clinical Note
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
