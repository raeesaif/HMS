import { KeyRound, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function SecuritySettings({ twoFactorEnabled, onChangePassword, onEnable2FA, onManage2FA }) {
  return (
    <div className="space-y-4">
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <div>
            <CardTitle className="text-sm font-semibold">Password</CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">Keep your account secure with a strong password</p>
          </div>
          <Button variant="outline" size="sm" onClick={onChangePassword}>
            <KeyRound /> Change Password
          </Button>
        </CardHeader>
        <CardContent className="pt-3">
          <p className="font-mono text-lg tracking-widest text-slate-400">•••••••••••</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <div>
            <CardTitle className="text-sm font-semibold">Two-Factor Authentication</CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">Add an extra layer of protection to your account</p>
          </div>
          <Badge variant="outline" className={twoFactorEnabled ? 'border-emerald-200 text-emerald-600' : 'border-slate-300 text-slate-500'}>
            {twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </CardHeader>
        <CardContent className="pt-3">
          {twoFactorEnabled ? (
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                <ShieldCheck className="size-4 text-emerald-500" />
                Two-factor authentication is protecting your account.
              </p>
              <Button variant="outline" size="sm" onClick={onManage2FA}>
                Manage Two-Factor Authentication
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={onEnable2FA}>
              Enable Two-Factor Authentication
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
