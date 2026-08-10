import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const privacyFields = [
  { key: 'profileVisibleToStaff', label: 'Profile Visible to Staff', description: 'Let hospital staff view your basic profile information.' },
  { key: 'showOnlineStatus', label: 'Show Online Status', description: 'Display when you are active on the patient portal.' },
  { key: 'allowNonEssentialCommunication', label: 'Allow Non-Essential Communication', description: 'Receive optional updates, tips, and reminders.' },
];

export function PrivacySettings({ values, onChange }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-sm font-semibold">Privacy</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Control what the hospital shares with you and about you</p>
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
        <p className="text-xs text-slate-400">Essential hospital communications (appointment reminders, billing notices) cannot be disabled.</p>
      </div>
    </Card>
  );
}
