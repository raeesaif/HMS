import { ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProfileField } from './ProfileField';

export function AccountStatusCard({ accountStatus }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-sm font-semibold">Account Status</CardTitle>
        <Badge variant="outline" className="gap-1 border-emerald-200 text-emerald-600">
          <ShieldCheck className="size-3" />
          {accountStatus.status}
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-3 sm:grid-cols-2">
        <ProfileField label="Account Created" value={accountStatus.accountCreated} />
        <ProfileField label="Last Profile Update" value={accountStatus.lastProfileUpdate} />
        <ProfileField label="Last Login" value={accountStatus.lastLogin} />
        <ProfileField label="Password Last Changed" value={accountStatus.passwordLastChanged} />
      </CardContent>
    </Card>
  );
}
