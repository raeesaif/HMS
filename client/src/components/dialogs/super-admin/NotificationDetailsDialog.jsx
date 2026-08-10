import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { notificationStatusMap } from '@/components/super-admin/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value ?? '—'}</p>
    </div>
  );
}

export function NotificationDetailsDialog({ notification, open, onOpenChange }) {
  if (!notification) return null;

  const isAnnouncement = 'recipients' in notification;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          {notification.status && <StatusBadge status={notification.status} map={notificationStatusMap} />}
          <DialogTitle>{notification.title}</DialogTitle>
          <DialogDescription>{notification.message}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Type" value={notification.type} />
          <InfoField label="Priority" value={notification.priority} />
          {isAnnouncement ? (
            <>
              <InfoField label="Recipients" value={notification.recipients} />
              <InfoField label="Channels" value={notification.channels?.join(', ')} />
              <InfoField label="Created" value={notification.createdAt} />
              {notification.scheduledFor && <InfoField label="Scheduled For" value={notification.scheduledFor} />}
            </>
          ) : (
            <InfoField label="Timestamp" value={notification.timestamp} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
