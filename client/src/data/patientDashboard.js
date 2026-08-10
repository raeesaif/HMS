import { getAppointments } from '@/data/patientAppointments';
import { getMedicalRecords } from '@/data/patientMedicalRecords';
import { getPrescriptions } from '@/data/patientPrescriptions';
import { getLabReports } from '@/data/patientLabReports';
import { invoices, getBillingStats } from '@/data/patientBilling';

const upcomingStatuses = ['Scheduled', 'Confirmed', 'Checked In'];

const allAppointments = getAppointments();
const upcomingAppointments = allAppointments
  .filter((appointment) => upcomingStatuses.includes(appointment.status))
  .sort((a, b) => new Date(a.date) - new Date(b.date));

const activePrescriptions = getPrescriptions().filter((prescription) => prescription.status === 'Active');
const recentLabReports = getLabReports().slice(0, 4);
const billingStats = getBillingStats(invoices);

export const dashboardStats = [
  { id: 'appointments', icon: 'calendar', tone: 'blue', value: upcomingAppointments.length, title: 'Upcoming Appointments', description: 'Scheduled visits ahead' },
  { id: 'prescriptions', icon: 'prescription', tone: 'green', value: activePrescriptions.length, title: 'Active Prescriptions', description: 'Currently being taken' },
  { id: 'lab', icon: 'lab', tone: 'purple', value: recentLabReports.length, title: 'Recent Lab Reports', description: 'From your latest visits' },
  { id: 'balance', icon: 'billing', tone: 'red', value: `PKR ${billingStats.totalOutstanding.toLocaleString()}`, title: 'Outstanding Balance', description: `${billingStats.pendingInvoices} pending invoices` },
];

export const nextAppointment = upcomingAppointments[0] ?? null;
export const dashboardMedicalRecords = getMedicalRecords().slice(0, 4);
export const dashboardPrescriptions = activePrescriptions.slice(0, 4);
export const dashboardLabReports = recentLabReports;
export const dashboardBillingSummary = billingStats;

export const activityTimeline = [
  { id: 'act-1', type: 'appointment', description: 'Appointment completed with Dr. Sarah Mitchell', timestamp: '09 Aug 2026, 09:30 AM' },
  { id: 'act-2', type: 'prescription', description: 'Prescription issued — Atorvastatin, Aspirin', timestamp: '09 Aug 2026, 09:35 AM' },
  { id: 'act-3', type: 'lab', description: 'Lab report available — Lipid Profile', timestamp: '09 Aug 2026, 10:20 AM' },
  { id: 'act-4', type: 'record', description: 'Medical record updated', timestamp: '09 Aug 2026, 09:30 AM' },
  { id: 'act-5', type: 'payment', description: 'Payment completed for Invoice INV-7990', timestamp: '20 Jul 2026, 04:15 PM' },
];

export const quickActions = [
  { id: 'qa-1', icon: 'calendar', label: 'Book Appointment', description: 'Schedule a visit with your doctor', path: '/patient/appointments' },
  { id: 'qa-2', icon: 'records', label: 'View Medical Records', description: 'Review your visit history', path: '/patient/medical-records' },
  { id: 'qa-3', icon: 'prescription', label: 'View Prescriptions', description: 'Check your active medications', path: '/patient/prescriptions' },
  { id: 'qa-4', icon: 'lab', label: 'View Lab Reports', description: 'Check your latest test results', path: '/patient/lab-reports' },
  { id: 'qa-5', icon: 'billing', label: 'Pay Bill', description: 'Settle outstanding invoices', path: '/patient/billing' },
];
