import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';

export function AccountStatusCard({ accountStatus }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Account Status</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-3 sm:grid-cols-2">
        <ProfileField label="Status" value={accountStatus.status} />
        <ProfileField label="Account Created" value={accountStatus.accountCreated} />
        <ProfileField label="Last Profile Update" value={accountStatus.lastProfileUpdate} />
        <ProfileField label="Last Login" value={accountStatus.lastLogin} />
        <ProfileField label="Password Last Changed" value={accountStatus.passwordLastChanged} />
      </CardContent>
    </Card>
  );
}
