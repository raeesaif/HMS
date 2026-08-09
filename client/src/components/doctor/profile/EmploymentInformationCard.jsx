import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProfileField } from './ProfileField';
import { ProfileCorrectionRequest } from './ProfileCorrectionRequest';

export function EmploymentInformationCard({ profile, onRequestCorrection }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Employment Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          <ProfileField label="Employee ID" value={profile.employeeId} locked />
          <ProfileField label="Role" value={profile.role} locked />
          <ProfileField label="Department" value={profile.department} locked />
          <ProfileField label="Specialization" value={profile.specialization} locked />
          <ProfileField label="Employment Type" value={profile.employmentType} locked />
          <ProfileField label="Joining Date" value={profile.joiningDate} locked />
          <div>
            <p className="flex items-center gap-1 text-xs text-slate-500">Employment Status</p>
            <Badge variant="outline" className="mt-1 border-emerald-200 text-emerald-600">
              {profile.employmentStatus}
            </Badge>
          </div>
          <ProfileField label="Current Shift" value={profile.currentShift} locked />
          <ProfileField label="Assigned Location" value={profile.assignedLocation} locked />
          <ProfileField label="Supervisor" value={profile.supervisor} locked />
        </div>

        <ProfileCorrectionRequest onRequest={onRequestCorrection} />
      </CardContent>
    </Card>
  );
}
