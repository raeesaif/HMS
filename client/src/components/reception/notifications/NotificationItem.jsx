import { Activity, Bell, BedDouble, CalendarDays, CheckCheck, ClipboardCheck, Eye, MoreVertical, Receipt, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { PriorityBadge } from '@/components/reception/PriorityBadge';
import { notificationTypeMap } from '@/components/reception/statusMaps';

const typeIconMap = {
  Appointment: CalendarDays,
  Patient: UserRound,
  'Check-in': ClipboardCheck,
  Queue: UserRound,
  Bed: BedDouble,
  Emergency: Activity,
  Billing: Receipt,
  System: Bell,
};

export function NotificationItem({ notification, onAction }) {
  const Icon = typeIconMap[notification.type] ?? Bell;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-4 transition-colors ${
        notification.isRead ? 'border-slate-100 bg-white' : 'border-sky-100 bg-sky-50/40'
      }`}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {!notification.isRead && <span className="size-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />}
            <p className={`text-sm ${notification.isRead ? 'font-medium text-slate-800' : 'font-semibold text-slate-900'}`}>{notification.title}</p>
          </div>
          <span className="shrink-0 text-xs text-slate-400">{notification.timestamp}</span>
        </div>

        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{notification.message}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <StatusBadge status={notification.type} map={notificationTypeMap} />
          <PriorityBadge priority={notification.priority} />
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Notification actions" />}>
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onAction('view-details', notification)}>
            <Eye /> View Details
          </DropdownMenuItem>
          {!notification.isRead && (
            <DropdownMenuItem onClick={() => onAction('mark-as-read', notification)}>
              <CheckCheck /> Mark as Read
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
