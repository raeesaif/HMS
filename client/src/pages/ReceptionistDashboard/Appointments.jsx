import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CalendarPlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import { FilterBar } from '@/components/reception/FilterBar';
import { ErrorState } from '@/components/reception/ErrorState';
import { FiltersSkeleton, TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { AppointmentsTable } from '@/components/reception/appointments/AppointmentsTable';
import { AppointmentDialog } from '@/components/dialogs/receptionist/AppointmentDialog';
import { AppointmentDetailsDialog } from '@/components/dialogs/receptionist/AppointmentDetailsDialog';
import { DeleteConfirmDialog } from '@/components/dialogs/common/DeleteConfirmDialog';
import { useAppointmentsList, useCreateAppointment } from '@/hooks/useAppointmentsApi';
import { useDoctorsList } from '@/hooks/useAuth';
import { useDepartments } from '@/hooks/useDepartments';
import { useAuthStore } from '@/store/authstore';

const PAGE_SIZE = 7;

const appointmentStatusOptions = ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Rejected'];

const doctorName = (doctor) => `${doctor.firstName ?? ''} ${doctor.lastName ?? ''}`.trim();

const Appointments = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { data: appointmentsData = [], isLoading, error, refetch } = useAppointmentsList();
  const { data: doctors = [] } = useDoctorsList();
  const { data: departments = [] } = useDepartments();
  const createAppointment = useCreateAppointment();

  // Reschedule/cancel aren't backed by an API endpoint yet, so local edits
  // are layered over the fetched list until a PATCH/DELETE endpoint exists.
  const [localOverrides, setLocalOverrides] = useState({});
  const appointments = useMemo(
    () =>
      appointmentsData.map((appointment) =>
        localOverrides[appointment.id]
          ? { ...appointment, ...localOverrides[appointment.id] }
          : appointment
      ),
    [appointmentsData, localOverrides]
  );

  const [view, setView] = useState('all');
  const [search, setSearch] = useState('');
  const [doctorId, setDoctorId] = useState('all');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const [activeAppointment, setActiveAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();
    const today = new Date();

    return appointments.filter((appointment) => {
      const matchesSearch =
        !query ||
        appointment.patientName.toLowerCase().includes(query) ||
        appointment.id.toLowerCase().includes(query) ||
        appointment.doctorName.toLowerCase().includes(query);
      const matchesDoctor = doctorId === 'all' || appointment.doctorId === doctorId;
      const matchesDepartment = department === 'all' || appointment.department === department;
      const matchesStatus = status === 'all' || appointment.status === status;
      const appointmentDate = new Date(appointment.date);
      const matchesView =
        view === 'all' ||
        (view === 'today' && appointmentDate.toDateString() === today.toDateString()) ||
        (view === 'upcoming' && appointmentDate > today);

      return matchesSearch && matchesDoctor && matchesDepartment && matchesStatus && matchesView;
    });
  }, [appointments, search, doctorId, department, status, view]);

  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = () => setPage(1);
  const handleClearFilters = () => {
    setSearch('');
    setDoctorId('all');
    setDepartment('all');
    setStatus('all');
    resetPage();
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, appointment) => {
    setActiveAppointment(appointment);
    if (action === 'check-in') {
      navigate('/reception/check-ins');
      return;
    }
    setOpenDialog(action);
  };

  const handleCreate = (payload) => {
    createAppointment.mutate(
      {
        patient: payload.patientId,
        doctor: payload.doctorId,
        hospital: user?.hospitalId,
        department: payload.departmentId,
        appointmentDate: payload.date,
        appoinmentTime: payload.time,
        priority: payload.priority,
        appoinmentType: payload.type,
      },
      {
        onSuccess: () => toast.success('Appointment created'),
        onError: (err) =>
          toast.error(err.response?.data?.message ?? 'Failed to create appointment'),
      }
    );
  };

  const handleReschedule = (appointmentId, payload) => {
    setLocalOverrides((current) => ({
      ...current,
      [appointmentId]: { ...current[appointmentId], ...payload },
    }));
  };

  const handleCancel = () => {
    if (!activeAppointment) return;
    setLocalOverrides((current) => ({
      ...current,
      [activeAppointment.id]: { ...current[activeAppointment.id], status: 'Cancelled' },
    }));
    setOpenDialog(null);
    toast.success('Appointment cancelled');
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Appointments</h1>
          <p className="mt-1 text-sm text-slate-500">Schedule, reschedule, and manage patient appointments.</p>
        </div>
        <Button onClick={() => setOpenDialog('create')}>
          <CalendarPlus /> Create Appointment
        </Button>
      </section>

      <Tabs value={view} onValueChange={(value) => { setView(value); resetPage(); }}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
      </Tabs>

      {error ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={(value) => { setSearch(value); resetPage(); }} placeholder="Search patient, doctor, or ID..." className="sm:w-64" />
                <FilterDropdown
                  label="Doctor"
                  value={doctorId}
                  onChange={(value) => { setDoctorId(value); resetPage(); }}
                  options={doctors.map((doctor) => ({ value: doctor._id, label: doctorName(doctor) }))}
                />
                <FilterDropdown
                  label="Department"
                  value={department}
                  onChange={(value) => { setDepartment(value); resetPage(); }}
                  options={departments.map((dept) => ({ value: dept.name, label: dept.name }))}
                />
                <FilterDropdown
                  label="Status"
                  value={status}
                  onChange={(value) => { setStatus(value); resetPage(); }}
                  options={appointmentStatusOptions.map((option) => ({ value: option, label: option }))}
                />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={7} cols={10} />
          ) : (
            <AppointmentsTable appointments={paginatedAppointments} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}

          {!isLoading && filteredAppointments.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredAppointments.length)} of ${filteredAppointments.length} appointments`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <AppointmentDialog open={openDialog === 'create'} onOpenChange={closeDialog} onSave={handleCreate} />
      <AppointmentDialog
        appointment={openDialog === 'reschedule' ? activeAppointment : null}
        open={openDialog === 'reschedule'}
        onOpenChange={closeDialog}
        onSave={handleReschedule}
      />
      <AppointmentDetailsDialog appointment={activeAppointment} open={openDialog === 'view'} onOpenChange={closeDialog} />
      <DeleteConfirmDialog
        open={openDialog === 'cancel'}
        onOpenChange={closeDialog}
        title="Cancel this appointment?"
        description={activeAppointment ? `This will cancel the appointment for ${activeAppointment.patientName}.` : undefined}
        confirmLabel="Cancel Appointment"
        onConfirm={handleCancel}
      />
    </div>
  );
};

export default Appointments;
