import { useCallback, useEffect, useState } from 'react';
import { nurseVitalsData } from '@/data/nurseVitals';

const SIMULATED_LATENCY_MS = 500;

/**
 * Stands in for a real vitals API call. Swap the body of `fetchVitals`
 * for a `fetch('/api/nurse/vitals')` (or react-query) once the endpoint exists —
 * every consumer of this hook already deals with { data, loading, error, refetch }.
 */
const fetchVitals = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(nurseVitalsData), SIMULATED_LATENCY_MS);
  });

export function useNurseVitals() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchVitals()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setReloadToken((token) => token + 1);
  }, []);

  return { data, setData, loading, error, refetch };
}
