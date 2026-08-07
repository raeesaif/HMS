import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileInformationItem } from './ProfileInformationItem';

export function PersonalInformationCard({ profile }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 px-5 py-5 sm:grid-cols-2">
        <ProfileInformationItem label="First Name" value={profile.firstName} />
        <ProfileInformationItem label="Last Name" value={profile.lastName} />
        <ProfileInformationItem label="Email Address" value={profile.email} />
        <ProfileInformationItem label="Phone Number" value={profile.phone} />
        <ProfileInformationItem label="Gender" value={profile.gender} />
        <ProfileInformationItem label="Date of Birth" value={profile.dateOfBirth} />
        <ProfileInformationItem label="Blood Group" value={profile.bloodGroup} />
        <ProfileInformationItem label="CNIC / National ID" value={profile.nationalId} readOnly />
        <div className="sm:col-span-2">
          <ProfileInformationItem label="Address" value={profile.address} />
        </div>
      </div>
    </Card>
  );
}
