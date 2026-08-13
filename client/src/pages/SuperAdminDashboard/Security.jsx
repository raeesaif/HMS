import { useState } from 'react';
import { toast } from 'sonner';
import { KeyRound, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { CardGridSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { SecurityOverviewCard } from '@/components/super-admin/security/SecurityOverviewCard';
import { SessionsTable } from '@/components/super-admin/security/SessionsTable';
import { LoginActivityTable } from '@/components/super-admin/security/LoginActivityTable';
import { ChangePasswordDialog } from '@/components/dialogs/super-admin/ChangePasswordDialog';
import { TwoFactorSetupDialog } from '@/components/dialogs/super-admin/TwoFactorSetupDialog';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';
import { SessionDialog } from '@/components/dialogs/super-admin/SessionDialog';
import {
  useSecurity,
  useEnableTwoFactor,
  useDisableTwoFactor,
  useSignOutSession,
  useSignOutAllSessions,
} from '@/hooks/superAdmin/useSecurity';

const Security = () => {
  const { data, isLoading, isError, refetch } = useSecurity();
  const enableTwoFactor = useEnableTwoFactor();
  const disableTwoFactor = useDisableTwoFactor();
  const signOutSession = useSignOutSession();
  const signOutAllSessions = useSignOutAllSessions();

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [twoFactorSetupOpen, setTwoFactorSetupOpen] = useState(false);
  const [disable2FAOpen, setDisable2FAOpen] = useState(false);
  const [logoutTarget, setLogoutTarget] = useState(null);
  const [logoutSessionOpen, setLogoutSessionOpen] = useState(false);
  const [logoutAllOpen, setLogoutAllOpen] = useState(false);

  const handleSavePassword = () => {
    toast.success('Password changed successfully.');
  };

  const handleComplete2FASetup = () => {
    enableTwoFactor.mutate();
  };

  const handleConfirmDisable2FA = () => {
    disableTwoFactor.mutate(undefined, {
      onSuccess: () => {
        setDisable2FAOpen(false);
        toast.success('Two-factor authentication disabled');
      },
    });
  };

  const handleRequestSignOut = (session) => {
    setLogoutTarget(session);
    setLogoutSessionOpen(true);
  };

  const handleConfirmSignOut = () => {
    if (!logoutTarget) return;
    signOutSession.mutate(logoutTarget.id, {
      onSuccess: () => {
        setLogoutSessionOpen(false);
        toast.success('Session signed out.');
      },
    });
  };

  const handleConfirmSignOutAll = () => {
    signOutAllSessions.mutate(undefined, {
      onSuccess: () => {
        setLogoutAllOpen(false);
        toast.success('All other sessions signed out.');
      },
    });
  };

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Security</h1>
        <p className="mt-1 text-sm text-slate-500">Manage authentication, sessions, and account protection.</p>
      </section>

      {isLoading || !data ? (
        <CardGridSkeleton count={1} />
      ) : (
        <SecurityOverviewCard overview={data.overview} alerts={data.alerts} />
      )}

      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <div>
            <CardTitle className="text-sm font-semibold">Password</CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">Keep your account secure with a strong password</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setPasswordOpen(true)}>
            <KeyRound /> Change Password
          </Button>
        </CardHeader>
        <CardContent className="pt-3">
          <p className="font-mono text-lg tracking-widest text-slate-400">•••••••••••</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <div>
            <CardTitle className="text-sm font-semibold">Two-Factor Authentication</CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">Add an extra layer of protection to your account</p>
          </div>
          <Badge variant="outline" className={data?.overview.twoFactorEnabled ? 'border-emerald-200 text-emerald-600' : 'border-slate-300 text-slate-500'}>
            {data?.overview.twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </CardHeader>
        <CardContent className="pt-3">
          {data?.overview.twoFactorEnabled ? (
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                <ShieldCheck className="size-4 text-emerald-500" />
                Two-factor authentication is protecting your account.
              </p>
              <Button variant="outline" size="sm" onClick={() => setDisable2FAOpen(true)}>
                Manage Two-Factor Authentication
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setTwoFactorSetupOpen(true)}>
              Enable Two-Factor Authentication
            </Button>
          )}
        </CardContent>
      </Card>

      {isLoading || !data ? (
        <CardGridSkeleton count={1} />
      ) : (
        <SessionsTable sessions={data.sessions} onSignOut={handleRequestSignOut} onSignOutAll={() => setLogoutAllOpen(true)} />
      )}

      {isLoading || !data ? <CardGridSkeleton count={1} /> : <LoginActivityTable activity={data.loginActivity} />}

      <ChangePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} onSave={handleSavePassword} />
      <TwoFactorSetupDialog open={twoFactorSetupOpen} onOpenChange={setTwoFactorSetupOpen} onComplete={handleComplete2FASetup} />
      <ConfirmDialog
        open={disable2FAOpen}
        onOpenChange={setDisable2FAOpen}
        title="Disable two-factor authentication?"
        description="Your account will only be protected by your password. This is not recommended for platform administrators."
        confirmLabel="Disable"
        variant="destructive"
        onConfirm={handleConfirmDisable2FA}
      />
      <SessionDialog mode="single" session={logoutTarget} open={logoutSessionOpen} onOpenChange={setLogoutSessionOpen} onConfirm={handleConfirmSignOut} />
      <SessionDialog mode="all" open={logoutAllOpen} onOpenChange={setLogoutAllOpen} onConfirm={handleConfirmSignOutAll} />
    </div>
  );
};

export default Security;
