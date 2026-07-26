import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { patientDistributionData } from '@/data/reports';

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <p className="text-sm font-semibold text-slate-800">{item.department}</p>
      <p className="mt-0.5 text-sm" style={{ color: item.color }}>
        <span className="font-semibold">{item.value}</span> patients
      </p>
    </div>
  );
}

function Legend({ data }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
      {data.map((item) => (
        <div key={item.department} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-slate-500">{item.department}</span>
        </div>
      ))}
    </div>
  );
}

export default function PatientDistributionChart({
  data = patientDistributionData,
  title = 'Patient distribution',
  subtitle = 'By department',
}) {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="mx-auto h-64 w-full max-w-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="department"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.department} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Legend data={data} />
    </div>
  );
}
