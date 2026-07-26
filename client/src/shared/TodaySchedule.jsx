import { todaysAppointments } from '@/data/appointments';

const STATUS_STYLES = {
  Confirmed: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  Pending: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  Urgent: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
};

const TodaySchedule = ({ data = todaysAppointments, label = 'Today · July 14' }) => {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-800">{label}</h3>
        <p className="mt-0.5 text-sm text-slate-400">
          {data.length} appointments scheduled
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {data.map((item, index) => {
          const style = STATUS_STYLES[item.status] ?? STATUS_STYLES.Pending;
          return (
            <div key={index} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-11 shrink-0 text-sm font-semibold text-blue-600">
                  {item.time}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{item.patient}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {item.doctor} &middot; {item.department}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodaySchedule;
