import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = { free: '#94A3B8', basic: '#0EA5E9', professional: '#8B5CF6', enterprise: '#F59E0B' };

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
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
      {Object.entries(COLORS).map(([key, color]) => (
        <div key={key} className="flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-sm capitalize text-slate-600">{key}</span>
        </div>
      ))}
    </div>
  );
}

export default function SubscriptionGrowthChart({ data, title = 'Subscription Growth', subtitle = 'Hospitals per plan by month' }) {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={32} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
            <Bar dataKey="free" stackId="plans" fill={COLORS.free} radius={[0, 0, 0, 0]} />
            <Bar dataKey="basic" stackId="plans" fill={COLORS.basic} />
            <Bar dataKey="professional" stackId="plans" fill={COLORS.professional} />
            <Bar dataKey="enterprise" stackId="plans" fill={COLORS.enterprise} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Legend />
    </div>
  );
}
