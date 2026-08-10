import { defaultSystemSettings } from '@/data/superAdmin/systemSettings';
import { simulateRequest } from '@/services/apiClient';

export function fetchSystemSettings() {
  return simulateRequest(defaultSystemSettings);
}

export function updateSystemSettings(section, payload) {
  return simulateRequest({ section, ...payload });
}
