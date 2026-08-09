import { receptionistProfile, receptionistAccountStatus, receptionistProfileActivity } from '@/data/receptionist';
import { simulateRequest } from '@/services/apiClient';

export function fetchProfile() {
  return simulateRequest({
    profile: receptionistProfile,
    accountStatus: receptionistAccountStatus,
    activity: receptionistProfileActivity,
  });
}

export function updateProfile(payload) {
  return simulateRequest({ ...receptionistProfile, ...payload });
}
