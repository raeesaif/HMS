import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextField } from './SettingsField';

export function StorageSettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Storage</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">File storage provider and default limits</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField label="Provider" value={values.provider} onChange={(v) => onChange('provider', v)} />
          <TextField label="Default Limit (GB)" value={values.defaultLimitGB} onChange={(v) => onChange('defaultLimitGB', v)} type="number" />
          <TextField label="Current Usage (GB)" value={values.currentUsageGB} onChange={() => {}} />
        </div>
        <p className="text-xs text-slate-400">Current usage is reported by the storage provider and cannot be edited here.</p>
      </CardContent>
    </Card>
  );
}
