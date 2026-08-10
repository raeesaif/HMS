import { useEffect, useState } from 'react';
import { fetchLabReports } from '@/services/patient/labReportService';

export function useLabReports() {
  const [labReports, setLabReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchLabReports()
      .then(setLabReports)
      .catch(() => setError('Unable to load your lab reports.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchLabReports()
      .then((data) => active && setLabReports(data))
      .catch(() => active && setError('Unable to load your lab reports.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { labReports, isLoading, error, reload: load };
}
