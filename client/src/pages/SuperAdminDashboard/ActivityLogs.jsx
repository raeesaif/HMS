import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import { FilterBar } from '@/components/super-admin/FilterBar';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { FiltersSkeleton, TableSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { ActivityLogsTable } from '@/components/super-admin/activity/ActivityLogsTable';
import { ActivityDetailsDialog } from '@/components/dialogs/super-admin/ActivityDetailsDialog';
import { useActivityLogs } from '@/hooks/superAdmin/useActivityLogs';
import { activityActionOptions, activityStatusOptions } from '@/data/superAdmin/activityLogs';
import { hospitals } from '@/data/superAdmin/hospitals';

const PAGE_SIZE = 8;

const ActivityLogs = () => {
  const { data: logs = [], isLoading, isError, refetch } = useActivityLogs();

  const [search, setSearch] = useState('');
  const [hospitalId, setHospitalId] = useState('all');
  const [action, setAction] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const [activeLog, setActiveLog] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return logs.filter((log) => {
      const matchesSearch = !query || log.userName.toLowerCase().includes(query) || log.resource.toLowerCase().includes(query) || log.description.toLowerCase().includes(query);
      const matchesHospital = hospitalId === 'all' || log.hospitalName === hospitals.find((h) => h.id === hospitalId)?.name;
      const matchesAction = action === 'all' || log.action === action;
      const matchesStatus = status === 'all' || log.status === status;
      return matchesSearch && matchesHospital && matchesAction && matchesStatus;
    });
  }, [logs, search, hospitalId, action, status]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = () => setPage(1);
  const handleClearFilters = () => {
    setSearch('');
    setHospitalId('all');
    setAction('all');
    setStatus('all');
    resetPage();
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Activity Logs</h1>
        <p className="mt-1 text-sm text-slate-500">A read-only audit trail of platform and hospital activity.</p>
      </section>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={(value) => { setSearch(value); resetPage(); }} placeholder="Search by user or resource..." className="sm:w-64" />
                <FilterDropdown label="Hospital" value={hospitalId} onChange={(value) => { setHospitalId(value); resetPage(); }} options={hospitals.map((h) => ({ value: h.id, label: h.name }))} />
                <FilterDropdown label="Action" value={action} onChange={(value) => { setAction(value); resetPage(); }} options={activityActionOptions.map((o) => ({ value: o, label: o }))} />
                <FilterDropdown label="Status" value={status} onChange={(value) => { setStatus(value); resetPage(); }} options={activityStatusOptions.map((o) => ({ value: o, label: o }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={8} cols={8} />
          ) : (
            <ActivityLogsTable
              logs={paginatedLogs}
              onView={(log) => {
                setActiveLog(log);
                setDetailsOpen(true);
              }}
              onClearFilters={handleClearFilters}
            />
          )}

          {!isLoading && filteredLogs.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredLogs.length)} of ${filteredLogs.length} logs`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <ActivityDetailsDialog log={activeLog} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  );
};

export default ActivityLogs;
