import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AlertTriangle, Building2 as BuildingIcon, CheckCircle2, Clock3, CreditCard, Receipt, Users } from 'lucide-react';
import StatsCard from '@/shared/StatsCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatsRowSkeleton, ChartSkeleton, TableSkeleton, CardGridSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { ErrorState } from '@/components/super-admin/ErrorState';
import RevenueAnalyticsChart from '@/charts/superAdmin/RevenueAnalyticsChart';
import HospitalGrowthChart from '@/charts/superAdmin/HospitalGrowthChart';
import { SubscriptionDistributionCard } from '@/components/super-admin/dashboard/SubscriptionDistributionCard';
import { RecentHospitalsTable } from '@/components/super-admin/dashboard/RecentHospitalsTable';
import { RecentActivityList } from '@/components/super-admin/dashboard/RecentActivityList';
import { SystemHealthGrid } from '@/components/super-admin/dashboard/SystemHealthGrid';
import { QuickActionsGrid } from '@/components/super-admin/dashboard/QuickActionsGrid';
import { HospitalDetailsDialog } from '@/components/dialogs/super-admin/HospitalDetailsDialog';
import { EditHospitalDialog } from '@/components/dialogs/super-admin/EditHospitalDialog';
import { SuspendHospitalDialog } from '@/components/dialogs/super-admin/SuspendHospitalDialog';
import { ActivityDetailsDialog } from '@/components/dialogs/super-admin/ActivityDetailsDialog';
import { useSuperAdminDashboard } from '@/hooks/superAdmin/useDashboard';
import { useUpdateHospital, useSuspendHospital } from '@/hooks/superAdmin/useHospitals';
import { dateFilterOptions } from '@/data/superAdmin/dashboard';

const iconMap = { building: BuildingIcon, check: CheckCircle2, clock: Clock3, alert: AlertTriangle, users: Users, creditcard: CreditCard, receipt: Receipt };
const toneToColor = { blue: 'blue', green: 'green', sky: 'cyan', red: 'red', purple: 'purple' };

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useSuperAdminDashboard();
  const [dateFilter, setDateFilter] = useState('30 Days');

  const [activeHospital, setActiveHospital] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);
  const [activeLog, setActiveLog] = useState(null);
  const [logDetailsOpen, setLogDetailsOpen] = useState(false);

  const updateHospital = useUpdateHospital();
  const suspendHospital = useSuspendHospital();

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleHospitalAction = (action, hospital) => {
    setActiveHospital(hospital);
    setOpenDialog(action);
  };

  const handleEditHospital = (hospitalId, payload) => {
    updateHospital.mutate({ hospitalId, payload });
  };

  const handleSuspendHospital = () => {
    if (!activeHospital) return;
    suspendHospital.mutate(activeHospital.id, {
      onSuccess: () => {
        setOpenDialog(null);
        toast.success(`${activeHospital.name} suspended`);
      },
    });
  };

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor hospitals, subscriptions, and platform health at a glance.</p>
        </div>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-44" aria-label="Date range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dateFilterOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {isLoading || !data ? (
        <StatsRowSkeleton count={8} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.stats.map((stat) => {
            const Icon = iconMap[stat.icon] ?? BuildingIcon;
            return (
              <StatsCard
                key={stat.id}
                icon={<Icon className="size-5" />}
                color={toneToColor[stat.tone] ?? 'gray'}
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
                comparison={stat.comparison}
              />
            );
          })}
        </section>
      )}

      {isLoading || !data ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          <RevenueAnalyticsChart data={data.revenueSeries} />
          <HospitalGrowthChart data={data.hospitalGrowthSeries} />
        </div>
      )}

      {isLoading || !data ? (
        <CardGridSkeleton count={1} />
      ) : (
        <SubscriptionDistributionCard distribution={data.subscriptionDistribution} />
      )}

      {isLoading || !data ? (
        <TableSkeleton rows={5} cols={7} />
      ) : (
        <RecentHospitalsTable hospitals={data.recentHospitals} onAction={handleHospitalAction} onViewAll={() => navigate('/super-admin/hospitals')} />
      )}

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          {isLoading || !data ? (
            <CardGridSkeleton count={1} />
          ) : (
            <RecentActivityList
              activity={data.recentActivity}
              onViewDetails={(log) => {
                setActiveLog(log);
                setLogDetailsOpen(true);
              }}
            />
          )}
          {isLoading || !data ? <CardGridSkeleton count={1} /> : <SystemHealthGrid health={data.systemHealth} />}
        </div>
        {isLoading || !data ? <CardGridSkeleton count={1} /> : <QuickActionsGrid actions={data.quickActions} />}
      </div>

      <HospitalDetailsDialog hospital={activeHospital} open={openDialog === 'view'} onOpenChange={closeDialog} />
      <EditHospitalDialog hospital={activeHospital} open={openDialog === 'edit'} onOpenChange={closeDialog} onSave={handleEditHospital} />
      <SuspendHospitalDialog hospital={activeHospital} open={openDialog === 'suspend'} onOpenChange={closeDialog} onConfirm={handleSuspendHospital} />
      <ActivityDetailsDialog log={activeLog} open={logDetailsOpen} onOpenChange={setLogDetailsOpen} />
    </div>
  );
};

export default Dashboard;
