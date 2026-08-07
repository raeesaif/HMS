import { TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getBedAlerts } from './getBedAlerts';

export function BedAlerts({ beds }) {
  const alerts = getBedAlerts(beds);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <Alert key={alert.title + alert.description} variant={alert.severity === 'critical' ? 'destructive' : 'warning'}>
          <TriangleAlert />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
