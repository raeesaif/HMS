import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FieldLabel } from '@/components/ui/field';
import { SelectField } from './SettingsField';
import { languageOptions } from '@/data/superAdmin/systemSettings';

export function LocalizationSettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Localization</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Default and supported platform languages</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <SelectField label="Default Language" value={values.defaultLanguage} onChange={(v) => onChange('defaultLanguage', v)} options={languageOptions} />
        <div className="space-y-1">
          <FieldLabel>Supported Languages</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {values.supportedLanguages.map((language) => (
              <Badge key={language} variant="outline" className="border-sky-200 text-sky-700">
                {language}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
