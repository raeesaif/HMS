import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';

export function PatientInformationCard({ profile }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Patient Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-3 sm:grid-cols-2">
        <ProfileField label="Patient ID" value={profile.patientId} locked />
        <ProfileField label="Registration Date" value={profile.registrationDate} locked />
        <ProfileField label="Blood Group" value={profile.bloodGroup} locked />
        <ProfileField label="Patient Status" value={profile.patientStatus} locked />
      </CardContent>
    </Card>
  );
}
