import { Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function BrandingSettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Branding</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Platform colors and logo</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Primary Color</FieldLabel>
            <div className="flex items-center gap-2">
              <span className="size-8 shrink-0 rounded-lg border border-slate-200" style={{ backgroundColor: values.primaryColor }} />
              <Input value={values.primaryColor} onChange={(event) => onChange('primaryColor', event.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <FieldLabel>Accent Color</FieldLabel>
            <div className="flex items-center gap-2">
              <span className="size-8 shrink-0 rounded-lg border border-slate-200" style={{ backgroundColor: values.accentColor }} />
              <Input value={values.accentColor} onChange={(event) => onChange('accentColor', event.target.value)} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-500">
          <ImageIcon className="size-4" />
          {values.logoUploaded ? 'Platform logo uploaded' : 'No logo uploaded yet'}
        </div>
      </CardContent>
    </Card>
  );
}
