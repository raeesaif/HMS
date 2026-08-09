export const notificationCategories = [
  { key: 'appointments', label: 'Appointment Notifications' },
  { key: 'patients', label: 'Patient Notifications' },
  { key: 'checkIns', label: 'Check-in Notifications' },
  { key: 'queue', label: 'Queue Notifications' },
  { key: 'emergency', label: 'Emergency Notifications', mandatory: true },
  { key: 'billing', label: 'Billing Notifications' },
  { key: 'system', label: 'System Notifications' },
];

export const notificationChannels = [
  { key: 'email', label: 'Email' },
  { key: 'sms', label: 'SMS' },
  { key: 'push', label: 'Push' },
];

export const notificationFrequencyOptions = [
  { value: 'Real-time', label: 'Real-time' },
  { value: 'Every 15 minutes', label: 'Every 15 minutes' },
  { value: 'Hourly', label: 'Hourly' },
  { value: 'Daily Summary', label: 'Daily Summary' },
];

export const themeOptions = [
  { value: 'Light', label: 'Light' },
  { value: 'Dark', label: 'Dark' },
  { value: 'System', label: 'System' },
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

export const defaultReceptionistSettings = {
  notifications: {
    appointments: { email: true, sms: true, push: true },
    patients: { email: true, sms: false, push: true },
    checkIns: { email: false, sms: false, push: true },
    queue: { email: false, sms: false, push: true },
    emergency: { email: true, sms: true, push: true },
    billing: { email: true, sms: false, push: false },
    system: { email: true, sms: false, push: false },
    frequency: 'Real-time',
  },
  security: { twoFactorEnabled: false },
  privacy: {
    showProfileToStaff: true,
    shareContactWithColleagues: false,
    activityStatusVisible: true,
  },
  appearance: { theme: 'System' },
  preferences: {
    dateFormat: 'DD MMM YYYY',
    timeFormat: '12-hour',
    timezone: 'Asia/Karachi (PKT)',
    itemsPerPage: '25',
  },
};

export const receptionistSessions = [
  { id: 'sess-1', device: 'Windows Desktop', browser: 'Chrome 128', location: 'Islamabad, PK', lastActive: 'Active now', isCurrent: true },
  { id: 'sess-2', device: 'iPhone 14', browser: 'Safari Mobile', location: 'Islamabad, PK', lastActive: '2 hours ago', isCurrent: false },
];

export const receptionistLoginActivity = [
  { id: 'log-1', date: '09 Aug 2026', time: '07:48 AM', device: 'Desktop', browser: 'Chrome 128', os: 'Windows 11', ip: '103.XXX.XX.21', status: 'Successful Login' },
  { id: 'log-2', date: '08 Aug 2026', time: '07:52 AM', device: 'Desktop', browser: 'Chrome 128', os: 'Windows 11', ip: '103.XXX.XX.21', status: 'Successful Login' },
  { id: 'log-3', date: '02 May 2026', time: '10:05 AM', device: 'Desktop', browser: 'Chrome 127', os: 'Windows 11', ip: '103.XXX.XX.21', status: 'Password Changed' },
];
