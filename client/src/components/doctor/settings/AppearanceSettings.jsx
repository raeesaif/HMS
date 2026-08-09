import { Monitor, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldLabel } from '@/components/ui/field';
import { densityOptions, languageOptions, sidebarOptions, themeOptions } from '@/data/doctorSettings';

const themeIcons = { system: Monitor, light: Sun, dark: Moon };

function RadioOptionGroup({ name, value, onChange, options, withIcons = false }) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {options.map((option) => {
        const Icon = withIcons ? themeIcons[option.value] : null;
        return (
          <Label
            key={option.value}
            className="flex items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm font-normal has-data-checked:border-primary has-data-checked:bg-primary/5"
          >
            <RadioGroupItem value={option.value} name={name} />
            {Icon && <Icon className="size-3.5 text-slate-500" />}
            {option.label}
          </Label>
        );
      })}
    </RadioGroup>
  );
}

export function AppearanceSettings({ appearance, onChange }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-sm font-semibold">Appearance</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Personalize how the dashboard looks on this device</p>
      </CardHeader>
      <CardContent className="space-y-5 px-5 py-5">
        <div className="space-y-1.5">
          <FieldLabel>Theme</FieldLabel>
          <RadioOptionGroup
            name="theme"
            value={appearance.theme}
            onChange={(value) => onChange('theme', value)}
            options={themeOptions}
            withIcons
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel>Density</FieldLabel>
          <RadioOptionGroup name="density" value={appearance.density} onChange={(value) => onChange('density', value)} options={densityOptions} />
        </div>

        <div className="space-y-1.5">
          <FieldLabel>Sidebar</FieldLabel>
          <RadioOptionGroup name="sidebar" value={appearance.sidebar} onChange={(value) => onChange('sidebar', value)} options={sidebarOptions} />
        </div>

        <div className="max-w-xs space-y-1.5">
          <FieldLabel>Language</FieldLabel>
          <Select value={appearance.language} onValueChange={(value) => onChange('language', value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
