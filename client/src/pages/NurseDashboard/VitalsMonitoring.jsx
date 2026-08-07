import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Activity, AlertTriangle, Clock, Filter, RefreshCw, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/shared/Pagination';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { useNurseVitals } from '@/hooks/useNurseVitals';
import { vitalsDoctors, vitalsStatuses, vitalsWards } from '@/data/nurseVitals';
import { VitalsStatsCard } from '@/components/nurse/vitals/VitalsStatsCard';
import { PatientVitalsTable } from '@/components/nurse/vitals/PatientVitalsTable';
import { UpdateVitalsDialog } from '@/components/nurse/vitals/UpdateVitalsDialog';
import { PatientDetailsSheet } from '@/components/nurse/vitals/PatientDetailsSheet';
import { PatientHistorySheet } from '@/components/nurse/vitals/PatientHistorySheet';
import { VitalsStatsSkeleton, VitalsTableSkeleton } from '@/components/nurse/vitals/LoadingSkeleton';
import { getVitalAlerts } from '@/components/nurse/vitals/vitalsAlerts';

const PAGE_SIZE = 6;

const wardOptions = vitalsWards.map((ward) => ({ value: ward, label: ward }));
const doctorOptions = vitalsDoctors.map((doctor) => ({ value: doctor, label: doctor }));

const timestampNow = () => `Today, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

const VitalsMonitoring = () => {
  const { data: patients, setData: setPatients, loading, refetch } = useNurseVitals();

  const [search, setSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const [activePatientId, setActivePatientId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);

  const activePatient = patients.find((patient) => patient.id === activePatientId) ?? null;
  const hasActiveFilters = wardFilter !== 'all' || statusFilter !== 'all' || doctorFilter !== 'all' || Boolean(dateFilter);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    return patients.filter((patient) => {
      const matchesSearch =
        !query || patient.name.toLowerCase().includes(query) || patient.id.toLowerCase().includes(query);
      const matchesWard = wardFilter === 'all' || patient.ward === wardFilter;
      const matchesStatus =
        statusFilter === 'all' || (statusFilter === 'pending' ? patient.vitalsPending : patient.condition === statusFilter);
      const matchesDoctor = doctorFilter === 'all' || patient.doctor === doctorFilter;
      const matchesDate = !dateFilter || patient.recordedDate === dateFilter;
      return matchesSearch && matchesWard && matchesStatus && matchesDoctor && matchesDate;
    });
  }, [patients, search, wardFilter, statusFilter, doctorFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setWardFilter('all');
    setStatusFilter('all');
    setDoctorFilter('all');
    setDateFilter('');
    setPage(1);
  };

  const handlePanelOpenChange = (next) => {
    if (!next) setOpenPanel(null);
  };

  const handleAction = (action, patient) => {
    setActivePatientId(patient.id);
    if (action === 'view-details') {
      setOpenPanel('details');
    } else if (action === 'update-vitals') {
      setOpenPanel('vitals');
    } else if (action === 'view-history') {
      setOpenPanel('history');
    } else if (action === 'add-nursing-note') {
      toast.success(`Nursing note flow opened for ${patient.name}`);
    } else if (action === 'request-doctor-review') {
      toast.success(`Doctor review requested for ${patient.name}`);
    }
  };

  const handleSaveVitals = (patientId, form) => {
    setPatients((current) =>
      current.map((patient) => {
        if (patient.id !== patientId) return patient;

        const updatedVitals = {
          bp: form.bp || patient.vitals.bp,
          hr: form.hr || patient.vitals.hr,
          temp: form.temp || patient.vitals.temp,
          rr: form.rr || patient.vitals.rr,
          spo2: form.spo2 || patient.vitals.spo2,
          bloodSugar: form.bloodSugar || patient.vitals.bloodSugar,
          weight: form.weight || patient.vitals.weight,
          height: form.height || patient.vitals.height,
          painLevel: form.painLevel || patient.vitals.painLevel,
        };
        const alerts = getVitalAlerts(updatedVitals);
        const condition = alerts.some((alert) => alert.severity === 'critical')
          ? 'critical'
          : alerts.length > 0
            ? 'observation'
            : 'normal';
        const timestamp = timestampNow();

        return {
          ...patient,
          vitals: updatedVitals,
          condition,
          vitalsPending: false,
          lastUpdated: timestamp,
          recordedDate: new Date().toISOString().slice(0, 10),
          history: [
            {
              timestamp,
              bp: updatedVitals.bp,
              hr: updatedVitals.hr,
              temp: updatedVitals.temp,
              rr: updatedVitals.rr,
              spo2: updatedVitals.spo2,
              recordedBy: 'Nurse E. Owusu',
            },
            ...patient.history,
          ],
        };
      })
    );
  };

  const stats = {
    monitoredToday: patients.filter((patient) => !patient.vitalsPending).length,
    critical: patients.filter((patient) => patient.condition === 'critical').length,
    pending: patients.filter((patient) => patient.vitalsPending).length,
    abnormal: patients.filter((patient) => getVitalAlerts(patient.vitals).length > 0).length,
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Vitals Monitoring</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor and record patient vital signs.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <SearchInput
            value={search}
            onChange={withPageReset(setSearch)}
            placeholder="Search patient name or ID"
            className="sm:w-64"
          />
          <Button variant="outline" onClick={() => setShowFilters((prev) => !prev)} aria-expanded={showFilters}>
            <Filter /> Filter
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
            options={vitalsStatuses}
          />
          <FilterDropdown
            label="Doctor"
            allLabel="All Doctors"
            value={doctorFilter}
            onChange={withPageReset(setDoctorFilter)}
            options={doctorOptions}
          />
          <Input
            type="date"
            value={dateFilter}
            onChange={(event) => withPageReset(setDateFilter)(event.target.value)}
            className="h-10 w-full sm:w-40"
            aria-label="Date recorded"
          />
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </section>
      )}

      {loading ? (
        <VitalsStatsSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <VitalsStatsCard
            icon={Activity}
            tone="blue"
            count={stats.monitoredToday}
            title="Patients Monitored Today"
            description={`of ${patients.length} assigned patients`}
          />
          <VitalsStatsCard
            icon={AlertTriangle}
            tone="red"
            count={stats.critical}
            title="Critical Patients"
            description="Needs immediate attention"
          />
          <VitalsStatsCard
            icon={Clock}
            tone="amber"
            count={stats.pending}
            title="Vitals Pending"
            description="Not yet recorded today"
          />
          <VitalsStatsCard
            icon={TriangleAlert}
            tone="orange"
            count={stats.abnormal}
            title="Abnormal Readings"
            description="Outside normal range"
          />
        </section>
      )}

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {loading ? (
          <VitalsTableSkeleton />
        ) : (
          <PatientVitalsTable
            patients={paginatedPatients}
            onAction={handleAction}
            emptyTitle={patients.length === 0 ? 'No patients require vitals monitoring.' : 'No matching patients'}
            emptyDescription={
              patients.length === 0
                ? 'Patients assigned to your care will appear here once vitals monitoring begins.'
                : 'Adjust your search or filters to see more results.'
            }
          />
        )}

        {!loading && filteredPatients.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
              currentPage * PAGE_SIZE,
              filteredPatients.length
            )} of ${filteredPatients.length} patients`}
            className="border-t border-border px-5 py-4"
          />
        )}
      </Card>

      <PatientDetailsSheet patient={activePatient} open={openPanel === 'details'} onOpenChange={handlePanelOpenChange} />
      <PatientHistorySheet patient={activePatient} open={openPanel === 'history'} onOpenChange={handlePanelOpenChange} />
      <UpdateVitalsDialog
        patient={activePatient}
        open={openPanel === 'vitals'}
        onOpenChange={handlePanelOpenChange}
        onSave={handleSaveVitals}
      />
    </div>
  );
};

export default VitalsMonitoring;
