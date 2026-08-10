import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldLabel } from '@/components/ui/field';
import { dateFormatOptions, itemsPerPageOptions, timeFormatOptions, timezoneOptions } from '@/data/patientSettings';

function PreferenceSelect({ label, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <FieldLabel>{label}</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function GeneralPreferences({ preferences, onChange }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-sm font-semibold">General Preferences</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Personal application defaults</p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2">
        <PreferenceSelect label="Date Format" value={preferences.dateFormat} onChange={(value) => onChange('dateFormat', value)} options={dateFormatOptions} />
        <PreferenceSelect label="Time Format" value={preferences.timeFormat} onChange={(value) => onChange('timeFormat', value)} options={timeFormatOptions} />
        <PreferenceSelect label="Timezone" value={preferences.timezone} onChange={(value) => onChange('timezone', value)} options={timezoneOptions} />
        <PreferenceSelect label="Items Per Page" value={preferences.itemsPerPage} onChange={(value) => onChange('itemsPerPage', value)} options={itemsPerPageOptions} />
      </CardContent>
    </Card>
  );
}
