import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const vitalFields = [
  { key: 'bp', label: 'Blood Pressure' },
  { key: 'hr', label: 'Heart Rate' },
  { key: 'temp', label: 'Temperature' },
  { key: 'rr', label: 'Respiratory Rate' },
  { key: 'spo2', label: 'SpO2' },
  { key: 'weight', label: 'Weight' },
];

export function PatientVitalsCard({ vitals }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Recent Vitals</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {vitalFields.map(({ key, label }) => {
            const isAbnormal = vitals.abnormal?.includes(key);
            return (
              <div
                key={key}
                className={`rounded-lg border px-3 py-2 ${
                  isAbnormal ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-white'
                }`}
              >
                <p className="text-[11px] text-slate-500">{label}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <p className={`text-sm font-semibold ${isAbnormal ? 'text-rose-600' : 'text-slate-900'}`}>
                    {vitals[key]}
                  </p>
                  {isAbnormal && <AlertTriangle className="size-3.5 text-rose-500" />}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Last updated {vitals.recordedAt} · Recorded by {vitals.recordedBy}
        </p>
      </CardContent>
    </Card>
  );
}
