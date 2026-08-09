import { Monitor, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FieldLabel } from '@/components/ui/field';
import { themeOptions } from '@/data/receptionistSettings';

const themeIcons = { Light: Sun, Dark: Moon, System: Monitor };

export function AppearanceSettings({ appearance, onChange }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-sm font-semibold">Appearance</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Personalize how the dashboard looks on this device</p>
      </CardHeader>
      <CardContent className="space-y-1.5 px-5 py-5">
        <FieldLabel>Theme</FieldLabel>
        <RadioGroup value={appearance.theme} onValueChange={(value) => onChange('theme', value)} className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {themeOptions.map((option) => {
            const Icon = themeIcons[option.value];
            return (
              <Label
                key={option.value}
                className="flex items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm font-normal has-data-checked:border-primary has-data-checked:bg-primary/5"
              >
                <RadioGroupItem value={option.value} />
                {Icon && <Icon className="size-3.5 text-slate-500" />}
                {option.label}
              </Label>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
