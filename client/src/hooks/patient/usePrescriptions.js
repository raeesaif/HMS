import { useEffect, useState } from 'react';
import { fetchPrescriptions } from '@/services/patient/prescriptionService';

export function usePrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchPrescriptions()
      .then(setPrescriptions)
      .catch(() => setError('Unable to load your prescriptions.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchPrescriptions()
      .then((data) => active && setPrescriptions(data))
      .catch(() => active && setError('Unable to load your prescriptions.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { prescriptions, isLoading, error, reload: load };
}
