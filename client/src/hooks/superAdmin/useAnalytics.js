import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics } from '@/services/superAdmin/analyticsService';

export function useAnalytics() {
  return useQuery({ queryKey: ['superAdmin', 'analytics'], queryFn: fetchAnalytics });
}
