import { useEffect, useState } from 'react';
import { fetchPatientProfile } from '@/services/patient/patientService';

export function usePatientProfile() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchPatientProfile()
      .then(setData)
      .catch(() => setError('Unable to load your profile.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchPatientProfile()
      .then((result) => active && setData(result))
      .catch(() => active && setError('Unable to load your profile.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { data, setData, isLoading, error, reload: load };
}
