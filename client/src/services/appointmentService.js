import { getAppointments, getAppointmentById } from '@/data/receptionistAppointments';
import { simulateRequest } from '@/services/apiClient';

export function fetchAppointments() {
  return simulateRequest(getAppointments());
}

export function fetchAppointmentById(appointmentId) {
  return simulateRequest(getAppointmentById(appointmentId));
}

export function createAppointment(payload) {
  return simulateRequest({ id: `APT-${Date.now()}`, status: 'Scheduled', ...payload });
}

export function rescheduleAppointment(appointmentId, payload) {
  return simulateRequest({ id: appointmentId, ...payload });
}

export function cancelAppointment(appointmentId) {
  return simulateRequest({ id: appointmentId, status: 'Cancelled' });
}
