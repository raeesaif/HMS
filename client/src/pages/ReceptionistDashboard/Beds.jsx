import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { ReceptionStatsCard } from '@/components/reception/ReceptionStatsCard';
import { FilterBar } from '@/components/reception/FilterBar';
import { ErrorState } from '@/components/reception/ErrorState';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { BedsTable } from '@/components/reception/beds/BedsTable';
import { BedAssignmentDialog } from '@/components/dialogs/receptionist/BedAssignmentDialog';
import { BedDetailsDialog } from '@/components/dialogs/receptionist/BedDetailsDialog';
import { DeleteConfirmDialog } from '@/components/dialogs/common/DeleteConfirmDialog';
import { useBeds } from '@/hooks/useBeds';
import { assignBed, reserveBed, releaseBed } from '@/services/bedService';
import { bedStatusOptions, wardOptions, floorOptions } from '@/data/receptionistBeds';

const Beds = () => {
  const { beds, setBeds, stats, isLoading, error, reload } = useBeds();

  const [search, setSearch] = useState('');
  const [ward, setWard] = useState('all');
  const [bedStatus, setBedStatus] = useState('all');
  const [floor, setFloor] = useState('all');

  const [activeBed, setActiveBed] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const filteredBeds = useMemo(() => {
    const query = search.trim().toLowerCase();
    return beds.filter((bed) => {
      const matchesSearch =
        !query || bed.bedNumber.toLowerCase().includes(query) || (bed.patientName ?? '').toLowerCase().includes(query);
      const matchesWard = ward === 'all' || bed.ward === ward;
      const matchesStatus = bedStatus === 'all' || bed.status === bedStatus;
      const matchesFloor = floor === 'all' || bed.floor === floor;
      return matchesSearch && matchesWard && matchesStatus && matchesFloor;
    });
  }, [beds, search, ward, bedStatus, floor]);

  const handleClearFilters = () => {
    setSearch('');
    setWard('all');
    setBedStatus('all');
    setFloor('all');
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, bed) => {
    setActiveBed(bed);
    setOpenDialog(action);
  };

  const handleAssignSave = (bedId, payload) => {
    const request = openDialog === 'reserve' ? reserveBed : assignBed;
    request(bedId, payload).then(() => {
      setBeds((current) => current.map((bed) => (bed.id === bedId ? { ...bed, ...payload } : bed)));
    });
  };

  const handleRelease = () => {
    if (!activeBed) return;
    releaseBed(activeBed.id).then(() => {
      setBeds((current) =>
        current.map((bed) =>
          bed.id === activeBed.id ? { ...bed, status: 'Available', patientId: null, patientName: null, admissionDate: null, admissionType: null } : bed
        )
      );
      setOpenDialog(null);
      toast.success(`Bed ${activeBed.bedNumber} released`);
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Bed Management</h1>
        <p className="mt-1 text-sm text-slate-500">Coordinate bed availability and assignments. Clinical nursing operations are managed separately.</p>
      </section>

      {isLoading || !stats ? (
        <StatsRowSkeleton count={5} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <ReceptionStatsCard icon="bed" tone="slate" value={stats.total} title="Total Beds" />
          <ReceptionStatsCard icon="check" tone="green" value={stats.available} title="Available" />
          <ReceptionStatsCard icon="bed" tone="blue" value={stats.occupied} title="Occupied" />
          <ReceptionStatsCard icon="clock" tone="amber" value={stats.reserved} title="Reserved" />
          <ReceptionStatsCard icon="alert" tone="red" value={stats.maintenance} title="Maintenance" />
        </section>
      )}

      {error ? (
        <ErrorState onRetry={reload} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={setSearch} placeholder="Search by bed number or patient..." className="sm:w-64" />
                <FilterDropdown label="Ward" value={ward} onChange={setWard} options={wardOptions.map((option) => ({ value: option, label: option }))} />
                <FilterDropdown label="Status" value={bedStatus} onChange={setBedStatus} options={bedStatusOptions.map((option) => ({ value: option, label: option }))} />
                <FilterDropdown label="Floor" value={floor} onChange={setFloor} options={floorOptions.map((option) => ({ value: option, label: option }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={6} cols={8} />
          ) : (
            <BedsTable beds={filteredBeds} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}
        </Card>
      )}

      <BedAssignmentDialog
        bed={activeBed}
        mode={openDialog === 'reserve' ? 'reserve' : 'assign'}
        open={openDialog === 'assign' || openDialog === 'reserve'}
        onOpenChange={closeDialog}
        onSave={handleAssignSave}
      />
      <BedDetailsDialog bed={activeBed} open={openDialog === 'view'} onOpenChange={closeDialog} />
      <DeleteConfirmDialog
        open={openDialog === 'release'}
        onOpenChange={closeDialog}
        title="Release this bed?"
        description={activeBed ? `Bed ${activeBed.bedNumber} will be marked as available.` : undefined}
        confirmLabel="Release Bed"
        onConfirm={handleRelease}
      />
    </div>
  );
};

export default Beds;
