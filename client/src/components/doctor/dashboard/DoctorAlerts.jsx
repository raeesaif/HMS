import { AlertTriangle, Bell } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { PriorityBadge } from './StatusBadge';
import { EmptyState } from '@/shared/EmptyState';

const priorityVariant = {
  Critical: 'destructive',
  High: 'destructive',
  Medium: 'warning',
  Low: 'default',
};

export function DoctorAlerts({ alerts = [] }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Alerts</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Important clinical notifications</p>
      </CardHeader>
      <div className="space-y-3 px-5 py-5">
        {alerts.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No active alerts"
            description="You'll be notified here when something needs attention."
          />
        ) : (
          alerts.map((alert) => (
            <Alert key={alert.id} variant={priorityVariant[alert.priority] ?? 'default'}>
              <AlertTriangle />
              <AlertTitle>
                <PriorityBadge priority={alert.priority} />
              </AlertTitle>
              <AlertDescription>
                <p>{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
              </AlertDescription>
            </Alert>
          ))
        )}
      </div>
    </Card>
  );
}
