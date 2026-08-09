import { useEffect, useState } from 'react';
import { fetchPatients } from '@/services/patientService';

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchPatients()
      .then(setPatients)
      .catch(() => setError('Unable to load patients.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchPatients()
      .then((data) => active && setPatients(data))
      .catch(() => active && setError('Unable to load patients.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { patients, setPatients, isLoading, error, reload: load };
}
