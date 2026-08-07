import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Download, KeyRound, LogOut, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChangePasswordDialog } from '@/shared/ChangePasswordDialog';
import { useNurseSettings } from '@/hooks/useNurseSettings';
import { ProfileInformationItem } from '@/components/nurse/profile/ProfileInformationItem';
import { SettingsSection } from '@/components/nurse/settings/SettingsSection';
import { SettingsCard } from '@/components/nurse/settings/SettingsCard';
import { TwoFactorCard } from '@/components/nurse/settings/TwoFactorCard';
import { NotificationSettings } from '@/components/nurse/settings/NotificationSettings';
import { ThemeSelector } from '@/components/nurse/settings/ThemeSelector';
import { LanguageSelector } from '@/components/nurse/settings/LanguageSelector';
import { SessionTable } from '@/components/nurse/settings/SessionTable';
import { SaveChangesBar } from '@/components/nurse/settings/SaveChangesBar';
import { LogoutConfirmDialog } from '@/components/nurse/settings/LogoutConfirmDialog';
import { SettingsLoadingSkeleton } from '@/components/nurse/settings/LoadingSkeleton';

const Settings = () => {
  const navigate = useNavigate();
  const { data: settings, setData: setSettings, loading } = useNurseSettings();

  // Adjusts local state once the async-loaded settings arrive, without an Effect —
  // see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [savedSnapshot, setSavedSnapshot] = useState(null);
  if (settings && savedSnapshot === null) {
    setSavedSnapshot({ notifications: settings.notifications, appearance: settings.appearance });
  }

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const hasUnsavedChanges = Boolean(
    settings &&
      savedSnapshot &&
      (settings.notifications !== savedSnapshot.notifications || settings.appearance !== savedSnapshot.appearance)
  );

  const handleNotificationChange = (key, value) => {
    setSettings((current) => ({ ...current, notifications: { ...current.notifications, [key]: value } }));
  };

  const handleThemeChange = (theme) => {
    setSettings((current) => ({ ...current, appearance: { ...current.appearance, theme } }));
  };

  const handleLanguageChange = (language) => {
    setSettings((current) => ({ ...current, appearance: { ...current.appearance, language } }));
  };

  const handleSaveChanges = () => {
    setSavedSnapshot({ notifications: settings.notifications, appearance: settings.appearance });
    toast.success('Settings saved successfully');
  };

  const handleDiscardChanges = () => {
    setSettings((current) => ({
      ...current,
      notifications: savedSnapshot.notifications,
      appearance: savedSnapshot.appearance,
    }));
    toast('Changes discarded');
  };

  const handleToggleTwoFactor = (checked) => {
    setSettings((current) => ({ ...current, security: { ...current.security, twoFactorEnabled: checked } }));
    toast.success(checked ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled');
  };

  const handleLogoutSession = (session) => {
    setSettings((current) => ({ ...current, sessions: current.sessions.filter((item) => item.id !== session.id) }));
    toast.success(`Signed out on ${session.device}`);
  };

  const handleDownloadData = () => {
    toast.success('Your account data export has been requested. You will receive an email when it is ready.');
  };

  const handleRequestDeactivation = () => {
    toast.success('Deactivation request sent to your administrator.');
  };

  const handleLogout = () => {
    setLogoutConfirmOpen(false);
    navigate('/login');
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-8 pb-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your account, security and application preferences.</p>
      </section>

      {loading || !settings ? (
        <SettingsLoadingSkeleton />
      ) : (
        <>
          <SettingsSection title="Account Settings" description="Your core account details, managed by the hospital administrator.">
            <SettingsCard action={<Button variant="outline" onClick={() => navigate('/nurse/profile')}>View Profile</Button>}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
                <ProfileInformationItem label="Email Address" value={settings.account.email} readOnly />
                <ProfileInformationItem label="Employee ID" value={settings.account.employeeId} readOnly />
                <ProfileInformationItem label="Role" value={settings.account.role} readOnly />
                <ProfileInformationItem label="Department" value={settings.account.department} readOnly />
              </div>
            </SettingsCard>
          </SettingsSection>

          <SettingsSection title="Security" description="Manage your password and account protection.">
            <div className="space-y-4">
              <SettingsCard
                title="Password"
                description="Keep your account secure with a strong password."
                action={
                  <Button variant="outline" onClick={() => setPasswordDialogOpen(true)}>
                    <KeyRound /> Change Password
                  </Button>
                }
              >
                <p className="font-mono text-lg tracking-widest text-slate-400">•••••••••••</p>
              </SettingsCard>

              <TwoFactorCard enabled={settings.security.twoFactorEnabled} onToggle={handleToggleTwoFactor} />
            </div>
          </SettingsSection>

          <SettingsSection title="Notification Preferences" description="Control which alerts you receive while on shift.">
            <NotificationSettings values={settings.notifications} onChange={handleNotificationChange} />
          </SettingsSection>

          <SettingsSection title="Appearance" description="Personalize how the dashboard looks and reads.">
            <div className="space-y-4">
              <SettingsCard title="Theme" description="Choose how the dashboard appears on this device.">
                <ThemeSelector value={settings.appearance.theme} onChange={handleThemeChange} />
              </SettingsCard>
              <SettingsCard title="Language" description="Choose your preferred display language.">
                <LanguageSelector value={settings.appearance.language} onChange={handleLanguageChange} />
              </SettingsCard>
            </div>
          </SettingsSection>

          <SettingsSection title="Active Sessions" description="Review and manage where you're signed in.">
            <SessionTable sessions={settings.sessions} onLogoutSession={handleLogoutSession} />
          </SettingsSection>

          <SettingsSection title="Privacy" description="Manage your personal data and account requests.">
            <SettingsCard>
              <div className="divide-y divide-border">
                <div className="flex flex-col gap-3 py-3 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Download My Account Information</p>
                    <p className="text-sm text-slate-500">Request an export of your personal and account data.</p>
                  </div>
                  <Button variant="outline" onClick={handleDownloadData}>
                    <Download /> Request Export
                  </Button>
                </div>
                <div className="flex flex-col gap-3 py-3 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Request Account Deactivation</p>
                    <p className="text-sm text-slate-500">Ask your administrator to deactivate this account.</p>
                  </div>
                  <Button variant="outline" onClick={handleRequestDeactivation}>
                    Request Deactivation
                  </Button>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>

          <SettingsSection title="Danger Zone" description="Session and account controls that need extra care.">
            <div className="space-y-4">
              <SettingsCard
                title="Logout"
                description="Sign out of your current session on this device."
                action={
                  <Button variant="destructive" onClick={() => setLogoutConfirmOpen(true)}>
                    <LogOut /> Logout
                  </Button>
                }
              />

              <Alert>
                <ShieldAlert />
                <AlertTitle>Administrator-Controlled Account</AlertTitle>
                <AlertDescription>
                  This account is managed by the hospital administrator. Account deletion and role changes are not permitted.
                </AlertDescription>
              </Alert>
            </div>
          </SettingsSection>

          <ChangePasswordDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen} />
          <LogoutConfirmDialog open={logoutConfirmOpen} onOpenChange={setLogoutConfirmOpen} onConfirm={handleLogout} />

          {hasUnsavedChanges && <SaveChangesBar onSave={handleSaveChanges} onDiscard={handleDiscardChanges} />}
        </>
      )}
    </div>
  );
};

export default Settings;
