import { activityLogs } from '@/data/superAdmin/activityLogs';
import { simulateRequest } from '@/services/apiClient';

export function fetchActivityLogs() {
  return simulateRequest(activityLogs);
}
