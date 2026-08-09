import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CalendarCheck2, CalendarClock, Clock3, RefreshCw, Stethoscope } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/shared/SearchInput';
import { Pagination } from '@/shared/Pagination';
import { DoctorAvailability } from '@/components/doctor/dashboard/DoctorAvailability';
import { doctorAppointments } from '@/data/doctorAppointments';
import { availabilityOptions, doctorProfile } from '@/data/doctor';
import { AppointmentStatsCard } from '@/components/doctor/appointments/AppointmentStatsCard';
import { AppointmentFilters } from '@/components/doctor/appointments/AppointmentFilters';
import { AppointmentDatePicker } from '@/components/doctor/appointments/AppointmentDatePicker';
import { AppointmentTable } from '@/components/doctor/appointments/AppointmentTable';
import { AppointmentDetailsSheet } from '@/components/doctor/appointments/AppointmentDetailsSheet';
import { StartConsultationDialog } from '@/components/doctor/appointments/StartConsultationDialog';
import { NoShowDialog } from '@/components/doctor/appointments/NoShowDialog';
import { StatsRowSkeleton, TableSkeleton } from '@/components/doctor/appointments/LoadingSkeleton';

const PAGE_SIZE = 6;

const toISODate = (date) => date.toISOString().slice(0, 10);

const todayLabel = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const DEFAULT_FILTERS = {
  datePreset: 'today',
  customDate: null,
  status: 'all',
  type: 'all',
};

const DoctorAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState(doctorAppointments);
  const [availability, setAvailability] = useState(doctorProfile.availability);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [datePreset, setDatePreset] = useState(DEFAULT_FILTERS.datePreset);
  const [customDate, setCustomDate] = useState(DEFAULT_FILTERS.customDate);
  const [status, setStatus] = useState(DEFAULT_FILTERS.status);
  const [type, setType] = useState(DEFAULT_FILTERS.type);
  const [page, setPage] = useState(1);

  const [activeAppointmentId, setActiveAppointmentId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const activeAppointment = appointments.find((appt) => appt.id === activeAppointmentId) ?? null;

  const { todayISO, tomorrowISO, weekEndISO } = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const weekEnd = new Date();
    weekEnd.setDate(today.getDate() + 6);
    return {
      todayISO: toISODate(today),
      tomorrowISO: toISODate(tomorrow),
      weekEndISO: toISODate(weekEnd),
    };
  }, []);

  const matchesDatePreset = (apptDate) => {
    if (datePreset === 'today') return apptDate === todayISO;
    if (datePreset === 'tomorrow') return apptDate === tomorrowISO;
    if (datePreset === 'week') return apptDate >= todayISO && apptDate <= weekEndISO;
    if (datePreset === 'custom') return customDate ? apptDate === customDate : true;
    return true;
  };

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return appointments.filter((appt) => {
      const matchesSearch =
        !query || appt.patientName.toLowerCase().includes(query) || appt.patientId.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || appt.status === status;
      const matchesType = type === 'all' || appt.type === type;
      return matchesSearch && matchesStatus && matchesType && matchesDatePreset(appt.date);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointments, search, status, type, datePreset, customDate, todayISO, tomorrowISO, weekEndISO]);

  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const todaysAppointments = useMemo(
    () => appointments.filter((appt) => appt.date === todayISO),
    [appointments, todayISO]
  );

  const stats = {
    today: todaysAppointments.length,
    waiting: todaysAppointments.filter((appt) => appt.status === 'Waiting').length,
    inConsultation: todaysAppointments.filter((appt) => appt.status === 'In Consultation').length,
    completed: todaysAppointments.filter((appt) => appt.status === 'Completed').length,
  };

  const resetPage = () => setPage(1);

  const handleSearchChange = (value) => {
    setSearch(value);
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

  const handleStatusChange = (value) => {
    setStatus(value);
    resetPage();
  };

  const handleTypeChange = (value) => {
    setType(value);
    resetPage();
  };

  const handleClearFilters = () => {
    setSearch('');
    setDatePreset(DEFAULT_FILTERS.datePreset);
    setCustomDate(DEFAULT_FILTERS.customDate);
    setStatus(DEFAULT_FILTERS.status);
    setType(DEFAULT_FILTERS.type);
    resetPage();
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Appointments refreshed');
    }, 600);
  };

  const handlePanelOpenChange = (next) => {
    if (!next) setOpenPanel(null);
  };

  const updateAppointment = (appointmentId, updater) =>
    setAppointments((current) =>
      current.map((appt) => (appt.id === appointmentId ? updater(appt) : appt))
    );

  const handleAction = (action, appointment) => {
    setActiveAppointmentId(appointment.id);

    switch (action) {
      case 'view-appointment':
        setOpenPanel('details');
        break;
      case 'view-patient':
        navigate('/doctor/patients');
        break;
      case 'start-consultation':
      case 'add-notes':
        setOpenPanel('consult');
        break;
      case 'view-medical-records':
        navigate('/doctor/medical-records');
        break;
      case 'view-prescriptions':
      case 'create-prescription':
        navigate('/doctor/prescriptions');
        break;
      case 'request-lab-test':
        navigate('/doctor/lab-reports');
        break;
      case 'schedule-follow-up':
        toast.success(`Follow-up scheduling opened for ${appointment.patientName}`);
        break;
      case 'mark-no-show':
        setOpenPanel('no-show');
        break;
      default:
        break;
    }
  };

  const handleSaveDraft = (appointmentId, notes) => {
    updateAppointment(appointmentId, (appt) => ({
      ...appt,
      consultation: { ...(appt.consultation ?? {}), ...notes },
    }));
  };

  const handleCompleteConsultation = (appointmentId, notes) => {
    updateAppointment(appointmentId, (appt) => ({
      ...appt,
      status: 'Completed',
      consultation: {
        ...notes,
        completedAt: new Date().toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        completedBy: `Dr. ${doctorProfile.name}`,
      },
    }));
  };

  const handleNoShow = (appointmentId, reason) => {
    updateAppointment(appointmentId, (appt) => ({
      ...appt,
      status: 'No Show',
      noShowReason: reason || appt.noShowReason,
    }));
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Appointments</h1>
          <p className="mt-1 text-sm text-slate-500">View and manage your scheduled patient appointments.</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="size-3.5" /> {todayLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Stethoscope className="size-3.5" /> {doctorProfile.department}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-3.5" /> {doctorProfile.shift}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by patient name or ID"
            className="w-full sm:w-64"
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh appointments">
              <RefreshCw className="size-4" />
            </Button>
            <AppointmentDatePicker
              date={datePreset === 'custom' ? customDate : null}
              onSelect={(date) => {
                setDatePreset('custom');
                handleCustomDateChange(date);
              }}
              placeholder="Jump to date"
            />
            <DoctorAvailability status={availability} options={availabilityOptions} onChange={setAvailability} />
          </div>
        </div>
      </section>

      {isLoading ? (
        <StatsRowSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AppointmentStatsCard
            icon={CalendarClock}
            tone="blue"
            title="Today's Appointments"
            value={stats.today}
            description="Appointments scheduled today"
          />
          <AppointmentStatsCard
            icon={Clock3}
            tone="amber"
            title="Waiting Patients"
            value={stats.waiting}
            description="Patients waiting for consultation"
          />
          <AppointmentStatsCard
            icon={Stethoscope}
            tone="violet"
            title="In Consultation"
            value={stats.inConsultation}
            description="Consultations currently in progress"
          />
          <AppointmentStatsCard
            icon={CalendarCheck2}
            tone="green"
            title="Completed"
            value={stats.completed}
            description="Consultations completed today"
          />
        </section>
      )}

      <Card className="gap-0 rounded-xl border-border px-5 py-5 shadow-sm">
        <AppointmentFilters
          datePreset={datePreset}
          onDatePresetChange={handleDatePresetChange}
          customDate={customDate}
          onCustomDateChange={handleCustomDateChange}
          status={status}
          onStatusChange={handleStatusChange}
          type={type}
          onTypeChange={handleTypeChange}
          onClearFilters={handleClearFilters}
        />
      </Card>

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <AppointmentTable
            appointments={paginatedAppointments}
            onAction={handleAction}
            onClearFilters={handleClearFilters}
          />
        )}

        {!isLoading && filteredAppointments.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
              currentPage * PAGE_SIZE,
              filteredAppointments.length
            )} of ${filteredAppointments.length} appointments`}
            className="border-t border-border px-5 py-4"
          />
        )}
      </Card>

      <AppointmentDetailsSheet
        appointment={activeAppointment}
        open={openPanel === 'details'}
        onOpenChange={handlePanelOpenChange}
        onAction={handleAction}
      />

      <StartConsultationDialog
        appointment={activeAppointment}
        open={openPanel === 'consult'}
        onOpenChange={handlePanelOpenChange}
        onSaveDraft={handleSaveDraft}
        onComplete={handleCompleteConsultation}
        onAction={handleAction}
      />

      <NoShowDialog
        appointment={activeAppointment}
        open={openPanel === 'no-show'}
        onOpenChange={handlePanelOpenChange}
        onConfirm={handleNoShow}
      />
    </div>
  );
};

export default DoctorAppointments;
