import { beds, bedStats } from '@/data/receptionistBeds';
import { simulateRequest } from '@/services/apiClient';

export function fetchBeds() {
  return simulateRequest({ beds, stats: bedStats });
}

export function assignBed(bedId, payload) {
  return simulateRequest({ id: bedId, status: 'Occupied', ...payload });
}

export function reserveBed(bedId, payload) {
  return simulateRequest({ id: bedId, status: 'Reserved', ...payload });
}

export function releaseBed(bedId) {
  return simulateRequest({ id: bedId, status: 'Available', patientId: null, patientName: null });
}
