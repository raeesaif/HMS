import { getAppointments } from '@/data/receptionistAppointments';
import { getCheckIns } from '@/data/receptionistCheckIns';
import { bedStats } from '@/data/receptionistBeds';
import { doctorsOnDuty } from '@/data/receptionistDoctors';
import { queue, getQueueSummary } from '@/data/receptionistQueue';
import { emergencyPatients } from '@/data/receptionistEmergency';
import { invoices, getBillingStats } from '@/data/receptionistBilling';
import { patients } from '@/data/receptionistPatients';

const todaysAppointmentsList = getAppointments().filter((appointment) => appointment.date === '09 Aug 2026');
const checkedInCount = getCheckIns().filter((entry) => entry.status !== 'Waiting' && entry.status !== 'No Show').length;
const queueSummary = getQueueSummary(queue);
const doctorsAvailable = doctorsOnDuty.filter((doctor) => doctor.status !== 'Off Duty').length;
const activeEmergencies = emergencyPatients.filter((patient) => !['Discharged', 'Transferred'].includes(patient.status)).length;
const billingStats = getBillingStats(invoices);
const newRegistrations = patients.filter((patient) => patient.registeredOn === '11 Mar 2024' || patient.registeredOn === '09 Aug 2026').length;

export const dashboardStats = [
  { id: 'appointments', icon: 'calendar', tone: 'blue', value: todaysAppointmentsList.length, title: "Today's Appointments", description: 'Scheduled for today' },
  { id: 'checked-in', icon: 'check', tone: 'green', value: checkedInCount, title: 'Checked-in Patients', description: 'Patients checked in today' },
  { id: 'waiting', icon: 'clock', tone: 'amber', value: queueSummary.waitingCount, title: 'Waiting Patients', description: 'Currently in the queue' },
  { id: 'beds', icon: 'bed', tone: 'sky', value: bedStats.available, title: 'Available Beds', description: `${bedStats.total} beds total` },
  { id: 'doctors', icon: 'doctor', tone: 'purple', value: doctorsAvailable, title: 'Doctors On Duty', description: `${doctorsOnDuty.length} on today's roster` },
  { id: 'emergency', icon: 'emergency', tone: 'red', value: activeEmergencies, title: 'Emergency Patients', description: 'Currently being tracked' },
  { id: 'bills', icon: 'billing', tone: 'amber', value: billingStats.pendingBills, title: 'Pending Bills', description: 'Awaiting full payment' },
  { id: 'registrations', icon: 'register', tone: 'slate', value: newRegistrations, title: 'New Registrations', description: 'New patients this week' },
];

export const dashboardAppointments = todaysAppointmentsList.slice(0, 6);
export const dashboardQueue = queue.slice(0, 5);
export const dashboardDoctors = doctorsOnDuty.slice(0, 6);
export const dashboardEmergencies = emergencyPatients.slice(0, 4);
export const dashboardPayments = invoices
  .filter((invoice) => invoice.date === '09 Aug 2026')
  .slice(0, 5);

export const quickActions = [
  { id: 'qa-1', icon: 'register', label: 'Register Patient', description: 'Add a new patient record', path: '/reception/patients' },
  { id: 'qa-2', icon: 'calendar', label: 'Create Appointment', description: 'Schedule a new appointment', path: '/reception/appointments' },
  { id: 'qa-3', icon: 'check', label: 'Check In Patient', description: 'Process a patient arrival', path: '/reception/check-ins' },
  { id: 'qa-4', icon: 'emergency', label: 'Add Emergency Patient', description: 'Register an emergency arrival', path: '/reception/emergency' },
  { id: 'qa-5', icon: 'billing', label: 'View Billing', description: 'Collect and review payments', path: '/reception/billing' },
];
