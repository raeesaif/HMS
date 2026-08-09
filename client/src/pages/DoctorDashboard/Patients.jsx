import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AlertTriangle, CalendarClock, ListFilter, RefreshCw, UserCheck, UsersRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/shared/Pagination';
import { doctorPatients, getAgeGroup } from '@/data/doctorPatients';
import { doctorProfile } from '@/data/doctor';
import { PatientStatsCard } from '@/components/doctor/patients/PatientStatsCard';
import { PatientSearch } from '@/components/doctor/patients/PatientSearch';
import { PatientFilters } from '@/components/doctor/patients/PatientFilters';
import { PatientTable } from '@/components/doctor/patients/PatientTable';
import { PatientDetailsSheet } from '@/components/doctor/patients/PatientDetailsSheet';
import { AddClinicalNoteDialog } from '@/components/doctor/patients/AddClinicalNoteDialog';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/doctor/patients/LoadingSkeleton';

const PAGE_SIZE = 6;

const DEFAULT_FILTERS = {
  status: 'all',
  gender: 'all',
  ageGroup: 'all',
  ward: 'all',
  sortBy: 'recently-added',
};

const DoctorPatients = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState(doctorPatients);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(DEFAULT_FILTERS.status);
  const [gender, setGender] = useState(DEFAULT_FILTERS.gender);
  const [ageGroup, setAgeGroup] = useState(DEFAULT_FILTERS.ageGroup);
  const [ward, setWard] = useState(DEFAULT_FILTERS.ward);
  const [sortBy, setSortBy] = useState(DEFAULT_FILTERS.sortBy);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [activePatientId, setActivePatientId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const activePatient = patients.find((patient) => patient.id === activePatientId) ?? null;

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = patients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || patient.status === status;
      const matchesGender = gender === 'all' || patient.gender === gender;
      const matchesAgeGroup = ageGroup === 'all' || getAgeGroup(patient.age) === ageGroup;
      const matchesWard = ward === 'all' || patient.ward === ward;
      return matchesSearch && matchesStatus && matchesGender && matchesAgeGroup && matchesWard;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'recently-added') return new Date(b.addedAt) - new Date(a.addedAt);
      if (sortBy === 'recently-seen') return new Date(b.lastSeenAt) - new Date(a.lastSeenAt);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [patients, search, status, gender, ageGroup, ward, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = {
    total: patients.length,
    active: patients.filter((patient) => patient.status === 'Active').length,
    critical: patients.filter((patient) => patient.status === 'Critical').length,
    followUpDue: patients.filter((patient) => patient.status === 'Follow-up Required').length,
  };

  const resetPage = () => setPage(1);

  const handleSearchChange = (value) => {
    setSearch(value);
    resetPage();
  };

  const withReset = (setter) => (value) => {
    setter(value);
    resetPage();
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatus(DEFAULT_FILTERS.status);
    setGender(DEFAULT_FILTERS.gender);
    setAgeGroup(DEFAULT_FILTERS.ageGroup);
    setWard(DEFAULT_FILTERS.ward);
    setSortBy(DEFAULT_FILTERS.sortBy);
    resetPage();
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Patient list refreshed');
    }, 600);
  };

  const handlePanelOpenChange = (next) => {
    if (!next) setOpenPanel(null);
  };

  const updatePatient = (patientId, updater) =>
    setPatients((current) => current.map((patient) => (patient.id === patientId ? updater(patient) : patient)));

  const handleAction = (action, patient) => {
    setActivePatientId(patient.id);

    switch (action) {
      case 'view-patient':
      case 'view-vitals':
        setOpenPanel('details');
        break;
      case 'view-medical-records':
        navigate('/doctor/medical-records');
        break;
      case 'view-appointments':
        navigate('/doctor/appointments');
        break;
      case 'view-prescriptions':
      case 'create-prescription':
        navigate('/doctor/prescriptions');
        break;
      case 'view-lab-reports':
      case 'request-lab-test':
        navigate('/doctor/lab-reports');
        break;
      case 'add-clinical-note':
        setOpenPanel('note');
        break;
      case 'schedule-follow-up':
        toast.success(`Follow-up scheduling opened for ${patient.name}`);
        break;
      default:
        break;
    }
  };

  const handleSaveNote = (patientId, noteData) => {
    const now = new Date();
    updatePatient(patientId, (patient) => ({
      ...patient,
      importantNotes: noteData.followUpInstructions || patient.importantNotes,
      timeline: [
        {
          type: 'note',
          description: `${noteData.noteType} note added — ${noteData.note}`,
          date: now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          performedBy: `Dr. ${doctorProfile.name}`,
        },
        ...patient.timeline,
      ],
    }));
  };

  const activeFilterCount = [status, gender, ageGroup, ward].filter((value) => value !== 'all').length;

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Patients</h1>
          <p className="mt-1 text-sm text-slate-500">View and manage patients under your clinical care.</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <UserCheck className="size-3.5" /> Dr. {doctorProfile.name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UsersRound className="size-3.5" /> {doctorProfile.department}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="size-3.5" /> {patients.length} total patients
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <PatientSearch value={search} onChange={handleSearchChange} className="w-full sm:w-64" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh patient list">
              <RefreshCw className="size-4" />
            </Button>
            <Button
              variant={filtersOpen ? 'secondary' : 'outline'}
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
            >
              <ListFilter /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          </div>
        </div>
      </section>

      {isLoading ? (
        <StatsRowSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PatientStatsCard
            icon={UsersRound}
            tone="blue"
            title="Total Patients"
            value={stats.total}
            description="Patients under your care"
          />
          <PatientStatsCard
            icon={UserCheck}
            tone="green"
            title="Active Patients"
            value={stats.active}
            description="Currently receiving active care"
          />
          <PatientStatsCard
            icon={AlertTriangle}
            tone="red"
            title="Critical Patients"
            value={stats.critical}
            description="Requiring close monitoring"
          />
          <PatientStatsCard
            icon={CalendarClock}
            tone="amber"
            title="Follow-up Due"
            value={stats.followUpDue}
            description="Patients needing follow-up"
          />
        </section>
      )}

      {filtersOpen &&
        (isLoading ? (
          <Card className="gap-0 rounded-xl border-border px-5 py-5 shadow-sm">
            <FiltersSkeleton />
          </Card>
        ) : (
          <Card className="gap-0 rounded-xl border-border px-5 py-5 shadow-sm">
            <PatientFilters
              status={status}
              onStatusChange={withReset(setStatus)}
              gender={gender}
              onGenderChange={withReset(setGender)}
              ageGroup={ageGroup}
              onAgeGroupChange={withReset(setAgeGroup)}
              ward={ward}
              onWardChange={withReset(setWard)}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </Card>
        ))}

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <PatientTable
            patients={paginatedPatients}
            onAction={handleAction}
            onClearFilters={handleClearFilters}
          />
        )}

        {!isLoading && filteredPatients.length > 0 && (
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

      <PatientDetailsSheet
        patient={activePatient}
        open={openPanel === 'details'}
        onOpenChange={handlePanelOpenChange}
        onAction={handleAction}
      />

      <AddClinicalNoteDialog
        patient={activePatient}
        open={openPanel === 'note'}
        onOpenChange={handlePanelOpenChange}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default DoctorPatients;
