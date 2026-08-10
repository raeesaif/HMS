import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleRow } from './SettingsField';

export function PlatformNotificationSettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Notifications</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Platform-level alert categories</p>
      </CardHeader>
      <CardContent className="divide-y divide-slate-100 pt-3">
        <ToggleRow label="Product Announcements" description="Notify admins about new features and updates." checked={values.productAnnouncements} onChange={(v) => onChange('productAnnouncements', v)} />
        <ToggleRow label="Maintenance Alerts" description="Notify hospitals about scheduled maintenance." checked={values.maintenanceAlerts} onChange={(v) => onChange('maintenanceAlerts', v)} />
        <ToggleRow label="Billing Alerts" description="Notify on failed or upcoming payments." checked={values.billingAlerts} onChange={(v) => onChange('billingAlerts', v)} />
        <ToggleRow label="Security Alerts" description="Notify on suspicious login activity platform-wide." checked={values.securityAlerts} onChange={(v) => onChange('securityAlerts', v)} />
      </CardContent>
    </Card>
  );
}
