import { useCallback, useEffect, useState } from 'react';
import {
  defaultAppearanceSettings,
  defaultNotificationPreferences,
  defaultSecuritySettings,
  nurseAccountData,
  nurseSessionsData,
} from '@/data/nurseSettings';

const SIMULATED_LATENCY_MS = 500;

/**
 * Stands in for a real settings API call. Swap the body of `fetchSettings` for a
 * `fetch('/api/nurse/settings')` (or react-query) once the endpoint exists — every
 * consumer already deals with { data, loading, error, refetch }.
 */
const fetchSettings = () =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          account: nurseAccountData,
          security: defaultSecuritySettings,
          notifications: defaultNotificationPreferences,
          appearance: defaultAppearanceSettings,
          sessions: nurseSessionsData,
        }),
      SIMULATED_LATENCY_MS
    );
  });

export function useNurseSettings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchSettings()
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
