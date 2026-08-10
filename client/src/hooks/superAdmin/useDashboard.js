import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '@/services/superAdmin/dashboardService';

export function useSuperAdminDashboard() {
  return useQuery({ queryKey: ['superAdmin', 'dashboard'], queryFn: fetchDashboard });
}
