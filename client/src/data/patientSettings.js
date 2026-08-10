export const notificationCategories = [
  { key: 'appointments', label: 'Appointment Notifications' },
  { key: 'prescriptions', label: 'Prescription Notifications' },
  { key: 'labReports', label: 'Lab Report Notifications' },
  { key: 'billing', label: 'Billing Notifications' },
  { key: 'medicalRecords', label: 'Medical Record Notifications' },
  { key: 'system', label: 'System Notifications', mandatory: true },
];

export const notificationChannels = [
  { key: 'email', label: 'Email' },
  { key: 'inApp', label: 'In-App' },
  { key: 'push', label: 'Push' },
];

export const themeOptions = [
  { value: 'Light', label: 'Light' },
  { value: 'Dark', label: 'Dark' },
  { value: 'System', label: 'System' },
];

export const sidebarOptions = [
  { value: 'Expanded', label: 'Expanded' },
  { value: 'Collapsed', label: 'Collapsed' },
];

export const densityOptions = [
  { value: 'Comfortable', label: 'Comfortable' },
  { value: 'Compact', label: 'Compact' },
];

export const dateFormatOptions = ['DD MMM YYYY', 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].map((value) => ({ value, label: value }));

export const timeFormatOptions = [
  { value: '12-hour', label: '12-hour' },
  { value: '24-hour', label: '24-hour' },
];

export const timezoneOptions = [
  { value: 'Asia/Karachi (PKT)', label: 'Asia/Karachi (PKT)' },
  { value: 'Asia/Dubai (GST)', label: 'Asia/Dubai (GST)' },
  { value: 'UTC', label: 'Coordinated Universal Time' },
];

export const itemsPerPageOptions = ['10', '25', '50'].map((value) => ({ value, label: value }));

export const defaultPatientSettings = {
  notifications: {
    appointments: { email: true, inApp: true, push: true },
    prescriptions: { email: true, inApp: true, push: false },
    labReports: { email: true, inApp: true, push: true },
    billing: { email: true, inApp: true, push: false },
    medicalRecords: { email: false, inApp: true, push: false },
    system: { email: true, inApp: true, push: false },
  },
  security: { twoFactorEnabled: false },
  privacy: {
    profileVisibleToStaff: true,
    showOnlineStatus: false,
    allowNonEssentialCommunication: true,
  },
  appearance: { theme: 'System', sidebar: 'Expanded', density: 'Comfortable' },
  preferences: {
    dateFormat: 'DD MMM YYYY',
    timeFormat: '12-hour',
    timezone: 'Asia/Karachi (PKT)',
    itemsPerPage: '25',
  },
};

export const patientSessions = [
  { id: 'sess-1', device: 'Windows Desktop', browser: 'Chrome 128', location: 'Islamabad, PK', lastActive: 'Active now', isCurrent: true },
  { id: 'sess-2', device: 'iPhone 14', browser: 'Safari Mobile', location: 'Islamabad, PK', lastActive: '3 hours ago', isCurrent: false },
];

export const patientLoginActivity = [
  { id: 'log-1', date: '09 Aug 2026', time: '07:20 PM', device: 'Desktop', browser: 'Chrome 128', os: 'Windows 11', ip: '103.XXX.XX.34', status: 'Successful Login' },
  { id: 'log-2', date: '08 Aug 2026', time: '06:55 PM', device: 'Mobile', browser: 'Safari 17', os: 'iOS 17', ip: '103.XXX.XX.98', status: 'Successful Login' },
  { id: 'log-3', date: '11 Apr 2026', time: '09:45 AM', device: 'Desktop', browser: 'Chrome 126', os: 'Windows 11', ip: '103.XXX.XX.34', status: 'Password Changed' },
];
