export const securityOverview = {
  twoFactorEnabled: false,
  passwordLastChanged: '02 May 2026',
  activeSessionsCount: 2,
  recentFailedLogins: 1,
};

export const securityAlerts = [
  { id: 'alert-1', message: 'A login attempt from an unrecognized device was blocked.', severity: 'Warning', timestamp: '08 Aug 2026, 03:00 PM' },
];

export const sessions = [
  { id: 'sess-1', device: 'MacBook Pro', browser: 'Chrome 128', os: 'macOS Sonoma', ip: '10.0.0.4', location: 'San Francisco, US', lastActive: 'Active now', isCurrent: true },
  { id: 'sess-2', device: 'iPhone 15 Pro', browser: 'Safari Mobile', os: 'iOS 18', ip: '10.0.0.9', location: 'San Francisco, US', lastActive: '3 hours ago', isCurrent: false },
];

export const loginActivity = [
  { id: 'log-1', date: '09 Aug 2026', time: '08:00 AM', device: 'Desktop', ip: '10.0.0.4', status: 'Successful Login', location: 'San Francisco, US' },
  { id: 'log-2', date: '08 Aug 2026', time: '03:00 PM', device: 'Unknown', ip: '77.44.10.9', status: 'Failed Login', location: 'Unknown' },
  { id: 'log-3', date: '02 May 2026', time: '10:00 AM', device: 'Desktop', ip: '10.0.0.4', status: 'Password Changed', location: 'San Francisco, US' },
];
