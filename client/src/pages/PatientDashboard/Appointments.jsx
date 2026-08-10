import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CalendarPlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '@/shared/Pagination';
import { ErrorState } from '@/components/patient/ErrorState';
import { TableSkeleton } from '@/components/patient/LoadingSkeleton';
import { AppointmentsList } from '@/components/patient/appointments/AppointmentsTable';
import { BookAppointmentDialog } from '@/components/dialogs/patient/BookAppointmentDialog';
import { AppointmentDetailsDialog } from '@/components/dialogs/patient/AppointmentDetailsDialog';
import { RescheduleAppointmentDialog } from '@/components/dialogs/patient/RescheduleAppointmentDialog';
import { CancelAppointmentDialog } from '@/components/dialogs/patient/CancelAppointmentDialog';
import { useAppointments } from '@/hooks/patient/useAppointments';
import { bookAppointment, rescheduleAppointment, cancelAppointment } from '@/services/patient/appointmentService';
import { getDoctorById } from '@/data/patientDoctors';

const PAGE_SIZE = 7;
const upcomingStatuses = ['Scheduled', 'Confirmed', 'Checked In', 'In Progress'];
const pastStatuses = ['Completed', 'No Show'];

const tabFilters = {
  upcoming: (appointment) => upcomingStatuses.includes(appointment.status),
  past: (appointment) => pastStatuses.includes(appointment.status),
  cancelled: (appointment) => appointment.status === 'Cancelled',
};

const emptyMessages = {
  upcoming: 'No upcoming appointments.',
  past: 'No past appointments.',
  cancelled: 'No cancelled appointments.',
};

const Appointments = () => {
  const { appointments, setAppointments, isLoading, error, reload } = useAppointments();

  const [tab, setTab] = useState('upcoming');
  const [page, setPage] = useState(1);

  const [activeAppointment, setActiveAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const filteredAppointments = useMemo(
    () => appointments.filter(tabFilters[tab]).sort((a, b) => new Date(b.date) - new Date(a.date)),
    [appointments, tab]
  );

  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, appointment) => {
    setActiveAppointment(appointment);
    setOpenDialog(action);
  };

  const handleBook = (payload) => {
    bookAppointment(payload).then((created) => {
      const doctor = getDoctorById(payload.doctorId);
      setAppointments((current) => [
        { ...created, doctorName: doctor?.name, department: doctor?.department, specialization: doctor?.specialization, location: doctor?.location },
        ...current,
      ]);
    });
  };

  const handleReschedule = (appointmentId, payload) => {
    rescheduleAppointment(appointmentId, payload).then(() => {
      setAppointments((current) => current.map((appt) => (appt.id === appointmentId ? { ...appt, ...payload } : appt)));
    });
  };

  const handleCancel = () => {
    if (!activeAppointment) return;
    cancelAppointment(activeAppointment.id).then(() => {
      setAppointments((current) => current.map((appt) => (appt.id === activeAppointment.id ? { ...appt, status: 'Cancelled' } : appt)));
      setOpenDialog(null);
      toast.success('Appointment cancelled');
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Appointments</h1>
          <p className="mt-1 text-sm text-slate-500">View, book, reschedule, and manage your appointments.</p>
        </div>
        <Button onClick={() => setOpenDialog('book')}>
          <CalendarPlus /> Book Appointment
        </Button>
      </section>

      <Tabs
        value={tab}
        onValueChange={(value) => {
          setTab(value);
          setPage(1);
        }}
      >
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {error ? (
        <ErrorState onRetry={reload} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          {isLoading ? (
            <TableSkeleton rows={6} cols={9} />
          ) : (
            <AppointmentsList appointments={paginatedAppointments} onAction={handleAction} emptyMessage={emptyMessages[tab]} />
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

      <BookAppointmentDialog open={openDialog === 'book'} onOpenChange={closeDialog} onSave={handleBook} />
      <AppointmentDetailsDialog
        appointment={activeAppointment}
        open={openDialog === 'view'}
        onOpenChange={closeDialog}
        onReschedule={(appointment) => handleAction('reschedule', appointment)}
        onCancel={(appointment) => handleAction('cancel', appointment)}
      />
      <RescheduleAppointmentDialog appointment={activeAppointment} open={openDialog === 'reschedule'} onOpenChange={closeDialog} onSave={handleReschedule} />
      <CancelAppointmentDialog appointment={activeAppointment} open={openDialog === 'cancel'} onOpenChange={closeDialog} onConfirm={handleCancel} />
    </div>
  );
};

export default Appointments;
