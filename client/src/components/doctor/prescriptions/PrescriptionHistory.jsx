import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrescriptionStatusBadge } from './PrescriptionStatusBadge';

export function PrescriptionHistory({ prescriptions = [], onSelect }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Prescription History</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {prescriptions.length === 0 ? (
          <p className="text-sm text-slate-500">No previous prescriptions on record.</p>
        ) : (
          <div className="space-y-2">
            {prescriptions.map((rx) => (
              <button
                key={rx.id}
                type="button"
                onClick={() => onSelect?.(rx)}
                className="flex w-full flex-col gap-1 rounded-lg border border-slate-200 px-3 py-2.5 text-left transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {rx.id} · {rx.date}
                  </p>
                  <p className="text-xs text-slate-500">
                    {rx.diagnosis} · {rx.medicines.length} medicine(s) · {rx.createdBy}
                  </p>
                </div>
                <PrescriptionStatusBadge status={rx.status} />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
