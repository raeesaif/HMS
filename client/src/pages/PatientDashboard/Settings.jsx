import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Bell, Eye, Monitor, Palette, ShieldCheck, SlidersHorizontal, UserRound } from 'lucide-react';
import { ErrorState } from '@/components/patient/ErrorState';
import { CardGridSkeleton } from '@/components/patient/LoadingSkeleton';
import { SettingsNavigation } from '@/components/patient/settings/SettingsNavigation';
import { AccountSettings } from '@/components/patient/settings/AccountSettings';
import { NotificationSettings } from '@/components/patient/settings/NotificationSettings';
import { SecuritySettings } from '@/components/patient/settings/SecuritySettings';
import { LoginActivity } from '@/components/patient/settings/LoginActivity';
import { ActiveSessions } from '@/components/patient/settings/ActiveSessions';
import { PrivacySettings } from '@/components/patient/settings/PrivacySettings';
import { AppearanceSettings } from '@/components/patient/settings/AppearanceSettings';
import { GeneralPreferences } from '@/components/patient/settings/GeneralPreferences';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';
import { ChangePasswordDialog } from '@/components/dialogs/patient/ChangePasswordDialog';
import { TwoFactorSetupDialog } from '@/components/dialogs/patient/TwoFactorSetupDialog';
import { SessionDialog } from '@/components/dialogs/patient/SessionDialog';
import { usePatientSettings } from '@/hooks/patient/usePatientSettings';
import { usePatientProfile } from '@/hooks/patient/usePatientProfile';

const sections = [
  { key: 'account', label: 'Account', icon: UserRound },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: ShieldCheck },
  { key: 'privacy', label: 'Privacy', icon: Eye },
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
  { key: 'sessions', label: 'Sessions', icon: Monitor },
];

const nowStamp = () => ({
  date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
  time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
});

const Settings = () => {
  const navigate = useNavigate();
  const { data: profileData, isLoading: profileLoading } = usePatientProfile();
  const { data, setData, isLoading, error, reload } = usePatientSettings();

  const [activeSection, setActiveSection] = useState('account');

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [twoFactorSetupOpen, setTwoFactorSetupOpen] = useState(false);
  const [disable2FAOpen, setDisable2FAOpen] = useState(false);
  const [logoutTarget, setLogoutTarget] = useState(null);
  const [logoutSessionOpen, setLogoutSessionOpen] = useState(false);
  const [logoutAllOpen, setLogoutAllOpen] = useState(false);

  const logLoginActivity = (status) => {
    const { date, time } = nowStamp();
    setData((current) => ({
      ...current,
      loginActivity: [
        { id: `log-${Date.now()}`, date, time, device: 'Desktop', browser: 'Chrome 128', os: 'Windows 11', ip: '103.XXX.XX.34', status },
        ...current.loginActivity,
      ],
    }));
  };

  const updateSettings = (updater) => {
    setData((current) => ({ ...current, settings: updater(current.settings) }));
  };

  const handleChannelChange = (categoryKey, channelKey, checked) => {
    updateSettings((settings) => ({
      ...settings,
      notifications: { ...settings.notifications, [categoryKey]: { ...settings.notifications[categoryKey], [channelKey]: checked } },
    }));
    toast.success('Notification preferences updated.');
  };

  const handlePrivacyChange = (key, checked) => {
    updateSettings((settings) => ({ ...settings, privacy: { ...settings.privacy, [key]: checked } }));
    toast.success('Preferences saved.');
  };

  const handleAppearanceChange = (key, value) => {
    updateSettings((settings) => ({ ...settings, appearance: { ...settings.appearance, [key]: value } }));
    toast.success('Preferences saved.');
  };

  const handlePreferenceChange = (key, value) => {
    updateSettings((settings) => ({ ...settings, preferences: { ...settings.preferences, [key]: value } }));
    toast.success('Preferences saved.');
  };

  const handleSavePassword = () => logLoginActivity('Password Changed');

  const handleComplete2FASetup = () => {
    updateSettings((settings) => ({ ...settings, security: { ...settings.security, twoFactorEnabled: true } }));
    logLoginActivity('2FA Enabled');
  };

  const handleConfirmDisable2FA = () => {
    updateSettings((settings) => ({ ...settings, security: { ...settings.security, twoFactorEnabled: false } }));
    setDisable2FAOpen(false);
    toast.success('Two-factor authentication disabled');
  };

  const handleRequestSignOut = (session) => {
    setLogoutTarget(session);
    setLogoutSessionOpen(true);
  };

  const handleConfirmSignOut = () => {
    setData((current) => ({ ...current, sessions: current.sessions.filter((session) => session.id !== logoutTarget?.id) }));
    setLogoutSessionOpen(false);
    toast.success('Session signed out.');
  };

  const handleConfirmSignOutAll = () => {
    setData((current) => ({ ...current, sessions: current.sessions.filter((session) => session.isCurrent) }));
    setLogoutAllOpen(false);
    toast.success('All other sessions signed out.');
  };

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <ErrorState onRetry={reload} title="Unable to load settings" description="Something went wrong while loading your account settings." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your account preferences, security, and notification settings.</p>
      </section>

      <div className="flex flex-col gap-6 sm:flex-row">
        <SettingsNavigation sections={sections} activeKey={activeSection} onChange={setActiveSection} />

        <div className="min-w-0 flex-1 space-y-4">
          {activeSection === 'account' &&
            (isLoading || profileLoading || !data || !profileData ? (
              <CardGridSkeleton count={1} />
            ) : (
              <AccountSettings profile={profileData.profile} accountStatus={profileData.accountStatus} onManageProfile={() => navigate('/patient/profile')} />
            ))}

          {activeSection === 'notifications' &&
            (isLoading || !data ? (
              <CardGridSkeleton count={1} />
            ) : (
              <NotificationSettings values={data.settings.notifications} onChannelChange={handleChannelChange} />
            ))}

          {activeSection === 'security' &&
            (isLoading || !data ? (
              <CardGridSkeleton count={2} />
            ) : (
              <>
                <SecuritySettings
                  twoFactorEnabled={data.settings.security.twoFactorEnabled}
                  onChangePassword={() => setPasswordOpen(true)}
                  onEnable2FA={() => setTwoFactorSetupOpen(true)}
                  onManage2FA={() => setDisable2FAOpen(true)}
                />
                <LoginActivity activity={data.loginActivity} />
              </>
            ))}

          {activeSection === 'privacy' && data && <PrivacySettings values={data.settings.privacy} onChange={handlePrivacyChange} />}

          {activeSection === 'appearance' &&
            (isLoading || !data ? <CardGridSkeleton count={1} /> : <AppearanceSettings appearance={data.settings.appearance} onChange={handleAppearanceChange} />)}

          {activeSection === 'preferences' &&
            (isLoading || !data ? (
              <CardGridSkeleton count={1} />
            ) : (
              <GeneralPreferences preferences={data.settings.preferences} onChange={handlePreferenceChange} />
            ))}

          {activeSection === 'sessions' &&
            (isLoading || !data ? (
              <CardGridSkeleton count={2} />
            ) : (
              <ActiveSessions sessions={data.sessions} onSignOut={handleRequestSignOut} onSignOutAll={() => setLogoutAllOpen(true)} />
            ))}
        </div>
      </div>

      <ChangePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} onSave={handleSavePassword} />
      <TwoFactorSetupDialog open={twoFactorSetupOpen} onOpenChange={setTwoFactorSetupOpen} onComplete={handleComplete2FASetup} />

      <ConfirmDialog
        open={disable2FAOpen}
        onOpenChange={setDisable2FAOpen}
        title="Disable two-factor authentication?"
        description="Your account will only be protected by your password. This is not recommended."
        confirmLabel="Disable"
        variant="destructive"
        onConfirm={handleConfirmDisable2FA}
      />

      <SessionDialog mode="single" session={logoutTarget} open={logoutSessionOpen} onOpenChange={setLogoutSessionOpen} onConfirm={handleConfirmSignOut} />
      <SessionDialog mode="all" open={logoutAllOpen} onOpenChange={setLogoutAllOpen} onConfirm={handleConfirmSignOutAll} />
    </div>
  );
};

export default Settings;
