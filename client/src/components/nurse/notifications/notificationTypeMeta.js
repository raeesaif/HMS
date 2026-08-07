import { ClipboardList, FlaskConical, Pill, Settings, Siren, Stethoscope, UserRound } from 'lucide-react';

export const notificationTypeMeta = {
  medication: { label: 'Medication', icon: Pill, tone: 'bg-sky-100 text-sky-600' },
  patient: { label: 'Patient', icon: UserRound, tone: 'bg-violet-100 text-violet-600' },
  doctor: { label: 'Doctor', icon: Stethoscope, tone: 'bg-indigo-100 text-indigo-600' },
  emergency: { label: 'Emergency', icon: Siren, tone: 'bg-red-100 text-red-600' },
  task: { label: 'Task', icon: ClipboardList, tone: 'bg-amber-100 text-amber-600' },
  laboratory: { label: 'Laboratory', icon: FlaskConical, tone: 'bg-teal-100 text-teal-600' },
  system: { label: 'System', icon: Settings, tone: 'bg-slate-100 text-slate-600' },
};
