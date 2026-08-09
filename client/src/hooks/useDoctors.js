import { useEffect, useState } from 'react';
import { fetchDoctorsOnDuty } from '@/services/doctorService';

export function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchDoctorsOnDuty()
      .then(setDoctors)
      .catch(() => setError('Unable to load doctor availability.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchDoctorsOnDuty()
      .then((data) => active && setDoctors(data))
      .catch(() => active && setError('Unable to load doctor availability.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { doctors, setDoctors, isLoading, error, reload: load };
}
