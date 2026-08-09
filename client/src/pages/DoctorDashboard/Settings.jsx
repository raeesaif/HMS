import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  AlertTriangle,
  Bell,
  Eye,
  Monitor,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';
import { ChangeDoctorPasswordDialog } from '@/components/dialogs/doctor/ChangeDoctorPasswordDialog';
import { TwoFactorSetupDialog } from '@/components/dialogs/doctor/TwoFactorSetupDialog';
import { LogoutSessionDialog } from '@/components/dialogs/doctor/LogoutSessionDialog';
import { LogoutAllSessionsDialog } from '@/components/dialogs/doctor/LogoutAllSessionsDialog';
import { ResetPreferencesDialog } from '@/components/dialogs/doctor/ResetPreferencesDialog';
import { AccountDeactivationDialog } from '@/components/dialogs/doctor/AccountDeactivationDialog';
import { doctorAccountStatus, doctorProfile } from '@/data/doctor';
import { defaultDoctorSettings, doctorLoginActivity, doctorSessions } from '@/data/doctorSettings';
import { SettingsNavigation } from '@/components/doctor/settings/SettingsNavigation';
import { AccountSettings } from '@/components/doctor/settings/AccountSettings';
import { NotificationSettings } from '@/components/doctor/settings/NotificationSettings';
import { SecuritySettings } from '@/components/doctor/settings/SecuritySettings';
import { LoginActivity } from '@/components/doctor/settings/LoginActivity';
import { ActiveSessions } from '@/components/doctor/settings/ActiveSessions';
import { PrivacySettings } from '@/components/doctor/settings/PrivacySettings';
import { AppearanceSettings } from '@/components/doctor/settings/AppearanceSettings';
import { GeneralPreferences } from '@/components/doctor/settings/GeneralPreferences';
import { DangerZone } from '@/components/doctor/settings/DangerZone';
import {
  ActiveSessionsSkeleton,
  AppearanceSettingsSkeleton,
  GeneralPreferencesSkeleton,
  NotificationSettingsSkeleton,
  SecuritySettingsSkeleton,
} from '@/components/doctor/settings/SettingsSkeleton';

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

const DoctorSettings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(defaultDoctorSettings);
  const [sessions, setSessions] = useState(doctorSessions);
  const [loginActivity, setLoginActivity] = useState(doctorLoginActivity);
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
  const [deactivationOpen, setDeactivationOpen] = useState(false);

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
      { id: `log-${Date.now()}`, date, time, device: 'Desktop', browser: 'Chrome 128', os: 'Windows 11', ip: '103.XXX.XX.12', status },
      ...current,
    ]);
  };

  const handleChannelChange = (categoryKey, channelKey, checked) => {
    setSettings((current) => ({
      ...current,
      notifications: {
        ...current.notifications,
        [categoryKey]: { ...current.notifications[categoryKey], [channelKey]: checked },
      },
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

  const handleSavePassword = () => {
    logLoginActivity('Password Changed');
  };

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
      notifications: defaultDoctorSettings.notifications,
      appearance: defaultDoctorSettings.appearance,
      preferences: defaultDoctorSettings.preferences,
      privacy: defaultDoctorSettings.privacy,
    }));
    setResetOpen(false);
    toast.success('Preferences reset to default.');
  };

  const handleContactAdministrator = () => {
    toast.info('Please contact your hospital administrator via the HR helpdesk.');
  };

  if (hasError) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <Card className="rounded-xl border-border shadow-sm">
          <CardContent className="py-16">
            <EmptyState
              icon={AlertTriangle}
              title="Unable to load settings"
              description="Something went wrong while loading your account settings."
              action={<Button onClick={loadSettings}>Try Again</Button>}
            />
          </CardContent>
        </Card>
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
            <>
              <AccountSettings
                profile={doctorProfile}
                accountStatus={doctorAccountStatus}
                onManageProfile={() => navigate('/doctor/profile')}
              />
              <DangerZone
                onContactAdministrator={handleContactAdministrator}
                onRequestDeactivation={() => setDeactivationOpen(true)}
              />
            </>
          )}

          {activeSection === 'notifications' &&
            (isLoading ? (
              <NotificationSettingsSkeleton />
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
              <SecuritySettingsSkeleton />
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
            (isLoading ? (
              <AppearanceSettingsSkeleton />
            ) : (
              <AppearanceSettings appearance={settings.appearance} onChange={handleAppearanceChange} />
            ))}

          {activeSection === 'preferences' &&
            (isLoading ? (
              <GeneralPreferencesSkeleton />
            ) : (
              <GeneralPreferences
                preferences={settings.preferences}
                onChange={handlePreferenceChange}
                onReset={() => setResetOpen(true)}
              />
            ))}

          {activeSection === 'sessions' &&
            (isLoading ? (
              <ActiveSessionsSkeleton />
            ) : (
              <ActiveSessions sessions={sessions} onSignOut={handleRequestSignOut} onSignOutAll={() => setLogoutAllOpen(true)} />
            ))}
        </div>
      </div>

      <ChangeDoctorPasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} onSave={handleSavePassword} />

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

      <LogoutSessionDialog
        session={logoutTarget}
        open={logoutSessionOpen}
        onOpenChange={setLogoutSessionOpen}
        onConfirm={handleConfirmSignOut}
      />
      <LogoutAllSessionsDialog open={logoutAllOpen} onOpenChange={setLogoutAllOpen} onConfirm={handleConfirmSignOutAll} />
      <ResetPreferencesDialog open={resetOpen} onOpenChange={setResetOpen} onConfirm={handleConfirmReset} />
      <AccountDeactivationDialog open={deactivationOpen} onOpenChange={setDeactivationOpen} onSubmit={() => {}} />
    </div>
  );
};

export default DoctorSettings;
