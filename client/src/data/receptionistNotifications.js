export const notificationTypeOptions = ['Appointment', 'Patient', 'Check-in', 'Queue', 'Bed', 'Emergency', 'Billing', 'System'];

export const notifications = [
  { id: 'RN-1', type: 'Emergency', title: 'New emergency patient registered', message: 'Unidentified male patient registered under ER-3002 — High priority, assigned to ER Bay 2.', priority: 'High', isRead: false, timestamp: '09 Aug 2026, 08:16 AM', relatedId: 'ER-3002' },
  { id: 'RN-2', type: 'Queue', title: 'Patient waiting over 30 minutes', message: 'Usman Tariq (Q-104) has been waiting 41 minutes for Dr. Bilal Siddiqui.', priority: 'Medium', isRead: false, timestamp: '09 Aug 2026, 10:46 AM', relatedId: 'Q-104' },
  { id: 'RN-3', type: 'Appointment', title: 'Appointment cancelled', message: 'Hina Farooq cancelled her 11:30 AM consultation with Dr. Sana Malik.', priority: 'Low', isRead: true, timestamp: '09 Aug 2026, 08:05 AM', relatedId: 'APT-5006' },
  { id: 'RN-4', type: 'Billing', title: 'Large outstanding balance', message: 'Invoice INV-7004 for Kamran Ali has an outstanding balance of PKR 25,000.', priority: 'Medium', isRead: false, timestamp: '09 Aug 2026, 07:30 AM', relatedId: 'INV-7004' },
  { id: 'RN-5', type: 'Bed', title: 'Bed reserved', message: 'Bed 104-A has been reserved for Ayesha Raza, expected admission 10 Aug 2026.', priority: 'Low', isRead: true, timestamp: '08 Aug 2026, 04:12 PM', relatedId: 'BED-103' },
  { id: 'RN-6', type: 'Check-in', title: 'Patient checked in', message: 'Bilal Khan checked in for his 10:00 AM appointment with Dr. Imran Qureshi.', priority: 'Low', isRead: true, timestamp: '09 Aug 2026, 09:48 AM', relatedId: 'CHK-9003' },
  { id: 'RN-7', type: 'Patient', title: 'New patient registered', message: 'Ayesha Raza was registered as a new patient.', priority: 'Low', isRead: true, timestamp: '05 Aug 2026, 11:20 AM', relatedId: 'PT-1156' },
  { id: 'RN-8', type: 'System', title: 'Scheduled maintenance tonight', message: 'The patient portal will be briefly unavailable tonight between 12:00–12:30 AM for maintenance.', priority: 'Low', isRead: false, timestamp: '08 Aug 2026, 06:00 PM', relatedId: null },
];
