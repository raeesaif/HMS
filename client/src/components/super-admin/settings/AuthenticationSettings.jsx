import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextField, SelectField, ToggleRow } from './SettingsField';
import { passwordPolicyOptions, sessionDurationOptions } from '@/data/superAdmin/systemSettings';

export function AuthenticationSettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Authentication</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Password rules, sessions, and sign-in security</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField label="Password Policy" value={values.passwordPolicy} onChange={(v) => onChange('passwordPolicy', v)} options={passwordPolicyOptions} />
          <SelectField label="Session Duration" value={values.sessionDuration} onChange={(v) => onChange('sessionDuration', v)} options={sessionDurationOptions} />
          <TextField label="Max Login Attempts" value={values.maxLoginAttempts} onChange={(v) => onChange('maxLoginAttempts', v)} type="number" />
          <TextField label="Account Lockout (minutes)" value={values.accountLockoutMinutes} onChange={(v) => onChange('accountLockoutMinutes', v)} type="number" />
        </div>
        <div className="divide-y divide-slate-100 border-t border-slate-100 pt-1">
          <ToggleRow label="Password Reset" description="Allow users to reset their password via email." checked={values.passwordResetEnabled} onChange={(v) => onChange('passwordResetEnabled', v)} />
          <ToggleRow label="Email Verification Required" description="Require email verification before first login." checked={values.emailVerificationRequired} onChange={(v) => onChange('emailVerificationRequired', v)} />
          <ToggleRow label="Enforce Two-Factor Authentication" description="Require 2FA for all hospital admins." checked={values.twoFactorEnforced} onChange={(v) => onChange('twoFactorEnforced', v)} />
        </div>
      </CardContent>
    </Card>
  );
}
