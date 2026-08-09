import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CalendarClock, CheckCircle2, FilePlus2, FileText, Plus, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/shared/SearchInput';
import { Pagination } from '@/shared/Pagination';
import { doctorPrescriptions } from '@/data/doctorPrescriptions';
import { downloadPrescription, printPrescription } from '@/lib/prescriptionPrint';
import { PrescriptionStatsCard } from '@/components/doctor/prescriptions/PrescriptionStatsCard';
import { PrescriptionFilters } from '@/components/doctor/prescriptions/PrescriptionFilters';
import { PrescriptionTable } from '@/components/doctor/prescriptions/PrescriptionTable';
import { PrescriptionDetailsSheet } from '@/components/doctor/prescriptions/PrescriptionDetailsSheet';
import { CreatePrescriptionSheet } from '@/components/doctor/prescriptions/CreatePrescriptionSheet';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/doctor/prescriptions/LoadingSkeleton';

const PAGE_SIZE = 6;

const toISODate = (date) => date.toISOString().slice(0, 10);

const generatePrescriptionId = (prescriptions) => {
  const maxNumber = prescriptions.reduce((max, rx) => {
    const number = parseInt(rx.id.replace('RX-', ''), 10);
    return Number.isFinite(number) ? Math.max(max, number) : max;
  }, 3000);
  return `RX-${maxNumber + 1}`;
};

const DEFAULT_FILTERS = { status: 'all', datePreset: 'all', customDate: null };

const DoctorPrescriptions = () => {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState(doctorPrescriptions);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(DEFAULT_FILTERS.status);
  const [datePreset, setDatePreset] = useState(DEFAULT_FILTERS.datePreset);
  const [customDate, setCustomDate] = useState(DEFAULT_FILTERS.customDate);
  const [page, setPage] = useState(1);

  const [activePrescriptionId, setActivePrescriptionId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingPrescriptionId, setEditingPrescriptionId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const activePrescription = prescriptions.find((rx) => rx.id === activePrescriptionId) ?? null;
  const editingPrescription = prescriptions.find((rx) => rx.id === editingPrescriptionId) ?? null;

  const { todayISO, weekStartISO, monthStartISO } = useMemo(() => {
    const today = new Date();
    const weekStart = new Date();
    weekStart.setDate(today.getDate() - 6);
    const monthStart = new Date();
    monthStart.setMonth(today.getMonth() - 1);
    return { todayISO: toISODate(today), weekStartISO: toISODate(weekStart), monthStartISO: toISODate(monthStart) };
  }, []);

  const matchesDatePreset = (isoDate) => {
    if (datePreset === 'all') return true;
    if (!isoDate) return false;
    if (datePreset === 'today') return isoDate === todayISO;
    if (datePreset === 'week') return isoDate >= weekStartISO && isoDate <= todayISO;
    if (datePreset === 'month') return isoDate >= monthStartISO && isoDate <= todayISO;
    if (datePreset === 'custom') return customDate ? isoDate === customDate : true;
    return true;
  };

  const filteredPrescriptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return prescriptions.filter((rx) => {
      const matchesSearch =
        !query ||
        rx.id.toLowerCase().includes(query) ||
        rx.patientId.toLowerCase().includes(query) ||
        rx.medicines.some((med) => med.name.toLowerCase().includes(query));
      const matchesStatus = status === 'all' || rx.status === status;
      return matchesSearch && matchesStatus && matchesDatePreset(rx.isoDate);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prescriptions, search, status, datePreset, customDate, todayISO, weekStartISO, monthStartISO]);

  const totalPages = Math.max(1, Math.ceil(filteredPrescriptions.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPrescriptions = filteredPrescriptions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const stats = useMemo(() => {
    const todayCount = prescriptions.filter((rx) => rx.isoDate === todayISO).length;
    return {
      today: todayCount,
      active: prescriptions.filter((rx) => rx.status === 'Active').length,
      completed: prescriptions.filter((rx) => rx.status === 'Completed').length,
      followUpRequired: prescriptions.filter((rx) => rx.status === 'Follow-up Required').length,
    };
  }, [prescriptions, todayISO]);

  const resetPage = () => setPage(1);

  const handleSearchChange = (value) => {
    setSearch(value);
    resetPage();
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    resetPage();
  };

  const handleDatePresetChange = (value) => {
    setDatePreset(value);
    if (value !== 'custom') setCustomDate(null);
    resetPage();
  };

  const handleCustomDateChange = (date) => {
    setCustomDate(toISODate(date));
    resetPage();
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatus(DEFAULT_FILTERS.status);
    setDatePreset(DEFAULT_FILTERS.datePreset);
    setCustomDate(DEFAULT_FILTERS.customDate);
    resetPage();
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Prescriptions refreshed');
    }, 600);
  };

  const openCreateNew = () => {
    setEditingPrescriptionId(null);
    setCreateOpen(true);
  };

  const handleCreateOpenChange = (next) => {
    setCreateOpen(next);
    if (!next) setEditingPrescriptionId(null);
  };

  const handleAction = (action, prescription) => {
    setActivePrescriptionId(prescription.id);

    switch (action) {
      case 'view-prescription':
        setDetailsOpen(true);
        break;
      case 'edit-prescription':
        if (prescription.isDraft) {
          setEditingPrescriptionId(prescription.id);
          setCreateOpen(true);
        }
        break;
      case 'print-prescription':
        printPrescription(prescription);
        break;
      case 'download-prescription':
        downloadPrescription(prescription);
        toast.success(`${prescription.id} downloaded`);
        break;
      case 'view-patient':
        navigate('/doctor/patients');
        break;
      case 'view-medical-records':
        navigate('/doctor/medical-records');
        break;
      default:
        break;
    }
  };

  const handleSelectHistory = (prescription) => {
    setActivePrescriptionId(prescription.id);
  };

  const upsertPrescription = (data) => {
    setPrescriptions((current) => {
      if (data.id) {
        return current.map((rx) => (rx.id === data.id ? { ...rx, ...data } : rx));
      }
      const newId = generatePrescriptionId(current);
      return [{ ...data, id: newId }, ...current];
    });
  };

  const handleSaveDraft = (data) => {
    upsertPrescription(data);
  };

  const handleFinalize = (data) => {
    upsertPrescription(data);
  };

  const historyForActive = activePrescription
    ? prescriptions.filter((rx) => rx.patientId === activePrescription.patientId && rx.id !== activePrescription.id)
    : [];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Prescriptions</h1>
          <p className="mt-1 text-sm text-slate-500">Create and manage prescriptions for your patients.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by patient, prescription ID, or medicine"
            className="w-full sm:w-72"
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh prescriptions">
              <RefreshCw className="size-4" />
            </Button>
            <Button onClick={openCreateNew}>
              <Plus /> Create Prescription
            </Button>
          </div>
        </div>
      </section>

      {isLoading ? (
        <StatsRowSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PrescriptionStatsCard
            icon={FilePlus2}
            tone="blue"
            title="Prescriptions Today"
            value={stats.today}
            description="Prescriptions created today"
          />
          <PrescriptionStatsCard
            icon={CheckCircle2}
            tone="green"
            title="Active Prescriptions"
            value={stats.active}
            description="Currently active for patients"
          />
          <PrescriptionStatsCard
            icon={FileText}
            tone="violet"
            title="Completed"
            value={stats.completed}
            description="Completed prescriptions"
          />
          <PrescriptionStatsCard
            icon={CalendarClock}
            tone="amber"
            title="Follow-up Required"
            value={stats.followUpRequired}
            description="Prescriptions needing follow-up"
          />
        </section>
      )}

      <Card className="gap-0 rounded-xl border-border px-5 py-5 shadow-sm">
        {isLoading ? (
          <FiltersSkeleton />
        ) : (
          <PrescriptionFilters
            status={status}
            onStatusChange={handleStatusChange}
            datePreset={datePreset}
            onDatePresetChange={handleDatePresetChange}
            customDate={customDate}
            onCustomDateChange={handleCustomDateChange}
            onClearFilters={handleClearFilters}
          />
        )}
      </Card>

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <PrescriptionTable
            prescriptions={paginatedPrescriptions}
            onAction={handleAction}
            onClearFilters={handleClearFilters}
          />
        )}

        {!isLoading && filteredPrescriptions.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
              currentPage * PAGE_SIZE,
              filteredPrescriptions.length
            )} of ${filteredPrescriptions.length} prescriptions`}
            className="border-t border-border px-5 py-4"
          />
        )}
      </Card>

      <PrescriptionDetailsSheet
        prescription={activePrescription}
        history={historyForActive}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onAction={handleAction}
        onSelectHistory={handleSelectHistory}
      />

      <CreatePrescriptionSheet
        open={createOpen}
        onOpenChange={handleCreateOpenChange}
        prescription={editingPrescription}
        onSaveDraft={handleSaveDraft}
        onFinalize={handleFinalize}
      />
    </div>
  );
};

export default DoctorPrescriptions;
