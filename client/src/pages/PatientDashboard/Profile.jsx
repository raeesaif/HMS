import { useState } from 'react';
import { ErrorState } from '@/components/patient/ErrorState';
import { CardGridSkeleton } from '@/components/patient/LoadingSkeleton';
import { ProfileHeader } from '@/components/patient/profile/ProfileHeader';
import { PersonalInformationCard } from '@/components/patient/profile/PersonalInformationCard';
import { PatientInformationCard } from '@/components/patient/profile/PatientInformationCard';
import { EmergencyContactCard } from '@/components/patient/profile/EmergencyContactCard';
import { ProfileActivityTimeline } from '@/components/patient/profile/ProfileActivityTimeline';
import { EditProfileDialog } from '@/components/dialogs/patient/EditProfileDialog';
import { UploadAvatarDialog } from '@/components/dialogs/patient/UploadAvatarDialog';
import { usePatientProfile } from '@/hooks/patient/usePatientProfile';
import { updatePatientProfile } from '@/services/patient/patientService';

const nowStamp = () => ({
  date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
  time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
});

const Profile = () => {
  const { data, setData, isLoading, error, reload } = usePatientProfile();

  const [editOpen, setEditOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const logActivity = (action) => {
    const { date, time } = nowStamp();
    setData((current) => ({
      ...current,
      activity: [{ id: `ppact-${Date.now()}`, action, date, time, performedBy: current.profile.name }, ...current.activity],
    }));
  };

  const handleSaveProfile = (payload) => {
    updatePatientProfile(payload).then(() => {
      const { date, time } = nowStamp();
      setData((current) => ({
        ...current,
        profile: { ...current.profile, ...payload },
        accountStatus: { ...current.accountStatus, lastProfileUpdate: `${date}, ${time}` },
      }));
      logActivity('Contact Information Updated');
    });
  };

  const handleSaveAvatar = (imageUrl) => {
    updatePatientProfile({ profileImage: imageUrl }).then(() => {
      setData((current) => ({ ...current, profile: { ...current.profile, profileImage: imageUrl } }));
      logActivity('Profile Picture Updated');
    });
  };

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <ErrorState onRetry={reload} title="Unable to load profile" description="Something went wrong while loading your profile information." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">View and manage your personal information.</p>
      </section>

      {isLoading || !data ? (
        <CardGridSkeleton count={1} />
      ) : (
        <ProfileHeader profile={data.profile} onEditProfile={() => setEditOpen(true)} onUploadPhoto={() => setAvatarOpen(true)} />
      )}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          {isLoading || !data ? <CardGridSkeleton count={1} /> : <PersonalInformationCard profile={data.profile} />}
          {isLoading || !data ? <CardGridSkeleton count={1} /> : <EmergencyContactCard contact={data.profile.emergencyContact} onEdit={() => setEditOpen(true)} />}
        </div>

        <div className="space-y-4">
          {isLoading || !data ? <CardGridSkeleton count={1} /> : <PatientInformationCard profile={data.profile} />}
        </div>
      </div>

      {isLoading || !data ? <CardGridSkeleton count={1} /> : <ProfileActivityTimeline activity={data.activity} />}

      {data && (
        <>
          <EditProfileDialog profile={data.profile} open={editOpen} onOpenChange={setEditOpen} onSave={handleSaveProfile} />
          <UploadAvatarDialog profile={data.profile} open={avatarOpen} onOpenChange={setAvatarOpen} onSave={handleSaveAvatar} />
        </>
      )}
    </div>
  );
};

export default Profile;
