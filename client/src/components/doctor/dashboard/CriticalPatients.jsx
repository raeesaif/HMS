import { HeartPulse } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CriticalPatientCard } from './CriticalPatientCard';
import { EmptyState } from '@/shared/EmptyState';
import { CardListSkeleton } from './LoadingSkeleton';

export function CriticalPatients({ patients = [], isLoading = false, onViewPatient }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Critical Patients</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Patients requiring immediate attention</p>
      </CardHeader>
      <div className="px-5 py-5">
        {isLoading ? (
          <CardListSkeleton count={3} />
        ) : patients.length === 0 ? (
          <EmptyState
            icon={HeartPulse}
            title="No critical patients"
            description="No patients currently need urgent attention."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {patients.map((patient) => (
              <CriticalPatientCard key={patient.id} patient={patient} onViewPatient={onViewPatient} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
