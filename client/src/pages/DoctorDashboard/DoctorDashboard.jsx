import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorWelcomeHeader } from '@/components/doctor/dashboard/DoctorWelcomeHeader';
import { DoctorStatsCard } from '@/components/doctor/dashboard/DoctorStatsCard';
import { AppointmentOverview } from '@/components/doctor/dashboard/AppointmentOverview';
import { UpcomingAppointments } from '@/components/doctor/dashboard/UpcomingAppointments';
import { CriticalPatients } from '@/components/doctor/dashboard/CriticalPatients';
import { PendingLabReports } from '@/components/doctor/dashboard/PendingLabReports';
import { RecentPatientActivity } from '@/components/doctor/dashboard/RecentPatientActivity';
import { QuickActions } from '@/components/doctor/dashboard/QuickActions';
import { DoctorAlerts } from '@/components/doctor/dashboard/DoctorAlerts';
import {
  availabilityOptions,
  criticalPatients,
  doctorAlerts,
  doctorProfile,
  doctorStats,
  pendingLabReports,
  quickActions,
  recentActivity,
  todaysAppointments,
  upcomingAppointments,
} from '@/data/doctor';

const todayLabel = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState(doctorProfile.availability);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <DoctorWelcomeHeader
        doctorName={doctorProfile.name}
        department={doctorProfile.department}
        shift={doctorProfile.shift}
        date={todayLabel}
        availability={availability}
        availabilityOptions={availabilityOptions}
        onAvailabilityChange={setAvailability}
        avatarInitials={doctorProfile.avatarInitials}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {doctorStats.map((stat) => (
          <DoctorStatsCard key={stat.id} {...stat} />
        ))}
      </section>

      <AppointmentOverview
        appointments={todaysAppointments}
        onViewAll={() => navigate('/doctor/appointments')}
        onViewPatient={() => navigate('/doctor/patients')}
        onStartConsultation={() => navigate('/doctor/appointments')}
        onViewAppointment={() => navigate('/doctor/appointments')}
      />

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <UpcomingAppointments appointments={upcomingAppointments} />
        </div>
        <DoctorAlerts alerts={doctorAlerts} />
      </div>

      <CriticalPatients patients={criticalPatients} onViewPatient={() => navigate('/doctor/patients')} />

      <PendingLabReports reports={pendingLabReports} onViewAll={() => navigate('/doctor/lab-reports')} />

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentPatientActivity activities={recentActivity} />
        </div>
        <QuickActions actions={quickActions} />
      </div>
    </div>
  );
};

export default DoctorDashboard;
