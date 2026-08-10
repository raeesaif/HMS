import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const REVENUE_COLOR = '#0077B6';
const NET_COLOR = '#4FC3E8';
const REFUNDS_COLOR = '#FB7185';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="mb-1 text-sm last:mb-0">
          <span className="font-semibold capitalize" style={{ color: entry.color }}>
            {entry.dataKey}
          </span>
          <span className="text-slate-500"> : </span>
          <span className="font-semibold" style={{ color: entry.color }}>
            ${entry.value.toLocaleString()}
          </span>
        </p>
      ))}
    </div>
  );
}

function Legend() {
  const items = [
    { key: 'revenue', label: 'Subscription Revenue', color: REVENUE_COLOR },
    { key: 'net', label: 'Net Revenue', color: NET_COLOR },
    { key: 'refunds', label: 'Refunds', color: REFUNDS_COLOR },
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

export default function RevenueAnalyticsChart({ data, title = 'Revenue Analytics', subtitle = 'Monthly platform revenue (USD)' }) {
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
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={REVENUE_COLOR} stopOpacity={0.25} />
                <stop offset="100%" stopColor={REVENUE_COLOR} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="netFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={NET_COLOR} stopOpacity={0.3} />
                <stop offset="100%" stopColor={NET_COLOR} stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={44} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#CBD5E1', strokeWidth: 1 }} />

            <Area type="monotone" dataKey="revenue" stroke={REVENUE_COLOR} strokeWidth={2} fill="url(#revenueFill)" dot={false} activeDot={{ r: 5, fill: REVENUE_COLOR, stroke: '#fff', strokeWidth: 2 }} />
            <Area type="monotone" dataKey="net" stroke={NET_COLOR} strokeWidth={2} fill="url(#netFill)" dot={false} activeDot={{ r: 5, fill: NET_COLOR, stroke: '#fff', strokeWidth: 2 }} />
            <Area type="monotone" dataKey="refunds" stroke={REFUNDS_COLOR} strokeWidth={2} fill="none" dot={false} activeDot={{ r: 5, fill: REFUNDS_COLOR, stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <Legend />
    </div>
  );
}
