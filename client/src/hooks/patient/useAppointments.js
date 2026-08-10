import { useEffect, useState } from 'react';
import { fetchAppointments } from '@/services/patient/appointmentService';

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchAppointments()
      .then(setAppointments)
      .catch(() => setError('Unable to load your appointments.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchAppointments()
      .then((data) => active && setAppointments(data))
      .catch(() => active && setError('Unable to load your appointments.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { appointments, setAppointments, isLoading, error, reload: load };
}
