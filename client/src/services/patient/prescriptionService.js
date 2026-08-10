import { getPrescriptions } from '@/data/patientPrescriptions';
import { simulateRequest } from '@/services/apiClient';

export function fetchPrescriptions() {
  return simulateRequest(getPrescriptions());
}
