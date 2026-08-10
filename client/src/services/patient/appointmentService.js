import { getAppointments } from '@/data/patientAppointments';
import { doctors } from '@/data/patientDoctors';
import { simulateRequest } from '@/services/apiClient';

export function fetchAppointments() {
  return simulateRequest(getAppointments());
}

export function fetchDoctorsForBooking() {
  return simulateRequest(doctors);
}

export function bookAppointment(payload) {
  return simulateRequest({ id: `APT-${Date.now()}`, status: 'Scheduled', ...payload });
}

export function rescheduleAppointment(appointmentId, payload) {
  return simulateRequest({ id: appointmentId, ...payload });
}

export function cancelAppointment(appointmentId) {
  return simulateRequest({ id: appointmentId, status: 'Cancelled' });
}
