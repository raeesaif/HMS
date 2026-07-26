import { Mail, Phone } from 'lucide-react';

const STATUS_STYLES = {
  'On duty': { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  'Off duty': { dot: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-100' },
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

const StaffGrid = ({ data, onEmail, onCall }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((member) => {
        const style = STATUS_STYLES[member.status] ?? STATUS_STYLES['Off duty'];
        return (
          <div
            key={member.id}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                {getInitials(member.name)}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800">{member.name}</p>
                <p className="text-sm text-slate-400">{member.role}</p>
                <span
                  className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                  {member.status}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-slate-50 px-2 py-1.5 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Dept.</p>
                <p className="text-sm font-semibold text-slate-700">{member.department}</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-2 py-1.5 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Rating</p>
                <p className="text-sm font-semibold text-slate-700">{member.rating} ★</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-2 py-1.5 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Patients</p>
                <p className="text-sm font-semibold text-slate-700">{member.patients}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Shift: <span className="font-medium text-slate-700">{member.shift}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onEmail?.(member)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-blue-500 hover:bg-blue-50"
                >
                  <Mail className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onCall?.(member)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-blue-500 hover:bg-blue-50"
                >
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StaffGrid;
