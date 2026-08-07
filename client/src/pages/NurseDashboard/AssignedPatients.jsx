import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Activity, AlertTriangle, Pill, UsersRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { NurseSummaryCard } from '@/shared/NurseDashboardComponents';
import { EmptyState } from '@/shared/EmptyState';
import { Pagination } from '@/shared/Pagination';
import { nursePatientsData } from '@/data/nursePatients';
import { AssignedPatientsTable } from './assigned-patients/AssignedPatientsTable';
import { PatientsToolbar } from './assigned-patients/PatientsToolbar';
import { PatientDetailsDrawer } from './assigned-patients/PatientDetailsDrawer';
import { UpdateVitalsDialog } from './assigned-patients/UpdateVitalsDialog';
import { MedicationDialog } from './assigned-patients/MedicationDialog';
import { NursingNotesDialog } from './assigned-patients/NursingNotesDialog';

const PAGE_SIZE = 5;

const timestampNow = () => `Today, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

const NurseDashboardAssignedPatients = () => {
  const [patients, setPatients] = useState(nursePatientsData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  const [activePatientId, setActivePatientId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);

  const activePatient = patients.find((patient) => patient.id === activePatientId) ?? null;

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    return patients.filter((patient) => {
      const matchesSearch =
        !query || patient.name.toLowerCase().includes(query) || patient.id.toLowerCase().includes(query);
      const matchesFilter = filter === 'all' || patient.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [patients, search, filter]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setPage(1);
  };

  const handlePanelOpenChange = (next) => {
    if (!next) setOpenPanel(null);
  };

  const handleAction = (action, patient) => {
    setActivePatientId(patient.id);
    if (action === 'view-details' || action === 'view-medical-history') {
      setOpenPanel('details');
    } else if (action === 'update-vitals') {
      setOpenPanel('vitals');
    } else if (action === 'administer-medication') {
      setOpenPanel('medication');
    } else if (action === 'add-nursing-note') {
      setOpenPanel('notes');
    } else if (action === 'request-doctor-review') {
      toast.success(`Doctor review requested for ${patient.name}`);
    }
  };

  const updatePatient = (patientId, updater) =>
    setPatients((current) => current.map((patient) => (patient.id === patientId ? updater(patient) : patient)));

  const handleSaveVitals = (patientId, form) => {
    updatePatient(patientId, (patient) => ({
      ...patient,
      vitals: {
        ...patient.vitals,
        bp: form.bp || patient.vitals.bp,
        hr: form.hr || patient.vitals.hr,
        temp: form.temp || patient.vitals.temp,
        rr: form.rr || patient.vitals.rr,
        spo2: form.spo2 || patient.vitals.spo2,
        weight: form.weight || patient.vitals.weight,
        height: form.height || patient.vitals.height,
        painLevel: form.painLevel || patient.vitals.painLevel,
        recordedAt: timestampNow(),
      },
      vitalsCheckDue: false,
    }));
  };

  const handleUpdateMedication = (patientId, medicationName, changes) => {
    updatePatient(patientId, (patient) => {
      const medications = patient.medications.map((med) =>
        med.name === medicationName ? { ...med, ...changes } : med
      );
      return { ...patient, medications, medicationDue: medications.some((med) => med.status === 'pending') };
    });
  };

  const handleAddNote = (patientId, text) => {
    updatePatient(patientId, (patient) => ({
      ...patient,
      nursingNotes: [{ author: 'Nurse E. Owusu', timestamp: timestampNow(), text }, ...patient.nursingNotes],
    }));
  };

  const handleEditLatestNote = (patientId, text) => {
    updatePatient(patientId, (patient) => {
      const [latest, ...rest] = patient.nursingNotes;
      if (!latest) return patient;
      return { ...patient, nursingNotes: [{ ...latest, text, timestamp: `${latest.timestamp} (edited)` }, ...rest] };
    });
  };

  const stats = {
    total: patients.length,
    critical: patients.filter((patient) => patient.condition === 'critical').length,
    medicationDue: patients.filter((patient) => patient.medicationDue).length,
    vitalsCheckDue: patients.filter((patient) => patient.vitalsCheckDue).length,
  };

  if (patients.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1600px] rounded-xl border border-dashed border-slate-200 bg-white">
        <EmptyState
          icon={UsersRound}
          title="No patients assigned"
          description="You don't have any patients assigned to your care right now. Check back once the charge nurse assigns your ward."
          className="py-24"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Assigned Patients</h1>
          <p className="mt-1 text-sm text-slate-500">View and manage patients currently assigned to your care.</p>
        </div>
        <PatientsToolbar
          search={search}
          onSearchChange={handleSearchChange}
          filter={filter}
          onFilterChange={handleFilterChange}
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <NurseSummaryCard
          icon={UsersRound}
          tone="blue"
          value={String(stats.total)}
          label="Total Assigned Patients"
          detail="Across all wards"
        />
        <NurseSummaryCard
          icon={AlertTriangle}
          tone="red"
          value={String(stats.critical)}
          label="Critical Patients"
          detail="Needs close monitoring"
        />
        <NurseSummaryCard
          icon={Pill}
          tone="amber"
          value={String(stats.medicationDue)}
          label="Patients Needing Medication"
          detail="Pending doses today"
        />
        <NurseSummaryCard
          icon={Activity}
          tone="green"
          value={String(stats.vitalsCheckDue)}
          label="Patients Requiring Vitals Check"
          detail="Due for a recheck"
        />
      </section>

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        <AssignedPatientsTable
          patients={paginatedPatients}
          onAction={handleAction}
          emptyTitle={filteredPatients.length === 0 ? 'No matching patients' : undefined}
        />

        {filteredPatients.length > 0 && (
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

      <PatientDetailsDrawer patient={activePatient} open={openPanel === 'details'} onOpenChange={handlePanelOpenChange} />
      <UpdateVitalsDialog
        patient={activePatient}
        open={openPanel === 'vitals'}
        onOpenChange={handlePanelOpenChange}
        onSave={handleSaveVitals}
      />
      <MedicationDialog
        patient={activePatient}
        open={openPanel === 'medication'}
        onOpenChange={handlePanelOpenChange}
        onUpdateMedication={handleUpdateMedication}
      />
      <NursingNotesDialog
        patient={activePatient}
        open={openPanel === 'notes'}
        onOpenChange={handlePanelOpenChange}
        onAddNote={handleAddNote}
        onEditLatestNote={handleEditLatestNote}
      />
    </div>
  );
};

export default NurseDashboardAssignedPatients;
