import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { patientOutcomesData } from '@/data/reports';

const RECOVERED_COLOR = '#0077B6';
const REFERRED_COLOR = '#14B8A6';
const MORTALITY_COLOR = '#EF4444';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
          <span className="font-semibold">{entry.name}</span>
          <span className="text-slate-500"> : </span>
          <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

function Legend() {
  const items = [
    { label: 'recovered', color: RECOVERED_COLOR },
    { label: 'referred', color: REFERRED_COLOR },
    { label: 'mortality', color: MORTALITY_COLOR },
  ];

  return (
    <div className="mt-2 flex items-center justify-center gap-5">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-slate-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function PatientOutcomesChart({
  data = patientOutcomesData,
  title = 'Patient outcomes',
  subtitle = 'Recovered · Referred · Mortality',
}) {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            barGap={2}
            barCategoryGap="20%"
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              domain={[0, 320]}
              ticks={[0, 80, 160, 240, 320]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              width={30}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />

            <Bar
              dataKey="recovered"
              name="recovered"
              fill={RECOVERED_COLOR}
              radius={[4, 4, 0, 0]}
              barSize={14}
            />
            <Bar
              dataKey="referred"
              name="referred"
              fill={REFERRED_COLOR}
              radius={[4, 4, 0, 0]}
              barSize={14}
            />
            <Bar
              dataKey="mortality"
              name="mortality"
              fill={MORTALITY_COLOR}
              radius={[4, 4, 0, 0]}
              barSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Legend />
    </div>
  );
}
