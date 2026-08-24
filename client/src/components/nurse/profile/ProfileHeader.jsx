import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DutyStatusControl } from '@/shared/DutyStatusControl';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileInformationItem } from './ProfileInformationItem';

export function ProfileHeader({ profile, onEditPhoto, onDutyStatusChange }) {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Card className="gap-0 rounded-xl border-border py-6 shadow-sm">
      <CardContent className="flex flex-col gap-6 px-6 sm:flex-row sm:items-start">
        <ProfileAvatar name={fullName} avatarUrl={profile.avatarUrl} onEditClick={onEditPhoto} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">{fullName}</h2>
            <Badge className="border-transparent bg-emerald-50 font-medium text-emerald-700 [a]:hover:bg-emerald-50">
              {profile.employmentStatus}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-slate-500">
            {profile.role} · {profile.department}
          </p>

          <div className="mt-2">
            <DutyStatusControl status={profile.dutyStatus} onChange={onDutyStatusChange} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            <ProfileInformationItem label="Employee ID" value={profile.employeeId} />
            <ProfileInformationItem label="Department" value={profile.department} />
            <ProfileInformationItem label="Shift" value={profile.shift} />
            <ProfileInformationItem label="Joining Date" value={profile.joiningDate} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
