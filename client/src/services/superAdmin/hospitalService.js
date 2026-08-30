import { hospitalAPI } from '@/apis/hospitalApis';

export function fetchHospitals() {
  return hospitalAPI.getAll();
}

export function fetchHospitalById(hospitalId) {
  return hospitalAPI.getById(hospitalId);
}

export function createHospital(payload) {
  return hospitalAPI.create(payload);
}

export function updateHospital(hospitalId, payload) {
  return hospitalAPI.update(hospitalId, payload);
}

export function suspendHospital(hospitalId) {
  return hospitalAPI.update(hospitalId, { status: 'suspended' });
}

export function activateHospital(hospitalId) {
  return hospitalAPI.update(hospitalId, { status: 'active' });
}

export function deleteHospital(hospitalId) {
  return hospitalAPI.remove(hospitalId);
}
