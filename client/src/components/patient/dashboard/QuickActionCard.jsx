import { CalendarDays, ChevronRight, FileText, FlaskConical, Pill, Receipt } from 'lucide-react';

const iconMap = {
  calendar: CalendarDays,
  records: FileText,
  prescription: Pill,
  lab: FlaskConical,
  billing: Receipt,
};

export function QuickActionCard({ icon, label, description, onClick }) {
  const Icon = iconMap[icon] ?? CalendarDays;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 text-left shadow-sm transition-colors hover:border-sky-200 hover:bg-sky-50/50"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <ChevronRight className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />
    </button>
  );
}
