import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, ClipboardList, Filter, Pill, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/shared/Pagination';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { useNurseMedications } from '@/hooks/useNurseMedications';
import { medicationStatuses, medicationWards } from '@/data/nurseMedications';
import { MedicationStatsCard } from '@/components/nurse/medication/MedicationStatsCard';
import { MedicationTable } from '@/components/nurse/medication/MedicationTable';
import { MedicationDetailsSheet } from '@/components/nurse/medication/MedicationDetailsSheet';
import { AdministerMedicationDialog } from '@/components/nurse/medication/AdministerMedicationDialog';
import { MedicationHistoryDialog } from '@/components/nurse/medication/MedicationHistoryDialog';
import { ReportSideEffectDialog } from '@/components/nurse/medication/ReportSideEffectDialog';
import { MedicationStatsSkeleton, MedicationTableSkeleton } from '@/components/nurse/medication/LoadingSkeleton';

const PAGE_SIZE = 6;

const wardOptions = medicationWards.map((ward) => ({ value: ward, label: ward }));

const MedicationAdministration = () => {
  const { data: medications, setData: setMedications, loading, refetch } = useNurseMedications();

  const [search, setSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const [activeMedicationId, setActiveMedicationId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);

  const activeMedication = medications.find((medication) => medication.id === activeMedicationId) ?? null;
  const hasActiveFilters = wardFilter !== 'all' || statusFilter !== 'all' || Boolean(dateFilter);

  const filteredMedications = useMemo(() => {
    const query = search.trim().toLowerCase();
    return medications.filter((medication) => {
      const matchesSearch =
        !query ||
        medication.patientName.toLowerCase().includes(query) ||
        medication.patientId.toLowerCase().includes(query) ||
        medication.medicineName.toLowerCase().includes(query) ||
        medication.doctor.toLowerCase().includes(query);
      const matchesWard = wardFilter === 'all' || medication.ward === wardFilter;
      const matchesStatus = statusFilter === 'all' || medication.status === statusFilter;
      const matchesDate = !dateFilter || medication.scheduledDate === dateFilter;
      return matchesSearch && matchesWard && matchesStatus && matchesDate;
    });
  }, [medications, search, wardFilter, statusFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMedications.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedMedications = filteredMedications.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setWardFilter('all');
    setStatusFilter('all');
    setDateFilter('');
    setPage(1);
  };

  const handlePanelOpenChange = (next) => {
    if (!next) setOpenPanel(null);
  };

  const handleAction = (action, medication) => {
    setActiveMedicationId(medication.id);
    if (action === 'view-details') {
      setOpenPanel('details');
    } else if (action === 'administer') {
      setOpenPanel('administer');
    } else if (action === 'view-history') {
      setOpenPanel('history');
    } else if (action === 'report-side-effect') {
      setOpenPanel('side-effect');
    } else if (action === 'add-notes') {
      toast.success(`Administration notes flow opened for ${medication.patientName}`);
    } else if (action === 'notify-doctor') {
      toast.success(`${medication.doctor} notified about ${medication.medicineName} for ${medication.patientName}`);
    }
  };

  const handleConfirmAdministration = (medicationId, form) => {
    setMedications((current) =>
      current.map((medication) => {
        if (medication.id !== medicationId) return medication;
        const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        return {
          ...medication,
          status: 'administered',
          history: [
            {
              date: today,
              medicine: medication.medicineName,
              dose: form.doseGiven || medication.dosage,
              time: form.actualTime,
              administeredBy: form.administeredBy,
              status: 'administered',
              notes: form.notes || form.patientResponse || '—',
            },
            ...medication.history,
          ],
        };
      })
    );
  };

  const stats = {
    total: medications.length,
    administered: medications.filter((medication) => medication.status === 'administered').length,
    pending: medications.filter((medication) => medication.status === 'pending').length,
    missed: medications.filter((medication) => medication.status === 'missed').length,
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Medication Administration</h1>
          <p className="mt-1 text-sm text-slate-500">Manage and administer prescribed medications for assigned patients.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <SearchInput
            value={search}
            onChange={withPageReset(setSearch)}
            placeholder="Search patient, ID, medicine or doctor"
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
          <FilterDropdown
            label="Ward"
            allLabel="All Wards"
            value={wardFilter}
            onChange={withPageReset(setWardFilter)}
            options={wardOptions}
          />
          <FilterDropdown
            label="Status"
            allLabel="All Statuses"
            value={statusFilter}
            onChange={withPageReset(setStatusFilter)}
            options={medicationStatuses}
          />
          <Input
            type="date"
            value={dateFilter}
            onChange={(event) => withPageReset(setDateFilter)(event.target.value)}
            className="h-10 w-full sm:w-40"
            aria-label="Scheduled date"
          />
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </section>
      )}

      {loading ? (
        <MedicationStatsSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MedicationStatsCard
            icon={Pill}
            tone="blue"
            count={stats.total}
            title="Today's Medications"
            description="Scheduled doses today"
          />
          <MedicationStatsCard
            icon={CheckCircle2}
            tone="green"
            count={stats.administered}
            title="Administered"
            description="Doses given today"
          />
          <MedicationStatsCard
            icon={ClipboardList}
            tone="amber"
            count={stats.pending}
            title="Pending"
            description="Awaiting administration"
          />
          <MedicationStatsCard
            icon={XCircle}
            tone="red"
            count={stats.missed}
            title="Missed Doses"
            description="Require follow-up"
          />
        </section>
      )}

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {loading ? (
          <MedicationTableSkeleton />
        ) : (
          <MedicationTable
            medications={paginatedMedications}
            onAction={handleAction}
            emptyTitle={medications.length === 0 ? 'No medications scheduled.' : 'No matching medications'}
            emptyDescription={
              medications.length === 0
                ? 'Prescribed medications for your assigned patients will appear here.'
                : 'Adjust your search or filters to see more results.'
            }
          />
        )}

        {!loading && filteredMedications.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
              currentPage * PAGE_SIZE,
              filteredMedications.length
            )} of ${filteredMedications.length} medications`}
            className="border-t border-border px-5 py-4"
          />
        )}
      </Card>

      <MedicationDetailsSheet medication={activeMedication} open={openPanel === 'details'} onOpenChange={handlePanelOpenChange} />
      <AdministerMedicationDialog
        medication={activeMedication}
        open={openPanel === 'administer'}
        onOpenChange={handlePanelOpenChange}
        onConfirm={handleConfirmAdministration}
      />
      <MedicationHistoryDialog medication={activeMedication} open={openPanel === 'history'} onOpenChange={handlePanelOpenChange} />
      <ReportSideEffectDialog
        medication={activeMedication}
        open={openPanel === 'side-effect'}
        onOpenChange={handlePanelOpenChange}
      />
    </div>
  );
};

export default MedicationAdministration;
