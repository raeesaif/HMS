import { CircleCheck, TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getMedicationAlerts } from './getMedicationAlerts';

export function MedicationAlerts({ medication }) {
  const alerts = getMedicationAlerts(medication);

  if (alerts.length === 0) {
    return (
      <Alert>
        <CircleCheck />
        <AlertTitle>No active alerts for this medication</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <Alert key={alert.title} variant={alert.severity === 'critical' ? 'destructive' : 'warning'}>
          <TriangleAlert />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
