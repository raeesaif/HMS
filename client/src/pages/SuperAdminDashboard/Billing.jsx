import { useMemo, useState } from 'react';
import { Receipt } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FilterDropdown } from '@/shared/FilterDropdown';
import StatsCard from '@/shared/StatsCard';
import { FilterBar } from '@/components/super-admin/FilterBar';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { TransactionsTable } from '@/components/super-admin/billing/TransactionsTable';
import { TransactionDetailsDialog } from '@/components/dialogs/super-admin/TransactionDetailsDialog';
import { RefundDialog } from '@/components/dialogs/super-admin/RefundDialog';
import { useTransactions, useRequestRefund } from '@/hooks/superAdmin/useBilling';
import { transactionStatusOptions, paymentMethodOptions } from '@/data/superAdmin/billing';
import { hospitals } from '@/data/superAdmin/hospitals';

const Billing = () => {
  const { data, isLoading, isError, refetch } = useTransactions();
  const requestRefund = useRequestRefund();

  const [hospitalId, setHospitalId] = useState('all');
  const [status, setStatus] = useState('all');
  const [method, setMethod] = useState('all');

  const [activeTransaction, setActiveTransaction] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const transactions = data?.transactions ?? [];
  const stats = data?.stats;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesHospital = hospitalId === 'all' || t.hospitalId === hospitalId;
      const matchesStatus = status === 'all' || t.status === status;
      const matchesMethod = method === 'all' || t.method === method;
      return matchesHospital && matchesStatus && matchesMethod;
    });
  }, [transactions, hospitalId, status, method]);

  const handleClearFilters = () => {
    setHospitalId('all');
    setStatus('all');
    setMethod('all');
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, transaction) => {
    setActiveTransaction(transaction);
    setOpenDialog(action);
  };

  const handleRefund = (transactionId, payload) => {
    requestRefund.mutate({ transactionId, payload });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Billing</h1>
        <p className="mt-1 text-sm text-slate-500">Track platform-wide subscription revenue and payments.</p>
      </section>

      {isLoading || !stats ? (
        <StatsRowSkeleton count={6} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard icon={<Receipt className="size-5" />} color="purple" title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} />
          <StatsCard icon={<Receipt className="size-5" />} color="green" title="Monthly Revenue" value={`$${stats.monthlyRevenue.toLocaleString()}`} />
          <StatsCard icon={<Receipt className="size-5" />} color="blue" title="Yearly Revenue" value={`$${stats.yearlyRevenue.toLocaleString()}`} />
          <StatsCard icon={<Receipt className="size-5" />} color="yellow" title="Pending Payments" value={stats.pendingPayments} />
          <StatsCard icon={<Receipt className="size-5" />} color="red" title="Failed Payments" value={stats.failedPayments} />
          <StatsCard icon={<Receipt className="size-5" />} color="gray" title="Refunds" value={stats.refunds} />
        </section>
      )}

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <FilterDropdown label="Hospital" value={hospitalId} onChange={setHospitalId} options={hospitals.map((h) => ({ value: h.id, label: h.name }))} />
                <FilterDropdown label="Status" value={status} onChange={setStatus} options={transactionStatusOptions.map((o) => ({ value: o, label: o }))} />
                <FilterDropdown label="Method" value={method} onChange={setMethod} options={paymentMethodOptions.map((o) => ({ value: o, label: o }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={7} cols={8} />
          ) : (
            <TransactionsTable transactions={filteredTransactions} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}
        </Card>
      )}

      <TransactionDetailsDialog transaction={activeTransaction} open={openDialog === 'view'} onOpenChange={closeDialog} />
      <RefundDialog transaction={activeTransaction} open={openDialog === 'refund'} onOpenChange={closeDialog} onSubmit={handleRefund} />
    </div>
  );
};

export default Billing;
