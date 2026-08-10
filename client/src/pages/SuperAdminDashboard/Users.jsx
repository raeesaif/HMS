import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Users as UsersIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import StatsCard from '@/shared/StatsCard';
import { FilterBar } from '@/components/super-admin/FilterBar';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { UsersTable } from '@/components/super-admin/users/UsersTable';
import { UserDetailsDialog } from '@/components/dialogs/super-admin/UserDetailsDialog';
import { EditUserDialog } from '@/components/dialogs/super-admin/EditUserDialog';
import { SuspendUserDialog } from '@/components/dialogs/super-admin/SuspendUserDialog';
import { ResetUserDialog } from '@/components/dialogs/super-admin/ResetUserDialog';
import { useUsers, useUpdateUser, useSuspendUser, useActivateUser, useResetUserPassword } from '@/hooks/superAdmin/useUsers';
import { userRoleOptions, userStatusOptions } from '@/data/superAdmin/users';
import { hospitals } from '@/data/superAdmin/hospitals';

const PAGE_SIZE = 8;

const Users = () => {
  const navigate = useNavigate();
  const { data: users = [], isLoading, isError, refetch } = useUsers();

  const [search, setSearch] = useState('');
  const [hospitalId, setHospitalId] = useState('all');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const [activeUser, setActiveUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const updateUser = useUpdateUser();
  const suspendUser = useSuspendUser();
  const activateUser = useActivateUser();
  const resetPassword = useResetUserPassword();

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch = !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
      const matchesHospital = hospitalId === 'all' || user.hospitalId === hospitalId;
      const matchesRole = role === 'all' || user.role === role;
      const matchesStatus = status === 'all' || user.status === status;
      return matchesSearch && matchesHospital && matchesRole && matchesStatus;
    });
  }, [users, search, hospitalId, role, status]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === 'Hospital Admin').length,
    doctors: users.filter((u) => u.role === 'Doctor').length,
    nurses: users.filter((u) => u.role === 'Nurse').length,
    receptionists: users.filter((u) => u.role === 'Receptionist').length,
    patients: users.filter((u) => u.role === 'Patient').length,
    active: users.filter((u) => u.status === 'Active').length,
    suspended: users.filter((u) => u.status === 'Suspended').length,
  };

  const resetPage = () => setPage(1);
  const handleClearFilters = () => {
    setSearch('');
    setHospitalId('all');
    setRole('all');
    setStatus('all');
    resetPage();
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, user) => {
    setActiveUser(user);
    if (action === 'view-activity') {
      navigate('/super-admin/activity-logs');
      return;
    }
    if (action === 'activate') {
      activateUser.mutate(user.id, { onSuccess: () => toast.success(`${user.name} activated`) });
      return;
    }
    setOpenDialog(action);
  };

  const handleEdit = (userId, payload) => {
    updateUser.mutate({ userId, payload });
  };

  const handleSuspend = () => {
    if (!activeUser) return;
    suspendUser.mutate(activeUser.id, {
      onSuccess: () => {
        setOpenDialog(null);
        toast.success(`${activeUser.name} suspended`);
      },
    });
  };

  const handleResetPassword = () => {
    if (!activeUser) return;
    resetPassword.mutate(activeUser.id, {
      onSuccess: () => {
        setOpenDialog(null);
        toast.success(`Password reset link sent to ${activeUser.email}`);
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Users</h1>
        <p className="mt-1 text-sm text-slate-500">Platform-level visibility across every hospital&apos;s users.</p>
      </section>

      {isLoading ? (
        <StatsRowSkeleton count={8} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard icon={<UsersIcon className="size-5" />} color="blue" title="Total Users" value={stats.total} />
          <StatsCard icon={<UsersIcon className="size-5" />} color="purple" title="Hospital Admins" value={stats.admins} />
          <StatsCard icon={<UsersIcon className="size-5" />} color="cyan" title="Doctors" value={stats.doctors} />
          <StatsCard icon={<UsersIcon className="size-5" />} color="green" title="Nurses" value={stats.nurses} />
          <StatsCard icon={<UsersIcon className="size-5" />} color="yellow" title="Receptionists" value={stats.receptionists} />
          <StatsCard icon={<UsersIcon className="size-5" />} color="pink" title="Patients" value={stats.patients} />
          <StatsCard icon={<UsersIcon className="size-5" />} color="green" title="Active Users" value={stats.active} />
          <StatsCard icon={<UsersIcon className="size-5" />} color="red" title="Suspended Users" value={stats.suspended} />
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
                <SearchInput value={search} onChange={(value) => { setSearch(value); resetPage(); }} placeholder="Search by name or email..." className="sm:w-64" />
                <FilterDropdown label="Hospital" value={hospitalId} onChange={(value) => { setHospitalId(value); resetPage(); }} options={hospitals.map((h) => ({ value: h.id, label: h.name }))} />
                <FilterDropdown label="Role" value={role} onChange={(value) => { setRole(value); resetPage(); }} options={userRoleOptions.map((o) => ({ value: o, label: o }))} />
                <FilterDropdown label="Status" value={status} onChange={(value) => { setStatus(value); resetPage(); }} options={userStatusOptions.map((o) => ({ value: o, label: o }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={8} cols={8} />
          ) : (
            <UsersTable users={paginatedUsers} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}

          {!isLoading && filteredUsers.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredUsers.length)} of ${filteredUsers.length} users`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <UserDetailsDialog user={activeUser} open={openDialog === 'view'} onOpenChange={closeDialog} />
      <EditUserDialog user={activeUser} open={openDialog === 'edit'} onOpenChange={closeDialog} onSave={handleEdit} />
      <SuspendUserDialog user={activeUser} open={openDialog === 'suspend'} onOpenChange={closeDialog} onConfirm={handleSuspend} />
      <ResetUserDialog user={activeUser} open={openDialog === 'reset-password'} onOpenChange={closeDialog} onConfirm={handleResetPassword} />
    </div>
  );
};

export default Users;
