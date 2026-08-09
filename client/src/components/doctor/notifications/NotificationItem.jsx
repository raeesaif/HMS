import {
  Archive,
  CalendarDays,
  CheckCheck,
  Eye,
  FlaskConical,
  Megaphone,
  MoreVertical,
  Pill,
  Siren,
  UserRound,
  ListChecks,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getPatientById } from '@/data/doctorPatients';
import { NotificationTypeBadge } from './NotificationTypeBadge';
import { NotificationPriorityBadge } from './NotificationPriorityBadge';

const typeMeta = {
  Patient: { icon: UserRound, tone: 'bg-sky-100 text-sky-600' },
  Appointment: { icon: CalendarDays, tone: 'bg-violet-100 text-violet-600' },
  Laboratory: { icon: FlaskConical, tone: 'bg-purple-100 text-purple-600' },
  Prescription: { icon: Pill, tone: 'bg-amber-100 text-amber-600' },
  Emergency: { icon: Siren, tone: 'bg-rose-100 text-rose-600' },
  Task: { icon: ListChecks, tone: 'bg-emerald-100 text-emerald-600' },
  System: { icon: Megaphone, tone: 'bg-slate-200 text-slate-600' },
};

function formatNotificationTime(iso) {
  const date = new Date(iso);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  if (isToday) return `Today, ${time}`;
  if (isYesterday) return `Yesterday, ${time}`;
  return `${date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}, ${time}`;
}

export function NotificationItem({ notification, onAction }) {
  const meta = typeMeta[notification.type] ?? typeMeta.System;
  const patient = notification.patientId ? getPatientById(notification.patientId) : null;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-4 transition-colors ${
        notification.isRead ? 'border-slate-100 bg-white' : 'border-sky-100 bg-sky-50/40'
      }`}
    >
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${meta.tone}`}>
        <meta.icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {!notification.isRead && <span className="size-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />}
            <p className={`text-sm ${notification.isRead ? 'font-medium text-slate-800' : 'font-semibold text-slate-900'}`}>
              {notification.title}
            </p>
          </div>
          <span className="shrink-0 text-xs text-slate-400">{formatNotificationTime(notification.createdAt)}</span>
        </div>

        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{notification.message}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <NotificationTypeBadge type={notification.type} />
          <NotificationPriorityBadge priority={notification.priority} />
          {patient && <span className="text-xs text-slate-500">Patient: {patient.name}</span>}
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
          {notification.labReportId && (
            <DropdownMenuItem onClick={() => onAction('go-to-lab-report', notification)}>
              <FlaskConical /> Go to Lab Report
            </DropdownMenuItem>
          )}
          {notification.prescriptionId && (
            <DropdownMenuItem onClick={() => onAction('go-to-prescription', notification)}>
              <Pill /> Go to Prescription
            </DropdownMenuItem>
          )}
          {notification.appointmentId && (
            <DropdownMenuItem onClick={() => onAction('go-to-appointment', notification)}>
              <CalendarDays /> Go to Appointment
            </DropdownMenuItem>
          )}
          {!notification.appointmentId && !notification.labReportId && !notification.prescriptionId && notification.patientId && (
            <DropdownMenuItem onClick={() => onAction('go-to-patient', notification)}>
              <UserRound /> Go to Patient
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => onAction('archive', notification)}>
            <Archive /> Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
