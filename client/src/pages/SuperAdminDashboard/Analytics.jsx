import { useState } from 'react';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { MetricCard } from '@/components/super-admin/MetricCard';
import { FilterBar } from '@/components/super-admin/FilterBar';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { ChartSkeleton, StatsRowSkeleton, FiltersSkeleton } from '@/components/super-admin/LoadingSkeleton';
import RevenueAnalyticsChart from '@/charts/superAdmin/RevenueAnalyticsChart';
import HospitalGrowthChart from '@/charts/superAdmin/HospitalGrowthChart';
import UserGrowthChart from '@/charts/superAdmin/UserGrowthChart';
import SubscriptionGrowthChart from '@/charts/superAdmin/SubscriptionGrowthChart';
import FeatureUsageChart from '@/charts/superAdmin/FeatureUsageChart';
import ChurnRetentionChart from '@/charts/superAdmin/ChurnRetentionChart';
import { useAnalytics } from '@/hooks/superAdmin/useAnalytics';
import { dateFilterOptions } from '@/data/superAdmin/dashboard';
import { hospitals } from '@/data/superAdmin/hospitals';
import { plans } from '@/data/superAdmin/subscriptionPlans';

const Analytics = () => {
  const { data, isLoading, isError, refetch } = useAnalytics();

  const [dateFilter, setDateFilter] = useState('30 Days');
  const [hospitalId, setHospitalId] = useState('all');
  const [plan, setPlan] = useState('all');

  const metrics = data?.metrics;

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Platform-wide growth, revenue, and retention metrics.</p>
      </section>

      {isLoading ? (
        <FiltersSkeleton />
      ) : (
        <FilterBar>
          <FilterDropdown label="Date Range" value={dateFilter} onChange={setDateFilter} options={dateFilterOptions.map((o) => ({ value: o, label: o }))} />
          <FilterDropdown label="Hospital" value={hospitalId} onChange={setHospitalId} options={hospitals.map((h) => ({ value: h.id, label: h.name }))} />
          <FilterDropdown label="Plan" value={plan} onChange={setPlan} options={plans.map((p) => ({ value: p.name, label: p.name }))} />
        </FilterBar>
      )}

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <>
          {isLoading || !metrics ? (
            <StatsRowSkeleton count={10} />
          ) : (
            <section className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
              <MetricCard label="User Growth" value={metrics.userGrowth.value} trend={metrics.userGrowth.trend} />
              <MetricCard label="Hospital Growth" value={metrics.hospitalGrowth.value} trend={metrics.hospitalGrowth.trend} />
              <MetricCard label="Patient Growth" value={metrics.patientGrowth.value} trend={metrics.patientGrowth.trend} />
              <MetricCard label="Revenue" value={metrics.revenue.value} trend={metrics.revenue.trend} />
              <MetricCard label="MRR" value={metrics.mrr.value} trend={metrics.mrr.trend} />
              <MetricCard label="ARR" value={metrics.arr.value} trend={metrics.arr.trend} />
              <MetricCard label="Churn" value={metrics.churn.value} trend={metrics.churn.trend} tone="bad" />
              <MetricCard label="Retention" value={metrics.retention.value} trend={metrics.retention.trend} tone="good" />
              <MetricCard label="Trial Conversion" value={metrics.trialConversion.value} trend={metrics.trialConversion.trend} tone="good" />
              <MetricCard label="Active Users" value={metrics.activeUsers.value} trend={metrics.activeUsers.trend} />
            </section>
          )}

          {isLoading || !data ? (
            <div className="grid gap-4 xl:grid-cols-2">
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton />
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              <RevenueAnalyticsChart data={data.revenueSeries} />
              <HospitalGrowthChart data={data.hospitalGrowthSeries} />
              <UserGrowthChart data={data.userGrowthSeries} />
              <SubscriptionGrowthChart data={data.subscriptionGrowthSeries} />
              <FeatureUsageChart data={data.featureUsageSeries} />
              <ChurnRetentionChart data={data.churnSeries} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;
