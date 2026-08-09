import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Bell, Eye, Monitor, Palette, ShieldCheck, SlidersHorizontal, UserRound } from 'lucide-react';
import { receptionistAccountStatus, receptionistProfile } from '@/data/receptionist';
import { defaultReceptionistSettings, receptionistLoginActivity, receptionistSessions } from '@/data/receptionistSettings';
import { SettingsNavigation } from '@/components/reception/settings/SettingsNavigation';
import { AccountSettings } from '@/components/reception/settings/AccountSettings';
import { NotificationSettings } from '@/components/reception/settings/NotificationSettings';
import { SecuritySettings } from '@/components/reception/settings/SecuritySettings';
import { LoginActivity } from '@/components/reception/settings/LoginActivity';
import { ActiveSessions } from '@/components/reception/settings/ActiveSessions';
import { PrivacySettings } from '@/components/reception/settings/PrivacySettings';
import { AppearanceSettings } from '@/components/reception/settings/AppearanceSettings';
import { GeneralPreferences } from '@/components/reception/settings/GeneralPreferences';
import { CardGridSkeleton } from '@/components/reception/LoadingSkeleton';
import { ErrorState } from '@/components/reception/ErrorState';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';
import { ChangePasswordDialog } from '@/components/dialogs/receptionist/ChangePasswordDialog';
import { TwoFactorSetupDialog } from '@/components/dialogs/receptionist/TwoFactorSetupDialog';
import { SessionDialog } from '@/components/dialogs/receptionist/SessionDialog';
import { ResetPreferencesDialog } from '@/components/dialogs/receptionist/ResetPreferencesDialog';

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

  const [settings, setSettings] = useState(defaultReceptionistSettings);
  const [sessions, setSessions] = useState(receptionistSessions);
  const [loginActivity, setLoginActivity] = useState(receptionistLoginActivity);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeSection, setActiveSection] = useState('account');

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [twoFactorSetupOpen, setTwoFactorSetupOpen] = useState(false);
  const [disable2FAOpen, setDisable2FAOpen] = useState(false);
  const [logoutTarget, setLogoutTarget] = useState(null);
  const [logoutSessionOpen, setLogoutSessionOpen] = useState(false);
  const [logoutAllOpen, setLogoutAllOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const loadSettings = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => setIsLoading(false), 700);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const logLoginActivity = (status) => {
    const { date, time } = nowStamp();
    setLoginActivity((current) => [
      { id: `log-${Date.now()}`, date, time, device: 'Desktop', browser: 'Chrome 128', os: 'Windows 11', ip: '103.XXX.XX.21', status },
      ...current,
    ]);
  };

  const handleChannelChange = (categoryKey, channelKey, checked) => {
    setSettings((current) => ({
      ...current,
      notifications: { ...current.notifications, [categoryKey]: { ...current.notifications[categoryKey], [channelKey]: checked } },
    }));
    toast.success('Notification preferences updated.');
  };

  const handleFrequencyChange = (value) => {
    setSettings((current) => ({ ...current, notifications: { ...current.notifications, frequency: value } }));
    toast.success('Notification preferences updated.');
  };

  const handlePrivacyChange = (key, checked) => {
    setSettings((current) => ({ ...current, privacy: { ...current.privacy, [key]: checked } }));
    toast.success('Preferences saved.');
  };

  const handleAppearanceChange = (key, value) => {
    setSettings((current) => ({ ...current, appearance: { ...current.appearance, [key]: value } }));
    toast.success('Preferences saved.');
  };

  const handlePreferenceChange = (key, value) => {
    setSettings((current) => ({ ...current, preferences: { ...current.preferences, [key]: value } }));
    toast.success('Preferences saved.');
  };

  const handleSavePassword = () => logLoginActivity('Password Changed');

  const handleComplete2FASetup = () => {
    setSettings((current) => ({ ...current, security: { ...current.security, twoFactorEnabled: true } }));
    logLoginActivity('2FA Enabled');
  };

  const handleConfirmDisable2FA = () => {
    setSettings((current) => ({ ...current, security: { ...current.security, twoFactorEnabled: false } }));
    setDisable2FAOpen(false);
    toast.success('Two-factor authentication disabled');
  };

  const handleRequestSignOut = (session) => {
    setLogoutTarget(session);
    setLogoutSessionOpen(true);
  };

  const handleConfirmSignOut = () => {
    setSessions((current) => current.filter((session) => session.id !== logoutTarget?.id));
    setLogoutSessionOpen(false);
    toast.success('Session signed out.');
  };

  const handleConfirmSignOutAll = () => {
    setSessions((current) => current.filter((session) => session.isCurrent));
    setLogoutAllOpen(false);
    toast.success('All other sessions signed out.');
  };

  const handleConfirmReset = () => {
    setSettings((current) => ({
      ...current,
      notifications: defaultReceptionistSettings.notifications,
      appearance: defaultReceptionistSettings.appearance,
      preferences: defaultReceptionistSettings.preferences,
      privacy: defaultReceptionistSettings.privacy,
    }));
    setResetOpen(false);
    toast.success('Preferences reset to default.');
  };

  if (hasError) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <ErrorState onRetry={loadSettings} title="Unable to load settings" description="Something went wrong while loading your account settings." />
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
          {activeSection === 'account' && (
            <AccountSettings profile={receptionistProfile} accountStatus={receptionistAccountStatus} onManageProfile={() => navigate('/reception/profile')} />
          )}

          {activeSection === 'notifications' &&
            (isLoading ? (
              <CardGridSkeleton count={1} />
            ) : (
              <NotificationSettings
                values={settings.notifications}
                onChannelChange={handleChannelChange}
                frequency={settings.notifications.frequency}
                onFrequencyChange={handleFrequencyChange}
              />
            ))}

          {activeSection === 'security' &&
            (isLoading ? (
              <CardGridSkeleton count={2} />
            ) : (
              <>
                <SecuritySettings
                  twoFactorEnabled={settings.security.twoFactorEnabled}
                  onChangePassword={() => setPasswordOpen(true)}
                  onEnable2FA={() => setTwoFactorSetupOpen(true)}
                  onManage2FA={() => setDisable2FAOpen(true)}
                />
                <LoginActivity activity={loginActivity} />
              </>
            ))}

          {activeSection === 'privacy' && <PrivacySettings values={settings.privacy} onChange={handlePrivacyChange} />}

          {activeSection === 'appearance' &&
            (isLoading ? <CardGridSkeleton count={1} /> : <AppearanceSettings appearance={settings.appearance} onChange={handleAppearanceChange} />)}

          {activeSection === 'preferences' &&
            (isLoading ? (
              <CardGridSkeleton count={1} />
            ) : (
              <GeneralPreferences preferences={settings.preferences} onChange={handlePreferenceChange} onReset={() => setResetOpen(true)} />
            ))}

          {activeSection === 'sessions' &&
            (isLoading ? (
              <CardGridSkeleton count={2} />
            ) : (
              <ActiveSessions sessions={sessions} onSignOut={handleRequestSignOut} onSignOutAll={() => setLogoutAllOpen(true)} />
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
      <ResetPreferencesDialog open={resetOpen} onOpenChange={setResetOpen} onConfirm={handleConfirmReset} />
    </div>
  );
};

export default Settings;
