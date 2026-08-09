import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const privacyFields = [
  { key: 'showOnlineStatus', label: 'Show Online Status', description: 'Let staff see when you are online in the system.' },
  { key: 'showAvailability', label: 'Show Availability to Staff', description: 'Display your current availability status to nursing staff.' },
  {
    key: 'allowInternalProfileVisibility',
    label: 'Allow Internal Profile Visibility',
    description: 'Allow other hospital staff to view your professional profile.',
  },
];

export function PrivacySettings({ values, onChange }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-sm font-semibold">Privacy</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Control what other hospital staff can see about you</p>
      </CardHeader>
      <CardContent className="divide-y divide-slate-100 px-5 py-2">
        {privacyFields.map((field) => (
          <div key={field.key} className="flex items-center justify-between gap-4 py-3 first:pt-3 last:pb-3">
            <div>
              <p className="text-sm font-medium text-slate-900">{field.label}</p>
              <p className="text-xs text-slate-500">{field.description}</p>
            </div>
            <Switch checked={values[field.key]} onCheckedChange={(checked) => onChange(field.key, checked)} />
          </div>
        ))}
      </CardContent>
      <div className="border-t border-slate-100 px-5 py-3">
        <p className="text-xs text-slate-400">
          Some information is required for patient care and hospital operations and cannot be hidden.
        </p>
      </div>
    </Card>
  );
}
