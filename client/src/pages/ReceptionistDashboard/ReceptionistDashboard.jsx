import { useNavigate } from 'react-router-dom';
import { ReceptionStatsCard } from '@/components/reception/ReceptionStatsCard';
import { ErrorState } from '@/components/reception/ErrorState';
import { StatsRowSkeleton } from '@/components/reception/LoadingSkeleton';
import { AppointmentsOverview } from '@/components/reception/dashboard/AppointmentsOverview';
import { QueueOverview } from '@/components/reception/dashboard/QueueOverview';
import { DoctorsOverview } from '@/components/reception/dashboard/DoctorsOverview';
import { EmergencyOverview } from '@/components/reception/dashboard/EmergencyOverview';
import { PaymentsOverview } from '@/components/reception/dashboard/PaymentsOverview';
import { QuickActions } from '@/components/reception/dashboard/QuickActions';
import { quickActions } from '@/data/receptionistDashboard';
import { useReceptionDashboard } from '@/hooks/useReceptionDashboard';

const ReceptionistDashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, reload } = useReceptionDashboard();

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <ErrorState onRetry={reload} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reception Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage today&apos;s patients, appointments, check-ins, queue, beds, doctors, and billing activities.
        </p>
      </section>

      {isLoading || !data ? (
        <StatsRowSkeleton count={8} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.stats.map((stat) => (
            <ReceptionStatsCard key={stat.id} {...stat} />
          ))}
        </section>
      )}

      <AppointmentsOverview
        appointments={data?.appointments ?? []}
        isLoading={isLoading}
        onViewAll={() => navigate('/reception/appointments')}
      />

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <QueueOverview queue={data?.queue ?? []} isLoading={isLoading} onViewAll={() => navigate('/reception/queue')} />
          <DoctorsOverview doctors={data?.doctors ?? []} isLoading={isLoading} onViewAll={() => navigate('/reception/doctors')} />
        </div>
        <QuickActions actions={quickActions} />
      </div>

      <EmergencyOverview
        emergencies={data?.emergencies ?? []}
        isLoading={isLoading}
        onViewAll={() => navigate('/reception/emergency')}
      />

      <PaymentsOverview payments={data?.payments ?? []} isLoading={isLoading} onViewAll={() => navigate('/reception/billing')} />
    </div>
  );
};

export default ReceptionistDashboard;
