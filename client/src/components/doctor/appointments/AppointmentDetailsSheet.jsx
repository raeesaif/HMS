import { FileText, Pill, Play, TestTube, UserRound } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentStatusBadge } from './AppointmentStatusBadge';
import { AppointmentTypeBadge } from './AppointmentTypeBadge';

const CLOSED_STATUSES = ['Completed', 'Cancelled', 'No Show'];

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

function HistoryList({ items, renderItem, emptyLabel }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>;
  }
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export function AppointmentDetailsSheet({ appointment, open, onOpenChange, onAction }) {
  if (!appointment) return null;

  const isClosed = CLOSED_STATUSES.includes(appointment.status);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-sky-100 text-sky-600">
                {getInitials(appointment.patientName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{appointment.patientName}</SheetTitle>
              <SheetDescription>
                {appointment.patientId} · {appointment.age} yrs · {appointment.gender}
              </SheetDescription>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <AppointmentTypeBadge type={appointment.type} />
            <AppointmentStatusBadge status={appointment.status} />
          </div>
        </SheetHeader>

        <Section title="Appointment information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Appointment ID" value={appointment.id} />
            <InfoField label="Date" value={appointment.date} />
            <InfoField label="Time" value={appointment.time} />
            <InfoField label="Appointment type" value={appointment.type} />
            <InfoField label="Department" value={appointment.department} />
            <InfoField label="Status" value={appointment.status} />
          </div>
          {appointment.assignedNurse && <InfoField label="Assigned nurse" value={appointment.assignedNurse} />}
        </Section>

        <Section title="Patient information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Patient name" value={appointment.patientName} />
            <InfoField label="Patient ID" value={appointment.patientId} />
            <InfoField label="Age" value={appointment.age} />
            <InfoField label="Gender" value={appointment.gender} />
            <InfoField label="Blood group" value={appointment.bloodGroup} />
            <InfoField label="Phone number" value={appointment.phone} />
          </div>
        </Section>

        <Section title="Clinical information">
          <InfoField label="Reason for visit" value={appointment.reasonForVisit} />
          <div className="mt-3">
            <InfoField label="Previous diagnosis" value={appointment.previousDiagnosis} />
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-500">Allergies</p>
            {appointment.allergies.length > 0 ? (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {appointment.allergies.map((allergy) => (
                  <span key={allergy} className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
                    {allergy}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-0.5 text-sm font-medium text-slate-900">No known allergies</p>
            )}
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-500">Current medications</p>
            {appointment.currentMedications.length > 0 ? (
              <ul className="mt-1.5 space-y-1.5">
                {appointment.currentMedications.map((med) => (
                  <li key={med.name} className="text-sm text-slate-900">
                    {med.name} <span className="text-slate-500">· {med.dosage}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-0.5 text-sm font-medium text-slate-900">No active medications</p>
            )}
          </div>
          <div className="mt-3">
            <InfoField label="Relevant medical history" value={appointment.relevantHistory} />
          </div>
        </Section>

        <Section title="Patient medical history">
          <Tabs defaultValue="visits">
            <TabsList className="w-full">
              <TabsTrigger value="visits">Visits</TabsTrigger>
              <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="labs">Lab Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="visits" className="mt-3">
              <HistoryList
                items={appointment.medicalHistory.previousVisits}
                emptyLabel="No previous visits recorded."
                renderItem={(visit) => (
                  <>
                    <p className="font-medium text-slate-900">{visit.reason}</p>
                    <p className="text-xs text-slate-500">{visit.date}</p>
                  </>
                )}
              />
            </TabsContent>
            <TabsContent value="diagnoses" className="mt-3">
              <HistoryList
                items={appointment.medicalHistory.previousDiagnoses}
                emptyLabel="No previous diagnoses recorded."
                renderItem={(entry) => (
                  <>
                    <p className="font-medium text-slate-900">{entry.diagnosis}</p>
                    <p className="text-xs text-slate-500">{entry.date}</p>
                  </>
                )}
              />
            </TabsContent>
            <TabsContent value="prescriptions" className="mt-3">
              <HistoryList
                items={appointment.medicalHistory.previousPrescriptions}
                emptyLabel="No previous prescriptions recorded."
                renderItem={(entry) => (
                  <>
                    <p className="font-medium text-slate-900">{entry.medication}</p>
                    <p className="text-xs text-slate-500">{entry.date}</p>
                  </>
                )}
              />
            </TabsContent>
            <TabsContent value="labs" className="mt-3">
              <HistoryList
                items={appointment.medicalHistory.previousLabReports}
                emptyLabel="No previous lab reports recorded."
                renderItem={(entry) => (
                  <>
                    <p className="font-medium text-slate-900">{entry.test}</p>
                    <p className="text-xs text-slate-500">{entry.result} · {entry.date}</p>
                  </>
                )}
              />
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Quick actions">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => onAction('view-medical-records', appointment)}>
              <FileText /> Medical Records
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction('create-prescription', appointment)}>
              <Pill /> Create Prescription
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction('request-lab-test', appointment)}>
              <TestTube /> Request Lab Test
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction('schedule-follow-up', appointment)}>
              <UserRound /> Schedule Follow-up
            </Button>
          </div>
        </Section>

        <SheetFooter className="border-t border-slate-200">
          <Button disabled={isClosed} onClick={() => onAction('start-consultation', appointment)}>
            <Play /> Start Consultation
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
