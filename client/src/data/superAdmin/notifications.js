export const announcementTypeOptions = ['Announcement', 'Maintenance', 'Feature Update', 'Billing'];
export const announcementPriorityOptions = ['Low', 'Medium', 'High'];
export const recipientOptions = ['All Hospitals', 'Selected Hospitals', 'All Admins', 'Selected Users'];
export const channelOptions = ['Email', 'In-App', 'SMS'];

export const receivedNotifications = [
  { id: 'RCV-1', title: 'Payment failed for Green Valley Health Center', message: 'The subscription renewal payment for Green Valley Health Center failed.', type: 'Billing', priority: 'High', isRead: false, timestamp: '05 Aug 2026, 08:31 AM' },
  { id: 'RCV-2', title: 'New hospital registered', message: 'Northgate Diagnostic Labs registered for a Free trial.', type: 'Announcement', priority: 'Low', isRead: true, timestamp: '05 Aug 2026, 05:00 AM' },
  { id: 'RCV-3', title: 'Support ticket escalated', message: 'Ticket TCK-501 (Critical) was escalated and needs review.', type: 'Announcement', priority: 'High', isRead: false, timestamp: '06 Aug 2026, 09:15 AM' },
];

export const sentAnnouncements = [
  {
    id: 'ANN-1',
    title: 'Scheduled maintenance — 12 Aug 2026',
    message: 'The platform will undergo scheduled maintenance from 12:00 AM to 12:30 AM UTC.',
    type: 'Maintenance',
    priority: 'Medium',
    recipients: 'All Hospitals',
    channels: ['Email', 'In-App'],
    createdAt: '08 Aug 2026, 04:00 PM',
    scheduledFor: null,
    status: 'Sent',
  },
  {
    id: 'ANN-2',
    title: 'New Telemedicine feature now in beta',
    message: 'Professional and Enterprise plans can now enable Telemedicine from the Features page.',
    type: 'Feature Update',
    priority: 'Low',
    recipients: 'Selected Hospitals',
    channels: ['Email'],
    createdAt: '30 Jul 2026, 11:50 AM',
    scheduledFor: null,
    status: 'Sent',
  },
];

export const scheduledAnnouncements = [
  {
    id: 'ANN-3',
    title: 'Reminder: annual billing update',
    message: 'Reminder that annual invoices for Enterprise hospitals will be issued next week.',
    type: 'Billing',
    priority: 'Medium',
    recipients: 'Selected Hospitals',
    channels: ['Email', 'In-App'],
    createdAt: '09 Aug 2026, 09:00 AM',
    scheduledFor: '15 Aug 2026, 09:00 AM',
    status: 'Scheduled',
  },
];
