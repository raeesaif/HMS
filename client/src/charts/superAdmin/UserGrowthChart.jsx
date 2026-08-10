import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const USERS_COLOR = '#8B5CF6';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <p className="mt-0.5 text-sm" style={{ color: USERS_COLOR }}>
        <span className="font-semibold">{payload[0].value.toLocaleString()}</span> users
      </p>
    </div>
  );
}

export default function UserGrowthChart({ data, title = 'User Growth', subtitle = 'Total platform users by month' }) {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={USERS_COLOR} stopOpacity={0.28} />
                <stop offset="100%" stopColor={USERS_COLOR} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={48} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#CBD5E1', strokeWidth: 1 }} />
            <Area type="monotone" dataKey="users" stroke={USERS_COLOR} strokeWidth={2} fill="url(#usersFill)" dot={false} activeDot={{ r: 5, fill: USERS_COLOR, stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
