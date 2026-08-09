import { CalendarX2, Receipt } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState } from '@/shared/EmptyState';
import { PatientAvatar } from '@/components/reception/PatientAvatar';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { appointmentStatusMap, invoiceStatusMap } from '@/components/reception/statusMaps';
import { appointments } from '@/data/receptionistAppointments';
import { invoices } from '@/data/receptionistBilling';
import { getDoctorById } from '@/data/receptionistDoctors';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function PatientDetailsDialog({ patient, open, onOpenChange }) {
  if (!patient) return null;

  const patientAppointments = appointments.filter((appointment) => appointment.patientId === patient.id);
  const patientInvoices = invoices.filter((invoice) => invoice.patientId === patient.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <PatientAvatar name={patient.name} size="size-12" />
            <div>
              <DialogTitle>{patient.name}</DialogTitle>
              <DialogDescription>
                {patient.id} · {patient.age} yrs · {patient.gender}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointment History</TabsTrigger>
            <TabsTrigger value="billing">Billing Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <InfoField label="Date of Birth" value={patient.dateOfBirth} />
              <InfoField label="Blood Group" value={patient.bloodGroup} />
              <InfoField label="Phone" value={patient.phone} />
              <InfoField label="Email" value={patient.email} />
              <InfoField label="Identification" value={patient.identification} />
              <InfoField label="Last Visit" value={patient.lastVisit} />
              <InfoField label="Registered On" value={patient.registeredOn} />
              <InfoField label="Status" value={patient.status} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Address</p>
              <p className="mt-0.5 text-sm font-medium text-slate-900">{patient.address}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs font-medium text-slate-500">Emergency Contact</p>
              <p className="mt-1 text-sm text-slate-900">
                {patient.emergencyContact?.name} ({patient.emergencyContact?.relationship}) · {patient.emergencyContact?.phone}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="pt-4">
            {patientAppointments.length === 0 ? (
              <EmptyState icon={CalendarX2} title="No appointment history" description="This patient has no recorded appointments." />
            ) : (
              <div className="space-y-2">
                {patientAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {getDoctorById(appointment.doctorId)?.name ?? 'Unknown Doctor'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {appointment.date} · {appointment.time} · {appointment.type}
                      </p>
                    </div>
                    <StatusBadge status={appointment.status} map={appointmentStatusMap} />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="billing" className="pt-4">
            {patientInvoices.length === 0 ? (
              <EmptyState icon={Receipt} title="No billing records" description="This patient has no invoices on file." />
            ) : (
              <div className="space-y-2">
                {patientInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{invoice.service}</p>
                      <p className="text-xs text-slate-500">
                        {invoice.id} · {invoice.date} · PKR {invoice.total.toLocaleString()}
                      </p>
                    </div>
                    <StatusBadge status={invoice.status} map={invoiceStatusMap} />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
