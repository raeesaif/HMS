import { useCallback, useEffect, useState } from 'react';
import { nurseMedicationsData } from '@/data/nurseMedications';

const SIMULATED_LATENCY_MS = 500;

/**
 * Stands in for a real medication administration API call. Swap the body of
 * `fetchMedications` for a `fetch('/api/nurse/medications')` (or react-query)
 * once the endpoint exists — every consumer already deals with { data, loading, error, refetch }.
 */
const fetchMedications = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(nurseMedicationsData), SIMULATED_LATENCY_MS);
  });

export function useNurseMedications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchMedications()
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
