import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Stethoscope } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import StatsCard from '@/shared/StatsCard';
import { FilterBar } from '@/components/super-admin/FilterBar';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { CatalogTable } from '@/components/super-admin/catalog/CatalogTable';
import { CatalogFormDialog } from '@/components/dialogs/super-admin/CatalogFormDialog';
import { DeleteConfirmDialog } from '@/components/dialogs/common/DeleteConfirmDialog';
import { useSpecialties, useCreateSpecialty, useUpdateSpecialty, useDeleteSpecialty } from '@/hooks/useSpecialties';

const PAGE_SIZE = 8;

const Specialties = () => {
  const { data: specialties = [], isLoading, isError, refetch } = useSpecialties();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [page, setPage] = useState(1);

  const [activeSpecialty, setActiveSpecialty] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const createSpecialty = useCreateSpecialty();
  const updateSpecialty = useUpdateSpecialty();
  const deleteSpecialty = useDeleteSpecialty();

  const filteredSpecialties = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = specialties.filter((specialty) => {
      const matchesSearch = !query || specialty.name.toLowerCase().includes(query) || (specialty.description ?? '').toLowerCase().includes(query);
      const matchesStatus = status === 'all' || (status === 'active' ? specialty.isActive : !specialty.isActive);
      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
  }, [specialties, search, status, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredSpecialties.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedSpecialties = filteredSpecialties.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = {
    total: specialties.length,
    active: specialties.filter((s) => s.isActive).length,
    inactive: specialties.filter((s) => !s.isActive).length,
  };

  const resetPage = () => setPage(1);
  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    setSortBy('name-asc');
    resetPage();
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, specialty) => {
    setActiveSpecialty(specialty);
    setOpenDialog(action);
  };

  const handleCreate = (payload) => {
    createSpecialty.mutate(payload, {
      onError: (error) => toast.error(error.response?.data?.message ?? 'Failed to create specialty'),
    });
  };

  const handleEdit = (payload) => {
    if (!activeSpecialty) return;
    updateSpecialty.mutate(
      { specialtyId: activeSpecialty.id, payload },
      { onError: (error) => toast.error(error.response?.data?.message ?? 'Failed to update specialty') }
    );
  };

  const handleDelete = () => {
    if (!activeSpecialty) return;
    deleteSpecialty.mutate(activeSpecialty.id, {
      onSuccess: () => {
        setOpenDialog(null);
        toast.success(`${activeSpecialty.name} deleted`);
      },
      onError: (error) => toast.error(error.response?.data?.message ?? 'Failed to delete specialty'),
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Specialties</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the medical specialties available across the platform.</p>
        </div>
        <Button
          onClick={() => {
            setActiveSpecialty(null);
            setOpenDialog('create');
          }}
        >
          <Stethoscope /> Add Specialty
        </Button>
      </section>

      {isLoading ? (
        <StatsRowSkeleton count={3} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard icon={<Stethoscope className="size-5" />} color="blue" title="Total Specialties" value={stats.total} />
          <StatsCard icon={<Stethoscope className="size-5" />} color="green" title="Active" value={stats.active} />
          <StatsCard icon={<Stethoscope className="size-5" />} color="gray" title="Inactive" value={stats.inactive} />
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
                <SearchInput
                  value={search}
                  onChange={(value) => {
                    setSearch(value);
                    resetPage();
                  }}
                  placeholder="Search by name or description..."
                  className="sm:w-64"
                />
                <FilterDropdown
                  label="Status"
                  value={status}
                  onChange={(value) => {
                    setStatus(value);
                    resetPage();
                  }}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
                <FilterDropdown
                  label="Sort By"
                  value={sortBy}
                  onChange={setSortBy}
                  options={[
                    { value: 'name-asc', label: 'Name (A-Z)' },
                    { value: 'name-desc', label: 'Name (Z-A)' },
                    { value: 'recent', label: 'Most Recent' },
                  ]}
                />
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Reset Filters
                </Button>
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={8} cols={5} />
          ) : (
            <CatalogTable
              items={paginatedSpecialties}
              icon={Stethoscope}
              entityLabel="Specialty"
              pluralLabel="Specialties"
              onAction={handleAction}
              onClearFilters={handleClearFilters}
            />
          )}

          {!isLoading && filteredSpecialties.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredSpecialties.length)} of ${filteredSpecialties.length} specialties`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <CatalogFormDialog
        open={openDialog === 'create'}
        onOpenChange={closeDialog}
        mode="create"
        entityLabel="Specialty"
        nameMaxLength={100}
        onSave={handleCreate}
        isSubmitting={createSpecialty.isPending}
      />
      <CatalogFormDialog
        open={openDialog === 'edit'}
        onOpenChange={closeDialog}
        mode="edit"
        entityLabel="Specialty"
        nameMaxLength={100}
        initialValues={activeSpecialty}
        onSave={handleEdit}
        isSubmitting={updateSpecialty.isPending}
      />
      <DeleteConfirmDialog
        open={openDialog === 'delete'}
        onOpenChange={closeDialog}
        title="Delete this specialty?"
        description={activeSpecialty ? `This will permanently remove ${activeSpecialty.name}. This action cannot be undone.` : undefined}
        confirmLabel="Delete Specialty"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Specialties;
