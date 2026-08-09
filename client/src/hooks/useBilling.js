import { useEffect, useState } from 'react';
import { fetchInvoices } from '@/services/billingService';

export function useBilling() {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchInvoices()
      .then((data) => {
        setInvoices(data.invoices);
        setStats(data.stats);
      })
      .catch(() => setError('Unable to load billing data.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetchInvoices()
      .then((data) => {
        if (!active) return;
        setInvoices(data.invoices);
        setStats(data.stats);
      })
      .catch(() => active && setError('Unable to load billing data.'))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { invoices, setInvoices, stats, isLoading, error, reload: load };
}
