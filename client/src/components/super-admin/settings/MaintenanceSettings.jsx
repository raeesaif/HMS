import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FieldLabel } from '@/components/ui/field';

export function MaintenanceSettings({ values, onMessageChange, onToggle }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-sm font-semibold">Maintenance</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">Take the platform offline for scheduled maintenance</p>
        </div>
        <Badge variant="outline" className={values.maintenanceModeEnabled ? 'border-rose-200 text-rose-600' : 'border-emerald-200 text-emerald-600'}>
          {values.maintenanceModeEnabled ? 'Maintenance Mode Active' : 'Platform Live'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="space-y-1">
          <FieldLabel>Maintenance Message</FieldLabel>
          <Textarea value={values.maintenanceMessage} onChange={(event) => onMessageChange(event.target.value)} className="min-h-20 resize-none" />
        </div>
        <Button variant={values.maintenanceModeEnabled ? 'outline' : 'destructive'} onClick={onToggle}>
          {values.maintenanceModeEnabled ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
        </Button>
      </CardContent>
    </Card>
  );
}
