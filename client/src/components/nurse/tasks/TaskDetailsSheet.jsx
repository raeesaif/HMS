import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TaskStatusBadge } from './TaskStatusBadge';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { TaskTimeline } from './TaskTimeline';
import { TaskAlerts } from './TaskAlerts';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

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

export function TaskDetailsSheet({ task, open, onOpenChange }) {
  if (!task) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(task.patientName)}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{task.taskName}</SheetTitle>
              <SheetDescription>
                {task.id} · {task.patientName} · {task.ward}
              </SheetDescription>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>
        </SheetHeader>

        <Section title="Task information">
          <InfoField label="Description" value={task.description} />
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Assigned doctor" value={task.doctor} />
            <InfoField label="Patient" value={task.patientName} />
            <InfoField label="Ward" value={task.ward} />
            <InfoField label="Bed number" value={task.bed} />
            <InfoField label="Due time" value={task.dueTime} />
            <InfoField label="Assigned date" value={task.assignedDate} />
          </div>
          <div className="mt-3">
            <InfoField label="Instructions" value={task.instructions} />
          </div>
          <div className="mt-3">
            <InfoField label="Related diagnosis" value={task.diagnosis} />
          </div>
        </Section>

        <Section title="Task timeline">
          <TaskTimeline timeline={task.timeline} />
        </Section>

        <Section title="Alerts">
          <TaskAlerts task={task} />
        </Section>
      </SheetContent>
    </Sheet>
  );
}
