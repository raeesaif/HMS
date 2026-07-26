import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { revenueExpensesData } from '@/data/reports';

const REVENUE_COLOR = '#0077B6';
const EXPENSES_COLOR = '#4FC3E8';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const revenue = payload.find((p) => p.dataKey === 'revenue')?.value;
  const expenses = payload.find((p) => p.dataKey === 'expenses')?.value;

  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <p className="mb-1 text-sm">
        <span className="font-semibold" style={{ color: REVENUE_COLOR }}>
          revenue
        </span>
        <span className="text-slate-500"> : </span>
        <span className="font-semibold" style={{ color: REVENUE_COLOR }}>
          {revenue}
        </span>
      </p>
      <p className="text-sm">
        <span className="font-semibold" style={{ color: EXPENSES_COLOR }}>
          expenses
        </span>
        <span className="text-slate-500"> : </span>
        <span className="font-semibold" style={{ color: EXPENSES_COLOR }}>
          {expenses}
        </span>
      </p>
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-2 flex items-center justify-center gap-6">
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-0.5 w-4 rounded-full"
          style={{ backgroundColor: REVENUE_COLOR }}
        />
        <span className="text-sm text-slate-600">revenue</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-0.5 w-4 rounded-full"
          style={{ backgroundColor: EXPENSES_COLOR }}
        />
        <span className="text-sm text-slate-600">expenses</span>
      </div>
    </div>
  );
}

export default function RevenueExpensesChart({
  data = revenueExpensesData,
  title = 'Revenue vs Expenses',
  subtitle = 'In thousands (USD)',
}) {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={REVENUE_COLOR} stopOpacity={0.25} />
                <stop offset="100%" stopColor={REVENUE_COLOR} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="expensesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={EXPENSES_COLOR} stopOpacity={0.3} />
                <stop offset="100%" stopColor={EXPENSES_COLOR} stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              domain={[0, 600]}
              ticks={[0, 150, 300, 450, 600]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              width={36}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#CBD5E1', strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke={REVENUE_COLOR}
              strokeWidth={2}
              fill="url(#revenueFill)"
              dot={false}
              activeDot={{
                r: 5,
                fill: REVENUE_COLOR,
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={EXPENSES_COLOR}
              strokeWidth={2}
              fill="url(#expensesFill)"
              dot={false}
              activeDot={{
                r: 5,
                fill: EXPENSES_COLOR,
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
