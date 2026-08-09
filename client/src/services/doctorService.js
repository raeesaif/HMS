import { doctorsOnDuty } from '@/data/receptionistDoctors';
import { simulateRequest } from '@/services/apiClient';

export function fetchDoctorsOnDuty() {
  return simulateRequest(doctorsOnDuty);
}
