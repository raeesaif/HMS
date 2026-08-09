import { Building2, CalendarDays, Clock3 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DoctorAvailability } from './DoctorAvailability';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function MetaItem({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

export function DoctorWelcomeHeader({
  doctorName,
  department,
  shift,
  date,
  availability,
  availabilityOptions,
  onAvailabilityChange,
  avatarInitials,
}) {
  return (
    <section className="flex flex-col justify-between gap-5 rounded-xl border border-border bg-card px-5 py-5 shadow-sm sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {getGreeting()}, Dr. {doctorName}
        </h1>
        <p className="mt-1 text-sm text-slate-500">Here&apos;s your clinical overview for today.</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          <MetaItem icon={CalendarDays} label={date} />
          <MetaItem icon={Clock3} label={shift} />
          <MetaItem icon={Building2} label={department} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DoctorAvailability status={availability} options={availabilityOptions} onChange={onAvailabilityChange} />
        <Avatar size="lg">
          <AvatarFallback>{avatarInitials}</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}
