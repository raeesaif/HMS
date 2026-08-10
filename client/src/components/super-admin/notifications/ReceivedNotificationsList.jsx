import { Bell } from 'lucide-react';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { PriorityBadge } from '@/components/super-admin/PriorityBadge';
import { notificationTypeMap } from '@/components/super-admin/statusMaps';

export function ReceivedNotificationsList({ notifications, onView }) {
  if (notifications.length === 0) {
    return <EmptyState icon={Bell} title="No notifications" description="You're all caught up." className="py-16" />;
  }

  return (
    <div className="space-y-2.5 p-5">
      {notifications.map((notification) => (
        <button
          key={notification.id}
          type="button"
          onClick={() => onView(notification)}
          className={`flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors hover:bg-slate-50 ${
            notification.isRead ? 'border-slate-100 bg-white' : 'border-sky-100 bg-sky-50/40'
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className={`text-sm ${notification.isRead ? 'font-medium text-slate-800' : 'font-semibold text-slate-900'}`}>{notification.title}</p>
            <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{notification.message}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={notification.type} map={notificationTypeMap} />
              <PriorityBadge priority={notification.priority} />
            </div>
          </div>
          <span className="shrink-0 text-xs text-slate-400">{notification.timestamp}</span>
        </button>
      ))}
    </div>
  );
}
