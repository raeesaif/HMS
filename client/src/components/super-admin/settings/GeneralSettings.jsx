import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextField, SelectField } from './SettingsField';
import { currencyOptions, timezoneOptions, dateFormatOptions } from '@/data/superAdmin/systemSettings';

export function GeneralSettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">General</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Platform-wide identity and regional defaults</p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2">
        <TextField label="Platform Name" value={values.platformName} onChange={(v) => onChange('platformName', v)} />
        <TextField label="Support Email" value={values.supportEmail} onChange={(v) => onChange('supportEmail', v)} type="email" />
        <TextField label="Support Phone" value={values.supportPhone} onChange={(v) => onChange('supportPhone', v)} />
        <SelectField label="Currency" value={values.currency} onChange={(v) => onChange('currency', v)} options={currencyOptions} />
        <SelectField label="Timezone" value={values.timezone} onChange={(v) => onChange('timezone', v)} options={timezoneOptions} />
        <SelectField label="Date Format" value={values.dateFormat} onChange={(v) => onChange('dateFormat', v)} options={dateFormatOptions} />
      </CardContent>
    </Card>
  );
}
