import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileInformationItem } from './ProfileInformationItem';

export function EmergencyContactCard({ emergencyContact }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Emergency Contact</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 px-5 py-5 sm:grid-cols-2">
        <ProfileInformationItem label="Contact Name" value={emergencyContact.name} />
        <ProfileInformationItem label="Relationship" value={emergencyContact.relationship} />
        <ProfileInformationItem label="Phone Number" value={emergencyContact.phone} />
        <ProfileInformationItem label="Address" value={emergencyContact.address} />
      </div>
    </Card>
  );
}
