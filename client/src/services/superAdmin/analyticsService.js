import {
  revenueSeries,
  hospitalGrowthSeries,
  userGrowthSeries,
  subscriptionGrowthSeries,
  featureUsageSeries,
  churnSeries,
  analyticsMetrics,
} from '@/data/superAdmin/analytics';
import { simulateRequest } from '@/services/apiClient';

export function fetchAnalytics() {
  return simulateRequest({
    revenueSeries,
    hospitalGrowthSeries,
    userGrowthSeries,
    subscriptionGrowthSeries,
    featureUsageSeries,
    churnSeries,
    metrics: analyticsMetrics,
  });
}
