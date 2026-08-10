import { patientProfile, patientAccountStatus, patientProfileActivity } from '@/data/patient';
import { simulateRequest } from '@/services/apiClient';

export function fetchPatientProfile() {
  return simulateRequest({
    profile: patientProfile,
    accountStatus: patientAccountStatus,
    activity: patientProfileActivity,
  });
}

export function updatePatientProfile(payload) {
  return simulateRequest({ ...patientProfile, ...payload });
}
