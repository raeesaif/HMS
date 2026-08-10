import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectField, ToggleRow } from './SettingsField';
import { paymentProviderOptions, currencyOptions } from '@/data/superAdmin/systemSettings';

export function PaymentsSettings({ values, onChange }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Payments</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Payment provider status and configuration</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField label="Provider" value={values.provider} onChange={(v) => onChange('provider', v)} options={paymentProviderOptions} />
          <SelectField label="Currency" value={values.currency} onChange={(v) => onChange('currency', v)} options={currencyOptions} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm">
            {values.paymentsEnabled ? <CheckCircle2 className="size-4 text-emerald-500" /> : <XCircle className="size-4 text-rose-500" />}
            Payments {values.paymentsEnabled ? 'Enabled' : 'Disabled'}
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm">
            {values.webhookConnected ? <CheckCircle2 className="size-4 text-emerald-500" /> : <XCircle className="size-4 text-rose-500" />}
            Webhook {values.webhookConnected ? 'Connected' : 'Not Connected'}
          </div>
        </div>
        <ToggleRow label="Accept Payments" description="Allow hospitals to be charged for subscriptions." checked={values.paymentsEnabled} onChange={(v) => onChange('paymentsEnabled', v)} />
        <p className="text-xs text-slate-400">Secret keys and webhook signing secrets are never exposed in this UI.</p>
      </CardContent>
    </Card>
  );
}
