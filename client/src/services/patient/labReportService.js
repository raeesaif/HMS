import { getLabReports } from '@/data/patientLabReports';
import { simulateRequest } from '@/services/apiClient';

export function fetchLabReports() {
  return simulateRequest(getLabReports());
}
