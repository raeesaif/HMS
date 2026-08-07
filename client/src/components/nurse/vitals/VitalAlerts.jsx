import { CircleCheck, TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getVitalAlerts } from './vitalsAlerts';

export function VitalAlerts({ vitals }) {
  const alerts = getVitalAlerts(vitals);

  if (alerts.length === 0) {
    return (
      <Alert>
        <CircleCheck />
        <AlertTitle>All vitals within normal range</AlertTitle>
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
