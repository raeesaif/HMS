import { AlertTriangle, HeartPulse, ShieldAlert, StickyNote } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AllergySeverityBadge } from './RecordBadges';

export function MedicalAlerts({ patient, allergyDetails = [] }) {
  const alerts = [];

  if (patient.allergies.length > 0) {
    alerts.push({
      icon: AlertTriangle,
      variant: 'warning',
      title: 'Known Allergy',
      description: `${patient.name} has ${patient.allergies.length} recorded ${
        patient.allergies.length > 1 ? 'allergies' : 'allergy'
      }: ${patient.allergies.join(', ')}.`,
    });
  }
  if (patient.status === 'Critical') {
    alerts.push({
      icon: HeartPulse,
      variant: 'destructive',
      title: 'Critical Condition',
      description: patient.condition,
    });
  }
  if (patient.status === 'Critical' || patient.ward === 'ICU') {
    alerts.push({
      icon: ShieldAlert,
      variant: 'destructive',
      title: 'High-Risk Patient',
      description: 'Requires close monitoring and priority clinical review.',
    });
  }
  if (patient.importantNotes) {
    alerts.push({
      icon: StickyNote,
      variant: 'default',
      title: 'Important Medical Note',
      description: patient.importantNotes,
    });
  }

  if (alerts.length === 0 && allergyDetails.length === 0) return null;

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Alert key={alert.title} variant={alert.variant}>
          <alert.icon />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}

      {allergyDetails.length > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-rose-700">Allergies</p>
          <div className="mt-2 space-y-2">
            {allergyDetails.map((allergy) => (
              <div
                key={allergy.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{allergy.name}</p>
                  <p className="text-xs text-slate-500">{allergy.reaction}</p>
                </div>
                <AllergySeverityBadge severity={allergy.severity} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
