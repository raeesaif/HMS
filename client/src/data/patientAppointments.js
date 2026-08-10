import { getDoctorById } from '@/data/patientDoctors';

export const appointmentTypeOptions = ['New Patient', 'Follow-up', 'Consultation', 'Check-up', 'Procedure'];

export const appointments = [
  { id: 'APT-6001', doctorId: 'DR-1024', date: '09 Aug 2026', time: '09:30 AM', type: 'Consultation', status: 'In Progress', reasonForVisit: 'Chest discomfort evaluation', instructions: 'Please arrive 15 minutes early for vitals check.', createdAt: '06 Aug 2026' },
  { id: 'APT-6002', doctorId: 'DR-1024', date: '11 Aug 2026', time: '11:00 AM', type: 'Follow-up', status: 'Confirmed', reasonForVisit: 'Post-angioplasty review', instructions: 'Bring your latest ECG report.', createdAt: '08 Aug 2026' },
  { id: 'APT-6003', doctorId: 'DR-1035', date: '13 Aug 2026', time: '09:30 AM', type: 'Check-up', status: 'Scheduled', reasonForVisit: 'Routine cardiac check-up', instructions: '', createdAt: '09 Aug 2026' },
  { id: 'APT-6004', doctorId: 'DR-1067', date: '01 Aug 2026', time: '01:00 PM', type: 'Consultation', status: 'Completed', reasonForVisit: 'Skin rash evaluation', instructions: 'Follow-up in 2 weeks if symptoms persist.', createdAt: '28 Jul 2026' },
  { id: 'APT-6005', doctorId: 'DR-1024', date: '20 Jul 2026', time: '10:00 AM', type: 'Follow-up', status: 'Completed', reasonForVisit: 'Blood pressure monitoring', instructions: '', createdAt: '15 Jul 2026' },
  { id: 'APT-6006', doctorId: 'DR-1035', date: '05 Jul 2026', time: '02:30 PM', type: 'Check-up', status: 'No Show', reasonForVisit: 'Routine cardiac check-up', instructions: '', createdAt: '01 Jul 2026' },
  { id: 'APT-6007', doctorId: 'DR-1041', date: '02 Aug 2026', time: '10:30 AM', type: 'New Patient', status: 'Cancelled', reasonForVisit: 'Initial pediatric consultation for dependent', instructions: '', createdAt: '30 Jul 2026' },
];

export function withAppointmentDisplay(appointment) {
  const doctor = getDoctorById(appointment.doctorId);
  return {
    ...appointment,
    doctorName: doctor?.name ?? 'Unknown Doctor',
    department: doctor?.department ?? '—',
    specialization: doctor?.specialization ?? '—',
    location: doctor?.location ?? '—',
  };
}

export function getAppointments() {
  return appointments.map(withAppointmentDisplay);
}

export function getAppointmentById(appointmentId) {
  const appointment = appointments.find((item) => item.id === appointmentId);
  return appointment ? withAppointmentDisplay(appointment) : null;
}
