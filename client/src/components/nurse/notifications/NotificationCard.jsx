import { TriangleAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { notificationTypeMeta } from './notificationTypeMeta';
import { NotificationTypeBadge } from './NotificationTypeBadge';
import { NotificationPriorityBadge } from './NotificationPriorityBadge';
import { NotificationActionsMenu } from './NotificationActionsMenu';

export function NotificationCard({ notification, onAction }) {
  const meta = notificationTypeMeta[notification.type];
  const Icon = meta.icon;
  const isCritical = notification.priority === 'critical';
  const metaParts = [notification.patientName, notification.ward, notification.createdAt].filter(Boolean);

  return (
    <div
      className={`flex gap-3 rounded-xl border p-4 ${
        notification.isRead ? 'border-slate-200 bg-white' : 'border-sky-200 bg-sky-50/50'
      }`}
    >
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${meta.tone}`}>
        <Icon className="size-5" />
      </span>

      <div className="min-w-0 flex-1 space-y-2">
        {isCritical ? (
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertTitle>{notification.title}</AlertTitle>
            <AlertDescription>{notification.description}</AlertDescription>
          </Alert>
        ) : (
          <div>
            <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
            <p className="mt-0.5 text-sm text-slate-600">{notification.description}</p>
          </div>
        )}

        <p className="text-xs text-slate-500">{metaParts.join(' · ')}</p>

        <div className="flex flex-wrap items-center gap-1.5">
          <NotificationTypeBadge type={notification.type} />
          <NotificationPriorityBadge priority={notification.priority} />
          {notification.isRead ? (
            <Badge variant="outline" className="border-transparent bg-slate-100 font-medium text-slate-500">
              Read
            </Badge>
          ) : (
            <Badge className="bg-sky-600 font-medium text-white [a]:hover:bg-sky-600">Unread</Badge>
          )}
        </div>
      </div>

      <NotificationActionsMenu notification={notification} onAction={onAction} />
    </div>
  );
}
