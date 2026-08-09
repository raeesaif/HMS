import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function AccountSettings({ profile, accountStatus, onManageProfile }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between pb-0">
        <div>
          <CardTitle className="text-sm font-semibold">Account</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">Your core account details</p>
        </div>
        <Button variant="outline" size="sm" onClick={onManageProfile}>
          Manage Profile <ArrowRight />
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-3 sm:grid-cols-2">
        <InfoField label="Email Address" value={profile.email} />
        <InfoField label="Phone Number" value={profile.phone} />
        <div>
          <p className="text-xs text-slate-500">Account Status</p>
          <Badge variant="outline" className="mt-1 border-emerald-200 text-emerald-600">
            {accountStatus.status}
          </Badge>
        </div>
        <InfoField label="Last Login" value={accountStatus.lastLogin} />
        <InfoField label="Account Created" value={accountStatus.accountCreated} />
      </CardContent>
    </Card>
  );
}
