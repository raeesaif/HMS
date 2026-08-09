import { useEffect, useState } from 'react';
import { fetchBeds } from '@/services/bedService';

export function useBeds() {
  const [beds, setBeds] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchBeds()
      .then((data) => {
        setBeds(data.beds);
        setStats(data.stats);
      })
      .catch(() => setError('Unable to load bed data.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchBeds()
      .then((data) => {
        if (!active) return;
        setBeds(data.beds);
        setStats(data.stats);
      })
      .catch(() => active && setError('Unable to load bed data.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { beds, setBeds, stats, isLoading, error, reload: load };
}
