import { Lock } from 'lucide-react';

export function ProfileField({ label, value, locked = false }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-xs text-slate-500">
        {label}
        {locked && <Lock className="size-3 text-slate-400" aria-label="Read-only" />}
      </p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}
