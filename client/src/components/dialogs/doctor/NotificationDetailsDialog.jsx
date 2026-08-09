import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getPatientById } from '@/data/doctorPatients';
import { NotificationTypeBadge } from '@/components/doctor/notifications/NotificationTypeBadge';
import { NotificationPriorityBadge } from '@/components/doctor/notifications/NotificationPriorityBadge';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
const formatTime = (iso) => new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

export function NotificationDetailsDialog({ open, onOpenChange, notification, onNavigate }) {
  if (!notification) return null;

  const patient = notification.patientId ? getPatientById(notification.patientId) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <NotificationTypeBadge type={notification.type} />
            <NotificationPriorityBadge priority={notification.priority} />
          </div>
          <DialogTitle>{notification.title}</DialogTitle>
          <DialogDescription>{notification.message}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Created Date" value={formatDate(notification.createdAt)} />
          <InfoField label="Created Time" value={formatTime(notification.createdAt)} />
          <InfoField label="Related Patient" value={patient?.name} />
          <InfoField label="Related Appointment" value={notification.appointmentId} />
          <InfoField label="Related Lab Report" value={notification.labReportId} />
          <InfoField label="Related Prescription" value={notification.prescriptionId} />
          <InfoField label="Related Task" value={notification.taskId} />
          <InfoField label="Created By" value={notification.createdBy} />
          <InfoField label="Current Status" value={notification.isRead ? 'Read' : 'Unread'} />
        </div>

        <DialogFooter className="flex-wrap justify-end gap-2">
          {notification.labReportId && (
            <Button variant="outline" onClick={() => onNavigate('/doctor/lab-reports')}>
              View Lab Report
            </Button>
          )}
          {notification.prescriptionId && (
            <Button variant="outline" onClick={() => onNavigate('/doctor/prescriptions')}>
              View Prescription
            </Button>
          )}
          {notification.appointmentId && (
            <Button variant="outline" onClick={() => onNavigate('/doctor/appointments')}>
              View Appointment
            </Button>
          )}
          {!notification.labReportId && !notification.prescriptionId && !notification.appointmentId && notification.patientId && (
            <Button variant="outline" onClick={() => onNavigate('/doctor/patients')}>
              View Patient
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
