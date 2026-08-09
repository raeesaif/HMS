import { ImageIcon } from 'lucide-react';
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
        <ProfileField label="Email Address" value={profile.email} />
        <ProfileField label="Phone Number" value={profile.phone} />
        <ProfileField label="Date of Birth" value={profile.dateOfBirth} />
        <ProfileField label="Gender" value={profile.gender} />
        <div className="sm:col-span-2">
          <ProfileField label="Address" value={profile.address} />
        </div>
        <div>
          <p className="text-xs text-slate-500">Profile Picture</p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-900">
            <ImageIcon className="size-3.5 text-slate-400" />
            {profile.profileImage ? 'Uploaded' : 'Not uploaded'}
          </p>
        </div>
        <ProfileField
          label="Emergency Contact"
          value={profile.emergencyContact ? `${profile.emergencyContact.name} (${profile.emergencyContact.relationship})` : ''}
        />
      </CardContent>
    </Card>
  );
}
