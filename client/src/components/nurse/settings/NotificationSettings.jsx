import { notificationPreferenceFields } from '@/data/nurseSettings';
import { SettingsCard } from './SettingsCard';
import { ToggleSetting } from './ToggleSetting';

export function NotificationSettings({ values, onChange }) {
  return (
    <SettingsCard title="Notification Preferences" description="Choose which notifications you want to receive.">
      <div className="divide-y divide-border">
        {notificationPreferenceFields.map((field) => (
          <ToggleSetting
            key={field.key}
            label={field.label}
            description={field.description}
            checked={values[field.key]}
            onCheckedChange={(checked) => onChange(field.key, checked)}
          />
        ))}
      </div>
    </SettingsCard>
  );
}
