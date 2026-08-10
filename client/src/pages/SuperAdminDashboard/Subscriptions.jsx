import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CreditCard } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { FilterBar } from '@/components/super-admin/FilterBar';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { CardGridSkeleton, TableSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { PlanCard } from '@/components/super-admin/subscriptions/PlanCard';
import { SubscribersTable } from '@/components/super-admin/subscriptions/SubscribersTable';
import { CreateSubscriptionDialog } from '@/components/dialogs/super-admin/CreateSubscriptionDialog';
import { EditSubscriptionDialog } from '@/components/dialogs/super-admin/EditSubscriptionDialog';
import { SubscriptionDetailsDialog } from '@/components/dialogs/super-admin/SubscriptionDetailsDialog';
import { HospitalDetailsDialog } from '@/components/dialogs/super-admin/HospitalDetailsDialog';
import {
  usePlans,
  useCreatePlan,
  useUpdatePlan,
  useDuplicatePlan,
  useArchivePlan,
  useActivatePlan,
} from '@/hooks/superAdmin/useSubscriptions';
import { useHospitals } from '@/hooks/superAdmin/useHospitals';

const Subscriptions = () => {
  const { data: plans = [], isLoading, isError, refetch } = usePlans();
  const { data: hospitals = [] } = useHospitals();

  const [planFilter, setPlanFilter] = useState('all');
  const [activePlan, setActivePlan] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);
  const [activeHospital, setActiveHospital] = useState(null);
  const [hospitalDetailsOpen, setHospitalDetailsOpen] = useState(false);

  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();
  const duplicatePlan = useDuplicatePlan();
  const archivePlan = useArchivePlan();
  const activatePlan = useActivatePlan();

  const subscriberCountFor = (planName) => hospitals.filter((h) => h.plan === planName).length;

  const subscribers = useMemo(() => {
    if (planFilter === 'all') return hospitals;
    return hospitals.filter((h) => h.plan === planFilter);
  }, [hospitals, planFilter]);

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, plan) => {
    setActivePlan(plan);
    if (action === 'duplicate') {
      duplicatePlan.mutate(plan.id, { onSuccess: () => toast.success(`${plan.name} duplicated`) });
      return;
    }
    if (action === 'archive') {
      archivePlan.mutate(plan.id, { onSuccess: () => toast.success(`${plan.name} archived`) });
      return;
    }
    if (action === 'activate') {
      activatePlan.mutate(plan.id, { onSuccess: () => toast.success(`${plan.name} activated`) });
      return;
    }
    if (action === 'view-subscribers') {
      setPlanFilter(plan.name);
      return;
    }
    setOpenDialog(action);
  };

  const handleCreate = (payload) => createPlan.mutate(payload);
  const handleEdit = (planId, payload) => updatePlan.mutate({ planId, payload });

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Subscriptions</h1>
          <p className="mt-1 text-sm text-slate-500">Manage subscription plans, pricing, and feature access.</p>
        </div>
        <Button onClick={() => setOpenDialog('create')}>
          <CreditCard /> Create Plan
        </Button>
      </section>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <CardGridSkeleton count={4} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} subscriberCount={subscriberCountFor(plan.name)} onAction={handleAction} />
          ))}
        </section>
      )}

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
          <CardTitle className="text-base font-semibold">Subscribers</CardTitle>
          <FilterBar>
            <FilterDropdown label="Plan" value={planFilter} onChange={setPlanFilter} options={plans.map((p) => ({ value: p.name, label: p.name }))} />
          </FilterBar>
        </CardHeader>
        {isLoading ? (
          <TableSkeleton rows={5} cols={7} />
        ) : (
          <SubscribersTable
            subscribers={subscribers}
            onView={(hospital) => {
              setActiveHospital(hospital);
              setHospitalDetailsOpen(true);
            }}
          />
        )}
      </Card>

      <CreateSubscriptionDialog open={openDialog === 'create'} onOpenChange={closeDialog} onSave={handleCreate} />
      <EditSubscriptionDialog plan={activePlan} open={openDialog === 'edit'} onOpenChange={closeDialog} onSave={handleEdit} />
      <SubscriptionDetailsDialog plan={activePlan} open={openDialog === 'view-details'} onOpenChange={closeDialog} />
      <HospitalDetailsDialog hospital={activeHospital} open={hospitalDetailsOpen} onOpenChange={setHospitalDetailsOpen} />
    </div>
  );
};

export default Subscriptions;
