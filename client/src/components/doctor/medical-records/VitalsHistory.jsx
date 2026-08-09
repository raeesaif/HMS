import { AlertTriangle, HeartPulse } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { TableSkeleton } from './LoadingSkeleton';

const BP_COLOR = '#e11d48';
const HR_COLOR = '#0077B6';

function parseSystolic(bp) {
  const [systolic] = (bp || '').split('/');
  return Number.parseInt(systolic, 10) || null;
}

function parseHeartRate(hr) {
  return Number.parseInt(hr, 10) || null;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-semibold text-slate-700">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

function VitalsTrendChart({ vitalsHistory }) {
  const chartData = [...vitalsHistory]
    .reverse()
    .map((entry) => ({ date: entry.date, systolic: parseSystolic(entry.bp), heartRate: parseHeartRate(entry.hr) }));

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Vitals Trend</CardTitle>
        <p className="text-xs text-slate-500">Systolic BP and heart rate over recorded visits</p>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="systolic" name="Systolic BP" stroke={BP_COLOR} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="heartRate" name="Heart Rate" stroke={HR_COLOR} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function VitalsHistory({ vitalsHistory, isLoading = false }) {
  if (isLoading) {
    return <TableSkeleton cols={9} />;
  }

  if (vitalsHistory.length === 0) {
    return <EmptyState icon={HeartPulse} title="No vitals recorded" description="No vital-sign history found for this patient." />;
  }

  return (
    <div className="space-y-4">
      {vitalsHistory.length > 1 && <VitalsTrendChart vitalsHistory={vitalsHistory} />}

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <Table className="min-w-[950px]">
          <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
            <TableRow className="hover:bg-transparent">
              {['Date', 'Time', 'BP', 'HR', 'Temp', 'RR', 'SpO2', 'Weight', 'Height', 'Recorded By'].map((label) => (
                <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {vitalsHistory.map((entry, index) => (
              <TableRow key={`${entry.date}-${index}`} className={`border-b-0 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                <TableCell className="px-4 py-3.5 pl-5 text-slate-900">{entry.date}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-500">{entry.time}</TableCell>
                {['bp', 'hr', 'temp', 'rr', 'spo2', 'weight', 'height'].map((key) => (
                  <TableCell
                    key={key}
                    className={`px-4 py-3.5 ${
                      entry.abnormal?.includes(key) ? 'font-medium text-rose-600' : 'text-slate-600'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {entry.abnormal?.includes(key) && <AlertTriangle className="size-3 text-rose-500" />}
                      {entry[key] ?? '—'}
                    </span>
                  </TableCell>
                ))}
                <TableCell className="px-4 py-3.5 pr-5 text-slate-500">{entry.recordedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
