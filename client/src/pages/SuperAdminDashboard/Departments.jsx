import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Layers } from 'lucide-react';
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
import { useDepartments, useCreateDepartment, useUpdateDepartment, useDeleteDepartment } from '@/hooks/useDepartments';

const PAGE_SIZE = 8;

const Departments = () => {
  const { data: departments = [], isLoading, isError, refetch } = useDepartments();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [page, setPage] = useState(1);

  const [activeDepartment, setActiveDepartment] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const deleteDepartment = useDeleteDepartment();

  const filteredDepartments = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = departments.filter((department) => {
      const matchesSearch = !query || department.name.toLowerCase().includes(query) || (department.description ?? '').toLowerCase().includes(query);
      const matchesStatus = status === 'all' || (status === 'active' ? department.isActive : !department.isActive);
      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
  }, [departments, search, status, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredDepartments.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedDepartments = filteredDepartments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = {
    total: departments.length,
    active: departments.filter((d) => d.isActive).length,
    inactive: departments.filter((d) => !d.isActive).length,
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

  const handleAction = (action, department) => {
    setActiveDepartment(department);
    setOpenDialog(action);
  };

  const handleCreate = (payload) => {
    createDepartment.mutate(payload, {
      onError: (error) => toast.error(error.response?.data?.message ?? 'Failed to create department'),
    });
  };

  const handleEdit = (payload) => {
    if (!activeDepartment) return;
    updateDepartment.mutate(
      { departmentId: activeDepartment.id, payload },
      { onError: (error) => toast.error(error.response?.data?.message ?? 'Failed to update department') }
    );
  };

  const handleDelete = () => {
    if (!activeDepartment) return;
    deleteDepartment.mutate(activeDepartment.id, {
      onSuccess: () => {
        setOpenDialog(null);
        toast.success(`${activeDepartment.name} deleted`);
      },
      onError: (error) => toast.error(error.response?.data?.message ?? 'Failed to delete department'),
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Departments</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the hospital departments available across the platform.</p>
        </div>
        <Button
          onClick={() => {
            setActiveDepartment(null);
            setOpenDialog('create');
          }}
        >
          <Layers /> Add Department
        </Button>
      </section>

      {isLoading ? (
        <StatsRowSkeleton count={3} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard icon={<Layers className="size-5" />} color="blue" title="Total Departments" value={stats.total} />
          <StatsCard icon={<Layers className="size-5" />} color="green" title="Active" value={stats.active} />
          <StatsCard icon={<Layers className="size-5" />} color="gray" title="Inactive" value={stats.inactive} />
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
            <CatalogTable items={paginatedDepartments} icon={Layers} entityLabel="Department" onAction={handleAction} onClearFilters={handleClearFilters} />
          )}

          {!isLoading && filteredDepartments.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredDepartments.length)} of ${filteredDepartments.length} departments`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <CatalogFormDialog
        open={openDialog === 'create'}
        onOpenChange={closeDialog}
        mode="create"
        entityLabel="Department"
        nameMaxLength={50}
        onSave={handleCreate}
        isSubmitting={createDepartment.isPending}
      />
      <CatalogFormDialog
        open={openDialog === 'edit'}
        onOpenChange={closeDialog}
        mode="edit"
        entityLabel="Department"
        nameMaxLength={50}
        initialValues={activeDepartment}
        onSave={handleEdit}
        isSubmitting={updateDepartment.isPending}
      />
      <DeleteConfirmDialog
        open={openDialog === 'delete'}
        onOpenChange={closeDialog}
        title="Delete this department?"
        description={activeDepartment ? `This will permanently remove ${activeDepartment.name}. This action cannot be undone.` : undefined}
        confirmLabel="Delete Department"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Departments;
