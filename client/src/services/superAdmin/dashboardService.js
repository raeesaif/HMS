import {
  dashboardStats,
  subscriptionDistribution,
  recentHospitals,
  recentActivity,
  systemHealth,
  dashboardQuickActions,
} from '@/data/superAdmin/dashboard';
import { revenueSeries, hospitalGrowthSeries } from '@/data/superAdmin/analytics';
import { simulateRequest } from '@/services/apiClient';

export function fetchDashboard() {
  return simulateRequest({
    stats: dashboardStats,
    subscriptionDistribution,
    recentHospitals,
    recentActivity,
    systemHealth,
    quickActions: dashboardQuickActions,
    revenueSeries,
    hospitalGrowthSeries,
  });
}
