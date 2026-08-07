import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { notificationTypeMeta } from './notificationTypeMeta';
import { NotificationTypeBadge } from './NotificationTypeBadge';
import { NotificationPriorityBadge } from './NotificationPriorityBadge';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t border-slate-200 px-5 py-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function NotificationDetailsSheet({ notification, open, onOpenChange }) {
  if (!notification) return null;

  const meta = notificationTypeMeta[notification.type];
  const Icon = meta.icon;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${meta.tone}`}>
              <Icon className="size-5" />
            </span>
            <div>
              <SheetTitle>{notification.title}</SheetTitle>
              <SheetDescription>{notification.createdAt}</SheetDescription>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <NotificationTypeBadge type={notification.type} />
            <NotificationPriorityBadge priority={notification.priority} />
          </div>
        </SheetHeader>

        <Section title="Full description">
          <p className="text-sm leading-5 text-slate-800">{notification.fullDescription}</p>
        </Section>

        <Section title="Related information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Related patient" value={notification.patientName} />
            <InfoField label="Assigned doctor" value={notification.doctor} />
            <InfoField label="Ward" value={notification.ward} />
            <InfoField label="Created time" value={notification.createdAt} />
          </div>
        </Section>

        <Section title="Suggested action">
          <p className="text-sm leading-5 text-slate-800">{notification.suggestedAction}</p>
        </Section>
      </SheetContent>
    </Sheet>
  );
}
