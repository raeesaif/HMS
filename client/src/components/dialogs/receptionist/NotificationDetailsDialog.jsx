import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { PriorityBadge } from '@/components/reception/PriorityBadge';
import { notificationTypeMap } from '@/components/reception/statusMaps';

const typeToRoute = {
  Appointment: '/reception/appointments',
  Patient: '/reception/patients',
  'Check-in': '/reception/check-ins',
  Queue: '/reception/queue',
  Bed: '/reception/beds',
  Emergency: '/reception/emergency',
  Billing: '/reception/billing',
  System: null,
};

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function NotificationDetailsDialog({ open, onOpenChange, notification, onNavigate }) {
  if (!notification) return null;

  const route = typeToRoute[notification.type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={notification.type} map={notificationTypeMap} />
            <PriorityBadge priority={notification.priority} />
          </div>
          <DialogTitle>{notification.title}</DialogTitle>
          <DialogDescription>{notification.message}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Timestamp" value={notification.timestamp} />
          <InfoField label="Related Reference" value={notification.relatedId} />
          <InfoField label="Current Status" value={notification.isRead ? 'Read' : 'Unread'} />
        </div>

        <DialogFooter className="justify-end">
          {route && (
            <Button variant="outline" onClick={() => onNavigate(route)}>
              View Details
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
