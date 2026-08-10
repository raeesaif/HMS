import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectField, ToggleRow } from './SettingsField';
import { apiRateLimitOptions } from '@/data/superAdmin/systemSettings';

export function ApiSettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">API</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Platform API access and rate limiting</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="divide-y divide-slate-100">
          <ToggleRow label="API Access" description="Allow hospitals to use the platform REST API." checked={values.apiEnabled} onChange={(v) => onChange('apiEnabled', v)} />
          <ToggleRow label="Webhooks" description="Allow hospitals to subscribe to platform webhooks." checked={values.webhooksEnabled} onChange={(v) => onChange('webhooksEnabled', v)} />
        </div>
        <SelectField label="Rate Limit" value={values.rateLimit} onChange={(v) => onChange('rateLimit', v)} options={apiRateLimitOptions} />
      </CardContent>
    </Card>
  );
}
