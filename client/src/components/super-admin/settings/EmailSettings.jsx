import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextField, SelectField, ToggleRow } from './SettingsField';
import { emailProviderOptions } from '@/data/superAdmin/systemSettings';

export function EmailSettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Email</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Outbound email provider and transactional emails</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SelectField label="Provider" value={values.provider} onChange={(v) => onChange('provider', v)} options={emailProviderOptions} />
          <TextField label="Sender Name" value={values.senderName} onChange={(v) => onChange('senderName', v)} />
          <TextField label="Sender Email" value={values.senderEmail} onChange={(v) => onChange('senderEmail', v)} type="email" />
        </div>
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">SMTP credentials and API keys are never exposed in this UI.</p>
        <div className="divide-y divide-slate-100 border-t border-slate-100 pt-1">
          <ToggleRow label="Email Verification" description="Send verification emails to new accounts." checked={values.emailVerificationEnabled} onChange={(v) => onChange('emailVerificationEnabled', v)} />
          <ToggleRow label="Password Reset" description="Send password reset emails." checked={values.passwordResetEnabled} onChange={(v) => onChange('passwordResetEnabled', v)} />
          <ToggleRow label="Welcome Email" description="Send a welcome email on hospital registration." checked={values.welcomeEmailEnabled} onChange={(v) => onChange('welcomeEmailEnabled', v)} />
          <ToggleRow label="Notification Email" description="Send transactional notification emails." checked={values.notificationEmailEnabled} onChange={(v) => onChange('notificationEmailEnabled', v)} />
        </div>
      </CardContent>
    </Card>
  );
}
