import { useQuery } from '@tanstack/react-query';
import { fetchActivityLogs } from '@/services/superAdmin/activityLogService';

export function useActivityLogs() {
  return useQuery({ queryKey: ['superAdmin', 'activityLogs'], queryFn: fetchActivityLogs });
}
