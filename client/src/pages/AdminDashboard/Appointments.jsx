import { useState } from 'react';
import PageHeader from '@/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AppointmentsCalendar from '@/shared/AppointmentsCalendar';
import TodaySchedule from '@/shared/TodaySchedule';
import BookAppointmentDialog from '@/dialogs/BookAppointmentDialog';
import {
  calendarEvents as initialCalendarEvents,
  todaysAppointments as initialTodaysAppointments,
  CALENDAR_MONTH,
} from '@/data/appointments';

const TODAY_DATE = `${CALENDAR_MONTH.year}-${String(CALENDAR_MONTH.month + 1).padStart(2, '0')}-14`;

const STATUS_COLOR = {
  Confirmed: 'green',
  Pending: 'orange',
  Urgent: 'red',
};

const abbreviatePatientName = (name) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return name;
  return `${parts[0][0]}. ${parts[parts.length - 1]}`;
};

const Appointments = () => {
  const [todaysAppointments, setTodaysAppointments] = useState(initialTodaysAppointments);
  const [calendarEvents, setCalendarEvents] = useState(initialCalendarEvents);

  const handleBookAppointment = (values) => {
    const [year, month, day] = values.date.split('-').map(Number);

    if (values.date === TODAY_DATE) {
      setTodaysAppointments((prev) =>
        [
          ...prev,
          {
            time: values.time,
            patient: values.patient,
            doctor: values.doctor,
            department: values.department,
            status: values.status,
          },
        ].sort((a, b) => a.time.localeCompare(b.time))
      );
    }

    if (year === CALENDAR_MONTH.year && month - 1 === CALENDAR_MONTH.month) {
      setCalendarEvents((prev) => {
        const dayEvents = prev[day] ?? [];
        return {
          ...prev,
          [day]: [
            ...dayEvents,
            {
              time: values.time,
              label: `${abbreviatePatientName(values.patient)} · ${values.department}`,
              color: STATUS_COLOR[values.status] ?? 'blue',
            },
          ].sort((a, b) => a.time.localeCompare(b.time)),
        };
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <div className="flex justify-between items-center">
        <PageHeader title="Appointments" subtitle="Calendar view — July 2026" />
        <BookAppointmentDialog
          onAdd={handleBookAppointment}
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          }
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <AppointmentsCalendar events={calendarEvents} />
        <TodaySchedule data={todaysAppointments} />
      </div>
    </div>
  );
};

export default Appointments;
