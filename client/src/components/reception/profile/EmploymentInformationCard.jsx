import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';

export function EmploymentInformationCard({ profile }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Employment Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-3 sm:grid-cols-2">
        <ProfileField label="Employee ID" value={profile.employeeId} locked />
        <ProfileField label="Role" value={profile.role} locked />
        <ProfileField label="Department" value={profile.department} locked />
        <ProfileField label="Employment Status" value={profile.employmentStatus} locked />
        <ProfileField label="Joining Date" value={profile.joiningDate} locked />
        <ProfileField label="Employment Type" value={profile.employmentType} locked />
        <ProfileField label="Current Shift" value={profile.currentShift} locked />
        <ProfileField label="Assigned Location" value={profile.assignedLocation} locked />
        <div className="sm:col-span-2">
          <ProfileField label="Supervisor" value={profile.supervisor} locked />
        </div>
      </CardContent>
    </Card>
  );
}
