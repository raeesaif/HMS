import { Activity, BedDouble, Clock3, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ConditionBadge } from './StatusBadge';

export function CriticalPatientCard({ patient, onViewPatient }) {
  return (
    <Card className="gap-0 rounded-xl border-rose-200 bg-rose-50/40 py-0 shadow-sm">
      <CardContent className="space-y-3 px-5 py-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
            <p className="text-xs text-slate-500">
              {patient.patientId} · {patient.age} yrs · {patient.gender}
            </p>
          </div>
          <ConditionBadge condition={patient.condition} />
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1">
            <BedDouble className="size-3.5" />
            {patient.ward} · {patient.bed}
          </span>
          <span className="inline-flex items-center gap-1">
            <User className="size-3.5" />
            {patient.assignedNurse}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-3.5" />
            {patient.lastUpdated}
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-medium text-rose-600 ring-1 ring-rose-100">
          <Activity className="size-3.5" />
          SpO2: {patient.lastVital.spo2} · BP: {patient.lastVital.bp}
        </div>

        <Button size="sm" variant="outline" className="w-full" onClick={() => onViewPatient?.(patient)}>
          View Patient
        </Button>
      </CardContent>
    </Card>
  );
}
