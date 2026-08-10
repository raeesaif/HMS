import { Camera, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfileHeader({ profile, onEditProfile, onUploadPhoto }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <button type="button" onClick={onUploadPhoto} className="group relative">
            <Avatar size="lg" className="size-24">
              {profile.profileImage && <AvatarImage src={profile.profileImage} alt={profile.name} />}
              <AvatarFallback className="bg-sky-100 text-2xl text-sky-600">{profile.avatarInitials}</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Camera className="size-3.5" />
            </span>
          </button>
          <div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">{profile.name}</h1>
              <Badge variant="outline" className="border-emerald-200 text-emerald-600">
                {profile.patientStatus}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-slate-600">Patient ID: {profile.patientId}</p>
            <p className="text-xs text-slate-500">{profile.bloodGroup} · Registered {profile.registrationDate}</p>
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
