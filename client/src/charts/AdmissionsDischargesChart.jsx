import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const defaultData = [
  { day: 'Mon', admissions: 42, discharges: 31 },
  { day: 'Tue', admissions: 51, discharges: 38 },
  { day: 'Wed', admissions: 47, discharges: 40 },
  { day: 'Thu', admissions: 62, discharges: 48 },
  { day: 'Fri', admissions: 55, discharges: 52 },
  { day: 'Sat', admissions: 40, discharges: 45 },
  { day: 'Sun', admissions: 33, discharges: 32 },
];

const ADMISSIONS_COLOR = '#0077B6';
const DISCHARGES_COLOR = '#4FC3E8';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const admissions = payload.find((p) => p.dataKey === 'admissions')?.value;
  const discharges = payload.find((p) => p.dataKey === 'discharges')?.value;

  return (
    <div className="rounded-xl bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.12)] border border-slate-100">
      <p className="text-sm font-semibold text-slate-800 mb-2">{label}</p>
      <p className="text-sm mb-1">
        <span className="font-semibold" style={{ color: ADMISSIONS_COLOR }}>
          admissions
        </span>
        <span className="text-slate-500"> : </span>
        <span className="font-semibold" style={{ color: ADMISSIONS_COLOR }}>
          {admissions}
        </span>
      </p>
      <p className="text-sm">
        <span className="font-semibold" style={{ color: DISCHARGES_COLOR }}>
          discharges
        </span>
        <span className="text-slate-500"> : </span>
        <span className="font-semibold" style={{ color: DISCHARGES_COLOR }}>
          {discharges}
        </span>
      </p>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center justify-center gap-6 mt-2">
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: ADMISSIONS_COLOR }}
        />
        <span className="text-sm text-slate-600">admissions</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: DISCHARGES_COLOR }}
        />
        <span className="text-sm text-slate-600">discharges</span>
      </div>
    </div>
  );
}

export default function AdmissionsDischargesChart({
  data = defaultData,
  title = 'Admissions vs Discharges',
  subtitle = 'Last 7 days',
  period = 'Weekly',
}) {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
          {period}
        </span>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            onMouseMove={(state) => {
              if (state.isTooltipActive && state.activeTooltipIndex != null) {
                setActiveIndex(state.activeTooltipIndex);
              }
            }}
          >
            <defs>
              <linearGradient id="admissionsFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={ADMISSIONS_COLOR}
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor={ADMISSIONS_COLOR}
                  stopOpacity={0.02}
                />
              </linearGradient>
              <linearGradient id="dischargesFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={DISCHARGES_COLOR}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={DISCHARGES_COLOR}
                  stopOpacity={0.03}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              domain={[0, 80]}
              ticks={[0, 20, 40, 60, 80]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              width={30}
            />

            {activeIndex != null && (
              <g>
                {/* vertical reference line rendered via Tooltip cursor below */}
              </g>
            )}

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#CBD5E1', strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="admissions"
              stroke={ADMISSIONS_COLOR}
              strokeWidth={2}
              fill="url(#admissionsFill)"
              dot={false}
              activeDot={{
                r: 5,
                fill: ADMISSIONS_COLOR,
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="discharges"
              stroke={DISCHARGES_COLOR}
              strokeWidth={2}
              fill="url(#dischargesFill)"
              dot={false}
              activeDot={{
                r: 5,
                fill: DISCHARGES_COLOR,
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <Legend />
    </div>
  );
}
