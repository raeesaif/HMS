import { Badge } from '@/components/ui/badge';

const roleClass = {
  'Hospital Admin': 'border-transparent bg-violet-100 text-violet-600',
  Doctor: 'border-transparent bg-sky-100 text-sky-600',
  Nurse: 'border-transparent bg-emerald-100 text-emerald-600',
  Receptionist: 'border-transparent bg-amber-100 text-amber-600',
  Patient: 'border-transparent bg-slate-200 text-slate-600',
  'Super Admin': 'border-transparent bg-rose-100 text-rose-600',
};

export function RoleBadge({ role, className = '' }) {
  return (
    <Badge variant="outline" className={`${roleClass[role] ?? 'border-transparent bg-slate-100 text-slate-600'} ${className}`}>
      {role}
    </Badge>
  );
}
