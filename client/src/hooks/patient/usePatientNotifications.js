import { useEffect, useState } from 'react';
import { fetchNotifications } from '@/services/patient/notificationService';

export function usePatientNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchNotifications()
      .then(setNotifications)
      .catch(() => setError('Unable to load your notifications.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchNotifications()
      .then((data) => active && setNotifications(data))
      .catch(() => active && setError('Unable to load your notifications.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { notifications, setNotifications, isLoading, error, reload: load };
}
