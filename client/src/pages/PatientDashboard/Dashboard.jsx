import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PatientStatsCard } from '@/components/patient/PatientStatsCard';
import { ErrorState } from '@/components/patient/ErrorState';
import { StatsRowSkeleton } from '@/components/patient/LoadingSkeleton';
import { NextAppointmentCard } from '@/components/patient/dashboard/NextAppointmentCard';
import { RecentMedicalRecords } from '@/components/patient/dashboard/RecentMedicalRecords';
import { RecentPrescriptions } from '@/components/patient/dashboard/RecentPrescriptions';
import { RecentLabReports } from '@/components/patient/dashboard/RecentLabReports';
import { BillingSummaryCard } from '@/components/patient/dashboard/BillingSummaryCard';
import { ActivityTimeline } from '@/components/patient/dashboard/ActivityTimeline';
import { QuickActions } from '@/components/patient/dashboard/QuickActions';
import { AppointmentDetailsDialog } from '@/components/dialogs/patient/AppointmentDetailsDialog';
import { RescheduleAppointmentDialog } from '@/components/dialogs/patient/RescheduleAppointmentDialog';
import { CancelAppointmentDialog } from '@/components/dialogs/patient/CancelAppointmentDialog';
import { MedicalRecordDetailsDialog } from '@/components/dialogs/patient/MedicalRecordDetailsDialog';
import { usePatientDashboard } from '@/hooks/patient/usePatientDashboard';
import { rescheduleAppointment, cancelAppointment } from '@/services/patient/appointmentService';
import { patientProfile } from '@/data/patient';
import { quickActions } from '@/data/patientDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, setData, isLoading, error, reload } = usePatientDashboard();

  const [activeAppointment, setActiveAppointment] = useState(null);
  const [activeRecord, setActiveRecord] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAppointmentAction = (action, appointment) => {
    setActiveAppointment(appointment);
    setOpenDialog(action);
  };

  const handleReschedule = (appointmentId, payload) => {
    rescheduleAppointment(appointmentId, payload).then(() => {
      setData((current) => ({ ...current, nextAppointment: { ...current.nextAppointment, ...payload } }));
    });
  };

  const handleCancel = () => {
    if (!activeAppointment) return;
    cancelAppointment(activeAppointment.id).then(() => {
      setData((current) => ({ ...current, nextAppointment: null }));
      setOpenDialog(null);
      toast.success('Appointment cancelled');
    });
  };

  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <ErrorState onRetry={reload} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{greeting}, {patientProfile.firstName}</h1>
        <p className="mt-1 text-sm text-slate-500">Here&apos;s an overview of your healthcare activity.</p>
      </section>

      {isLoading || !data ? (
        <StatsRowSkeleton count={4} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.stats.map((stat) => (
            <PatientStatsCard key={stat.id} {...stat} />
          ))}
        </section>
      )}

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <NextAppointmentCard
            appointment={data?.nextAppointment}
            onView={(appointment) => handleAppointmentAction('view', appointment)}
            onReschedule={(appointment) => handleAppointmentAction('reschedule', appointment)}
            onCancel={(appointment) => handleAppointmentAction('cancel', appointment)}
          />
        </div>
        <QuickActions actions={quickActions} />
      </div>

      <RecentMedicalRecords
        records={data?.medicalRecords ?? []}
        onViewAll={() => navigate('/patient/medical-records')}
        onView={(record) => {
          setActiveRecord(record);
          setOpenDialog('view-record');
        }}
      />

      <div className="grid items-start gap-4 xl:grid-cols-2">
        <RecentPrescriptions prescriptions={data?.prescriptions ?? []} onViewAll={() => navigate('/patient/prescriptions')} />
        <RecentLabReports reports={data?.labReports ?? []} onViewAll={() => navigate('/patient/lab-reports')} />
      </div>

      {data?.billingSummary && <BillingSummaryCard summary={data.billingSummary} onViewBilling={() => navigate('/patient/billing')} />}

      <ActivityTimeline activity={data?.activity ?? []} />

      <AppointmentDetailsDialog
        appointment={activeAppointment}
        open={openDialog === 'view'}
        onOpenChange={closeDialog}
        onReschedule={(appointment) => handleAppointmentAction('reschedule', appointment)}
        onCancel={(appointment) => handleAppointmentAction('cancel', appointment)}
      />
      <RescheduleAppointmentDialog appointment={activeAppointment} open={openDialog === 'reschedule'} onOpenChange={closeDialog} onSave={handleReschedule} />
      <CancelAppointmentDialog appointment={activeAppointment} open={openDialog === 'cancel'} onOpenChange={closeDialog} onConfirm={handleCancel} />
      <MedicalRecordDetailsDialog record={activeRecord} open={openDialog === 'view-record'} onOpenChange={closeDialog} />
    </div>
  );
};

export default Dashboard;
