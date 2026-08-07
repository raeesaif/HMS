import { useState } from 'react';
import { KeyRound, UserPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNurseProfile } from '@/hooks/useNurseProfile';
import { ProfileHeader } from '@/components/nurse/profile/ProfileHeader';
import { PersonalInformationCard } from '@/components/nurse/profile/PersonalInformationCard';
import { EmploymentInformationCard } from '@/components/nurse/profile/EmploymentInformationCard';
import { EmergencyContactCard } from '@/components/nurse/profile/EmergencyContactCard';
import { ActivityTimeline } from '@/components/nurse/profile/ActivityTimeline';
import { EditProfileDialog } from '@/components/nurse/profile/EditProfileDialog';
import { ChangePasswordDialog } from '@/shared/ChangePasswordDialog';
import { UploadPhotoDialog } from '@/components/nurse/profile/UploadPhotoDialog';
import { ProfileLoadingSkeleton } from '@/components/nurse/profile/LoadingSkeleton';

const nowTimestamp = () => `Today, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

const Profile = () => {
  const { data: profile, setData: setProfile, loading } = useNurseProfile();
  const [openPanel, setOpenPanel] = useState(null);

  const handlePanelOpenChange = (next) => {
    if (!next) setOpenPanel(null);
  };

  const logActivity = (event, icon, detail) => {
    setProfile((current) => ({
      ...current,
      activity: [{ id: `ACT-${Date.now()}`, event, icon, timestamp: nowTimestamp(), detail }, ...current.activity],
    }));
  };

  const handleSaveProfile = (form) => {
    setProfile((current) => ({
      ...current,
      phone: form.phone,
      address: form.address,
      emergencyContact: {
        name: form.emergencyContactName,
        relationship: form.emergencyContactRelationship,
        phone: form.emergencyContactPhone,
        address: form.emergencyContactAddress,
      },
    }));
    logActivity('Profile Updated', 'profile', 'Updated contact and emergency contact details.');
  };

  const handleChangePassword = () => {
    logActivity('Password Changed', 'password', 'Password updated successfully.');
  };

  const handleSavePhoto = (avatarUrl) => {
    setProfile((current) => ({ ...current, avatarUrl }));
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
          <p className="mt-1 text-sm text-slate-500">View and manage your profile information.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => setOpenPanel('edit')} disabled={!profile}>
            <UserPen /> Edit Profile
          </Button>
          <Button onClick={() => setOpenPanel('password')} disabled={!profile}>
            <KeyRound /> Change Password
          </Button>
        </div>
      </section>

      {loading || !profile ? (
        <ProfileLoadingSkeleton />
      ) : (
        <>
          <ProfileHeader profile={profile} onEditPhoto={() => setOpenPanel('photo')} />

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <PersonalInformationCard profile={profile} />
            <EmploymentInformationCard profile={profile} />
          </section>

          <EmergencyContactCard emergencyContact={profile.emergencyContact} />

          <ActivityTimeline activity={profile.activity} />

          <EditProfileDialog
            profile={profile}
            open={openPanel === 'edit'}
            onOpenChange={handlePanelOpenChange}
            onSave={handleSaveProfile}
            onChangePhoto={() => setOpenPanel('photo')}
          />
          <ChangePasswordDialog
            open={openPanel === 'password'}
            onOpenChange={handlePanelOpenChange}
            onSubmit={handleChangePassword}
          />
          <UploadPhotoDialog
            currentPhotoUrl={profile.avatarUrl}
            name={`${profile.firstName} ${profile.lastName}`}
            open={openPanel === 'photo'}
            onOpenChange={handlePanelOpenChange}
            onSave={handleSavePhoto}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
