import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SettingsCard } from './SettingsCard';
import { ToggleSetting } from './ToggleSetting';

export function TwoFactorCard({ enabled, onToggle }) {
  return (
    <SettingsCard title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck className={`size-4 ${enabled ? 'text-emerald-600' : 'text-slate-400'}`} />
        <span className="text-sm text-slate-600">Current status:</span>
        <Badge
          variant="outline"
          className={`border-transparent font-medium ${
            enabled ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
          }`}
        >
          {enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      </div>
      <ToggleSetting
        label={enabled ? 'Disable two-factor authentication' : 'Enable two-factor authentication'}
        description="You'll be asked for a verification code in addition to your password when signing in."
        checked={enabled}
        onCheckedChange={onToggle}
      />
    </SettingsCard>
  );
}
