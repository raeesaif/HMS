import { queue } from '@/data/receptionistQueue';
import { simulateRequest } from '@/services/apiClient';

export function fetchQueue() {
  return simulateRequest(queue);
}

export function callPatient(queueId) {
  return simulateRequest({ id: queueId, status: 'Called' });
}

export function markWithDoctor(queueId) {
  return simulateRequest({ id: queueId, status: 'With Doctor' });
}

export function completeQueueEntry(queueId) {
  return simulateRequest({ id: queueId, status: 'Completed' });
}

export function removeFromQueue(queueId) {
  return simulateRequest({ id: queueId, status: 'Cancelled' });
}
