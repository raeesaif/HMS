import { useEffect, useState } from 'react';
import { fetchMedicalRecords } from '@/services/patient/medicalRecordService';

export function useMedicalRecords() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchMedicalRecords()
      .then(setRecords)
      .catch(() => setError('Unable to load your medical records.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchMedicalRecords()
      .then((data) => active && setRecords(data))
      .catch(() => active && setError('Unable to load your medical records.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { records, isLoading, error, reload: load };
}
