import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BAR_COLOR = '#0077B6';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <p className="mt-0.5 text-sm" style={{ color: BAR_COLOR }}>
        <span className="font-semibold">{payload[0].value.toLocaleString()}</span> uses
      </p>
    </div>
  );
}

export default function FeatureUsageChart({ data, title = 'Feature Usage', subtitle = 'Total actions in the last 30 days' }) {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={4} />
            <YAxis type="category" dataKey="feature" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13 }} width={110} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
            <Bar dataKey="usage" radius={[0, 4, 4, 0]} barSize={18}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BAR_COLOR} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
