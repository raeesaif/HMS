import { Badge } from '@/components/ui/badge';

const appointmentStatusClass = {
  Waiting: 'border-amber-200 bg-amber-50 text-amber-600',
  'Checked In': 'border-transparent bg-sky-100 text-sky-600',
  'In Consultation': 'border-transparent bg-blue-600 text-white',
  Completed: 'border-transparent bg-emerald-100 text-emerald-600',
  Cancelled: 'border-transparent bg-rose-100 text-rose-600',
};

export function AppointmentStatusBadge({ status }) {
  return (
    <Badge variant="outline" className={appointmentStatusClass[status] ?? ''}>
      {status}
    </Badge>
  );
}

const labStatusClass = {
  'Pending Review': 'border-transparent bg-amber-100 text-amber-600',
  Ready: 'border-transparent bg-emerald-100 text-emerald-600',
  Reviewed: 'border-transparent bg-slate-200 text-slate-600',
};

export function LabStatusBadge({ status }) {
  return (
    <Badge variant="outline" className={labStatusClass[status] ?? ''}>
      {status}
    </Badge>
  );
}

const priorityClass = {
  Critical: 'border-transparent bg-rose-100 text-rose-600',
  High: 'border-transparent bg-orange-100 text-orange-600',
  Medium: 'border-transparent bg-amber-100 text-amber-600',
  Low: 'border-transparent bg-slate-200 text-slate-600',
};

export function PriorityBadge({ priority }) {
  return (
    <Badge variant="outline" className={priorityClass[priority] ?? ''}>
      {priority}
    </Badge>
  );
}

export function ConditionBadge({ condition }) {
  return (
    <Badge className="gap-1 border-transparent bg-rose-600 text-white hover:bg-rose-600">
      <span className="size-1.5 rounded-full bg-white" />
      {condition}
    </Badge>
  );
}
