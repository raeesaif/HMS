import { securityOverview, securityAlerts, sessions, loginActivity } from '@/data/superAdmin/security';
import { simulateRequest } from '@/services/apiClient';

export function fetchSecurity() {
  return simulateRequest({ overview: securityOverview, alerts: securityAlerts, sessions, loginActivity });
}

export function changePassword() {
  return simulateRequest({ success: true });
}

export function enableTwoFactor() {
  return simulateRequest({ twoFactorEnabled: true });
}

export function disableTwoFactor() {
  return simulateRequest({ twoFactorEnabled: false });
}

export function signOutSession(sessionId) {
  return simulateRequest({ id: sessionId, signedOut: true });
}

export function signOutAllSessions() {
  return simulateRequest({ success: true });
}
