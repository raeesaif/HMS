import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import StatsCard from '@/shared/StatsCard';
import { FilterBar } from '@/components/super-admin/FilterBar';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { HospitalsTable } from '@/components/super-admin/hospitals/HospitalsTable';
import { CreateHospitalDialog } from '@/components/dialogs/super-admin/CreateHospitalDialog';
import { EditHospitalDialog } from '@/components/dialogs/super-admin/EditHospitalDialog';
import { HospitalDetailsDialog } from '@/components/dialogs/super-admin/HospitalDetailsDialog';
import { SuspendHospitalDialog } from '@/components/dialogs/super-admin/SuspendHospitalDialog';
import { ChangeHospitalPlanDialog } from '@/components/dialogs/super-admin/ChangeHospitalPlanDialog';
import { DeleteConfirmDialog } from '@/components/dialogs/common/DeleteConfirmDialog';
import { useHospitals, useCreateHospital, useUpdateHospital, useSuspendHospital, useActivateHospital, useDeleteHospital } from '@/hooks/superAdmin/useHospitals';
import { hospitalStatusOptions } from '@/data/superAdmin/hospitals';
import { plans } from '@/data/superAdmin/subscriptionPlans';

const PAGE_SIZE = 8;

const Hospitals = () => {
  const navigate = useNavigate();
  const { data: hospitals = [], isLoading, isError, refetch } = useHospitals();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [plan, setPlan] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);

  const [activeHospital, setActiveHospital] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const createHospital = useCreateHospital();
  const updateHospital = useUpdateHospital();
  const suspendHospital = useSuspendHospital();
  const activateHospital = useActivateHospital();
  const deleteHospital = useDeleteHospital();

  const filteredHospitals = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = hospitals.filter((hospital) => {
      const matchesSearch =
        !query || hospital.name.toLowerCase().includes(query) || hospital.code.toLowerCase().includes(query) || hospital.email.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || hospital.status === status;
      const matchesPlan = plan === 'all' || hospital.plan === plan;
      return matchesSearch && matchesStatus && matchesPlan;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.registrationDate) - new Date(a.registrationDate);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'users-desc') return b.totalUsers - a.totalUsers;
      return 0;
    });
  }, [hospitals, search, status, plan, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredHospitals.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedHospitals = filteredHospitals.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = {
    total: hospitals.length,
    active: hospitals.filter((h) => h.status === 'Active').length,
    trial: hospitals.filter((h) => h.status === 'Trial').length,
    suspended: hospitals.filter((h) => h.status === 'Suspended').length,
    expired: hospitals.filter((h) => h.status === 'Expired').length,
  };

  const resetPage = () => setPage(1);
  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    setPlan('all');
    setSortBy('recent');
    resetPage();
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, hospital) => {
    setActiveHospital(hospital);
    if (action === 'view-users') {
      navigate('/super-admin/users');
      return;
    }
    if (action === 'activate') {
      activateHospital.mutate(hospital.id, { onSuccess: () => toast.success(`${hospital.name} activated`) });
      return;
    }
    setOpenDialog(action);
  };

  const handleCreate = (payload) => {
    createHospital.mutate(payload);
  };

  const handleEdit = (hospitalId, payload) => {
    updateHospital.mutate({ hospitalId, payload });
  };

  const handleChangePlan = (hospitalId, payload) => {
    updateHospital.mutate({ hospitalId, payload });
  };

  const handleSuspend = () => {
    if (!activeHospital) return;
    suspendHospital.mutate(activeHospital.id, {
      onSuccess: () => {
        setOpenDialog(null);
        toast.success(`${activeHospital.name} suspended`);
      },
    });
  };

  const handleDelete = () => {
    if (!activeHospital) return;
    deleteHospital.mutate(activeHospital.id, {
      onSuccess: () => {
        setOpenDialog(null);
        toast.success(`${activeHospital.name} deleted`);
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Hospitals</h1>
          <p className="mt-1 text-sm text-slate-500">Manage all hospitals registered on the HMS platform.</p>
        </div>
        <Button onClick={() => setOpenDialog('create')}>
          <Building2 /> Add Hospital
        </Button>
      </section>

      {isLoading ? (
        <StatsRowSkeleton count={5} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatsCard icon={<Building2 className="size-5" />} color="blue" title="Total Hospitals" value={stats.total} />
          <StatsCard icon={<Building2 className="size-5" />} color="green" title="Active" value={stats.active} />
          <StatsCard icon={<Building2 className="size-5" />} color="cyan" title="Trial" value={stats.trial} />
          <StatsCard icon={<Building2 className="size-5" />} color="red" title="Suspended" value={stats.suspended} />
          <StatsCard icon={<Building2 className="size-5" />} color="gray" title="Expired" value={stats.expired} />
        </section>
      )}

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={(value) => { setSearch(value); resetPage(); }} placeholder="Search by name, code, or email..." className="sm:w-64" />
                <FilterDropdown label="Status" value={status} onChange={(value) => { setStatus(value); resetPage(); }} options={hospitalStatusOptions.map((o) => ({ value: o, label: o }))} />
                <FilterDropdown label="Plan" value={plan} onChange={(value) => { setPlan(value); resetPage(); }} options={plans.map((p) => ({ value: p.name, label: p.name }))} />
                <FilterDropdown
                  label="Sort By"
                  value={sortBy}
                  onChange={setSortBy}
                  options={[
                    { value: 'recent', label: 'Most Recent' },
                    { value: 'name-asc', label: 'Name (A-Z)' },
                    { value: 'users-desc', label: 'Most Users' },
                  ]}
                />
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Reset Filters
                </Button>
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={8} cols={10} />
          ) : (
            <HospitalsTable hospitals={paginatedHospitals} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}

          {!isLoading && filteredHospitals.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredHospitals.length)} of ${filteredHospitals.length} hospitals`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <CreateHospitalDialog open={openDialog === 'create'} onOpenChange={closeDialog} onSave={handleCreate} isSubmitting={createHospital.isPending} />
      <HospitalDetailsDialog hospital={activeHospital} open={openDialog === 'view'} onOpenChange={closeDialog} />
      <EditHospitalDialog hospital={activeHospital} open={openDialog === 'edit'} onOpenChange={closeDialog} onSave={handleEdit} />
      <ChangeHospitalPlanDialog hospital={activeHospital} open={openDialog === 'change-plan'} onOpenChange={closeDialog} onSave={handleChangePlan} />
      <SuspendHospitalDialog hospital={activeHospital} open={openDialog === 'suspend'} onOpenChange={closeDialog} onConfirm={handleSuspend} />
      <DeleteConfirmDialog
        open={openDialog === 'delete'}
        onOpenChange={closeDialog}
        title="Delete this hospital?"
        description={activeHospital ? `This will permanently remove ${activeHospital.name} and all associated data. This action cannot be undone.` : undefined}
        confirmLabel="Delete Hospital"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Hospitals;
