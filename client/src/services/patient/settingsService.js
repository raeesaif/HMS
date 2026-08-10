import { defaultPatientSettings, patientSessions, patientLoginActivity } from '@/data/patientSettings';
import { simulateRequest } from '@/services/apiClient';

export function fetchSettings() {
  return simulateRequest({
    settings: defaultPatientSettings,
    sessions: patientSessions,
    loginActivity: patientLoginActivity,
  });
}

export function updateSettings(payload) {
  return simulateRequest(payload);
}
