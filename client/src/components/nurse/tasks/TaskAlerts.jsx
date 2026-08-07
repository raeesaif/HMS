import { CircleCheck, TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getTaskAlerts } from './getTaskAlerts';

export function TaskAlerts({ task }) {
  const alerts = getTaskAlerts(task);

  if (alerts.length === 0) {
    return (
      <Alert>
        <CircleCheck />
        <AlertTitle>No active alerts for this task</AlertTitle>
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
