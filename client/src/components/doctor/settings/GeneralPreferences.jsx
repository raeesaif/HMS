import { RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
  dateFormatOptions,
  defaultDashboardPageOptions,
  itemsPerPageOptions,
  timeFormatOptions,
  timezoneOptions,
} from '@/data/doctorSettings';

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

export function GeneralPreferences({ preferences, onChange, onReset }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-sm font-semibold">General Preferences</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">Personal application defaults</p>
        </div>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw /> Reset Preferences
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2">
        <PreferenceSelect
          label="Default Dashboard Page"
          value={preferences.defaultDashboardPage}
          onChange={(value) => onChange('defaultDashboardPage', value)}
          options={defaultDashboardPageOptions}
        />
        <PreferenceSelect
          label="Date Format"
          value={preferences.dateFormat}
          onChange={(value) => onChange('dateFormat', value)}
          options={dateFormatOptions}
        />
        <PreferenceSelect
          label="Time Format"
          value={preferences.timeFormat}
          onChange={(value) => onChange('timeFormat', value)}
          options={timeFormatOptions}
        />
        <PreferenceSelect
          label="Timezone"
          value={preferences.timezone}
          onChange={(value) => onChange('timezone', value)}
          options={timezoneOptions}
        />
        <PreferenceSelect
          label="Items Per Page"
          value={preferences.itemsPerPage}
          onChange={(value) => onChange('itemsPerPage', value)}
          options={itemsPerPageOptions}
        />
      </CardContent>
    </Card>
  );
}
