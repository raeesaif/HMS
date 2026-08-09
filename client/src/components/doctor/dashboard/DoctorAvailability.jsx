import { CircleDot } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusStyles = {
  Available: 'bg-emerald-100 text-emerald-600',
  Busy: 'bg-rose-100 text-rose-600',
  'On Break': 'bg-amber-100 text-amber-600',
  'Off Duty': 'bg-slate-200 text-slate-600',
};

export function DoctorAvailability({ status, options = [], onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
          statusStyles[status] ?? statusStyles['Off Duty']
        }`}
      >
        <CircleDot className="size-3" />
        {status}
      </span>
      <Select value={status} onValueChange={onChange}>
        <SelectTrigger size="sm" className="h-8 text-xs" aria-label="Update availability status">
          <SelectValue placeholder="Set status" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
