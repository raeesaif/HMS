import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextField, ToggleRow } from './SettingsField';

export function PlatformSecuritySettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Security</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Platform-wide protection settings</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="divide-y divide-slate-100">
          <ToggleRow label="IP Allowlist" description="Restrict admin access to approved IP ranges." checked={values.ipAllowlistEnabled} onChange={(v) => onChange('ipAllowlistEnabled', v)} />
          <ToggleRow label="Brute Force Protection" description="Automatically throttle repeated failed logins." checked={values.bruteForceProtection} onChange={(v) => onChange('bruteForceProtection', v)} />
        </div>
        <TextField label="Audit Log Retention (days)" value={values.auditLogRetentionDays} onChange={(v) => onChange('auditLogRetentionDays', v)} type="number" />
      </CardContent>
    </Card>
  );
}
