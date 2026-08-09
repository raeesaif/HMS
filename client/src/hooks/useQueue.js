import { useEffect, useState } from 'react';
import { fetchQueue } from '@/services/queueService';

export function useQueue() {
  const [queue, setQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchQueue()
      .then(setQueue)
      .catch(() => setError('Unable to load the waiting queue.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchQueue()
      .then((data) => active && setQueue(data))
      .catch(() => active && setError('Unable to load the waiting queue.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { queue, setQueue, isLoading, error, reload: load };
}
