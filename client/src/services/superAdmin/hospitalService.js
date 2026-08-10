import { getHospitals, getHospitalById } from '@/data/superAdmin/hospitals';
import { simulateRequest } from '@/services/apiClient';

export function fetchHospitals() {
  return simulateRequest(getHospitals());
}

export function fetchHospitalById(hospitalId) {
  return simulateRequest(getHospitalById(hospitalId));
}

export function createHospital(payload) {
  return simulateRequest({ id: `HOSP-${Date.now()}`, status: 'Trial', ...payload });
}

export function updateHospital(hospitalId, payload) {
  return simulateRequest({ id: hospitalId, ...payload });
}

export function suspendHospital(hospitalId) {
  return simulateRequest({ id: hospitalId, status: 'Suspended' });
}

export function activateHospital(hospitalId) {
  return simulateRequest({ id: hospitalId, status: 'Active' });
}

export function deleteHospital(hospitalId) {
  return simulateRequest({ id: hospitalId, deleted: true });
}
