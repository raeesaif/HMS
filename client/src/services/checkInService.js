import { getCheckIns } from '@/data/receptionistCheckIns';
import { simulateRequest } from '@/services/apiClient';

export function fetchCheckIns() {
  return simulateRequest(getCheckIns());
}

export function checkInPatient(checkInId, payload) {
  return simulateRequest({ id: checkInId, status: 'Checked In', ...payload });
}

export function markNoShow(checkInId) {
  return simulateRequest({ id: checkInId, status: 'No Show' });
}
