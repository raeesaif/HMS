import { useEffect, useState } from 'react';
import { fetchDashboardData } from '@/services/dashboardService';

export function useReceptionDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchDashboardData()
      .then(setData)
      .catch(() => setError('Unable to load dashboard data.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchDashboardData()
      .then((result) => active && setData(result))
      .catch(() => active && setError('Unable to load dashboard data.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { data, isLoading, error, reload: load };
}
