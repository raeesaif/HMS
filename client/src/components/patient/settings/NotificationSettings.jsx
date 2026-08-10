import { Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { notificationCategories, notificationChannels } from '@/data/patientSettings';

export function NotificationSettings({ values, onChannelChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Notification Preferences</CardTitle>
        <p className="text-xs text-slate-500">Choose how you want to be notified for each category</p>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="overflow-x-auto">
          <div className="min-w-[480px]">
            <div className="grid grid-cols-[1fr_repeat(3,72px)] items-center gap-2 border-b border-slate-100 pb-2">
              <span />
              {notificationChannels.map((channel) => (
                <span key={channel.key} className="text-center text-[11px] font-medium text-slate-500">
                  {channel.label}
                </span>
              ))}
            </div>
            <div className="divide-y divide-slate-100">
              {notificationCategories.map((category) => (
                <div key={category.key} className="grid grid-cols-[1fr_repeat(3,72px)] items-center gap-2 py-3">
                  <span className="flex items-center gap-1.5 text-sm text-slate-700">
                    {category.label}
                    {category.mandatory && <Lock className="size-3 text-slate-400" aria-label="Required by hospital policy" />}
                  </span>
                  {notificationChannels.map((channel) => (
                    <span key={channel.key} className="flex justify-center">
                      <Switch
                        checked={values[category.key][channel.key]}
                        disabled={category.mandatory}
                        onCheckedChange={(checked) => onChannelChange(category.key, channel.key, checked)}
                        aria-label={`${category.label} — ${channel.label}`}
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
          <Lock className="size-3" />
          System notifications are required and cannot be disabled.
        </p>
      </CardContent>
    </Card>
  );
}
