import { useEffect, useState } from 'react';
import { fetchDashboardData } from '@/services/patient/dashboardService';

export function usePatientDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchDashboardData()
      .then(setData)
      .catch(() => setError('Unable to load your dashboard.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchDashboardData()
      .then((result) => active && setData(result))
      .catch(() => active && setError('Unable to load your dashboard.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { data, setData, isLoading, error, reload: load };
}
