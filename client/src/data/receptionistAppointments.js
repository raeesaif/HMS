import { getDoctorById } from '@/data/receptionistDoctors';
import { getPatientById } from '@/data/receptionistPatients';

export const appointmentStatusOptions = ['Scheduled', 'Checked In', 'In Progress', 'Completed', 'Cancelled', 'No Show'];
export const appointmentTypeOptions = ['New Patient', 'Follow-up', 'Consultation', 'Check-up', 'Procedure'];
export const appointmentPriorityOptions = ['Normal', 'Urgent', 'Emergency'];

export const appointments = [
  { id: 'APT-5001', patientId: 'PT-1042', doctorId: 'DR-1024', date: '09 Aug 2026', time: '09:00 AM', type: 'Follow-up', status: 'Completed', priority: 'Normal', reasonForVisit: 'Post-angioplasty review', notes: '', createdBy: 'Neha Kapoor', createdAt: '05 Aug 2026' },
  { id: 'APT-5002', patientId: 'PT-1088', doctorId: 'DR-1024', date: '09 Aug 2026', time: '09:30 AM', type: 'Consultation', status: 'In Progress', priority: 'Normal', reasonForVisit: 'Chest discomfort evaluation', notes: '', createdBy: 'Neha Kapoor', createdAt: '06 Aug 2026' },
  { id: 'APT-5003', patientId: 'PT-1121', doctorId: 'DR-1035', date: '09 Aug 2026', time: '10:00 AM', type: 'Check-up', status: 'Checked In', priority: 'Normal', reasonForVisit: 'Routine cardiac check-up', notes: '', createdBy: 'Neha Kapoor', createdAt: '04 Aug 2026' },
  { id: 'APT-5004', patientId: 'PT-1156', doctorId: 'DR-1041', date: '09 Aug 2026', time: '10:30 AM', type: 'New Patient', status: 'Scheduled', priority: 'Normal', reasonForVisit: 'Initial pediatric consultation for dependent', notes: '', createdBy: 'Neha Kapoor', createdAt: '07 Aug 2026' },
  { id: 'APT-5005', patientId: 'PT-1177', doctorId: 'DR-1052', date: '09 Aug 2026', time: '11:00 AM', type: 'Follow-up', status: 'Scheduled', priority: 'Urgent', reasonForVisit: 'Knee pain follow-up', notes: 'Patient requested earliest slot', createdBy: 'Neha Kapoor', createdAt: '08 Aug 2026' },
  { id: 'APT-5006', patientId: 'PT-1203', doctorId: 'DR-1089', date: '09 Aug 2026', time: '11:30 AM', type: 'Consultation', status: 'Cancelled', priority: 'Normal', reasonForVisit: 'Routine gynecological consultation', notes: 'Cancelled by patient', createdBy: 'Neha Kapoor', createdAt: '03 Aug 2026' },
  { id: 'APT-5007', patientId: 'PT-0921', doctorId: 'DR-1093', date: '10 Aug 2026', time: '09:15 AM', type: 'Follow-up', status: 'Scheduled', priority: 'Urgent', reasonForVisit: 'Neurology follow-up post ICU discharge', notes: '', createdBy: 'Neha Kapoor', createdAt: '08 Aug 2026' },
  { id: 'APT-5008', patientId: 'PT-1042', doctorId: 'DR-1067', date: '10 Aug 2026', time: '01:00 PM', type: 'Consultation', status: 'Scheduled', priority: 'Normal', reasonForVisit: 'Skin rash evaluation', notes: '', createdBy: 'Neha Kapoor', createdAt: '08 Aug 2026' },
  { id: 'APT-5009', patientId: 'PT-1088', doctorId: 'DR-1035', date: '08 Aug 2026', time: '02:30 PM', type: 'Check-up', status: 'No Show', priority: 'Normal', reasonForVisit: 'Routine cardiac check-up', notes: 'Patient did not arrive', createdBy: 'Neha Kapoor', createdAt: '02 Aug 2026' },
  { id: 'APT-5010', patientId: 'PT-1121', doctorId: 'DR-1024', date: '11 Aug 2026', time: '10:00 AM', type: 'Procedure', status: 'Scheduled', priority: 'Emergency', reasonForVisit: 'Cardiac catheterization pre-op review', notes: 'Priority scheduling requested by ward', createdBy: 'Neha Kapoor', createdAt: '09 Aug 2026' },
];

export function withAppointmentDisplay(appointment) {
  const patient = getPatientById(appointment.patientId);
  const doctor = getDoctorById(appointment.doctorId);
  return {
    ...appointment,
    patientName: patient?.name ?? 'Unknown Patient',
    doctorName: doctor?.name ?? 'Unknown Doctor',
    department: doctor?.department ?? '—',
  };
}

export function getAppointments() {
  return appointments.map(withAppointmentDisplay);
}

export function getAppointmentById(appointmentId) {
  const appointment = appointments.find((item) => item.id === appointmentId);
  return appointment ? withAppointmentDisplay(appointment) : null;
}
