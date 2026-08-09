import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, KeyRound, Pencil, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';
import {
  doctorAccountStatus,
  doctorProfile,
  doctorProfileActivity,
  doctorWorkSchedule,
} from '@/data/doctor';
import { DoctorProfileHeader } from '@/components/doctor/profile/DoctorProfileHeader';
import { PersonalInformationCard } from '@/components/doctor/profile/PersonalInformationCard';
import { ProfessionalInformationCard } from '@/components/doctor/profile/ProfessionalInformationCard';
import { EmploymentInformationCard } from '@/components/doctor/profile/EmploymentInformationCard';
import { WorkScheduleCard } from '@/components/doctor/profile/WorkScheduleCard';
import { EmergencyContactCard } from '@/components/doctor/profile/EmergencyContactCard';
import { AccountStatusCard } from '@/components/doctor/profile/AccountStatusCard';
import { ProfileActivityTimeline } from '@/components/doctor/profile/ProfileActivityTimeline';
import { EditDoctorProfileDialog } from '@/components/dialogs/doctor/EditDoctorProfileDialog';
import { ChangeDoctorPasswordDialog } from '@/components/dialogs/doctor/ChangeDoctorPasswordDialog';
import { UploadDoctorAvatarDialog } from '@/components/dialogs/doctor/UploadDoctorAvatarDialog';
import { ProfileCorrectionDialog } from '@/components/dialogs/doctor/ProfileCorrectionDialog';
import {
  HeaderSkeleton,
  InfoCardSkeleton,
  ScheduleCardSkeleton,
  TimelineSkeleton,
} from '@/components/doctor/profile/LoadingSkeleton';

const nowStamp = () => ({
  date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
  time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
});

const DoctorProfile = () => {
  const [profile, setProfile] = useState(doctorProfile);
  const [accountStatus, setAccountStatus] = useState(doctorAccountStatus);
  const [activity, setActivity] = useState(doctorProfileActivity);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [correctionField, setCorrectionField] = useState(null);

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
    setActivity((current) => [
      { id: `pact-${Date.now()}`, action, date, time, performedBy: `Dr. ${profile.name}` },
      ...current,
    ]);
  };

  const handleAvailabilityChange = (value) => setProfile((prev) => ({ ...prev, availability: value }));

  const handleSaveProfile = (data) => {
    const { date, time } = nowStamp();
    setProfile((prev) => ({ ...prev, ...data }));
    setAccountStatus((prev) => ({ ...prev, lastProfileUpdate: `${date}, ${time}` }));
    logActivity('Contact Information Updated');
  };

  const handleSavePassword = () => {
    setAccountStatus((prev) => ({ ...prev, passwordLastChanged: nowStamp().date }));
    logActivity('Password Changed');
  };

  const handleSaveAvatar = (imageUrl) => {
    setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
    logActivity('Profile Picture Updated');
  };

  const handleRequestCorrection = (field) => {
    setCorrectionField(field ?? null);
    setCorrectionOpen(true);
  };

  const handleSubmitCorrection = () => {
    // Correction requests are advisory — the original hospital-controlled
    // record is never modified from this page, only submitted for review.
    toast.info('An administrator will review this request shortly.');
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
      <section className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
          <p className="mt-1 text-sm text-slate-500">View and manage your personal and professional information.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPasswordOpen(true)}>
            <KeyRound /> Change Password
          </Button>
          <Button onClick={() => setEditOpen(true)}>
            <Pencil /> Edit Profile
          </Button>
        </div>
      </section>

      {isLoading ? (
        <HeaderSkeleton />
      ) : (
        <DoctorProfileHeader
          profile={profile}
          availability={profile.availability}
          onAvailabilityChange={handleAvailabilityChange}
          onEditProfile={() => setEditOpen(true)}
          onUploadPhoto={() => setAvatarOpen(true)}
        />
      )}

      <Alert variant="warning">
        <ShieldAlert />
        <AlertTitle>Managed by hospital administration</AlertTitle>
        <AlertDescription>
          Your role, department, employee ID, and employment information are managed by the hospital administrator.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          {isLoading ? (
            <InfoCardSkeleton rows={6} />
          ) : (
            <PersonalInformationCard profile={profile} />
          )}

          {isLoading ? (
            <InfoCardSkeleton rows={6} />
          ) : (
            <ProfessionalInformationCard profile={profile} onRequestCorrection={() => handleRequestCorrection('Specialization')} />
          )}

          {isLoading ? (
            <InfoCardSkeleton rows={4} />
          ) : (
            <EmergencyContactCard contact={profile.emergencyContact} onEdit={() => setEditOpen(true)} />
          )}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <InfoCardSkeleton rows={8} />
          ) : (
            <EmploymentInformationCard profile={profile} onRequestCorrection={() => handleRequestCorrection('Employee ID')} />
          )}

          {isLoading ? <ScheduleCardSkeleton /> : <WorkScheduleCard schedule={doctorWorkSchedule} />}

          {isLoading ? <InfoCardSkeleton rows={4} /> : <AccountStatusCard accountStatus={accountStatus} />}
        </div>
      </div>

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {isLoading ? <TimelineSkeleton /> : <ProfileActivityTimeline activity={activity} />}
      </Card>

      <Card className="rounded-xl border-dashed border-slate-300 bg-slate-50 shadow-none">
        <CardContent className="px-5 py-5">
          <p className="text-sm font-semibold text-slate-700">Account Management</p>
          <p className="mt-1 text-sm text-slate-500">
            Your account is managed by the hospital administrator. If you need account deactivation or role changes,
            please contact the administrator.
          </p>
        </CardContent>
      </Card>

      <EditDoctorProfileDialog profile={profile} open={editOpen} onOpenChange={setEditOpen} onSave={handleSaveProfile} />
      <ChangeDoctorPasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} onSave={handleSavePassword} />
      <UploadDoctorAvatarDialog profile={profile} open={avatarOpen} onOpenChange={setAvatarOpen} onSave={handleSaveAvatar} />
      <ProfileCorrectionDialog
        profile={profile}
        defaultField={correctionField}
        open={correctionOpen}
        onOpenChange={setCorrectionOpen}
        onSubmit={handleSubmitCorrection}
      />
    </div>
  );
};

export default DoctorProfile;
