import { useEffect, useState } from 'react';
import { fetchEmergencyPatients } from '@/services/emergencyService';

export function useEmergencyPatients() {
  const [emergencyPatients, setEmergencyPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchEmergencyPatients()
      .then(setEmergencyPatients)
      .catch(() => setError('Unable to load emergency patients.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchEmergencyPatients()
      .then((data) => active && setEmergencyPatients(data))
      .catch(() => active && setError('Unable to load emergency patients.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { emergencyPatients, setEmergencyPatients, isLoading, error, reload: load };
}
