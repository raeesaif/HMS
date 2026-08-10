import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { activityStatusMap } from '@/components/super-admin/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value ?? '—'}</p>
    </div>
  );
}

export function ActivityDetailsDialog({ log, open, onOpenChange }) {
  if (!log) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <StatusBadge status={log.status} map={activityStatusMap} />
          <DialogTitle>{log.action} — {log.resource}</DialogTitle>
          <DialogDescription>{log.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Timestamp" value={log.timestamp} />
          <InfoField label="User" value={log.userName} />
          <InfoField label="Role" value={log.role} />
          <InfoField label="Hospital" value={log.hospitalName} />
          <InfoField label="Result" value={log.status} />
          {log.ipAddress && <InfoField label="IP Address" value={log.ipAddress} />}
          {log.userAgent && <InfoField label="User Agent" value={log.userAgent} />}
        </div>

        <p className="text-xs text-slate-400">Activity logs are read-only and cannot be edited or deleted.</p>
      </DialogContent>
    </Dialog>
  );
}
