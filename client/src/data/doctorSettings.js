// Mock data for the Doctor Settings page. Account identity fields (name,
// department, employee ID, email, phone, employment info) intentionally
// live in data/doctor.js and are only referenced here — never duplicated.

export const notificationCategories = [
  { key: 'appointments', label: 'Appointment Notifications' },
  { key: 'patients', label: 'Patient Notifications' },
  { key: 'laboratory', label: 'Laboratory Notifications' },
  { key: 'prescription', label: 'Prescription Notifications' },
  { key: 'emergency', label: 'Emergency Notifications', mandatory: true },
  { key: 'task', label: 'Task Notifications' },
  { key: 'system', label: 'System Notifications' },
];

export const notificationChannels = [
  { key: 'email', label: 'Email' },
  { key: 'inApp', label: 'In-App' },
  { key: 'push', label: 'Push' },
];

export const notificationFrequencyOptions = [
  { value: 'immediately', label: 'Immediately' },
  { value: '15min', label: 'Every 15 minutes' },
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily Summary' },
];

export const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export const densityOptions = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];

export const sidebarOptions = [
  { value: 'expanded', label: 'Expanded' },
  { value: 'collapsed', label: 'Collapsed' },
];

export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ur', label: 'Urdu' },
];

export const dateFormatOptions = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].map((value) => ({ value, label: value }));

export const timeFormatOptions = [
  { value: '12-hour', label: '12-hour' },
  { value: '24-hour', label: '24-hour' },
];

export const timezoneOptions = [
  { value: 'Asia/Karachi', label: 'Pakistan Standard Time' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time' },
  { value: 'UTC', label: 'Coordinated Universal Time' },
];

export const itemsPerPageOptions = ['10', '25', '50'].map((value) => ({ value, label: value }));

export const defaultDashboardPageOptions = [
  { value: '/doctor/dashboard', label: 'Dashboard' },
  { value: '/doctor/appointments', label: 'Appointments' },
  { value: '/doctor/patients', label: 'My Patients' },
];

export const deactivationReasons = [
  'Leaving the hospital',
  'Extended leave of absence',
  'Role or department change',
  'Other',
];

export const defaultDoctorSettings = {
  notifications: {
    appointments: { email: true, inApp: true, push: false },
    patients: { email: true, inApp: true, push: true },
    laboratory: { email: true, inApp: true, push: true },
    prescription: { email: true, inApp: false, push: false },
    emergency: { email: true, inApp: true, push: true },
    task: { email: false, inApp: true, push: false },
    system: { email: true, inApp: true, push: false },
    frequency: 'immediately',
  },
  appearance: { theme: 'system', density: 'comfortable', sidebar: 'expanded', language: 'en' },
  preferences: {
    defaultDashboardPage: '/doctor/dashboard',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12-hour',
    timezone: 'Asia/Karachi',
    itemsPerPage: '25',
  },
  privacy: { showOnlineStatus: true, showAvailability: true, allowInternalProfileVisibility: true },
  security: { twoFactorEnabled: false },
};

export const doctorSessions = [
  { id: 'sess-1', device: 'Chrome on Windows', location: 'Islamabad, Pakistan', ip: '103.XXX.XX.12', lastActive: 'Active now', isCurrent: true },
  { id: 'sess-2', device: 'Safari on iPhone', location: 'Islamabad, Pakistan', ip: '103.XXX.XX.45', lastActive: '2 hours ago', isCurrent: false },
  { id: 'sess-3', device: 'Edge on Windows', location: 'Lahore, Pakistan', ip: '182.XXX.XX.90', lastActive: 'Yesterday, 06:40 PM', isCurrent: false },
];

export const doctorLoginActivity = [
  { id: 'log-1', date: '09 Aug 2026', time: '08:02 AM', device: 'Desktop', browser: 'Chrome 128', os: 'Windows 11', ip: '103.XXX.XX.12', status: 'Successful Login' },
  { id: 'log-2', date: '08 Aug 2026', time: '07:55 AM', device: 'Desktop', browser: 'Chrome 128', os: 'Windows 11', ip: '103.XXX.XX.12', status: 'Successful Login' },
  { id: 'log-3', date: '15 Jun 2026', time: '11:30 AM', device: 'Desktop', browser: 'Chrome 127', os: 'Windows 11', ip: '103.XXX.XX.12', status: 'Password Changed' },
  { id: 'log-4', date: '02 Jun 2026', time: '09:12 PM', device: 'Mobile', browser: 'Safari 17', os: 'iOS 17', ip: '103.XXX.XX.77', status: 'Failed Login' },
];
