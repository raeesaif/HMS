import { defaultReceptionistSettings, receptionistSessions, receptionistLoginActivity } from '@/data/receptionistSettings';
import { simulateRequest } from '@/services/apiClient';

export function fetchSettings() {
  return simulateRequest({
    settings: defaultReceptionistSettings,
    sessions: receptionistSessions,
    loginActivity: receptionistLoginActivity,
  });
}

export function updateSettings(payload) {
  return simulateRequest(payload);
}
