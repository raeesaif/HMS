import { useEffect, useState } from 'react';
import { fetchSettings } from '@/services/patient/settingsService';

export function usePatientSettings() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchSettings()
      .then(setData)
      .catch(() => setError('Unable to load your settings.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchSettings()
      .then((result) => active && setData(result))
      .catch(() => active && setError('Unable to load your settings.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { data, setData, isLoading, error, reload: load };
}
