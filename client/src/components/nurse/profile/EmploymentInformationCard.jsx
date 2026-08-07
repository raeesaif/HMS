import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileInformationItem } from './ProfileInformationItem';

export function EmploymentInformationCard({ profile }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Employment Information</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 px-5 py-5 sm:grid-cols-2">
        <ProfileInformationItem label="Employee ID" value={profile.employeeId} readOnly />
        <ProfileInformationItem label="Role" value={profile.role} readOnly />
        <ProfileInformationItem label="Department" value={profile.department} readOnly />
        <ProfileInformationItem label="Assigned Ward" value={profile.assignedWard} />
        <ProfileInformationItem label="Joining Date" value={profile.joiningDate} readOnly />
        <ProfileInformationItem label="Employment Type" value={profile.employmentType} />
        <ProfileInformationItem label="Shift" value={profile.shift} />
        <ProfileInformationItem label="Supervisor" value={profile.supervisor} />
      </div>
    </Card>
  );
}
