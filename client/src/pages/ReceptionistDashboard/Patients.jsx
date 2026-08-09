import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import { FilterBar } from '@/components/reception/FilterBar';
import { ErrorState } from '@/components/reception/ErrorState';
import { FiltersSkeleton, TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { PatientsTable } from '@/components/reception/patients/PatientsTable';
import { AddPatientDialog } from '@/components/dialogs/receptionist/AddPatientDialog';
import { EditPatientDialog } from '@/components/dialogs/receptionist/EditPatientDialog';
import { PatientDetailsDialog } from '@/components/dialogs/receptionist/PatientDetailsDialog';
import { AppointmentDialog } from '@/components/dialogs/receptionist/AppointmentDialog';
import { usePatients } from '@/hooks/usePatients';
import { registerPatient, updatePatient as updatePatientService } from '@/services/patientService';
import { createAppointment } from '@/services/appointmentService';

const PAGE_SIZE = 6;

const Patients = () => {
  const navigate = useNavigate();
  const { patients, setPatients, isLoading, error, reload } = usePatients();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [gender, setGender] = useState('all');
  const [page, setPage] = useState(1);

  const [activePatient, setActivePatient] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    return patients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || patient.status === status;
      const matchesGender = gender === 'all' || patient.gender === gender;
      return matchesSearch && matchesStatus && matchesGender;
    });
  }, [patients, search, status, gender]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = () => setPage(1);
  const handleSearchChange = (value) => {
    setSearch(value);
    resetPage();
  };
  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    setGender('all');
    resetPage();
  };

  const handleAction = (action, patient) => {
    setActivePatient(patient);
    if (action === 'check-in') {
      navigate('/reception/check-ins');
      return;
    }
    setOpenDialog(action);
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleRegister = (payload) => {
    registerPatient(payload).then((newPatient) => {
      setPatients((current) => [newPatient, ...current]);
    });
  };

  const handleEditSave = (patientId, payload) => {
    updatePatientService(patientId, payload).then(() => {
      setPatients((current) => current.map((patient) => (patient.id === patientId ? { ...patient, ...payload } : patient)));
    });
  };

  const handleCreateAppointment = (payload) => {
    createAppointment(payload).then(() => {
      toast.success('Appointment created for ' + activePatient?.name);
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Patients</h1>
          <p className="mt-1 text-sm text-slate-500">Register, search, and manage patient demographic records.</p>
        </div>
        <Button onClick={() => setOpenDialog('register')}>
          <UserPlus /> Register Patient
        </Button>
      </section>

      {error ? (
        <ErrorState onRetry={reload} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={handleSearchChange} placeholder="Search by name, ID, or phone..." className="sm:w-72" />
                <FilterDropdown
                  label="Status"
                  value={status}
                  onChange={(value) => {
                    setStatus(value);
                    resetPage();
                  }}
                  options={[
                    { value: 'Active', label: 'Active' },
                    { value: 'Inactive', label: 'Inactive' },
                  ]}
                />
                <FilterDropdown
                  label="Gender"
                  value={gender}
                  onChange={(value) => {
                    setGender(value);
                    resetPage();
                  }}
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={6} cols={9} />
          ) : (
            <PatientsTable patients={paginatedPatients} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}

          {!isLoading && filteredPatients.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredPatients.length)} of ${filteredPatients.length} patients`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <AddPatientDialog open={openDialog === 'register'} onOpenChange={closeDialog} onSave={handleRegister} />
      <EditPatientDialog patient={activePatient} open={openDialog === 'edit'} onOpenChange={closeDialog} onSave={handleEditSave} />
      <PatientDetailsDialog patient={activePatient} open={openDialog === 'view'} onOpenChange={closeDialog} />
      <AppointmentDialog
        open={openDialog === 'appointment'}
        initialPatient={activePatient}
        onOpenChange={closeDialog}
        onSave={handleCreateAppointment}
      />
    </div>
  );
};

export default Patients;
