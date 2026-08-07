import { useCallback, useEffect, useState } from 'react';
import { nurseTasksData } from '@/data/nurseTasks';

const SIMULATED_LATENCY_MS = 500;

/**
 * Stands in for a real nursing tasks API call. Swap the body of `fetchTasks`
 * for a `fetch('/api/nurse/tasks')` (or react-query) once the endpoint exists —
 * every consumer already deals with { data, loading, error, refetch }.
 */
const fetchTasks = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(nurseTasksData), SIMULATED_LATENCY_MS);
  });

export function useNurseTasks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchTasks()
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
