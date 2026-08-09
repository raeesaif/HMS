import { Camera, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DoctorAvailability } from '@/components/doctor/dashboard/DoctorAvailability';
import { availabilityOptions } from '@/data/doctor';
import { ProfileAvatar } from './ProfileAvatar';

export function DoctorProfileHeader({ profile, availability, onAvailabilityChange, onEditProfile, onUploadPhoto }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <ProfileAvatar
            name={profile.name}
            initials={profile.avatarInitials}
            imageUrl={profile.profileImage}
            onUpload={onUploadPhoto}
          />
          <div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Dr. {profile.name}</h1>
              <Badge variant="outline" className="border-emerald-200 text-emerald-600">
                {profile.employmentStatus}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-slate-600">{profile.professionalTitle}</p>
            <p className="text-xs text-slate-500">
              {profile.department} · {profile.employeeId}
            </p>
            <div className="mt-2 flex justify-center sm:justify-start">
              <DoctorAvailability status={availability} options={availabilityOptions} onChange={onAvailabilityChange} />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 sm:justify-start">
          <Button variant="outline" onClick={onUploadPhoto}>
            <Camera /> Upload Photo
          </Button>
          <Button onClick={onEditProfile}>
            <Pencil /> Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
