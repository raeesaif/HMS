import { Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { CardGridSkeleton } from '@/components/reception/LoadingSkeleton';
import { doctorStatusMap } from '@/components/reception/statusMaps';

export function DoctorsOverview({ doctors = [], isLoading = false, onViewAll }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold">Doctors On Duty</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">{doctors.length} doctors on today&apos;s roster</p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>

      <CardContent className="p-5">
        {isLoading ? (
          <CardGridSkeleton count={3} />
        ) : doctors.length === 0 ? (
          <EmptyState icon={Stethoscope} title="No doctors currently on duty" description="Check back later for the updated roster." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="rounded-lg border border-slate-200 p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{doctor.name}</p>
                    <p className="text-xs text-slate-500">{doctor.department}</p>
                  </div>
                  <StatusBadge status={doctor.status} map={doctorStatusMap} />
                </div>
                <p className="mt-2 text-xs text-slate-500">{doctor.currentPatients} current patients</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
