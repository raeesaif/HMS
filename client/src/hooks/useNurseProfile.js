import { useCallback, useEffect, useState } from 'react';
import { nurseProfileData } from '@/data/nurseProfile';

const SIMULATED_LATENCY_MS = 500;

/**
 * Stands in for a real profile API call. Swap the body of `fetchProfile` for a
 * `fetch('/api/nurse/profile')` (or react-query) once the endpoint exists — every
 * consumer already deals with { data, loading, error, refetch }.
 */
const fetchProfile = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(nurseProfileData), SIMULATED_LATENCY_MS);
  });

export function useNurseProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchProfile()
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
