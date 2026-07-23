import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const defaultData = [
  { department: 'Cardiology', visits: 128 },
  { department: 'Orthopedic', visits: 95 },
  { department: 'Pediatric', visits: 150 },
  { department: 'Neurology', visits: 72 },
  { department: 'Oncology', visits: 60 },
  { department: 'ER', visits: 193 },
];

const BAR_COLOR = '#29B6E8';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] border border-slate-100">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <p className="text-sm mt-0.5" style={{ color: BAR_COLOR }}>
        <span className="font-semibold">{payload[0].value}</span> visits
      </p>
    </div>
  );
}

export default function VisitsByDepartmentChart({
  data = defaultData,
  title = 'Visits by Department',
  subtitle = 'Today',
  barColor = BAR_COLOR,
  maxDomain,
}) {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              stroke="#E2E8F0"
            />

            <XAxis
              type="number"
              domain={[0, maxDomain || 'dataMax']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              dy={4}
            />
            <YAxis
              type="category"
              dataKey="department"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 13 }}
              width={90}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(148,163,184,0.08)' }}
            />

            <Bar dataKey="visits" radius={[0, 4, 4, 0]} barSize={22}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
