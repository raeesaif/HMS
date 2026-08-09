import { patients, getPatientById } from '@/data/receptionistPatients';
import { simulateRequest } from '@/services/apiClient';

export function fetchPatients() {
  return simulateRequest(patients);
}

export function fetchPatientById(patientId) {
  return simulateRequest(getPatientById(patientId));
}

export function registerPatient(payload) {
  return simulateRequest({ id: `PT-${Date.now()}`, status: 'Active', ...payload });
}

export function updatePatient(patientId, payload) {
  return simulateRequest({ id: patientId, ...payload });
}
