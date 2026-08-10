import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EmptyState } from '@/shared/EmptyState';
import { History } from 'lucide-react';
import { RoleBadge } from '@/components/super-admin/RoleBadge';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { userStatusMap } from '@/components/super-admin/statusMaps';
import { activityLogs } from '@/data/superAdmin/activityLogs';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value ?? '—'}</p>
    </div>
  );
}

export function UserDetailsDialog({ user, open, onOpenChange }) {
  if (!user) return null;

  const userActivity = activityLogs.filter((log) => log.userName === user.name).slice(0, 5);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <RoleBadge role={user.role} />
            <StatusBadge status={user.status} map={userStatusMap} />
          </div>
          <DialogTitle>{user.name}</DialogTitle>
          <DialogDescription>{user.email}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Hospital" value={user.hospitalName} />
          <InfoField label="Created Date" value={user.createdAt} />
          <InfoField label="Last Login" value={user.lastLogin} />
          <InfoField label="Account Status" value={user.status} />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Activity Summary</p>
          {userActivity.length === 0 ? (
            <EmptyState icon={History} title="No recent activity" description="No recorded activity for this user yet." />
          ) : (
            <div className="space-y-1.5">
              {userActivity.map((log) => (
                <div key={log.id} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <p className="text-slate-900">{log.action} — {log.resource}</p>
                  <p className="text-xs text-slate-500">{log.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
