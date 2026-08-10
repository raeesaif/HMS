import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';

export function PersonalInformationCard({ profile }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-3 sm:grid-cols-2">
        <ProfileField label="First Name" value={profile.firstName} />
        <ProfileField label="Last Name" value={profile.lastName} />
        <ProfileField label="Date of Birth" value={profile.dateOfBirth} />
        <ProfileField label="Gender" value={profile.gender} />
        <ProfileField label="Phone" value={profile.phone} />
        <ProfileField label="Email" value={profile.email} />
        <div className="sm:col-span-2">
          <ProfileField label="Address" value={profile.address} />
        </div>
      </CardContent>
    </Card>
  );
}
