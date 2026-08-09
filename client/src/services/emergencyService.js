import { emergencyPatients } from '@/data/receptionistEmergency';
import { simulateRequest } from '@/services/apiClient';

export function fetchEmergencyPatients() {
  return simulateRequest(emergencyPatients);
}

export function registerEmergencyPatient(payload) {
  return simulateRequest({ id: `ER-${Date.now()}`, status: 'Arrived', ...payload });
}
