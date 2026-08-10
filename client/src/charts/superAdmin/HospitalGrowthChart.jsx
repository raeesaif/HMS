import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ACTIVE_COLOR = '#10B981';
const TRIAL_COLOR = '#0EA5E9';
const SUSPENDED_COLOR = '#F43F5E';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="mb-1 text-sm capitalize last:mb-0">
          <span className="font-semibold" style={{ color: entry.color }}>
            {entry.dataKey}
          </span>
          <span className="text-slate-500"> : </span>
          <span className="font-semibold" style={{ color: entry.color }}>
            {entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}

function Legend() {
  const items = [
    { key: 'active', label: 'Active', color: ACTIVE_COLOR },
    { key: 'trial', label: 'Trial', color: TRIAL_COLOR },
    { key: 'suspended', label: 'Suspended', color: SUSPENDED_COLOR },
  ];
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
      {items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-sm text-slate-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function HospitalGrowthChart({ data, title = 'Hospital Growth', subtitle = 'New and existing hospitals by month' }) {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="activeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACTIVE_COLOR} stopOpacity={0.25} />
                <stop offset="100%" stopColor={ACTIVE_COLOR} stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={32} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#CBD5E1', strokeWidth: 1 }} />

            <Area type="monotone" dataKey="active" stroke={ACTIVE_COLOR} strokeWidth={2} fill="url(#activeFill)" dot={false} activeDot={{ r: 5, fill: ACTIVE_COLOR, stroke: '#fff', strokeWidth: 2 }} />
            <Area type="monotone" dataKey="trial" stroke={TRIAL_COLOR} strokeWidth={2} fill="none" dot={false} activeDot={{ r: 5, fill: TRIAL_COLOR, stroke: '#fff', strokeWidth: 2 }} />
            <Area type="monotone" dataKey="suspended" stroke={SUSPENDED_COLOR} strokeWidth={2} fill="none" dot={false} activeDot={{ r: 5, fill: SUSPENDED_COLOR, stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <Legend />
    </div>
  );
}
