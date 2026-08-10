import { superAdminProfile, superAdminAccountStatus, superAdminActivitySummary } from '@/data/superAdmin/profile';
import { simulateRequest } from '@/services/apiClient';

export function fetchProfile() {
  return simulateRequest({ profile: superAdminProfile, accountStatus: superAdminAccountStatus, activity: superAdminActivitySummary });
}

export function updateProfile(payload) {
  return simulateRequest({ ...superAdminProfile, ...payload });
}
