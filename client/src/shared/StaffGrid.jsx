import { Eye, Pencil, UserPlus, Mail, Phone, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATUS_STYLES = {
  'On duty': { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  'Off duty': { dot: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-100' },
};

const ROLE_STYLES = {
  doctor: { avatarBg: 'bg-blue-50', avatarText: 'text-blue-600', ring: 'ring-blue-100' },
  nurse: { avatarBg: 'bg-teal-50', avatarText: 'text-teal-600', ring: 'ring-teal-100' },
  receptionist: { avatarBg: 'bg-violet-50', avatarText: 'text-violet-600', ring: 'ring-violet-100' },
};

const getInitials = (name) => {
  const cleaned = name.replace(/^Dr\.\s*/, '');
  return cleaned
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const StaffGrid = ({ data, onView, onEdit, onAssignPatients }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((member) => {
        const statusStyle = STATUS_STYLES[member.status] ?? STATUS_STYLES['Off duty'];
        const roleStyle = ROLE_STYLES[member.type] ?? ROLE_STYLES.doctor;
        return (
          <div
            key={member.id}
            className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-4 ${roleStyle.avatarBg} ${roleStyle.avatarText} ${roleStyle.ring}`}
              >
                {getInitials(member.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-800">{member.name}</p>
                <p className="truncate text-sm text-slate-400">{member.role}</p>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                {member.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-slate-50 px-2 py-1.5 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Dept.</p>
                <p className="truncate text-sm font-semibold text-slate-700">{member.department}</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-2 py-1.5 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Experience</p>
                <p className="truncate text-sm font-semibold text-slate-700">
                  {member.experience ?? '—'}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 px-2 py-1.5 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Patients</p>
                <p className="truncate text-sm font-semibold text-slate-700">{member.patients}</p>
              </div>
            </div>

            {member.licenseNumber && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                <BadgeCheck className="h-3.5 w-3.5 text-slate-400" />
                <span className="truncate">Lic. {member.licenseNumber}</span>
              </div>
            )}

            <div className="mt-3 flex flex-col gap-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 truncate">
                <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{member.email}</span>
              </span>
              <span className="flex items-center gap-1.5 truncate">
                <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                {member.phone}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Shift: <span className="font-medium text-slate-700">{member.shift}</span>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onView?.(member)}
              >
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                View Details
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit?.(member)}
              >
                <Pencil className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Button>
              {member.type === 'nurse' && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => onAssignPatients?.(member)}
                >
                  <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                  Assign Patients
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StaffGrid;
