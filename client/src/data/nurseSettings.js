import { nurseProfileData } from './nurseProfile';

export const nurseAccountData = {
  email: nurseProfileData.email,
  employeeId: nurseProfileData.employeeId,
  role: nurseProfileData.role,
  department: nurseProfileData.department,
};

export const defaultSecuritySettings = {
  twoFactorEnabled: false,
};

export const notificationPreferenceFields = [
  { key: 'medicationReminders', label: 'Medication Reminders', description: 'Get notified when a patient medication dose is due.' },
  { key: 'taskNotifications', label: 'Task Notifications', description: 'Get notified when a nursing task is assigned to you.' },
  { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Get notified immediately for emergency patient events.' },
  { key: 'doctorRequests', label: 'Doctor Requests', description: 'Get notified when a doctor requests patient observation.' },
  { key: 'labReportNotifications', label: 'Lab Report Notifications', description: 'Get notified when new lab results are available for review.' },
  { key: 'hospitalAnnouncements', label: 'Hospital Announcements', description: 'Get notified about hospital-wide announcements and maintenance.' },
  { key: 'emailNotifications', label: 'Email Notifications', description: 'Also receive a copy of your notifications by email.' },
];

export const defaultNotificationPreferences = {
  medicationReminders: true,
  taskNotifications: true,
  emergencyAlerts: true,
  doctorRequests: true,
  labReportNotifications: true,
  hospitalAnnouncements: false,
  emailNotifications: true,
};

export const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ur', label: 'Urdu' },
];

export const defaultAppearanceSettings = {
  theme: 'system',
  language: 'en',
};

export const nurseSessionsData = [
  {
    id: 'SESS-1',
    device: 'Windows PC',
    browser: 'Chrome 126',
    os: 'Windows 11',
    ipAddress: '10.20.4.12',
    lastActive: 'Active now',
    isCurrent: true,
  },
  {
    id: 'SESS-2',
    device: 'iPhone 14',
    browser: 'Safari 17',
    os: 'iOS 17.5',
    ipAddress: '10.20.4.48',
    lastActive: '2 hours ago',
    isCurrent: false,
  },
  {
    id: 'SESS-3',
    device: 'iPad Air',
    browser: 'Safari 17',
    os: 'iPadOS 17.5',
    ipAddress: '10.20.5.10',
    lastActive: 'Yesterday, 09:40 PM',
    isCurrent: false,
  },
];
