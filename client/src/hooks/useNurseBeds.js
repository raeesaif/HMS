import { useCallback, useEffect, useState } from 'react';
import { nurseBedsData } from '@/data/nurseBeds';

const SIMULATED_LATENCY_MS = 500;

/**
 * Stands in for a real beds/wards API call. Swap the body of `fetchBeds` for a
 * `fetch('/api/nurse/beds')` (or react-query) once the endpoint exists — every
 * consumer already deals with { data, loading, error, refetch }.
 */
const fetchBeds = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(nurseBedsData), SIMULATED_LATENCY_MS);
  });

export function useNurseBeds() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchBeds()
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
