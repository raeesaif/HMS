import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { BedDouble, BedSingle, Filter, RefreshCw, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination } from '@/shared/Pagination';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { useNurseBeds } from '@/hooks/useNurseBeds';
import { bedStatuses, bedWards } from '@/data/nurseBeds';
import { BedStatsCard } from '@/components/nurse/beds/BedStatsCard';
import { WardFilter } from '@/components/nurse/beds/WardFilter';
import { BedTable } from '@/components/nurse/beds/BedTable';
import { BedAlerts } from '@/components/nurse/beds/BedAlerts';
import { BedDetailsSheet } from '@/components/nurse/beds/BedDetailsSheet';
import { TransferPatientDialog } from '@/components/nurse/beds/TransferPatientDialog';
import { UpdateBedStatusDialog } from '@/components/nurse/beds/UpdateBedStatusDialog';
import { BedStatsSkeleton, BedTableSkeleton } from '@/components/nurse/beds/LoadingSkeleton';

const PAGE_SIZE = 6;

const wardOptions = bedWards.map((ward) => ({ value: ward, label: ward }));

const BedsWards = () => {
  const { data: beds, setData: setBeds, loading, refetch } = useNurseBeds();

  const [search, setSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const [activeBedId, setActiveBedId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);

  const activeBed = beds.find((bed) => bed.id === activeBedId) ?? null;
  const hasActiveFilters = wardFilter !== 'all' || statusFilter !== 'all';

  const filteredBeds = useMemo(() => {
    const query = search.trim().toLowerCase();
    return beds.filter((bed) => {
      const matchesSearch =
        !query ||
        bed.bedNumber.toLowerCase().includes(query) ||
        bed.ward.toLowerCase().includes(query) ||
        bed.patient?.name.toLowerCase().includes(query) ||
        bed.patient?.id.toLowerCase().includes(query);
      const matchesWard = wardFilter === 'all' || bed.ward === wardFilter;
      const matchesStatus = statusFilter === 'all' || bed.status === statusFilter;
      return matchesSearch && matchesWard && matchesStatus;
    });
  }, [beds, search, wardFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBeds.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedBeds = filteredBeds.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setWardFilter('all');
    setStatusFilter('all');
    setPage(1);
  };

  const handlePanelOpenChange = (next) => {
    if (!next) setOpenPanel(null);
  };

  const handleAction = (action, bed) => {
    setActiveBedId(bed.id);
    if (action === 'view-bed-details' || action === 'view-patient') {
      setOpenPanel('details');
    } else if (action === 'transfer-patient') {
      setOpenPanel('transfer');
    } else if (action === 'update-status') {
      setOpenPanel('update-status');
    } else if (action === 'report-issue') {
      toast.success(`Issue reported for bed ${bed.bedNumber}`);
    }
  };

  const handleTransfer = (bedId, { transferToWard, transferToBed, reason }) => {
    setBeds((current) => {
      const sourceBed = current.find((bed) => bed.id === bedId);
      if (!sourceBed?.patient) return current;
      const transferredPatient = { ...sourceBed.patient, transferReason: reason };

      return current.map((bed) => {
        if (bed.id === bedId) {
          return { ...bed, status: 'cleaning', patient: null };
        }
        if (bed.ward === transferToWard && bed.bedNumber === transferToBed) {
          return { ...bed, status: 'occupied', patient: transferredPatient, assignedToday: true };
        }
        return bed;
      });
    });
  };

  const handleUpdateStatus = (bedId, { status }) => {
    setBeds((current) => current.map((bed) => (bed.id === bedId ? { ...bed, status } : bed)));
  };

  const stats = {
    total: beds.length,
    occupied: beds.filter((bed) => bed.status === 'occupied' || bed.status === 'isolation').length,
    available: beds.filter((bed) => bed.status === 'available').length,
    assignedToday: beds.filter((bed) => bed.assignedToday).length,
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Beds &amp; Wards</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor patient bed assignments and ward occupancy.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <SearchInput
            value={search}
            onChange={withPageReset(setSearch)}
            placeholder="Search patient, ID, bed or ward"
            className="sm:w-72"
          />
          <Button variant="outline" onClick={() => setShowFilters((prev) => !prev)} aria-expanded={showFilters}>
            <Filter /> Filters
          </Button>
          <Button variant="outline" onClick={refetch} disabled={loading}>
            <RefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
          </Button>
        </div>
      </section>

      {showFilters && (
        <section className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-white p-3">
          <WardFilter value={wardFilter} onChange={withPageReset(setWardFilter)} options={wardOptions} />
          <FilterDropdown
            label="Bed Status"
            allLabel="All Statuses"
            value={statusFilter}
            onChange={withPageReset(setStatusFilter)}
            options={bedStatuses}
          />
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </section>
      )}

      {loading ? (
        <BedStatsSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <BedStatsCard icon={BedDouble} tone="blue" count={stats.total} title="Total Beds" description="Across all wards" />
          <BedStatsCard icon={BedSingle} tone="green" count={stats.occupied} title="Occupied Beds" description="Currently in use" />
          <BedStatsCard icon={BedDouble} tone="amber" count={stats.available} title="Available Beds" description="Ready for a new patient" />
          <BedStatsCard icon={UsersRound} tone="red" count={stats.assignedToday} title="Patients Assigned Today" description="New assignments today" />
        </section>
      )}

      {!loading && <BedAlerts beds={beds} />}

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {loading ? (
          <BedTableSkeleton />
        ) : (
          <BedTable
            beds={paginatedBeds}
            onAction={handleAction}
            emptyTitle={beds.length === 0 ? 'No bed assignments found.' : 'No matching beds'}
            emptyDescription={
              beds.length === 0
                ? 'Bed assignments for your assigned wards will appear here.'
                : 'Adjust your search or filters to see more results.'
            }
          />
        )}

        {!loading && filteredBeds.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
              currentPage * PAGE_SIZE,
              filteredBeds.length
            )} of ${filteredBeds.length} beds`}
            className="border-t border-border px-5 py-4"
          />
        )}
      </Card>

      <BedDetailsSheet bed={activeBed} open={openPanel === 'details'} onOpenChange={handlePanelOpenChange} />
      <TransferPatientDialog
        bed={activeBed}
        beds={beds}
        open={openPanel === 'transfer'}
        onOpenChange={handlePanelOpenChange}
        onTransfer={handleTransfer}
      />
      <UpdateBedStatusDialog
        bed={activeBed}
        open={openPanel === 'update-status'}
        onOpenChange={handlePanelOpenChange}
        onSave={handleUpdateStatus}
      />
    </div>
  );
};

export default BedsWards;
