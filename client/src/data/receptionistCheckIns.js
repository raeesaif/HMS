import { getAppointmentById } from '@/data/receptionistAppointments';

export const checkInStatusOptions = ['Waiting', 'Checked In', 'With Doctor', 'Completed', 'No Show'];

export const checkIns = [
  { id: 'CHK-9001', appointmentId: 'APT-5001', arrivalTime: '08:52 AM', checkInTime: '08:55 AM', status: 'Completed', queueNumber: 'Q-101', receptionNote: '', checkedInBy: 'Neha Kapoor' },
  { id: 'CHK-9002', appointmentId: 'APT-5002', arrivalTime: '09:20 AM', checkInTime: '09:22 AM', status: 'With Doctor', queueNumber: 'Q-102', receptionNote: '', checkedInBy: 'Neha Kapoor' },
  { id: 'CHK-9003', appointmentId: 'APT-5003', arrivalTime: '09:45 AM', checkInTime: '09:48 AM', status: 'Checked In', queueNumber: 'Q-103', receptionNote: 'Patient requested wheelchair assistance', checkedInBy: 'Neha Kapoor' },
  { id: 'CHK-9004', appointmentId: 'APT-5004', arrivalTime: null, checkInTime: null, status: 'Waiting', queueNumber: null, receptionNote: '', checkedInBy: null },
  { id: 'CHK-9005', appointmentId: 'APT-5005', arrivalTime: null, checkInTime: null, status: 'Waiting', queueNumber: null, receptionNote: '', checkedInBy: null },
  { id: 'CHK-9006', appointmentId: 'APT-5009', arrivalTime: null, checkInTime: null, status: 'No Show', queueNumber: null, receptionNote: 'Called patient, no response', checkedInBy: 'Neha Kapoor' },
];

export function withCheckInDisplay(checkIn) {
  const appointment = getAppointmentById(checkIn.appointmentId);
  return {
    ...checkIn,
    patientName: appointment?.patientName ?? 'Unknown Patient',
    doctorName: appointment?.doctorName ?? 'Unknown Doctor',
    appointmentTime: appointment?.time ?? '—',
    appointmentDate: appointment?.date ?? '—',
  };
}

export function getCheckIns() {
  return checkIns.map(withCheckInDisplay);
}
