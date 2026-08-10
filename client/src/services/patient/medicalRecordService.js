import { getMedicalRecords } from '@/data/patientMedicalRecords';
import { simulateRequest } from '@/services/apiClient';

export function fetchMedicalRecords() {
  return simulateRequest(getMedicalRecords());
}
