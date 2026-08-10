import { useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { CardGridSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { GeneralSettings } from '@/components/super-admin/settings/GeneralSettings';
import { AuthenticationSettings } from '@/components/super-admin/settings/AuthenticationSettings';
import { EmailSettings } from '@/components/super-admin/settings/EmailSettings';
import { PlatformNotificationSettings } from '@/components/super-admin/settings/PlatformNotificationSettings';
import { StorageSettings } from '@/components/super-admin/settings/StorageSettings';
import { PaymentsSettings } from '@/components/super-admin/settings/PaymentsSettings';
import { PlatformSecuritySettings } from '@/components/super-admin/settings/PlatformSecuritySettings';
import { MaintenanceSettings } from '@/components/super-admin/settings/MaintenanceSettings';
import { ApiSettings } from '@/components/super-admin/settings/ApiSettings';
import { LocalizationSettings } from '@/components/super-admin/settings/LocalizationSettings';
import { BrandingSettings } from '@/components/super-admin/settings/BrandingSettings';
import { MaintenanceModeDialog } from '@/components/dialogs/super-admin/MaintenanceModeDialog';
import { useSystemSettings, useUpdateSystemSettings } from '@/hooks/superAdmin/useSystemSettings';

const sections = [
  { key: 'general', label: 'General' },
  { key: 'authentication', label: 'Authentication' },
  { key: 'email', label: 'Email' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'storage', label: 'Storage' },
  { key: 'payments', label: 'Payments' },
  { key: 'security', label: 'Security' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'api', label: 'API' },
  { key: 'localization', label: 'Localization' },
  { key: 'branding', label: 'Branding' },
];

const SystemSettings = () => {
  const { data: settings, isLoading, isError, refetch } = useSystemSettings();
  const updateSettings = useUpdateSystemSettings();

  const [activeSection, setActiveSection] = useState('general');
  const [localSettings, setLocalSettings] = useState(null);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);

  const current = localSettings ?? settings;

  const updateSection = (section, key, value) => {
    setLocalSettings((prev) => {
      const base = prev ?? settings;
      return { ...base, [section]: { ...base[section], [key]: value } };
    });
    updateSettings.mutate({ section, payload: { [key]: value } });
    toast.success('Setting updated');
  };

  const handleToggleMaintenance = () => {
    const nextValue = !current.maintenance.maintenanceModeEnabled;
    setLocalSettings((prev) => {
      const base = prev ?? settings;
      return { ...base, maintenance: { ...base.maintenance, maintenanceModeEnabled: nextValue } };
    });
    updateSettings.mutate({ section: 'maintenance', payload: { maintenanceModeEnabled: nextValue } });
    setMaintenanceDialogOpen(false);
    toast.success(nextValue ? 'Maintenance mode enabled' : 'Maintenance mode disabled');
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Configure platform-wide behavior across every hospital.</p>
      </section>

      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="flex-wrap">
          {sections.map((section) => (
            <TabsTrigger key={section.key} value={section.key}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading || !current ? (
        <CardGridSkeleton count={1} />
      ) : (
        <>
          {activeSection === 'general' && <GeneralSettings values={current.general} onChange={(key, value) => updateSection('general', key, value)} />}
          {activeSection === 'authentication' && <AuthenticationSettings values={current.authentication} onChange={(key, value) => updateSection('authentication', key, value)} />}
          {activeSection === 'email' && <EmailSettings values={current.email} onChange={(key, value) => updateSection('email', key, value)} />}
          {activeSection === 'notifications' && <PlatformNotificationSettings values={current.notifications} onChange={(key, value) => updateSection('notifications', key, value)} />}
          {activeSection === 'storage' && <StorageSettings values={current.storage} onChange={(key, value) => updateSection('storage', key, value)} />}
          {activeSection === 'payments' && <PaymentsSettings values={current.payments} onChange={(key, value) => updateSection('payments', key, value)} />}
          {activeSection === 'security' && <PlatformSecuritySettings values={current.security} onChange={(key, value) => updateSection('security', key, value)} />}
          {activeSection === 'maintenance' && (
            <MaintenanceSettings
              values={current.maintenance}
              onMessageChange={(value) => updateSection('maintenance', 'maintenanceMessage', value)}
              onToggle={() => setMaintenanceDialogOpen(true)}
            />
          )}
          {activeSection === 'api' && <ApiSettings values={current.api} onChange={(key, value) => updateSection('api', key, value)} />}
          {activeSection === 'localization' && <LocalizationSettings values={current.localization} onChange={(key, value) => updateSection('localization', key, value)} />}
          {activeSection === 'branding' && <BrandingSettings values={current.branding} onChange={(key, value) => updateSection('branding', key, value)} />}
        </>
      )}

      <MaintenanceModeDialog
        enabling={!current?.maintenance?.maintenanceModeEnabled}
        open={maintenanceDialogOpen}
        onOpenChange={setMaintenanceDialogOpen}
        onConfirm={handleToggleMaintenance}
      />
    </div>
  );
};

export default SystemSettings;
