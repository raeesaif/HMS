import { useState } from 'react';
import { Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { CardGridSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { ProfileHeader } from '@/components/super-admin/profile/ProfileHeader';
import { SecuritySummaryCard } from '@/components/super-admin/profile/SecuritySummaryCard';
import { ActivitySummaryList } from '@/components/super-admin/profile/ActivitySummaryList';
import { EditProfileDialog } from '@/components/dialogs/super-admin/EditProfileDialog';
import { useSuperAdminProfile, useUpdateProfile } from '@/hooks/superAdmin/useProfile';
import { useSecurity } from '@/hooks/superAdmin/useSecurity';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value ?? '—'}</p>
    </div>
  );
}

const Profile = () => {
  const { data, isLoading, isError, refetch } = useSuperAdminProfile();
  const { data: security, isLoading: securityLoading } = useSecurity();
  const updateProfile = useUpdateProfile();

  const [editOpen, setEditOpen] = useState(false);

  const handleSaveProfile = (payload) => {
    updateProfile.mutate(payload);
  };

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <ErrorState onRetry={refetch} title="Unable to load profile" description="Something went wrong while loading your profile information." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">View and manage your platform administrator profile.</p>
      </section>

      {isLoading || !data ? (
        <CardGridSkeleton count={1} />
      ) : (
        <ProfileHeader profile={data.profile} accountStatus={data.accountStatus} onEditProfile={() => setEditOpen(true)} />
      )}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {isLoading || !data ? (
          <CardGridSkeleton count={1} />
        ) : (
          <Card className="rounded-xl border-border shadow-sm">
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-semibold">Login Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3">
              <InfoField label="Last Login" value={data.accountStatus.lastLogin} />
              <InfoField label="Account Created" value={data.profile.createdDate} />
              <div className="flex items-center gap-2 sm:col-span-2">
                <Monitor className="size-4 text-slate-400" />
                <p className="text-sm text-slate-600">{security?.loginActivity?.[0]?.device ?? 'Desktop'} · {security?.loginActivity?.[0]?.ip ?? '—'}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {securityLoading || !security ? <CardGridSkeleton count={1} /> : <SecuritySummaryCard overview={security.overview} />}
      </div>

      {isLoading || !data ? <CardGridSkeleton count={1} /> : <ActivitySummaryList activity={data.activity} />}

      {data && <EditProfileDialog profile={data.profile} open={editOpen} onOpenChange={setEditOpen} onSave={handleSaveProfile} />}
    </div>
  );
};

export default Profile;
