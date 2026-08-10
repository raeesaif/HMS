export const notificationTypeOptions = ['Appointment', 'Prescription', 'Laboratory', 'Billing', 'Medical Record', 'System'];

export const notifications = [
  { id: 'PN-1', type: 'Laboratory', title: 'Lab report ready', message: 'Your Lipid Profile results are now available for review.', priority: 'Medium', isRead: false, timestamp: '09 Aug 2026, 10:20 AM', relatedId: 'LAB-7001' },
  { id: 'PN-2', type: 'Appointment', title: 'Upcoming appointment reminder', message: 'You have an appointment with Dr. Imran Qureshi on 11 Aug 2026 at 11:00 AM.', priority: 'Medium', isRead: false, timestamp: '09 Aug 2026, 08:00 AM', relatedId: 'APT-6002' },
  { id: 'PN-3', type: 'Billing', title: 'New invoice generated', message: 'Invoice INV-8001 for PKR 7,700 has been generated for your recent visit.', priority: 'Low', isRead: true, timestamp: '09 Aug 2026, 09:45 AM', relatedId: 'INV-8001' },
  { id: 'PN-4', type: 'Prescription', title: 'Prescription issued', message: 'Dr. Sarah Mitchell issued a new prescription for Atorvastatin and Aspirin.', priority: 'Low', isRead: true, timestamp: '09 Aug 2026, 09:35 AM', relatedId: 'RX-3101' },
  { id: 'PN-5', type: 'Medical Record', title: 'Medical record updated', message: 'A new medical record was added following your consultation with Dr. Sarah Mitchell.', priority: 'Low', isRead: true, timestamp: '09 Aug 2026, 09:30 AM', relatedId: 'MR-4001' },
  { id: 'PN-6', type: 'Billing', title: 'Invoice overdue', message: 'Invoice INV-7500 for PKR 3,300 is now overdue. Please make a payment at your earliest convenience.', priority: 'High', isRead: false, timestamp: '08 Aug 2026, 09:00 AM', relatedId: 'INV-7500' },
  { id: 'PN-7', type: 'System', title: 'Scheduled maintenance tonight', message: 'The patient portal will be briefly unavailable tonight between 12:00–12:30 AM for maintenance.', priority: 'Low', isRead: false, timestamp: '08 Aug 2026, 06:00 PM', relatedId: null },
];
