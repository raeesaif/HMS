import { useEffect, useState } from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';
import { receptionistAccountStatus, receptionistProfile, receptionistProfileActivity } from '@/data/receptionist';
import { ProfileHeader } from '@/components/reception/profile/ProfileHeader';
import { PersonalInformationCard } from '@/components/reception/profile/PersonalInformationCard';
import { EmploymentInformationCard } from '@/components/reception/profile/EmploymentInformationCard';
import { EmergencyContactCard } from '@/components/reception/profile/EmergencyContactCard';
import { AccountStatusCard } from '@/components/reception/profile/AccountStatusCard';
import { ProfileActivityTimeline } from '@/components/reception/profile/ProfileActivityTimeline';
import { EditProfileDialog } from '@/components/dialogs/receptionist/EditProfileDialog';
import { UploadAvatarDialog } from '@/components/dialogs/receptionist/UploadAvatarDialog';
import { CardGridSkeleton } from '@/components/reception/LoadingSkeleton';

const nowStamp = () => ({
  date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
  time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
});

const Profile = () => {
  const [profile, setProfile] = useState(receptionistProfile);
  const [accountStatus, setAccountStatus] = useState(receptionistAccountStatus);
  const [activity, setActivity] = useState(receptionistProfileActivity);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const loadProfile = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => setIsLoading(false), 700);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const logActivity = (action) => {
    const { date, time } = nowStamp();
    setActivity((current) => [{ id: `rpact-${Date.now()}`, action, date, time, performedBy: profile.name }, ...current]);
  };

  const handleSaveProfile = (data) => {
    const { date, time } = nowStamp();
    setProfile((prev) => ({ ...prev, ...data }));
    setAccountStatus((prev) => ({ ...prev, lastProfileUpdate: `${date}, ${time}` }));
    logActivity('Contact Information Updated');
  };

  const handleSaveAvatar = (imageUrl) => {
    setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
    logActivity('Profile Picture Updated');
  };

  if (hasError) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <Card className="rounded-xl border-border shadow-sm">
          <CardContent className="py-16">
            <EmptyState
              icon={AlertTriangle}
              title="Unable to load profile"
              description="Something went wrong while loading your profile information."
              action={<Button onClick={loadProfile}>Try Again</Button>}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">View and manage your personal information.</p>
      </section>

      {isLoading ? (
        <CardGridSkeleton count={1} />
      ) : (
        <ProfileHeader profile={profile} onEditProfile={() => setEditOpen(true)} onUploadPhoto={() => setAvatarOpen(true)} />
      )}

      <Alert variant="warning">
        <ShieldAlert />
        <AlertTitle>Managed by hospital administration</AlertTitle>
        <AlertDescription>Your role, employee ID, department, and employment status are managed by the hospital administrator.</AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          {isLoading ? <CardGridSkeleton count={1} /> : <PersonalInformationCard profile={profile} />}
          {isLoading ? <CardGridSkeleton count={1} /> : <EmergencyContactCard contact={profile.emergencyContact} onEdit={() => setEditOpen(true)} />}
        </div>

        <div className="space-y-4">
          {isLoading ? <CardGridSkeleton count={1} /> : <EmploymentInformationCard profile={profile} />}
          {isLoading ? <CardGridSkeleton count={1} /> : <AccountStatusCard accountStatus={accountStatus} />}
        </div>
      </div>

      {isLoading ? <CardGridSkeleton count={1} /> : <ProfileActivityTimeline activity={activity} />}

      <EditProfileDialog profile={profile} open={editOpen} onOpenChange={setEditOpen} onSave={handleSaveProfile} />
      <UploadAvatarDialog profile={profile} open={avatarOpen} onOpenChange={setAvatarOpen} onSave={handleSaveAvatar} />
    </div>
  );
};

export default Profile;
