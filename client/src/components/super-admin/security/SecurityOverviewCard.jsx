import { AlertTriangle, KeyRound, Monitor, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function OverviewTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <Icon className="size-4 text-slate-400" />
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

export function SecurityOverviewCard({ overview, alerts }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Security Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <OverviewTile icon={overview.twoFactorEnabled ? ShieldCheck : ShieldAlert} label="Two-Factor Auth" value={overview.twoFactorEnabled ? 'Enabled' : 'Disabled'} />
          <OverviewTile icon={KeyRound} label="Password Changed" value={overview.passwordLastChanged} />
          <OverviewTile icon={Monitor} label="Active Sessions" value={overview.activeSessionsCount} />
          <OverviewTile icon={AlertTriangle} label="Recent Failed Logins" value={overview.recentFailedLogins} />
        </div>

        {alerts.length > 0 && (
          <div className="space-y-1.5">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                <AlertTriangle className="size-4 shrink-0" />
                <span className="flex-1">{alert.message}</span>
                <Badge variant="outline" className="border-amber-300 text-amber-700">
                  {alert.timestamp}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
