import { useEffect, useState } from 'react';
import { fetchCheckIns } from '@/services/checkInService';

export function useCheckIns() {
  const [checkIns, setCheckIns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchCheckIns()
      .then(setCheckIns)
      .catch(() => setError('Unable to load check-ins.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchCheckIns()
      .then((data) => active && setCheckIns(data))
      .catch(() => active && setError('Unable to load check-ins.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { checkIns, setCheckIns, isLoading, error, reload: load };
}
